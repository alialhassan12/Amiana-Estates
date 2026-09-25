import { useEffect, useState } from "react";
import { useGetDesignPhilosophy, useUpdateDesignPhilosophy } from "../../hooks/useDesignPhilosophy";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editDesignPhilosophySchema, type EditDesignPhilosophyFormData } from "../../schemas/editDesignPhilosophySchema";
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
    Trash2,
    Plus,
    Pencil,
    GripVertical,
    ListOrdered,
    Info,
    X,
} from "lucide-react";
import { toast } from "../../components/ui/toast";
import { Button } from "../../components/ui/button";
import DesignPhilosophyPreview from "../../components/admin/DesignPhilosophyPreview";
import type { DesignPhilosophy as DesignPhilosophyType, DesignPhilosophyPrinciple } from "../../@types/designPhilosophy";

// Fallback principles if database list is empty initially
const defaultMockPrinciples: DesignPhilosophyPrinciple[] = [
    {
        id: 1,
        design_philosophy_id: 1,
        title: "Harmonic Proportions",
        description: "Calibrated to natural golden ratios and circadian sunlight transitions across living spaces."
    },
    {
        id: 2,
        design_philosophy_id: 1,
        title: "Noble Materiality",
        description: "Curated natural stones, hand-finished bronze details, and responsibly sourced European hardwoods."
    },
    {
        id: 3,
        design_philosophy_id: 1,
        title: "Contextual Resonance",
        description: "Structures crafted in deep harmony with their surrounding topography, water features, and horizons."
    },
    {
        id: 4,
        design_philosophy_id: 1,
        title: "Enduring Legacy",
        description: "Engineered with architectural permanence to transcend trends and appreciate across generations."
    }
];

const DesignPhilosophy = () => {
    const { data: designPhilosophy, isLoading } = useGetDesignPhilosophy();
    const { mutateAsync: updateDesignPhilosophyMutation, isPending: isSaving } = useUpdateDesignPhilosophy();

    // View Modes for responsive admin UX: "split" | "form" | "preview"
    const [viewMode, setViewMode] = useState<"split" | "form" | "preview">("split");
    // Mobile tab: "form" | "preview"
    const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
    // Simulated device viewport in the live preview: "desktop" | "tablet" | "mobile"
    const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

    // Local selected file state for UI info
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isDirty }
    } = useForm<EditDesignPhilosophyFormData>({
        resolver: zodResolver(editDesignPhilosophySchema),
        defaultValues: {
            title: "",
            subTitle: "",
            description: "",
            image: null,
            image_url: ""
        },
        mode: "onChange"
    });

    // Synchronize form with fetched design philosophy
    useEffect(() => {
        if (designPhilosophy) {
            reset({
                title: designPhilosophy.title || "",
                subTitle: designPhilosophy.subTitle || "",
                description: designPhilosophy.description || "",
                image: null,
                image_url: designPhilosophy.image_url || ""
            });
            setSelectedFile(null);
        }
    }, [designPhilosophy, reset]);

    const watchedValues = watch();
    const imageUrl = watch("image_url");

    // Handle media file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        setValue("image", file, { shouldDirty: true, shouldValidate: true });
        const objectUrl = URL.createObjectURL(file);
        setValue("image_url", objectUrl, { shouldDirty: true, shouldValidate: true });
    };

    // Remove or revert newly selected local file
    const handleRevertSelectedImage = () => {
        setSelectedFile(null);
        setValue("image", null, { shouldDirty: true });
        setValue("image_url", designPhilosophy?.image_url || "", { shouldDirty: true });
    };

    // Reset form to original loaded state
    const handleReset = () => {
        if (!designPhilosophy) return;
        reset({
            title: designPhilosophy.title || "",
            subTitle: designPhilosophy.subTitle || "",
            description: designPhilosophy.description || "",
            image: null,
            image_url: designPhilosophy.image_url || ""
        });
        setSelectedFile(null);

        toast.add({
            description: "Form reset to saved values",
            type: "info"
        });
    };

    // Submit Section 1 data (title, subTitle, description, image)
    const onSubmit = async (data: EditDesignPhilosophyFormData) => {
        try {
            const formData = new FormData();
            if (designPhilosophy?.id) {
                formData.append("id", String(designPhilosophy.id));
            }
            formData.append("title", data.title);
            formData.append("subTitle", data.subTitle);
            formData.append("description", data.description);

            if (data.image instanceof File) {
                formData.append("image", data.image);
            }

            await updateDesignPhilosophyMutation(formData);

            toast.add({
                description: "Design Philosophy updated successfully",
                type: "success"
            });
        } catch (error: any) {
            console.error("Error updating design philosophy:", error);
            toast.add({
                description: typeof error === "string" ? error : (error?.message || "Failed to update design philosophy"),
                type: "error"
            });
        }
    };

    const typedDesignPhilosophy = designPhilosophy as DesignPhilosophyType | undefined;
    const displayPrinciples: DesignPhilosophyPrinciple[] = (typedDesignPhilosophy?.design_philosophy_principles && typedDesignPhilosophy.design_philosophy_principles.length > 0)
        ? typedDesignPhilosophy.design_philosophy_principles
        : defaultMockPrinciples;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="body-text text-sm text-neutral-500 uppercase tracking-wider">
                    Loading Design Philosophy Settings...
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
                        Design Philosophy Section
                    </h1>
                    <p className="body-text text-xs sm:text-sm text-neutral-500 mt-1">
                        Configure the design philosophy headline, descriptive narratives, showcase image, and architectural principles.
                    </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        disabled={isSaving || !isDirty}
                        className="text-neutral-700 border-[#ECE9E5] hover:bg-[#E9E8E5] gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset
                    </Button>

                    <Button
                        type="button"
                        size="sm"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSaving}
                        className="bg-primary hover:bg-primary/90 text-white gap-2 text-xs uppercase tracking-wider font-semibold shadow-xs cursor-pointer"
                    >
                        {isSaving ? (
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

            {/* Main Content Area: Form & Live Preview */}
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
                            {/* PART 1: TITLE, SUBTITLE, DESCRIPTION, AND IMAGE UPLOAD */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold mb-4 flex items-center gap-2">
                                        <Sparkles className="h-3.5 w-3.5" />
                                        Section Content & Typography
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Pre-Heading / Category Title */}
                                        <div>
                                            <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                                Pre-Heading Category
                                            </label>
                                            <input
                                                type="text"
                                                {...register("title")}
                                                placeholder="E.g. DESIGN PHILOSOPHY"
                                                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors uppercase tracking-wider"
                                            />
                                            <p className="body-text text-[10px] text-neutral-500 mt-1 italic">
                                                Appears in gold uppercase above the main philosophy statement.
                                            </p>
                                            {errors.title && (
                                                <p className="body-text text-xs text-red-500 mt-1">
                                                    {errors.title.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Main Subtitle / Headline */}
                                        <div>
                                            <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                                Main Headline / Subtitle
                                            </label>
                                            <textarea
                                                rows={3}
                                                {...register("subTitle")}
                                                placeholder="E.g. ARCHITECTURAL MASTERY ROOTED IN TIMELESS ELEGANCE"
                                                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-serif uppercase resize-y leading-relaxed"
                                            />
                                            {errors.subTitle && (
                                                <p className="body-text text-xs text-red-500 mt-1">
                                                    {errors.subTitle.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                                Philosophy Description
                                            </label>
                                            <textarea
                                                rows={4}
                                                {...register("description")}
                                                placeholder="Describe the architectural perspective and design ethos..."
                                                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y leading-relaxed"
                                            />
                                            {errors.description && (
                                                <p className="body-text text-xs text-red-500 mt-1">
                                                    {errors.description.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Image Upload Component */}
                                <div className="border-t border-[#ECE9E5] pt-5">
                                    <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold mb-4 flex items-center gap-2">
                                        <ImageIcon className="h-3.5 w-3.5" />
                                        Showcase Image
                                    </h3>

                                    <div className="space-y-3">
                                        {/* Current / Staged Image Preview */}
                                        {imageUrl && (
                                            <div className="relative rounded-lg overflow-hidden border border-[#ECE9E5] bg-neutral-900 h-44 group">
                                                <img
                                                    src={imageUrl}
                                                    alt="Design Philosophy Preview"
                                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-between p-3">
                                                    <div className="text-white text-xs">
                                                        <span className="font-semibold block truncate max-w-[200px]">
                                                            {selectedFile ? selectedFile.name : "Active Section Image"}
                                                        </span>
                                                        <span className="text-[10px] text-white/70">
                                                            {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB (Staged)` : "Live on portfolio"}
                                                        </span>
                                                    </div>

                                                    {selectedFile && (
                                                        <button
                                                            type="button"
                                                            onClick={handleRevertSelectedImage}
                                                            className="flex items-center gap-1 px-2 py-1 bg-red-600/80 hover:bg-red-600 text-white rounded text-[11px] font-medium transition-colors cursor-pointer"
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
                                                            Replace file ({selectedFile.name})
                                                        </span>
                                                    ) : (
                                                        "Click or drag image to upload / replace"
                                                    )}
                                                </p>
                                                <p className="body-text text-[10px] text-neutral-400">
                                                    Supports JPEG, PNG, WebP (Max 2MB)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PART 2: DESIGN PHILOSOPHY PRINCIPLES (DESIGN ONLY, NO ADD/DELETE FUNCTIONALITY YET) */}
                            <div className="border-t border-[#ECE9E5] pt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <ListOrdered className="h-4 w-4 text-primary" />
                                        <div>
                                            <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold">
                                                Design Philosophy Principles
                                            </h3>
                                            <p className="body-text text-[11px] text-neutral-500">
                                                Curate the foundational pillars displayed in the section grid.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Add Principle Button (Visual Design Only) */}
                                    <button
                                        type="button"
                                        title="Principles add functionality will be connected next"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/90 text-white rounded text-xs uppercase tracking-wider font-semibold opacity-90 hover:opacity-100 transition-opacity shadow-2xs"
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                        <span>Add Principle</span>
                                    </button>
                                </div>

                                {/* Principles List UI Cards */}
                                <div className="space-y-3">
                                    {displayPrinciples.map((item, index) => (
                                        <div
                                            key={item.id ?? index}
                                            className="group relative bg-[#FAF9F6]/80 hover:bg-white border border-[#ECE9E5] hover:border-neutral-300 rounded-lg p-3.5 sm:p-4 transition-all shadow-2xs"
                                        >
                                            {/* Header Row: Index & Visual Action Buttons */}
                                            <div className="flex items-center justify-between gap-3 mb-2.5">
                                                <div className="flex items-center gap-2">
                                                    <GripVertical className="h-3.5 w-3.5 text-neutral-400 cursor-grab" />
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-primary/10 text-primary uppercase tracking-wider">
                                                        Principle #{String(index + 1).padStart(2, "0")}
                                                    </span>
                                                </div>

                                                {/* Visual-only action buttons */}
                                                <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        type="button"
                                                    
                                                        title="Edit principle"
                                                        className="p-1 rounded text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        
                                                        title="Delete principle"
                                                        className="p-1 rounded text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Content: Title & Description Preview */}
                                            <div className="space-y-1 pl-5">
                                                <h4 className="title uppercase text-xs sm:text-sm font-medium text-neutral-900 tracking-wide">
                                                    {item.title}
                                                </h4>
                                                {item.description && (
                                                    <p className="body-text text-xs text-neutral-500 font-light leading-relaxed line-clamp-2">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Visual Dashed Add Placeholder Card */}
                                    <div
                                        className="border-2 border-dashed border-[#ECE9E5] hover:border-primary/40 rounded-lg p-3.5 flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-neutral-400 bg-[#FAF9F6]/40 select-none"
                                    >
                                        <Plus className="h-4 w-4 text-primary/70" />
                                        <span className="font-medium">+ New Principle Slot (Design Preview)</span>
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
                                        ${deviceMode === "desktop" ? "w-full min-h-[550px]" : ""}
                                        ${deviceMode === "tablet" ? "w-[768px] max-w-full min-h-[600px] border-4 border-neutral-800" : ""}
                                        ${deviceMode === "mobile" ? "w-[375px] max-w-full min-h-[600px] border-4 border-neutral-800 rounded-2xl" : ""}
                                    `}
                                >
                                    {/* Design Philosophy Live Preview */}
                                    <DesignPhilosophyPreview
                                        title={watchedValues.title || designPhilosophy?.title}
                                        subTitle={watchedValues.subTitle || designPhilosophy?.subTitle}
                                        description={watchedValues.description || designPhilosophy?.description}
                                        image_url={imageUrl || designPhilosophy?.image_url}
                                        principles={displayPrinciples}
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

export default DesignPhilosophy;