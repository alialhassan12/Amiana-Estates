import { useEffect, useState } from "react";
import { useGetDifference, useUpdateDifference } from "../../hooks/useDifference";
import { useForm } from "react-hook-form";
import { editDifferenceSchema, type EditDifferenceFormData } from "../../schemas/editDifferenceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Check,
    Loader2,
    RotateCcw,
    Layers,
    Edit3,
    Eye,
    Monitor,
    Tablet,
    Smartphone,
    Sparkles,
    ImageIcon,
    UploadCloud,
    X,
    Info,
} from "lucide-react";
import { toast } from "../../components/ui/toast";
import { Button } from "../../components/ui/button";
import DifferencePreview from "../../components/admin/DifferencePreview";
import type { Difference as DifferenceType } from "../../@types/difference";

const Difference = () => {
    const { data: differenceData, isLoading: isLoadingDifference } = useGetDifference();
    const difference = differenceData?.difference as DifferenceType | undefined;

    const { mutateAsync: updateDifference, isPending: isUpdatingDifference } = useUpdateDifference();

    // View Modes for responsive admin UX: "split" | "form" | "preview"
    const [viewMode, setViewMode] = useState<"split" | "form" | "preview">("split");
    // Mobile tab: "form" | "preview"
    const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
    // Simulated device viewport in the live preview: "desktop" | "tablet" | "mobile"
    const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

    // Local selected file state for UI details
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const {
        register,
        reset,
        setValue,
        watch,
        handleSubmit,
        formState: { errors, isDirty }
    } = useForm<EditDifferenceFormData>({
        resolver: zodResolver(editDifferenceSchema),
        defaultValues: {
            title: "",
            subTitle: "",
            description: "",
            image: null,
            image_url: "",
        },
        mode: "onChange"
    });

    const watchedValues = watch();
    const imageUrl = watch("image_url");

    // Synchronize form with fetched difference data
    useEffect(() => {
        if (difference) {
            reset({
                title: difference.title || "",
                subTitle: difference.subTitle || "",
                description: difference.description || "",
                image: null,
                image_url: difference.image_url || "",
            });
            setSelectedFile(null);
        }
    }, [difference, reset]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        setValue("image", file, { shouldDirty: true, shouldValidate: true });
        const objectUrl = URL.createObjectURL(file);
        setValue("image_url", objectUrl, { shouldDirty: true, shouldValidate: true });
    };

    const handleRevertSelectedImage = () => {
        setSelectedFile(null);
        setValue("image", null, { shouldDirty: true });
        setValue("image_url", difference?.image_url || "", { shouldDirty: true });
    };

    const handleReset = () => {
        if (!difference) return;
        reset({
            title: difference.title || "",
            subTitle: difference.subTitle || "",
            description: difference.description || "",
            image: null,
            image_url: difference.image_url || "",
        });
        setSelectedFile(null);

        toast.add({
            description: "Form reset to saved values",
            type: "info"
        });
    };

    const onSubmit = async (data: EditDifferenceFormData) => {
        try {
            const formData = new FormData();
            if (difference?.id) {
                formData.append("id", String(difference.id));
            }
            formData.append("title", data.title);
            formData.append("subTitle", data.subTitle);
            formData.append("description", data.description);

            if (data.image instanceof File) {
                formData.append("image", data.image);
            }

            await updateDifference(formData);
            setSelectedFile(null);

            toast.add({
                description: "Difference section updated successfully",
                type: "success"
            });
        } catch (error: any) {
            console.error("Error updating difference:", error);
            toast.add({
                description: typeof error === "string" ? error : (error?.message || "Failed to update difference"),
                type: "error"
            });
        }
    };

    if (isLoadingDifference) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="body-text text-sm text-neutral-500 uppercase tracking-wider">
                    Loading Difference Section...
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 w-full max-w-full">
            {/* Header with Title and Global Actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#ECE9E5] pb-5">
                <div>
                    <h1 className="title text-2xl sm:text-3xl text-neutral-900 tracking-tight">
                        Difference Section
                    </h1>
                    <p className="body-text text-xs sm:text-sm text-neutral-500 mt-1">
                        Configure the distinctive headline, narrative statement, and showcase visual of The Amiana Difference.
                    </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        disabled={isUpdatingDifference || !isDirty}
                        className="text-neutral-700 border-[#ECE9E5] hover:bg-[#E9E8E5] gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset
                    </Button>

                    <Button
                        type="button"
                        size="sm"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isUpdatingDifference}
                        className="bg-primary hover:bg-primary/90 text-white gap-2 text-xs uppercase tracking-wider font-semibold shadow-xs cursor-pointer"
                    >
                        {isUpdatingDifference ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Check className="h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Desktop View Mode & Device Mode Switcher */}
            <div className="hidden lg:flex items-center justify-between bg-white border border-[#ECE9E5] rounded-lg p-2 shadow-2xs">
                <div className="flex items-center gap-1">
                    <span className="body-text text-xs text-neutral-400 uppercase tracking-widest px-3 font-semibold">
                        View:
                    </span>
                    <button
                        type="button"
                        onClick={() => setViewMode("split")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                            viewMode === "split"
                                ? "bg-neutral-900 text-white shadow-xs"
                                : "text-neutral-600 hover:text-neutral-900 hover:bg-[#FAF9F6]"
                        }`}
                    >
                        <Layers className="h-3.5 w-3.5" />
                        Split View
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode("form")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                            viewMode === "form"
                                ? "bg-neutral-900 text-white shadow-xs"
                                : "text-neutral-600 hover:text-neutral-900 hover:bg-[#FAF9F6]"
                        }`}
                    >
                        <Edit3 className="h-3.5 w-3.5" />
                        Form Only
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode("preview")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                            viewMode === "preview"
                                ? "bg-neutral-900 text-white shadow-xs"
                                : "text-neutral-600 hover:text-neutral-900 hover:bg-[#FAF9F6]"
                        }`}
                    >
                        <Eye className="h-3.5 w-3.5" />
                        Live Preview Only
                    </button>
                </div>

                {viewMode !== "form" && (
                    <div className="flex items-center gap-1 border-l border-[#ECE9E5] pl-3">
                        <span className="body-text text-xs text-neutral-400 uppercase tracking-widest px-2 font-semibold">
                            Device:
                        </span>
                        <button
                            type="button"
                            onClick={() => setDeviceMode("desktop")}
                            title="Desktop View"
                            className={`p-1.5 rounded transition-all cursor-pointer ${
                                deviceMode === "desktop"
                                    ? "bg-primary text-white"
                                    : "text-neutral-500 hover:text-neutral-900 hover:bg-[#E9E8E5]"
                            }`}
                        >
                            <Monitor className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setDeviceMode("tablet")}
                            title="Tablet View (768px)"
                            className={`p-1.5 rounded transition-all cursor-pointer ${
                                deviceMode === "tablet"
                                    ? "bg-primary text-white"
                                    : "text-neutral-500 hover:text-neutral-900 hover:bg-[#E9E8E5]"
                            }`}
                        >
                            <Tablet className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setDeviceMode("mobile")}
                            title="Mobile View (375px)"
                            className={`p-1.5 rounded transition-all cursor-pointer ${
                                deviceMode === "mobile"
                                    ? "bg-primary text-white"
                                    : "text-neutral-500 hover:text-neutral-900 hover:bg-[#E9E8E5]"
                            }`}
                        >
                            <Smartphone className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile / Tablet Tab Navigation */}
            <div className="flex lg:hidden w-full border-b border-[#ECE9E5] gap-4">
                <button
                    type="button"
                    onClick={() => setMobileTab("form")}
                    className={`flex-1 pb-3 text-center uppercase body-text text-xs font-semibold tracking-wider transition-colors border-b-2 cursor-pointer ${
                        mobileTab === "form"
                            ? "border-primary text-primary"
                            : "border-transparent text-neutral-500 hover:text-neutral-800"
                    }`}
                >
                    Edit Details
                </button>
                <button
                    type="button"
                    onClick={() => setMobileTab("preview")}
                    className={`flex-1 pb-3 text-center uppercase body-text text-xs font-semibold tracking-wider transition-colors border-b-2 cursor-pointer ${
                        mobileTab === "preview"
                            ? "border-primary text-primary"
                            : "border-transparent text-neutral-500 hover:text-neutral-800"
                    }`}
                >
                    Live Preview
                </button>
            </div>

            {/* Main Content Area */}
            <div className="w-full">
                <div
                    className={`grid gap-8 items-start ${
                        viewMode === "split"
                            ? "grid-cols-1 lg:grid-cols-12"
                            : "grid-cols-1"
                    }`}
                >
                    {/* EDIT FORM COLUMN */}
                    <div
                        className={`
                            ${viewMode === "preview" ? "hidden" : "block"}
                            ${viewMode === "split" ? "lg:col-span-5 xl:col-span-5" : "w-full max-w-4xl mx-auto"}
                            ${mobileTab === "preview" ? "hidden lg:block" : "block"}
                        `}
                    >
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-white border border-[#ECE9E5] rounded-xl p-5 sm:p-7 shadow-xs space-y-7"
                        >
                            {/* Section Content & Typography */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold mb-4 flex items-center gap-2">
                                        <Sparkles className="h-3.5 w-3.5" />
                                        Section Content & Typography
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Pre-Heading */}
                                        <div>
                                            <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                                Pre-Heading Category
                                            </label>
                                            <input
                                                type="text"
                                                {...register("title")}
                                                placeholder="E.g. THE AMIANA DIFFERENCE"
                                                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors uppercase tracking-wider"
                                            />
                                            <p className="body-text text-[10px] text-neutral-500 mt-1 italic">
                                                Appears in gold uppercase with a hairline accent above the headline.
                                            </p>
                                            {errors.title && (
                                                <p className="body-text text-xs text-red-500 mt-1">
                                                    {errors.title.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Headline / Subtitle */}
                                        <div>
                                            <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                                Main Headline / Subtitle
                                            </label>
                                            <textarea
                                                rows={2}
                                                {...register("subTitle")}
                                                placeholder="E.g. LUXURY, THOUGHTFULLY REDEFINED."
                                                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-serif uppercase resize-y leading-relaxed"
                                            />
                                            <p className="body-text text-[10px] text-neutral-500 mt-1 italic">
                                                The primary Bodoni serif signature statement.
                                            </p>
                                            {errors.subTitle && (
                                                <p className="body-text text-xs text-red-500 mt-1">
                                                    {errors.subTitle.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Narrative Description */}
                                        <div>
                                            <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                                Narrative Description
                                            </label>
                                            <textarea
                                                rows={5}
                                                {...register("description")}
                                                placeholder="Describe the distinctive architectural and luxury standard..."
                                                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y leading-relaxed"
                                            />
                                            <p className="body-text text-[10px] text-neutral-500 mt-1 italic">
                                                Comprehensive editorial prose articulating what sets Amiana Estates apart.
                                            </p>
                                            {errors.description && (
                                                <p className="body-text text-xs text-red-500 mt-1">
                                                    {errors.description.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Showcase Image Card */}
                                <div className="border-t border-[#ECE9E5] pt-5">
                                    <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold mb-4 flex items-center gap-2">
                                        <ImageIcon className="h-3.5 w-3.5" />
                                        Showcase Image
                                    </h3>

                                    <div className="space-y-3">
                                        {imageUrl && (
                                            <div className="relative rounded-lg overflow-hidden border border-[#ECE9E5] bg-neutral-900 h-48 group">
                                                <img
                                                    src={imageUrl}
                                                    alt="Difference Showcase Preview"
                                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-between p-3.5">
                                                    <div className="text-white text-xs">
                                                        <span className="font-semibold block truncate max-w-[220px]">
                                                            {selectedFile ? selectedFile.name : "Active Section Image"}
                                                        </span>
                                                        <span className="text-[10px] text-white/70">
                                                            {selectedFile
                                                                ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB (Staged)`
                                                                : "Live on portfolio"}
                                                        </span>
                                                    </div>

                                                    {selectedFile && (
                                                        <button
                                                            type="button"
                                                            onClick={handleRevertSelectedImage}
                                                            className="flex items-center gap-1 px-2.5 py-1 bg-red-600/85 hover:bg-red-600 text-white rounded text-[11px] font-medium transition-colors cursor-pointer"
                                                            title="Discard staged image and revert to saved"
                                                        >
                                                            <X className="h-3 w-3" />
                                                            Revert
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Upload Dropzone */}
                                        <div className="relative border-2 border-dashed border-[#ECE9E5] hover:border-primary/60 rounded-md p-4 text-center transition-colors bg-[#FAF9F6]/50">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                                                <UploadCloud className="h-6 w-6 text-neutral-400" />
                                                <p className="body-text text-xs text-neutral-700 font-medium">
                                                    {selectedFile ? (
                                                        <span className="text-primary font-semibold">
                                                            Replace image ({selectedFile.name})
                                                        </span>
                                                    ) : (
                                                        "Click or drag image to upload / replace"
                                                    )}
                                                </p>
                                                <p className="body-text text-[10px] text-neutral-400">
                                                    Supports JPEG, PNG, WebP (Max 5MB)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* LIVE PREVIEW COLUMN */}
                    <div
                        className={`
                            ${viewMode === "form" ? "hidden" : "block"}
                            ${viewMode === "split" ? "lg:col-span-7 xl:col-span-7" : "w-full"}
                            ${mobileTab === "form" ? "hidden lg:block" : "block"}
                        `}
                    >
                        <div className="bg-white border border-[#ECE9E5] rounded-xl overflow-hidden shadow-xs sticky top-4">
                            {/* Device & Preview Controls Header */}
                            <div className="bg-[#FAF9F6] border-b border-[#ECE9E5] px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="uppercase body-text text-xs tracking-wider font-semibold text-neutral-800">
                                        Live Section Preview
                                    </span>
                                </div>

                                {/* Viewport Size Indicator */}
                                <span className="body-text text-[11px] text-neutral-400 font-mono">
                                    {deviceMode === "desktop" && "Desktop View (Full Width)"}
                                    {deviceMode === "tablet" && "Tablet View (768px Frame)"}
                                    {deviceMode === "mobile" && "Mobile View (375px Frame)"}
                                </span>
                            </div>

                            {/* Preview Viewport Container */}
                            <div className="p-2 sm:p-4 bg-neutral-900/10 min-h-[500px] flex justify-center items-start overflow-x-auto">
                                <div
                                    className={`
                                        transition-all duration-300 ease-in-out bg-white rounded-lg overflow-hidden shadow-2xl relative
                                        ${deviceMode === "desktop" ? "w-full min-h-[520px]" : ""}
                                        ${deviceMode === "tablet" ? "w-[768px] max-w-full min-h-[580px] border-4 border-neutral-800" : ""}
                                        ${deviceMode === "mobile" ? "w-[375px] max-w-full min-h-[580px] border-4 border-neutral-800 rounded-2xl" : ""}
                                    `}
                                >
                                    {/* Difference Live Preview */}
                                    <DifferencePreview
                                        title={watchedValues.title || difference?.title}
                                        subTitle={watchedValues.subTitle || difference?.subTitle}
                                        description={watchedValues.description || difference?.description}
                                        image_url={imageUrl ?? difference?.image_url}
                                        deviceMode={deviceMode}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Difference;