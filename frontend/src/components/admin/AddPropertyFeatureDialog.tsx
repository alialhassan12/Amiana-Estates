import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import { addPropertyFeatureSchema, type AddPropertyFeatureFormData } from "../../schemas/addPropertyFeatureSchema";
import { useAddPropertyFeature } from "../../hooks/usePropertyFeatures";
import { useGetPropertyTypesForFeatures } from "../../hooks/usePropertyTypes";
import type { PropertyType } from "../../@types/propertyType";
import { toast } from "../ui/toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

type AddPropertyFeatureDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const emptyFormValues: AddPropertyFeatureFormData = {
    property_type_id: 0,
    title: "",
    value: "",
};

const AddPropertyFeatureDialog = ({
    open,
    setOpen,
}: AddPropertyFeatureDialogProps) => {
    const { mutateAsync: addPropertyFeature, isPending: isAdding } = useAddPropertyFeature();
    const { data: propertyTypesData, isLoading: isLoadingTypes } = useGetPropertyTypesForFeatures();
    const propertyTypes = (propertyTypesData?.propertyTypes ?? []) as PropertyType[];

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
        reset,
    } = useForm<AddPropertyFeatureFormData>({
        resolver: zodResolver(addPropertyFeatureSchema),
        defaultValues: {
            ...emptyFormValues,
            property_type_id: 0,
        },
        mode: "onChange",
    });

    const selectedPropertyTypeId = watch("property_type_id");

    useEffect(() => {
        if (open) {
            reset({
                title: "",
                value: "",
                property_type_id: 0,
            });
        }
    }, [open, reset]);

    const handleOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) {
            reset(emptyFormValues);
        }
        setOpen(nextOpen);
    };

    const onSubmit = async (data: AddPropertyFeatureFormData) => {
        try {
            await addPropertyFeature({
                property_type_id: data.property_type_id,
                title: data.title.trim(),
                value: data.value.trim(),
            });

            toast.add({
                description: "Property feature created successfully.",
                type: "success",
            });
            handleOpenChange(false);
        } catch (error: unknown) {
            const apiError = error as { response?: { data?: { message?: string } } };
            console.error("Error creating property feature:", error);
            toast.add({
                description: apiError.response?.data?.message || "Failed to create property feature.",
                type: "error",
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-xl h-auto max-h-[calc(100vh-2rem)] !grid !grid-rows-[auto_minmax(0,1fr)] !gap-0 !p-0 overflow-hidden">
                {/* Sticky Header */}
                <DialogHeader className="shrink-0 border-b border-[#ECE9E5] px-4 py-4 pr-12">
                    <DialogTitle className="title text-xl text-neutral-900 tracking-tight flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Add Property Feature
                    </DialogTitle>
                    <DialogDescription className="body-text text-xs leading-relaxed text-neutral-500">
                        Add a new specification or feature item for a residence type.
                    </DialogDescription>
                </DialogHeader>

                {/* Form with scrollable body & sticky footer */}
                <form onSubmit={handleSubmit(onSubmit)} className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto]">
                    <div className="min-h-0 overflow-y-auto custom-scrollbar">
                        <div className="p-4 sm:p-6 space-y-5">
                            {/* Property Type Selection */}
                            <div>
                                <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                    Property Type
                                </label>
                                <Select
                                    value={selectedPropertyTypeId ? String(selectedPropertyTypeId) : ""}
                                    onValueChange={(val) => {
                                        setValue("property_type_id", Number(val), {
                                            shouldDirty: true,
                                            shouldValidate: true,
                                        });
                                    }}
                                    disabled={isLoadingTypes}
                                >
                                    <SelectTrigger className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer">
                                        <SelectValue placeholder={isLoadingTypes ? "Loading types..." : "Select property type..."} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Available Property Types</SelectLabel>
                                            {propertyTypes.map((type) => (
                                                <SelectItem
                                                    key={type.id}
                                                    value={String(type.id)}
                                                    className="cursor-pointer"
                                                >
                                                    {type.title}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.property_type_id && (
                                    <p className="body-text text-xs text-red-500 mt-1.5">{errors.property_type_id.message}</p>
                                )}
                            </div>

                            {/* Feature Title and Value */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="feature-title" className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                        Feature Title
                                    </label>
                                    <input
                                        id="feature-title"
                                        type="text"
                                        {...register("title")}
                                        placeholder="E.g. Bedrooms, Balcony, Area"
                                        className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                    {errors.title && (
                                        <p className="body-text text-xs text-red-500 mt-1.5">{errors.title.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="feature-value" className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                        Feature Value
                                    </label>
                                    <input
                                        id="feature-value"
                                        type="text"
                                        {...register("value")}
                                        placeholder="E.g. 4 Ensuite Bedrooms, 45 m²"
                                        className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                    {errors.value && (
                                        <p className="body-text text-xs text-red-500 mt-1.5">{errors.value.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sticky Footer */}
                    <div className="flex flex-col-reverse gap-2 border-t border-[#ECE9E5] bg-[#FAF9F6] px-4 py-4 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isSubmitting || isAdding}
                            onClick={() => handleOpenChange(false)}
                            className="border-[#ECE9E5] text-neutral-700 hover:bg-[#FAF9F6] cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || isAdding}
                            className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        >
                            {isSubmitting || isAdding ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : "Create Feature"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddPropertyFeatureDialog;