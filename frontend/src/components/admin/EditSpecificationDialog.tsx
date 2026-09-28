import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Pencil, Search, X } from "lucide-react";
import { AVAILABLE_ICONS } from "./AVAILABLE_ICONS";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";
import {
    editExperienceSpecificationSchema,
    type EditExperienceSpecificationFormData,
} from "../../schemas/editExperienceSpecificationSchema";
import { useEditExperienceSpecification } from "../../hooks/useExperienceSpecification";
import type { EstateExperienceSpecification } from "../../@types/estateExperience";

type EditSpecificationDialogProps = {
    specification: EstateExperienceSpecification | null;
    open: boolean;
    setOpen: (open: boolean) => void;
};

const EditSpecificationDialog = ({
    specification,
    open,
    setOpen,
}: EditSpecificationDialogProps) => {
    const [iconSearch, setIconSearch] = useState<string>("");

    const {
        mutateAsync: updateExperienceSpecification,
        isPending: isUpdating,
    } = useEditExperienceSpecification();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
        reset,
    } = useForm<EditExperienceSpecificationFormData>({
        resolver: zodResolver(editExperienceSpecificationSchema),
        defaultValues: {
            id: 0,
            estate_experience_id: 0,
            title: "",
            short_description: "",
            icon: "",
        },
        mode: "onChange",
    });

    // Sync specification data to form when opened or selected specification changes
    useEffect(() => {
        if (specification && open) {
            reset({
                id: specification.id,
                estate_experience_id: specification.estate_experience_id,
                title: specification.title,
                short_description: specification.short_description,
                icon: specification.icon,
            });
            setIconSearch("");
        }
    }, [specification, open, reset]);

    const handleOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) {
            setIconSearch("");
        }
        setOpen(nextOpen);
    };

    const icon = watch("icon");

    const filteredIcons = useMemo(() => {
        if (!iconSearch.trim()) return AVAILABLE_ICONS;
        const query = iconSearch.toLowerCase();
        return AVAILABLE_ICONS.filter(
            (item) =>
                item.name.toLowerCase().includes(query) ||
                item.label.toLowerCase().includes(query)
        );
    }, [iconSearch]);

    const SelectedIconComponent = useMemo(() => {
        return AVAILABLE_ICONS.find((item) => item.name === icon)?.icon;
    }, [icon]);

    const onSubmit = async (data: EditExperienceSpecificationFormData) => {
        if (!specification) return;

        try {
            await updateExperienceSpecification({
                id: specification.id,
                estate_experience_id: specification.estate_experience_id,
                title: data.title.trim(),
                short_description: data.short_description.trim(),
                icon: data.icon,
            });

            toast.add({
                description: "Specification updated successfully",
                type: "success",
            });

            handleOpenChange(false);
        } catch (error: unknown) {
            const apiError = error as { response?: { data?: { message?: string } } };
            console.error("Error updating specification:", error);
            toast.add({
                description: apiError?.response?.data?.message || "Failed to update specification",
                type: "error",
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-xl h-auto max-h-[calc(100vh-2rem)] !grid !grid-rows-[auto_minmax(0,1fr)] !gap-0 !p-0 overflow-hidden bg-white">
                {/* Sticky Header */}
                <DialogHeader className="shrink-0 border-b border-[#ECE9E5] px-6 py-4 pr-12">
                    <DialogTitle className="title text-xl text-neutral-900 tracking-tight flex items-center gap-2">
                        <Pencil className="h-5 w-5 text-primary" />
                        Edit Experience Specification
                    </DialogTitle>
                    <DialogDescription className="body-text text-xs leading-relaxed text-neutral-500">
                        Update the specification details, description, or icon.
                    </DialogDescription>
                </DialogHeader>

                {/* Form with scrollable body & sticky footer */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto]"
                >
                    <div className="min-h-0 overflow-y-auto custom-scrollbar">
                        <div className="p-6 space-y-5">
                            {/* Specification Title */}
                            <div>
                                <label
                                    htmlFor="edit-specification-title"
                                    className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5"
                                >
                                    Specification Title
                                </label>
                                <input
                                    id="edit-specification-title"
                                    type="text"
                                    {...register("title")}
                                    placeholder="E.g. Secure Private Parking"
                                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                />
                                {errors.title && (
                                    <p className="body-text text-xs text-red-500 mt-1.5">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* Short Description */}
                            <div>
                                <label
                                    htmlFor="edit-specification-description"
                                    className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5"
                                >
                                    Short Description
                                </label>
                                <textarea
                                    id="edit-specification-description"
                                    rows={3}
                                    {...register("short_description")}
                                    placeholder="E.g. Allocated access-controlled subterranean & grade bays"
                                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                                />
                                {errors.short_description && (
                                    <p className="body-text text-xs text-red-500 mt-1.5">
                                        {errors.short_description.message}
                                    </p>
                                )}
                            </div>

                            {/* Icon Picker */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700">
                                        Icon
                                    </label>
                                    {icon && SelectedIconComponent ? (
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 border border-primary/20 rounded text-xs text-primary font-medium">
                                            <SelectedIconComponent className="h-3.5 w-3.5" />
                                            <span>{icon}</span>
                                        </div>
                                    ) : (
                                        <span className="body-text text-xs text-neutral-400">
                                            Please select an icon
                                        </span>
                                    )}
                                </div>

                                {/* Icon Search Filter */}
                                <div className="relative mb-2">
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                                    <input
                                        type="text"
                                        value={iconSearch}
                                        onChange={(e) => setIconSearch(e.target.value)}
                                        placeholder="Search available icons..."
                                        className="w-full pl-8 pr-7 py-1.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-xs text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                    {iconSearch && (
                                        <button
                                            type="button"
                                            onClick={() => setIconSearch("")}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                    )}
                                </div>

                                {/* Icon Grid */}
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-52 overflow-y-auto p-2 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm custom-scrollbar">
                                    {filteredIcons.length === 0 ? (
                                        <div className="col-span-full py-6 text-center text-xs text-neutral-400">
                                            No matching icons found.
                                        </div>
                                    ) : (
                                        filteredIcons.map((item) => {
                                            const IconComp = item.icon;
                                            const isSelected = icon === item.name;

                                            return (
                                                <button
                                                    key={item.name}
                                                    type="button"
                                                    onClick={() => {
                                                        setValue("icon", item.name, {
                                                            shouldValidate: true,
                                                            shouldDirty: true,
                                                        });
                                                    }}
                                                    title={`${item.label} (${item.name})`}
                                                    className={`flex flex-col items-center justify-center p-2 rounded-sm border transition-all cursor-pointer ${
                                                        isSelected
                                                            ? "border-primary bg-primary/10 text-primary ring-1 ring-primary shadow-xs font-medium"
                                                            : "border-[#ECE9E5] bg-white text-neutral-600 hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
                                                    }`}
                                                >
                                                    <IconComp className="h-5 w-5 mb-1 shrink-0" />
                                                    <span className="text-[10px] leading-tight truncate w-full text-center">
                                                        {item.label}
                                                    </span>
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                                {errors.icon && (
                                    <p className="body-text text-xs text-red-500 mt-1.5">
                                        {errors.icon.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sticky Footer */}
                    <div className="flex flex-col-reverse gap-2 border-t border-[#ECE9E5] bg-[#FAF9F6] px-6 py-4 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isSubmitting || isUpdating}
                            onClick={() => handleOpenChange(false)}
                            className="border-[#ECE9E5] text-neutral-700 hover:bg-[#FAF9F6] cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || isUpdating}
                            className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        >
                            {isSubmitting || isUpdating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditSpecificationDialog;