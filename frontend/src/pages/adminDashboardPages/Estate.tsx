import {
    Check,
    Edit3,
    Eye,
    Layers,
    Loader2,
    Monitor,
    RotateCcw,
    Smartphone,
    Tablet,
    UploadCloud,
    Sparkles,
    Image as ImageIcon,
    Video as VideoIcon,
    Info,
    Building2
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { useGetEstate, useUpdateEstate } from "../../hooks/useEstate";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { estateSchema, type EstateFormData } from "../../schemas/estateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../../components/ui/toast";
import EstatePreview from "../../components/admin/EstatePreview";

const Estate = () => {
    const { data: estateData, isLoading } = useGetEstate();
    const estate = estateData?.estate;

    const { mutateAsync: updateEstateMutation, isPending: isSaving } = useUpdateEstate();

    // View Modes for responsive admin UX: "split" | "form" | "preview"
    const [viewMode, setViewMode] = useState<"split" | "form" | "preview">("split");
    // Mobile tab: "form" | "preview"
    const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
    // Simulated device viewport in the live preview: "desktop" | "tablet" | "mobile"
    const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

    // Local state for media file upload & live preview blob URL
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string>("");
    const [mediaType, setMediaType] = useState<"image" | "video">("image");

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isDirty }
    } = useForm<EstateFormData>({
        resolver: zodResolver(estateSchema),
        defaultValues: {
            id: "",
            title: "",
            subTitle: "",
            description: "",
            media: "",
        },
        mode: "onChange"
    });

    // Populate form when estate data loads
    useEffect(() => {
        if (estate) {
            // Determine initial media type from media path/url
            const isVid =
                (estate.media && (estate.media.endsWith(".mp4") || estate.media.endsWith(".webm") || estate.media.endsWith(".mov")))
            setMediaType(isVid ? "video" : "image");

            reset({
                id: String(estate.id),
                title: estate.title || "",
                subTitle: estate.subTitle || "",
                description: estate.description || "",
                media: estate.media || ""
            });
            setMediaPreviewUrl(estate.media_url || "");
        }
    }, [estate, reset]);

    // Live watched form values for the real-time preview
    const watchedValues = watch();

    // Handle media file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setMediaFile(file);
        const objectUrl = URL.createObjectURL(file);
        setMediaPreviewUrl(objectUrl);

        // Auto-detect media type
        const type = file.type.startsWith("video/") ? "video" : "image";
        setMediaType(type);
        setValue("media", file, { shouldDirty: true });
    };

    // Handle form submission
    const onSubmit = async (data: EstateFormData) => {
        const formData = new FormData();
        formData.append("id", data.id);
        formData.append("title", data.title);
        formData.append("subTitle", data.subTitle);
        formData.append("description", data.description);

        if (mediaFile) {
            formData.append("media", mediaFile);
        }

        try {
            await updateEstateMutation(formData);
            setMediaFile(null);

            toast.add({
                description: "Estate section updated successfully!",
                type: "success"
            });
        } catch (error: any) {
            console.error("Error updating estate:", error);
            toast.add({
                description: error?.response?.data?.message || "Failed to update estate section.",
                type: "error"
            });
        }
    };

    // Reset form to original loaded state
    const handleReset = () => {
        if (!estate) return;
        reset({
            id: String(estate?.id || ""),
            title: estate?.title || "",
            subTitle: estate?.subTitle || "",
            description: estate?.description || "",
            media: estate?.media || ""
        });
        setMediaFile(null);
        setMediaPreviewUrl(estate?.media_url || "");

        const isVid =
            (estate.media && (estate.media.endsWith(".mp4") || estate.media.endsWith(".webm") || estate.media.endsWith(".mov"))) ||
            (estate.media_url && (estate.media_url.endsWith(".mp4") || estate.media_url.endsWith(".webm") || estate.media_url.endsWith(".mov")));
        setMediaType(isVid ? "video" : "image");

        toast.add({
            description: "Form reset to saved values",
            type: "info"
        });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="body-text text-sm text-neutral-500 uppercase tracking-wider">
                    Loading Estate Settings...
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
                        The Estate Section
                    </h1>
                    <p className="body-text text-xs sm:text-sm text-neutral-500 mt-1">
                        Customize The Estate section. Changes reflect live on The Estate page.
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

            {/* Desktop View Mode Switcher */}
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

            {/* Mobile / Tablet Tab Navigation  */}
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
                            className="bg-white border border-[#ECE9E5] rounded-xl p-5 sm:p-7 shadow-xs space-y-6"
                        >
                            {/* Section 1: Typography */}
                            <div>
                                <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold mb-4 flex items-center gap-2">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Estate Typography
                                </h3>

                                <div className="space-y-4">
                                    {/* Section Title (Pre-heading) */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Pre-Heading Category
                                        </label>
                                        <input
                                            type="text"
                                            {...register("title")}
                                            placeholder="E.g. The Estate"
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors uppercase tracking-wider"
                                        />
                                        <p className="body-text text-[10px] text-neutral-500 mt-1 italic">
                                            Shown in gold uppercase above the main subtitle.
                                        </p>
                                        {errors.title && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.title.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Sub Title (Main Heading) */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Main Heading / Subtitle 
                                        </label>
                                        <input
                                            type="text"
                                            {...register("subTitle")}
                                            placeholder="E.g. Private Sanctuary Built For The Discerning"
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-serif uppercase"
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
                                            Description 
                                        </label>
                                        <textarea
                                            rows={4}
                                            {...register("description")}
                                            placeholder="Enter descriptive text detailing the estate..."
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

                            {/* Section 2: Media Background */}
                            <div className="border-t border-[#ECE9E5] pt-5">
                                <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold mb-4 flex items-center gap-2">
                                    <ImageIcon className="h-3.5 w-3.5" />
                                    Media Background
                                </h3>

                                <div className="space-y-4">
                                    {/* Media Type Selection */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-2">
                                            Media Type
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <label
                                                className={`flex items-center justify-center gap-2 p-2.5 rounded-sm border cursor-pointer transition-all ${
                                                    mediaType === "image"
                                                        ? "border-primary bg-primary/5 text-primary font-semibold"
                                                        : "border-[#ECE9E5] bg-[#FAF9F6] text-neutral-600 hover:border-neutral-400"
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="estate_media_type"
                                                    value="image"
                                                    checked={mediaType === "image"}
                                                    onChange={() => setMediaType("image")}
                                                    className="sr-only"
                                                />
                                                <ImageIcon className="h-4 w-4" />
                                                <span className="body-text text-xs uppercase tracking-wider">
                                                    Image
                                                </span>
                                            </label>

                                            <label
                                                className={`flex items-center justify-center gap-2 p-2.5 rounded-sm border cursor-pointer transition-all ${
                                                    mediaType === "video"
                                                        ? "border-primary bg-primary/5 text-primary font-semibold"
                                                        : "border-[#ECE9E5] bg-[#FAF9F6] text-neutral-600 hover:border-neutral-400"
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="estate_media_type"
                                                    value="video"
                                                    checked={mediaType === "video"}
                                                    onChange={() => setMediaType("video")}
                                                    className="sr-only"
                                                />
                                                <VideoIcon className="h-4 w-4" />
                                                <span className="body-text text-xs uppercase tracking-wider">
                                                    Video
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* File Uploader */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-2">
                                            Upload New Media File
                                        </label>
                                        <div className="relative border-2 border-dashed border-[#ECE9E5] hover:border-primary/60 rounded-md p-4 text-center transition-colors bg-[#FAF9F6]/50">
                                            <input
                                                type="file"
                                                accept="image/*,video/mp4,video/webm,video/quicktime"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                                                <UploadCloud className="h-6 w-6 text-neutral-400" />
                                                <p className="body-text text-xs text-neutral-700 font-medium">
                                                    {mediaFile ? (
                                                        <span className="text-primary font-semibold">
                                                            {mediaFile.name}
                                                        </span>
                                                    ) : (
                                                        "Click or drag file to replace background media"
                                                    )}
                                                </p>
                                                <p className="body-text text-[10px] text-neutral-400">
                                                    Supports JPEG, PNG, WebP, MP4, WebM (Max 5MB)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Calculated Statistics (Read Only) */}
                            <div className="border-t border-[#ECE9E5] pt-5">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                                        <Building2 className="h-3.5 w-3.5" />
                                        Calculated Statistics
                                    </h3>
                                    <span className="inline-flex items-center gap-1 text-[10px] text-neutral-500 uppercase tracking-wider bg-neutral-100 px-2 py-0.5 rounded font-mono">
                                        Read-Only
                                    </span>
                                </div>

                                <div className="bg-[#FAF9F6] border border-[#ECE9E5] rounded-md p-3 mb-3 flex items-start gap-2.5">
                                    <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <p className="body-text text-[11px] text-neutral-600 leading-relaxed">
                                        These values are calculated dynamically by the system from your company building floors, property inventory, and penthouse property type area. They cannot be edited manually.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                    <div className="bg-[#FAF9F6] border border-[#ECE9E5] rounded-lg p-3 text-center">
                                        <p className="title text-xl text-neutral-900 font-semibold mb-0.5">
                                            {estateData?.levelOfArchitecture ?? "—"}
                                        </p>
                                        <p className="body-text text-[10px] text-primary uppercase font-medium tracking-wider">
                                            Level of Architecture
                                        </p>
                                        <span className="text-[9px] text-neutral-400 block mt-1">Company Floors</span>
                                    </div>

                                    <div className="bg-[#FAF9F6] border border-[#ECE9E5] rounded-lg p-3 text-center">
                                        <p className="title text-xl text-neutral-900 font-semibold mb-0.5">
                                            {estateData?.totalResidences ?? "—"}
                                        </p>
                                        <p className="body-text text-[10px] text-primary uppercase font-medium tracking-wider">
                                            Residencies
                                        </p>
                                        <span className="text-[9px] text-neutral-400 block mt-1">Total Units</span>
                                    </div>

                                    <div className="bg-[#FAF9F6] border border-[#ECE9E5] rounded-lg p-3 text-center">
                                        <p className="title text-xl text-neutral-900 font-semibold mb-0.5">
                                            {estateData?.propertyTypeArea ?? "—"}
                                        </p>
                                        <p className="body-text text-[10px] text-primary uppercase font-medium tracking-wider">
                                            Crown Penthouses
                                        </p>
                                        <span className="text-[9px] text-neutral-400 block mt-1">Penthouse Area</span>
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
                        <div className="bg-white border border-[#ECE9E5] rounded-xl overflow-hidden shadow-xs">
                            {/* Device & Preview Controls Header */}
                            <div className="bg-[#FAF9F6] border-b border-[#ECE9E5] px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="uppercase body-text text-xs tracking-wider font-semibold text-neutral-800">
                                        Live Preview
                                    </span>
                                </div>

                                {/* Viewport Size indicator */}
                                <span className="body-text text-[11px] text-neutral-400 font-mono">
                                    {deviceMode === "desktop" && "Full Width (Responsive)"}
                                    {deviceMode === "tablet" && "Tablet Frame (768px)"}
                                    {deviceMode === "mobile" && "Mobile Frame (375px)"}
                                </span>
                            </div>

                            {/* Preview Viewport Container */}
                            <div className="p-2 sm:p-4 bg-neutral-900/10 min-h-[500px] flex justify-center items-start overflow-x-auto">
                                <div
                                    className={`
                                        transition-all duration-300 ease-in-out bg-white rounded-lg overflow-hidden shadow-2xl relative
                                        ${deviceMode === "desktop" ? "w-full min-h-[550px] lg:min-h-[650px]" : ""}
                                        ${deviceMode === "tablet" ? "w-[768px] max-w-full min-h-[600px] border-4 border-neutral-800" : ""}
                                        ${deviceMode === "mobile" ? "w-[375px] max-w-full min-h-[600px] border-4 border-neutral-800 rounded-2xl" : ""}
                                    `}
                                >
                                    {/* Estate Preview Component */}
                                    <EstatePreview
                                        title={watchedValues.title || estate?.title}
                                        subTitle={watchedValues.subTitle || estate?.subTitle}
                                        description={watchedValues.description || estate?.description}
                                        media={mediaPreviewUrl || estate?.media_url}
                                        mediaType={mediaType}
                                        stats={{
                                            levelOfArchitecture: estateData?.levelOfArchitecture,
                                            totalResidences: estateData?.totalResidences,
                                            propertyTypeArea: estateData?.propertyTypeArea
                                        }}
                                        deviceMode={deviceMode}
                                        className={deviceMode !== "desktop" ? "min-h-[500px]" : "min-h-[500px] lg:min-h-[620px]"}
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

export default Estate;