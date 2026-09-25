import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import {
    ArrowUpRight,
    Check,
    Compass,
    Edit3,
    Eye,
    FileText,
    Image as ImageIcon,
    Info,
    Layers,
    Loader2,
    Monitor,
    RotateCcw,
    Smartphone,
    Sparkles,
    Tablet,
    UploadCloud,
    X
} from "lucide-react";
import { useForm } from "react-hook-form";
import { editEstateExperienceSchema, type EditEstateExperienceFormData } from "../../schemas/editEstateExperienceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetEstateExperience, useUpdateEstateExperience } from "../../hooks/useEstateExperience";
import { toast } from "../../components/ui/toast";
import { Link } from "react-router-dom";
import EstateExperiencePreview from "../../components/admin/EstateExperiencePreview";

const Experience = () => {
    const { data: estateExperienceData, isLoading } = useGetEstateExperience();
    const estateExperience = estateExperienceData?.estateExperience;
    const specifications = estateExperience?.specifications || [];

    const { mutateAsync: updateEstateExperience, isPending: isUpdating } = useUpdateEstateExperience();

    // View Modes for responsive admin UX: "split" | "form" | "preview"
    const [viewMode, setViewMode] = useState<"split" | "form" | "preview">("split");
    // Mobile tab: "form" | "preview"
    const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
    // Simulated device viewport in the live preview: "desktop" | "tablet" | "mobile"
    const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

    // File input refs
    const card1InputRef = useRef<HTMLInputElement | null>(null);
    const card2InputRef = useRef<HTMLInputElement | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        watch,
        setValue
    } = useForm<EditEstateExperienceFormData>({
        resolver: zodResolver(editEstateExperienceSchema),
        defaultValues: {
            title: "",
            subTitle: "",
            card_1_image: null,
            card_1_image_url: null,
            card_1_image_heading: "",
            card_1_title: "",
            card_1_quote: "",
            card_1_description: "",
            specifications_title: "",
            specifications_subTitle: "",
            specifications_description: "",
            card_2_title: "",
            card_2_description: "",
            card_2_image: null,
            card_2_image_url: null,
            closing_title: "",
            closing_statement: ""
        },
        mode: "onChange"
    });

    // Sync form with data from api
    useEffect(() => {
        if (estateExperience) {
            reset({
                title: estateExperience.title || "",
                subTitle: estateExperience.subTitle || "",
                card_1_image: null,
                card_1_image_url: estateExperience.card_1_image_url || null,
                card_1_image_heading: estateExperience.card_1_image_heading || "",
                card_1_title: estateExperience.card_1_title || "",
                card_1_quote: estateExperience.card_1_quote || "",
                card_1_description: estateExperience.card_1_description || "",
                specifications_title: estateExperience.specifications_title || "",
                specifications_subTitle: estateExperience.specifications_subTitle || "",
                specifications_description: estateExperience.specifications_description || "",
                card_2_title: estateExperience.card_2_title || "",
                card_2_description: estateExperience.card_2_description || "",
                card_2_image: null,
                card_2_image_url: estateExperience.card_2_image_url || null,
                closing_title: estateExperience.closing_title || "",
                closing_statement: estateExperience.closing_statement || ""
            });
        }
    }, [estateExperience, reset]);

    // Live watched values for preview
    const watchedValues = watch();

    const handleFileUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: "card_1_image" | "card_2_image"
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.add({
                description: "Image size exceeds 2MB limit. Please choose a smaller file.",
                type: "error"
            });
            return;
        }

        const urlField = (field + "_url") as "card_1_image_url" | "card_2_image_url";
        setValue(field, file, { shouldDirty: true, shouldValidate: true });
        setValue(urlField, URL.createObjectURL(file), { shouldDirty: true, shouldValidate: true });
    };

    const handleClearImage = (field: "card_1_image" | "card_2_image") => {
        const urlField = (field + "_url") as "card_1_image_url" | "card_2_image_url";
        setValue(field, null, { shouldDirty: true, shouldValidate: true });
        setValue(urlField, null, { shouldDirty: true, shouldValidate: true });

        if (field === "card_1_image" && card1InputRef.current) {
            card1InputRef.current.value = "";
        }
        if (field === "card_2_image" && card2InputRef.current) {
            card2InputRef.current.value = "";
        }
    };

    const onSubmit = async (data: EditEstateExperienceFormData) => {
        try {
            const formData = new FormData();
            formData.append("id", String(estateExperience?.id || 1));
            formData.append("title", data.title);
            formData.append("subTitle", data.subTitle);

            if (data.card_1_image instanceof File) {
                formData.append("card_1_image", data.card_1_image);
            }
            formData.append("card_1_image_heading", data.card_1_image_heading);
            formData.append("card_1_title", data.card_1_title);
            formData.append("card_1_quote", data.card_1_quote);
            formData.append("card_1_description", data.card_1_description);

            formData.append("specifications_title", data.specifications_title);
            formData.append("specifications_subTitle", data.specifications_subTitle);
            formData.append("specifications_description", data.specifications_description);

            formData.append("card_2_title", data.card_2_title);
            formData.append("card_2_description", data.card_2_description);
            if (data.card_2_image instanceof File) {
                formData.append("card_2_image", data.card_2_image);
            }

            formData.append("closing_title", data.closing_title);
            formData.append("closing_statement", data.closing_statement);

            await updateEstateExperience(formData);
            toast.add({
                description: "Estate experience updated successfully.",
                type: "success"
            });
        } catch (error: any) {
            console.error("Error updating estate experience:", error);
            toast.add({
                description: error?.response?.data?.message || "Failed to update estate experience section.",
                type: "error"
            });
        }
    };

    // Reset form to original loaded state
    const handleReset = () => {
        if (!estateExperience) return;
        reset({
            title: estateExperience.title || "",
            subTitle: estateExperience.subTitle || "",
            card_1_image: null,
            card_1_image_url: estateExperience.card_1_image_url || null,
            card_1_image_heading: estateExperience.card_1_image_heading || "",
            card_1_title: estateExperience.card_1_title || "",
            card_1_quote: estateExperience.card_1_quote || "",
            card_1_description: estateExperience.card_1_description || "",
            specifications_title: estateExperience.specifications_title || "",
            specifications_subTitle: estateExperience.specifications_subTitle || "",
            specifications_description: estateExperience.specifications_description || "",
            card_2_title: estateExperience.card_2_title || "",
            card_2_description: estateExperience.card_2_description || "",
            card_2_image: null,
            card_2_image_url: estateExperience.card_2_image_url || null,
            closing_title: estateExperience.closing_title || "",
            closing_statement: estateExperience.closing_statement || ""
        });

        if (card1InputRef.current) card1InputRef.current.value = "";
        if (card2InputRef.current) card2InputRef.current.value = "";

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
                    Loading Experience...
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
                        The Experience Section
                    </h1>
                    <p className="body-text text-xs sm:text-sm text-neutral-500 mt-1">
                        Customize residential amenities, specifications, wellness retreat, and closing profile. Changes reflect live in the preview pane.
                    </p>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        disabled={isUpdating || !isDirty}
                        className="text-neutral-700 border-[#ECE9E5] hover:bg-[#E9E8E5] gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset
                    </Button>

                    <Button
                        type="button"
                        size="sm"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isUpdating}
                        className="bg-primary hover:bg-primary/90 text-white gap-2 text-xs uppercase tracking-wider font-semibold shadow-xs cursor-pointer"
                    >
                        {isUpdating ? (
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
                            ${viewMode === "split" ? "lg:col-span-6 xl:col-span-6" : "w-full max-w-4xl mx-auto"}
                            ${mobileTab === "preview" ? "hidden lg:block" : "block"}
                        `}
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* PART 1: Section Header & Card 1 (Architectural Premise) */}
                            <div className="bg-white border border-[#ECE9E5] rounded-xl p-5 sm:p-7 shadow-xs space-y-6">
                                <div className="flex items-center justify-between pb-3 border-b border-[#ECE9E5]">
                                    <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                                        <Sparkles className="h-3.5 w-3.5" />
                                        Part 1: Header & Card 1 Data
                                    </h3>
                                    <span className="text-[10px] text-neutral-400 font-mono">
                                        Architectural Monolith
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {/* Section Pre-heading Title */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Section Category Pre-Heading
                                        </label>
                                        <input
                                            type="text"
                                            {...register("title")}
                                            placeholder="E.g. RESIDENTIAL AMENITIES & LIFESTYLE"
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors uppercase tracking-wider"
                                        />
                                        {errors.title && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.title.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Section SubTitle */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Main Section Heading
                                        </label>
                                        <input
                                            type="text"
                                            {...register("subTitle")}
                                            placeholder="E.g. THE ESTATE EXPERIENCE"
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors uppercase font-serif"
                                        />
                                        {errors.subTitle && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.subTitle.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Card 1 Image */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5 flex items-center justify-between">
                                            <span>Card 1 Image</span>
                                            <span className="text-[10px] text-neutral-400 font-normal">Max 2MB (JPG, PNG, WebP)</span>
                                        </label>
                                        <input
                                            ref={card1InputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e, "card_1_image")}
                                            className="hidden"
                                            id="card-1-image-file"
                                        />

                                        {watchedValues.card_1_image_url ? (
                                            <div className="relative border border-[#ECE9E5] rounded-lg overflow-hidden bg-neutral-900 h-48 flex items-center justify-center group">
                                                <img
                                                    src={watchedValues.card_1_image_url}
                                                    alt="Card 1 Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleClearImage("card_1_image")}
                                                    title="Remove image"
                                                    className="absolute top-2 right-2 h-7 w-7 rounded-md bg-black/75 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                                <label
                                                    htmlFor="card-1-image-file"
                                                    className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/80 hover:bg-black text-white text-[10px] uppercase tracking-wider rounded font-medium cursor-pointer transition-colors"
                                                >
                                                    Change Image
                                                </label>
                                            </div>
                                        ) : (
                                            <label
                                                htmlFor="card-1-image-file"
                                                className="flex flex-col items-center justify-center border-2 border-dashed border-[#ECE9E5] hover:border-primary/50 bg-[#FAF9F6] hover:bg-[#FAF9F6]/80 rounded-lg p-6 text-center cursor-pointer transition-all group"
                                            >
                                                <UploadCloud className="h-8 w-8 text-neutral-400 group-hover:text-primary transition-colors mb-2" />
                                                <p className="body-text text-xs font-semibold text-neutral-800">
                                                    Click to upload Card 1 Image
                                                </p>
                                                <p className="body-text text-[10px] text-neutral-400 mt-1">
                                                    High-resolution architectural monolith photograph
                                                </p>
                                            </label>
                                        )}
                                    </div>

                                    {/* Card 1 Image Heading (Badge) */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Card 1 Image Badge Text
                                        </label>
                                        <input
                                            type="text"
                                            {...register("card_1_image_heading")}
                                            placeholder="E.g. FIVE-STOREY OCEANFRONT MONOLITH"
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors uppercase tracking-wider"
                                        />
                                        <p className="body-text text-[10px] text-neutral-500 mt-1 italic">
                                            Shown on the dark badge positioned over the bottom-left of the image.
                                        </p>
                                        {errors.card_1_image_heading && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.card_1_image_heading.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Card 1 Title */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Card 1 Pre-Title
                                        </label>
                                        <input
                                            type="text"
                                            {...register("card_1_title")}
                                            placeholder="E.g. Architectural Premise"
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors uppercase tracking-wider"
                                        />
                                        {errors.card_1_title && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.card_1_title.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Card 1 Quote */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Card 1 Quote
                                        </label>
                                        <textarea
                                            rows={2}
                                            {...register("card_1_quote")}
                                            placeholder="E.g. Amiana Estates is a five-floor residential tower designed around peaceful, exclusive, and elite living."
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors italic leading-relaxed resize-y font-serif"
                                        />
                                        {errors.card_1_quote && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.card_1_quote.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Card 1 Description */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Card 1 Description
                                        </label>
                                        <textarea
                                            rows={4}
                                            {...register("card_1_description")}
                                            placeholder="Describe the oceanfront position, structural integrity, and architectural luxury of the residence..."
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors leading-relaxed resize-y"
                                        />
                                        {errors.card_1_description && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.card_1_description.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* PART 2: Specifications Overview & Navigation Button */}
                            <div className="bg-white border border-[#ECE9E5] rounded-xl p-5 sm:p-7 shadow-xs space-y-6">
                                <div className="flex items-center justify-between pb-3 border-b border-[#ECE9E5]">
                                    <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                                        <Compass className="h-3.5 w-3.5" />
                                        Part 2: Specifications Overview
                                    </h3>
                                    <span className="text-[10px] text-neutral-400 font-mono">
                                        Engineering & Systems
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {/* Specifications Pre-Title */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Specifications Pre-Title
                                        </label>
                                        <input
                                            type="text"
                                            {...register("specifications_title")}
                                            placeholder="E.g. SPECIFICATIONS"
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors uppercase tracking-wider"
                                        />
                                        {errors.specifications_title && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.specifications_title.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Specifications SubTitle */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Specifications Sub-Title / Heading
                                        </label>
                                        <input
                                            type="text"
                                            {...register("specifications_subTitle")}
                                            placeholder="E.g. ENGINEERING & RESIDENTIAL SYSTEMS"
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors uppercase"
                                        />
                                        {errors.specifications_subTitle && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.specifications_subTitle.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Specifications Description */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Specifications Description
                                        </label>
                                        <textarea
                                            rows={3}
                                            {...register("specifications_description")}
                                            placeholder="Overview summary of engineering, power, security, and residential systems..."
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors leading-relaxed resize-y"
                                        />
                                        {errors.specifications_description && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.specifications_description.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Specifications Detail Callout and Navigation Button */}
                                    <div className="bg-[#FAF9F6] border border-[#ECE9E5] rounded-lg p-4 space-y-3 mt-4">
                                        <div className="flex items-start gap-2.5">
                                            <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                            <div className="space-y-1">
                                                <p className="body-text text-[11px] font-semibold text-neutral-800 uppercase tracking-wider">
                                                    Dedicated Specifications Management
                                                </p>
                                                <p className="body-text text-[11px] text-neutral-600 leading-relaxed">
                                                    Individual specification items (icons, titles, and short descriptions) are managed on a dedicated screen to give you full control over icon selection and order.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Current Specifications count preview */}
                                        <div className="flex items-center justify-between py-1 border-t border-[#ECE9E5]">
                                            <span className="body-text text-xs text-neutral-600">
                                                Active Specifications:
                                            </span>
                                            <span className="body-text text-xs font-semibold text-primary font-mono">
                                                {specifications.length} items configured
                                            </span>
                                        </div>

                                        {/* Navigation Button to /experience-specifications */}
                                        <div className="pt-2">
                                            <Link
                                                to="/experience-specifications"
                                                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer shadow-xs"
                                            >
                                                Manage Experience Specifications
                                                <ArrowUpRight className="h-3.5 w-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PART 3: Card 2 (Wellness Retreat) */}
                            <div className="bg-white border border-[#ECE9E5] rounded-xl p-5 sm:p-7 shadow-xs space-y-6">
                                <div className="flex items-center justify-between pb-3 border-b border-[#ECE9E5]">
                                    <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                                        <ImageIcon className="h-3.5 w-3.5" />
                                        Part 3: Card 2 Data
                                    </h3>
                                    <span className="text-[10px] text-neutral-400 font-mono">
                                        Wellness & Luxury
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {/* Card 2 Title */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Card 2 Title
                                        </label>
                                        <input
                                            type="text"
                                            {...register("card_2_title")}
                                            placeholder="E.g. Sierra Leone’s Foremost Wellness Retreat"
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors tracking-wide"
                                        />
                                        {errors.card_2_title && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.card_2_title.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Card 2 Description */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Card 2 Description
                                        </label>
                                        <textarea
                                            rows={4}
                                            {...register("card_2_description")}
                                            placeholder="Describe the wellness amenities, spa facilities, and sanctuary experience..."
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors leading-relaxed resize-y"
                                        />
                                        {errors.card_2_description && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.card_2_description.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Card 2 Image */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5 flex items-center justify-between">
                                            <span>Card 2 Image</span>
                                            <span className="text-[10px] text-neutral-400 font-normal">Max 2MB (JPG, PNG, WebP)</span>
                                        </label>
                                        <input
                                            ref={card2InputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e, "card_2_image")}
                                            className="hidden"
                                            id="card-2-image-file"
                                        />

                                        {watchedValues.card_2_image_url ? (
                                            <div className="relative border border-[#ECE9E5] rounded-lg overflow-hidden bg-neutral-900 h-48 flex items-center justify-center group">
                                                <img
                                                    src={watchedValues.card_2_image_url}
                                                    alt="Card 2 Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleClearImage("card_2_image")}
                                                    title="Remove image"
                                                    className="absolute top-2 right-2 h-7 w-7 rounded-md bg-black/75 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                                <label
                                                    htmlFor="card-2-image-file"
                                                    className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/80 hover:bg-black text-white text-[10px] uppercase tracking-wider rounded font-medium cursor-pointer transition-colors"
                                                >
                                                    Change Image
                                                </label>
                                            </div>
                                        ) : (
                                            <label
                                                htmlFor="card-2-image-file"
                                                className="flex flex-col items-center justify-center border-2 border-dashed border-[#ECE9E5] hover:border-primary/50 bg-[#FAF9F6] hover:bg-[#FAF9F6]/80 rounded-lg p-6 text-center cursor-pointer transition-all group"
                                            >
                                                <UploadCloud className="h-8 w-8 text-neutral-400 group-hover:text-primary transition-colors mb-2" />
                                                <p className="body-text text-xs font-semibold text-neutral-800">
                                                    Click to upload Card 2 Image
                                                </p>
                                                <p className="body-text text-[10px] text-neutral-400 mt-1">
                                                    High-resolution spa and wellness retreat photograph
                                                </p>
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* PART 4: Closing Section */}
                            <div className="bg-white border border-[#ECE9E5] rounded-xl p-5 sm:p-7 shadow-xs space-y-6">
                                <div className="flex items-center justify-between pb-3 border-b border-[#ECE9E5]">
                                    <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                                        <FileText className="h-3.5 w-3.5" />
                                        Part 4: Closing Statement
                                    </h3>
                                    <span className="text-[10px] text-neutral-400 font-mono">
                                        Tenancy & Profile
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {/* Closing Title */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Closing Pre-Heading Title
                                        </label>
                                        <input
                                            type="text"
                                            {...register("closing_title")}
                                            placeholder="E.g. RESIDENTIAL PROFILE & TENANCY"
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors uppercase tracking-wider"
                                        />
                                        {errors.closing_title && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.closing_title.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Closing Statement */}
                                    <div>
                                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                            Closing Statement
                                        </label>
                                        <textarea
                                            rows={3}
                                            {...register("closing_statement")}
                                            placeholder="E.g. Designed for professionals, families, diaspora residents, executives, investors..."
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors leading-relaxed resize-y"
                                        />
                                        {errors.closing_statement && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.closing_statement.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Form Actions */}
                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleReset}
                                    disabled={isUpdating || !isDirty}
                                    className="text-neutral-700 border-[#ECE9E5] hover:bg-[#E9E8E5] gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                    Reset
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="bg-primary hover:bg-primary/90 text-white gap-2 text-xs uppercase tracking-wider font-semibold shadow-xs cursor-pointer px-6"
                                >
                                    {isUpdating ? (
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
                        </form>
                    </div>

                    {/* LIVE PREVIEW COLUMN */}
                    <div
                        className={`
                            ${viewMode === "form" ? "hidden" : "block"}
                            ${viewMode === "split" ? "lg:col-span-6 xl:col-span-6" : "w-full"}
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
                            <div className="p-2 sm:p-4 bg-neutral-900/5 min-h-[550px] flex justify-center items-start overflow-x-auto">
                                <div
                                    className={`
                                        transition-all duration-300 ease-in-out bg-white rounded-lg overflow-hidden shadow-sm relative
                                        ${deviceMode === "desktop" ? "w-full min-h-[550px]" : ""}
                                        ${deviceMode === "tablet" ? "w-[768px] max-w-full min-h-[600px] border-4 border-neutral-800" : ""}
                                        ${deviceMode === "mobile" ? "w-[375px] max-w-full min-h-[600px] border-4 border-neutral-800 rounded-2xl" : ""}
                                    `}
                                >
                                    <EstateExperiencePreview
                                        title={watchedValues.title}
                                        subTitle={watchedValues.subTitle}
                                        card_1_image_url={watchedValues.card_1_image_url}
                                        card_1_image_heading={watchedValues.card_1_image_heading}
                                        card_1_title={watchedValues.card_1_title}
                                        card_1_quote={watchedValues.card_1_quote}
                                        card_1_description={watchedValues.card_1_description}
                                        specifications_title={watchedValues.specifications_title}
                                        specifications_subTitle={watchedValues.specifications_subTitle}
                                        specifications_description={watchedValues.specifications_description}
                                        specifications={specifications}
                                        card_2_title={watchedValues.card_2_title}
                                        card_2_description={watchedValues.card_2_description}
                                        card_2_image_url={watchedValues.card_2_image_url}
                                        closing_title={watchedValues.closing_title}
                                        closing_statement={watchedValues.closing_statement}
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

export default Experience;