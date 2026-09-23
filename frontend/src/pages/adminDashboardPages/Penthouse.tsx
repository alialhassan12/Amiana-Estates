import { useEffect, useRef, useState } from "react";
import { useAddPenthouseMedia, useDeletePenthouseMedia, useEditPenthouse, useGetPenthouse } from "../../hooks/usePenthouse";
import { Button } from "../../components/ui/button";
import {
    ArrowUpRight,
    Check,
    Edit3,
    Eye,
    Image as ImageIcon,
    Info,
    Layers,
    Loader2,
    Monitor,
    Plus,
    RotateCcw,
    Shapes,
    Smartphone,
    Sparkles,
    Tablet,
    Trash2,
    UploadCloud,
    X
} from "lucide-react";
import { useForm } from "react-hook-form";
import { editPenthouseSchema, type EditPenthouseFormData } from "../../schemas/editPenthouseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../../components/ui/toast";
import type { PenthouseMedia } from "../../@types/penthouse";
import DeleteAlertDialog from "../../components/admin/DeleteAlertDialog";
import { Link } from "react-router-dom";
import PenthousePreview from "../../components/admin/PenthousePreview";

const Penthouse = () => {
    const { data: penthouseData, isPending: penthouseLoading } = useGetPenthouse();
    
    const penthouse = penthouseData?.penthouse;
    const features = penthouseData?.features;
    const media = penthouse?.penthouse_media;

    // View Modes for responsive
    const [viewMode, setViewMode] = useState<"split" | "form" | "preview">("split");
    // Mobile tab
    const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
    // Simulated device viewport in the live preview
    const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

    // Media upload states
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Media delete dialog states
    const [selectedMedia, setSelectedMedia] = useState<PenthouseMedia | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const { mutateAsync: deleteMedia, isPending: isDeletingMedia } = useDeletePenthouseMedia();
    const { mutateAsync: editPenthouse, isPending: isEditingPenthouse } = useEditPenthouse();
    const { mutateAsync: uploadMedia, isPending: isUploadingMedia } = useAddPenthouseMedia();

    const {
        register,
        reset,
        handleSubmit,
        watch,
        formState: { errors, isDirty }
    } = useForm<EditPenthouseFormData>({
        resolver: zodResolver(editPenthouseSchema),
        defaultValues: {
            title: "",
            subTitle: "",
            description: "",
        },
        mode: "onChange",
    });

    // Sync form values with API data
    useEffect(() => {
        if (penthouse) {
            reset({
                title: penthouse.title || "",
                subTitle: penthouse.subTitle || "",
                description: penthouse.description || "",
            });
        }
    }, [penthouse, reset]);

    // Live watched form values for the real-time preview
    const watchedValues = watch();

    // Reset form to original loaded state
    const handleReset = () => {
        if (!penthouse) return;
        reset({
            title: penthouse.title || "",
            subTitle: penthouse.subTitle || "",
            description: penthouse.description || "",
        });

        toast.add({
            description: "Form reset to saved values",
            type: "info"
        });
    };

    const handleDeleteDialogChange = (state: boolean) => {
        if (!state) {
            setSelectedMedia(null);
            setDeleteDialogOpen(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation: max 2MB per backend validation rules
        if (file.size > 2 * 1024 * 1024) {
            toast.add({
                description: "Image size exceeds 2MB limit. Please choose a smaller file.",
                type: "error"
            });
            return;
        }

        setUploadedFile(file);
        const objectUrl = URL.createObjectURL(file);
        setFilePreview(objectUrl);
    };

    const handleClearUpload = () => {
        setUploadedFile(null);
        if (filePreview) {
            URL.revokeObjectURL(filePreview);
            setFilePreview(null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const onEditPenthouse = async (data: EditPenthouseFormData) => {
        try {
            await editPenthouse(data);
            toast.add({ description: "Penthouse updated successfully", type: "success" });
        } catch (error: any) {
            toast.add({ description: error?.response?.data?.message || "Failed to edit penthouse", type: "error" });
        }
    };

    const onUploadMedia = async () => {
        if (!uploadedFile) {
            toast.add({ description: "Please select an image file first", type: "info" });
            return;
        }
        if (!penthouse?.id) {
            toast.add({ description: "Penthouse data not loaded yet", type: "error" });
            return;
        }

        try {
            const formData = new FormData();
            formData.append("penthouse_id", String(penthouse.id));
            formData.append("file", uploadedFile);

            await uploadMedia(formData);
            toast.add({ description: "Media uploaded successfully", type: "success" });
            handleClearUpload();
        } catch (error: any) {
            toast.add({ description: error?.response?.data?.message || "Failed to upload media", type: "error" });
        }
    };

    const onDeleteMedia = async (mediaId: number) => {
        try {
            await deleteMedia(mediaId);
            toast.add({ description: "Media deleted successfully", type: "success" });
            setSelectedMedia(null);
            setDeleteDialogOpen(false);
        } catch (error: any) {
            toast.add({ description: error?.response?.data?.message || "Failed to delete media", type: "error" });
        }
    };

    if (penthouseLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="body-text text-sm text-neutral-500 uppercase tracking-wider">
                    Loading Penthouse Settings...
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
                        Penthouse Section
                    </h1>
                    <p className="body-text text-xs sm:text-sm text-neutral-500 mt-1">
                        Customize the penthouse section content, typography, and media gallery. Changes reflect live in the preview pane.
                    </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        disabled={isEditingPenthouse || !isDirty}
                        className="text-neutral-700 border-[#ECE9E5] hover:bg-[#E9E8E5] gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset
                    </Button>

                    <Button
                        type="button"
                        size="sm"
                        onClick={handleSubmit(onEditPenthouse)}
                        disabled={isEditingPenthouse}
                        className="bg-primary hover:bg-primary/90 text-white gap-2 text-xs uppercase tracking-wider font-semibold shadow-xs cursor-pointer"
                    >
                        {isEditingPenthouse ? (
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
                        <div className="space-y-6">
                            {/* Section 1: Typography Form */}
                            <form
                                onSubmit={handleSubmit(onEditPenthouse)}
                                className="bg-white border border-[#ECE9E5] rounded-xl p-5 sm:p-7 shadow-xs space-y-6"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                                            <Sparkles className="h-3.5 w-3.5" />
                                            Section Typography
                                        </h3>
                                        <span className="text-[10px] text-neutral-400 font-mono">
                                            Auto-syncs with preview
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Section Title (Pre-heading) */}
                                        <div>
                                            <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                                Pre-Heading Category
                                            </label>
                                            <input
                                                type="text"
                                                {...register("title")}
                                                placeholder="E.g. Penthouse Suites"
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
                                            <textarea
                                                rows={2}
                                                {...register("subTitle")}
                                                placeholder="E.g. Sky Villa Residence"
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
                                                Description
                                            </label>
                                            <textarea
                                                rows={4}
                                                {...register("description")}
                                                placeholder="Describe the architectural luxury, private spaces, and amenities of the penthouse..."
                                                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors leading-relaxed resize-y"
                                            />
                                            {errors.description && (
                                                <p className="body-text text-xs text-red-500 mt-1">
                                                    {errors.description.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/* Section 2: Property Features (Non-editable here, with navigation button) */}
                            <div className="bg-white border border-[#ECE9E5] rounded-xl p-5 sm:p-7 shadow-xs space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                                        <Shapes className="h-3.5 w-3.5" />
                                        Penthouse Features
                                    </h3>
                                    <span className="inline-flex items-center gap-1 text-[10px] text-neutral-500 uppercase tracking-wider bg-neutral-100 px-2 py-0.5 rounded font-mono">
                                        Read Only
                                    </span>
                                </div>

                                <div className="bg-[#FAF9F6] border border-[#ECE9E5] rounded-lg p-4 space-y-3">
                                    <div className="flex items-start gap-2.5">
                                        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                        <p className="body-text text-[11px] text-neutral-600 leading-relaxed">
                                            The penthouse features (such as floor area, terrace size, private lift, and architectural specs) are linked centrally. To add, edit, or remove features, navigate to the <strong>Property Features</strong> section.
                                        </p>
                                    </div>

                                    {/* Features Display List */}
                                    {features && features.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-2 pt-1">
                                            {features.map((feature: any) => (
                                                <div
                                                    key={feature.id}
                                                    className="bg-white border border-[#ECE9E5] rounded p-2.5 flex flex-col justify-center"
                                                >
                                                    <p className="body-text text-[10px] text-primary uppercase tracking-wider font-semibold">
                                                        {feature.title}
                                                    </p>
                                                    <p className="title text-xs text-neutral-900 font-medium truncate mt-0.5">
                                                        {feature.value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="body-text text-xs text-neutral-400 italic py-1">
                                            No penthouse features currently linked.
                                        </p>
                                    )}

                                    {/* Navigation Button to Property Features */}
                                    <div className="pt-2">
                                        <Link
                                            to="/dashboard/property-features"
                                            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
                                        >
                                            Manage Property Features
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Media Carousel & Management */}
                            <div className="bg-white border border-[#ECE9E5] rounded-xl p-5 sm:p-7 shadow-xs space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                                        <ImageIcon className="h-3.5 w-3.5" />
                                        Media Gallery
                                    </h3>
                                    <span className="text-[10px] font-mono uppercase bg-neutral-100 px-2 py-0.5 rounded text-neutral-600">
                                        {media?.length || 0} Plates
                                    </span>
                                </div>

                                {/* Active Media Carousel / Filmstrip */}
                                <div>
                                    <div className="flex items-center justify-between mb-2.5">
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700">
                                            Active Filmstrip Media
                                        </label>
                                        <span className="text-[10px] text-neutral-400">
                                            Hover card to delete
                                        </span>
                                    </div>

                                    {media && media.length > 0 ? (
                                        <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin">
                                            {media.map((item: PenthouseMedia, index: number) => (
                                                <div
                                                    key={item.id}
                                                    className="relative group shrink-0 w-36 h-28 rounded-lg overflow-hidden border border-[#ECE9E5] bg-neutral-900 shadow-2xs transition-all hover:border-primary/40 hover:shadow-md"
                                                >
                                                    <img
                                                        src={item.media_url || item.media_path}
                                                        alt={item.title || `Media ${index + 1}`}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    {/* Plate number and title overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-between p-2 pointer-events-none">
                                                        <span className="self-start text-[9px] font-mono text-white/90 bg-black/60 px-1.5 py-0.5 rounded">
                                                            #{index + 1}
                                                        </span>
                                                        <div className="truncate">
                                                            <p className="text-[10px] text-white font-medium truncate">
                                                                {item.title || "Untitled Plate"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Delete Action Button */}
                                                    <button
                                                        type="button"
                                                        title="Delete this media"
                                                        aria-label="Delete this media"
                                                        onClick={() => {
                                                            setSelectedMedia(item);
                                                            setDeleteDialogOpen(true);
                                                        }}
                                                        className="absolute top-2 right-2 h-7 w-7 rounded-md bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-700 transition-all cursor-pointer shadow-sm z-10"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 px-4 border-2 border-dashed border-[#ECE9E5] rounded-lg bg-[#FAF9F6]">
                                            <ImageIcon className="h-8 w-8 text-neutral-300 mx-auto mb-2" />
                                            <p className="body-text text-xs text-neutral-500">
                                                No media plates uploaded for the penthouse yet.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Add New Media Sub-section */}
                                <div className="border-t border-[#ECE9E5] pt-5 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-800 flex items-center gap-1.5">
                                            <Plus className="h-3.5 w-3.5 text-primary" />
                                            Add New Gallery Media
                                        </label>
                                        <span className="text-[10px] text-neutral-400">
                                            Image (max 2MB)
                                        </span>
                                    </div>

                                    {/* Upload Drop Zone / File Picker */}
                                    <div className="space-y-3">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="penthouse-media-file-input"
                                        />

                                        {!filePreview ? (
                                            <label
                                                htmlFor="penthouse-media-file-input"
                                                className="flex flex-col items-center justify-center border-2 border-dashed border-[#ECE9E5] hover:border-primary/50 bg-[#FAF9F6] hover:bg-[#FAF9F6]/80 rounded-lg p-6 text-center cursor-pointer transition-all group"
                                            >
                                                <UploadCloud className="h-8 w-8 text-neutral-400 group-hover:text-primary transition-colors mb-2" />
                                                <p className="body-text text-xs font-semibold text-neutral-800">
                                                    Click to browse or drop an image
                                                </p>
                                                <p className="body-text text-[10px] text-neutral-400 mt-1">
                                                    JPG, PNG, WebP up to 2MB
                                                </p>
                                            </label>
                                        ) : (
                                            <div className="relative border border-[#ECE9E5] rounded-lg overflow-hidden bg-neutral-900 flex items-center justify-center h-44">
                                                <img
                                                    src={filePreview}
                                                    alt="Upload preview"
                                                    className="w-full h-full object-contain"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleClearUpload}
                                                    title="Remove selected file"
                                                    className="absolute top-2 right-2 h-7 w-7 rounded-md bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                                <span className="absolute bottom-2 left-2 text-[10px] text-white/90 bg-black/60 px-2 py-0.5 rounded font-mono truncate max-w-[80%]">
                                                    {uploadedFile?.name} ({(uploadedFile!.size / (1024 * 1024)).toFixed(2)} MB)
                                                </span>
                                            </div>
                                        )}

                                        {/* Submit Upload Button */}
                                        <div className="pt-2">
                                            <Button
                                                type="button"
                                                onClick={onUploadMedia}
                                                disabled={!uploadedFile || isUploadingMedia}
                                                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white gap-2 text-xs uppercase tracking-wider font-semibold py-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isUploadingMedia ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        Uploading Media...
                                                    </>
                                                ) : (
                                                    <>
                                                        <UploadCloud className="h-4 w-4" />
                                                        Upload Media Plate
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LIVE PREVIEW COLUMN */}
                    <div
                        className={`
                            ${viewMode === "form" ? "hidden" : "block"}
                            ${viewMode === "split" ? "lg:col-span-7 xl:col-span-7" : "w-full"}
                            ${mobileTab === "form" ? "hidden lg:block" : "block"}
                        `}
                    >
                        <div className="bg-white border border-[#ECE9E5] rounded-xl overflow-hidden shadow-xs sticky top-20">
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
                            <div className="p-2 sm:p-4 bg-neutral-900/10 min-h-[550px] flex justify-center items-start overflow-x-auto">
                                <div
                                    className={`
                                        transition-all duration-300 ease-in-out bg-black rounded-lg overflow-hidden shadow-2xl relative
                                        ${deviceMode === "desktop" ? "w-full min-h-[550px]" : ""}
                                        ${deviceMode === "tablet" ? "w-[768px] max-w-full min-h-[600px] border-4 border-neutral-800" : ""}
                                        ${deviceMode === "mobile" ? "w-[375px] max-w-full min-h-[600px] border-4 border-neutral-800 rounded-2xl" : ""}
                                    `}
                                >
                                    {/* Penthouse Preview Component */}
                                    <PenthousePreview
                                        title={watchedValues.title || penthouse?.title}
                                        subTitle={watchedValues.subTitle || penthouse?.subTitle}
                                        description={watchedValues.description || penthouse?.description}
                                        penthouse={penthouse}
                                        features={features}
                                        media={media}
                                        deviceMode={deviceMode}
                                        className="min-h-[550px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Alert Dialog */}
            <DeleteAlertDialog
                open={deleteDialogOpen && selectedMedia !== null}
                onOpenChange={handleDeleteDialogChange}
                isLoading={isDeletingMedia}
                onConfirm={() => {
                    if (selectedMedia?.id) {
                        onDeleteMedia(selectedMedia.id);
                    }
                }}
                onCancel={() => {
                    setSelectedMedia(null);
                    setDeleteDialogOpen(false);
                    handleDeleteDialogChange(false);
                }}
                title="Delete Media Plate"
                description={`Are you sure you want to delete this media plate? This action cannot be undone.`}
            />
        </div>
    );
};

export default Penthouse;