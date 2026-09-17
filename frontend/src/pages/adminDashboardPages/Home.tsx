import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { homeSchema, type HomeFormData } from "../../schemas/homeSchema";
import { useGetHero, useUpdateHero } from "../../hooks/useHero";
import HomePreview from "../../components/admin/HomePreview";
import { toast } from "../../components/ui/toast";
import { Button } from "../../components/ui/button";
import {
    Monitor,
    Tablet,
    Smartphone,
    UploadCloud,
    Loader2,
    RotateCcw,
    Sparkles,
    Check,
    Eye,
    Edit3,
    Layers,
    Image as ImageIcon,
    Video as VideoIcon
} from "lucide-react";

const Home = () => {
    const { data: heroData, isLoading } = useGetHero();
    const hero = heroData?.hero;
    const { mutateAsync: updateHeroMutation, isPending: isSaving } = useUpdateHero();

    // View Modes for responsive admin UX: "split" | "form" | "preview"
    const [viewMode, setViewMode] = useState<"split" | "form" | "preview">("split");
    // Mobile tab: "form" | "preview"
    const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
    // Simulated device viewport in the live preview: "desktop" | "tablet" | "mobile"
    const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

    // Local state for media file upload & live preview blob URL
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string>("");

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isDirty }
    } = useForm<HomeFormData>({
        resolver: zodResolver(homeSchema),
        defaultValues: {
            id: "",
            hero_title: "",
            hero_description: "",
            hero_cta1_text: "",
            hero_cta1_url: "/",
            hero_cta2_text: "",
            hero_cta2_url: "/",
            hero_media_type: "image",
            hero_media: ""
        },
        mode: "onChange"
    });

    // Populate form when hero data loads
    useEffect(() => {
        if (hero) {
            reset({
                id: String(hero.id),
                hero_title: hero.hero_title || "",
                hero_description: hero.hero_description || "",
                hero_cta1_text: hero.hero_cta1_text || "",
                hero_cta1_url: hero.hero_cta1_url || "/",
                hero_cta2_text: hero.hero_cta2_text || "",
                hero_cta2_url: hero.hero_cta2_url || "/",
                hero_media_type: hero.hero_media_type || "image",
                hero_media: hero.hero_media || ""
            });
            setMediaPreviewUrl(hero.hero_media_url || "");
        }
    }, [hero, reset]);

    // Cleanup object URL when mediaFile changes
    useEffect(() => {
        return () => {
            if (mediaPreviewUrl && mediaPreviewUrl.startsWith("blob:")) {
                URL.revokeObjectURL(mediaPreviewUrl);
            }
        };
    }, [mediaPreviewUrl]);

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
        setValue("hero_media_type", type, { shouldDirty: true });
    };

    // Reset form to server values
    const handleReset = () => {
        if (!hero) return;
        reset({
            id: String(hero.id),
            hero_title: hero.hero_title || "",
            hero_description: hero.hero_description || "",
            hero_cta1_text: hero.hero_cta1_text || "",
            hero_cta1_url: hero.hero_cta1_url || "/",
            hero_cta2_text: hero.hero_cta2_text || "",
            hero_cta2_url: hero.hero_cta2_url || "/",
            hero_media_type: hero.hero_media_type || "image",
            hero_media: hero.hero_media || ""
        });
        setMediaFile(null);
        setMediaPreviewUrl(hero.hero_media_url || "");
        toast.add({
            description: "Form reset to saved values",
            type: "info"
        });
    };

    // Form submit handler
    const onSubmit = async (data: HomeFormData) => {
        try {
            const formData = new FormData();
            formData.append("id", data.id);
            formData.append("hero_title", data.hero_title);
            formData.append("hero_description", data.hero_description);
            formData.append("hero_cta1_text", data.hero_cta1_text);
            formData.append("hero_cta1_url", data.hero_cta1_url || "/");
            formData.append("hero_cta2_text", data.hero_cta2_text);
            formData.append("hero_cta2_url", data.hero_cta2_url || "/");
            formData.append("hero_media_type", data.hero_media_type);

            if (mediaFile) {
                formData.append("hero_media", mediaFile);
            }

            await updateHeroMutation(formData);
            setMediaFile(null);

            toast.add({
                description: "Hero section updated successfully!",
                type: "success"
            });
        } catch (error: any) {
            console.error("Hero update error:", error);
            toast.add({
                description: error?.response?.data?.message || "Failed to update hero section.",
                type: "error"
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="body-text text-sm text-neutral-500 uppercase tracking-wider">
                    Loading Hero Settings...
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
                        Home Hero Section
                    </h1>
                    <p className="body-text text-xs sm:text-sm text-neutral-500 mt-1">
                        Customize the hero banner, copy, and call-to-actions. Changes reflect live in the preview pane.
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

            {/* Desktop View Mode Switcher (hidden on mobile/tablet) */}
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

            {/* Mobile / Tablet Tab Navigation (< lg) */}
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
                            {/* Section 1: Hero Titles */}
                            <div>
                                <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold mb-4 flex items-center gap-2">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Hero Typography
                                </h3>

                                <div className="space-y-4">
                                    {/* Hero Title */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Hero Title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register("hero_title")}
                                            placeholder="E.g. Luxury Living In Aberdeen"
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-serif"
                                        />
                                        <p className="body-text text-[10px] text-neutral-500 mt-1 italic">
                                            Tip: The last word of the title automatically renders in gold italic styling.
                                        </p>
                                        {errors.hero_title && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.hero_title.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Hero Description */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Hero Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            rows={3}
                                            {...register("hero_description")}
                                            placeholder="Enter brief luxury description..."
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y leading-relaxed"
                                        />
                                        {errors.hero_description && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.hero_description.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Call-to-Actions */}
                            <div className="border-t border-[#ECE9E5] pt-5">
                                <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold mb-4">
                                    Call To Action Buttons
                                </h3>

                                <div className="space-y-4">
                                    {/* CTA 1 */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1">
                                                CTA 1 Button Text <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                {...register("hero_cta1_text")}
                                                placeholder="E.g. Explore Residences"
                                                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-xs text-neutral-900 focus:outline-none focus:border-primary transition-colors uppercase font-medium"
                                            />
                                            {errors.hero_cta1_text && (
                                                <p className="body-text text-xs text-red-500 mt-1">
                                                    {errors.hero_cta1_text.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1">
                                                CTA 1 Target URL
                                            </label>
                                            <input
                                                type="text"
                                                {...register("hero_cta1_url")}
                                                placeholder="E.g. /residences"
                                                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-xs text-neutral-900 focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* CTA 2 */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1">
                                                CTA 2 Button Text <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                {...register("hero_cta2_text")}
                                                placeholder="E.g. Download Brochure"
                                                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-xs text-neutral-900 focus:outline-none focus:border-primary transition-colors uppercase font-medium"
                                            />
                                            {errors.hero_cta2_text && (
                                                <p className="body-text text-xs text-red-500 mt-1">
                                                    {errors.hero_cta2_text.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1">
                                                CTA 2 Target URL
                                            </label>
                                            <input
                                                type="text"
                                                {...register("hero_cta2_url")}
                                                placeholder="E.g. /brochure.pdf"
                                                className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-xs text-neutral-900 focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Background Media */}
                            <div className="border-t border-[#ECE9E5] pt-5">
                                <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold mb-4 flex items-center gap-2">
                                    <UploadCloud className="h-3.5 w-3.5" />
                                    Background Media
                                </h3>

                                <div className="space-y-4">
                                    {/* Media Type Selector */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-2">
                                            Media Type
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <label
                                                className={`flex items-center justify-center gap-2 p-2.5 rounded-sm border cursor-pointer transition-all ${
                                                    watchedValues.hero_media_type === "image"
                                                        ? "border-primary bg-primary/5 text-primary font-medium"
                                                        : "border-[#ECE9E5] text-neutral-600 hover:bg-[#FAF9F6]"
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    value="image"
                                                    {...register("hero_media_type")}
                                                    className="sr-only"
                                                />
                                                <ImageIcon className="h-4 w-4" />
                                                <span className="body-text text-xs uppercase tracking-wider">
                                                    Image
                                                </span>
                                            </label>

                                            <label
                                                className={`flex items-center justify-center gap-2 p-2.5 rounded-sm border cursor-pointer transition-all ${
                                                    watchedValues.hero_media_type === "video"
                                                        ? "border-primary bg-primary/5 text-primary font-medium"
                                                        : "border-[#ECE9E5] text-neutral-600 hover:bg-[#FAF9F6]"
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    value="video"
                                                    {...register("hero_media_type")}
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
                                                        "Click or drag file to replace background"
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
                                        transition-all duration-300 ease-in-out bg-black rounded-lg overflow-hidden shadow-2xl relative
                                        ${deviceMode === "desktop" ? "w-full min-h-[550px] lg:min-h-[650px]" : ""}
                                        ${deviceMode === "tablet" ? "w-[768px] max-w-full min-h-[600px] border-4 border-neutral-800" : ""}
                                        ${deviceMode === "mobile" ? "w-[375px] max-w-full min-h-[600px] border-4 border-neutral-800 rounded-2xl" : ""}
                                    `}
                                >
                                    {/* Home Preview Component */}
                                    <HomePreview
                                        title={watchedValues.hero_title || hero?.hero_title}
                                        description={watchedValues.hero_description || hero?.hero_description}
                                        cta1Text={watchedValues.hero_cta1_text || hero?.hero_cta1_text}
                                        cta2Text={watchedValues.hero_cta2_text || hero?.hero_cta2_text}
                                        cta1Url={watchedValues.hero_cta1_url || hero?.hero_cta1_url}
                                        cta2Url={watchedValues.hero_cta2_url || hero?.hero_cta2_url}
                                        media={mediaPreviewUrl || hero?.hero_media_url}
                                        mediaType={watchedValues.hero_media_type || hero?.hero_media_type}
                                        deviceMode={deviceMode}
                                        className={deviceMode !== "desktop" ? "min-h-[550px]" : "min-h-[550px] lg:min-h-[650px]"}
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

export default Home;