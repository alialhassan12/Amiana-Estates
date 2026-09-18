import { useEffect, useState } from "react";
import { useGetResidence, useUpdateResidence } from "../../hooks/useResidence";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { residenceSchema, type ResidenceFormData } from "../../schemas/residenceSchema";
import { toast } from "../../components/ui/toast";
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
    Sparkles,
    Shapes,
    ArrowUpRight,
    Info
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import ResidencePreview from "../../components/admin/ResidencePreview";

const Residence = () => {
    const { data: residenceData, isLoading: residenceLoading } = useGetResidence();
    const residence = residenceData?.residence;
    const featuredProperty = residenceData?.featuredProperty;
    const propertyTypes = residenceData?.propertyTypes;

    const { mutateAsync: updateResidenceMutation, isPending: updateResidencePending } = useUpdateResidence();

    // View Modes for responsive 
    const [viewMode, setViewMode] = useState<"split" | "form" | "preview">("split");
    // Mobile tab
    const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
    // Simulated device viewport in the live preview
    const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isDirty }
    } = useForm<ResidenceFormData>({
        resolver: zodResolver(residenceSchema),
        defaultValues: {
            id: "",
            title: "",
            subTitle: "",
        },
        mode: "onChange"
    });

    // Populate form when residence data loads
    useEffect(() => {
        if (residence) {
            reset({
                id: String(residence.id),
                title: residence.title || "",
                subTitle: residence.subTitle || "",
            });
        }
    }, [residence, reset]);

    // Live watched form values for the real-time preview
    const watchedValues = watch();

    // Handle form submission
    const onSubmit = async (data: ResidenceFormData) => {
        try {
            await updateResidenceMutation({
                id: data.id,
                title: data.title,
                subTitle: data.subTitle,
            });

            toast.add({
                description: "Residence section updated successfully!",
                type: "success"
            });
        } catch (error: any) {
            console.error("Error updating residence:", error);
            toast.add({
                description: error?.response?.data?.message || "Failed to update residence.",
                type: "error"
            });
        }
    };

    // Reset form to original loaded state
    const handleReset = () => {
        if (!residence) return;
        reset({
            id: String(residence.id),
            title: residence.title || "",
            subTitle: residence.subTitle || "",
        });

        toast.add({
            description: "Form reset to saved values",
            type: "info"
        });
    };

    if (residenceLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="body-text text-sm text-neutral-500 uppercase tracking-wider">
                    Loading Residence Settings...
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
                        The Residences Section
                    </h1>
                    <p className="body-text text-xs sm:text-sm text-neutral-500 mt-1">
                        Customize The Residences section typography. Changes reflect live on the portfolio landing page.
                    </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        disabled={updateResidencePending || !isDirty}
                        className="text-neutral-700 border-[#ECE9E5] hover:bg-[#E9E8E5] gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset
                    </Button>

                    <Button
                        type="button"
                        size="sm"
                        onClick={handleSubmit(onSubmit)}
                        disabled={updateResidencePending}
                        className="bg-primary hover:bg-primary/90 text-white gap-2 text-xs uppercase tracking-wider font-semibold shadow-xs cursor-pointer"
                    >
                        {updateResidencePending ? (
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
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-white border border-[#ECE9E5] rounded-xl p-5 sm:p-7 shadow-xs space-y-6"
                        >
                            {/* Section 1: Typography */}
                            <div>
                                <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold mb-4 flex items-center gap-2">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Section Typography
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
                                            placeholder="E.g. The Residences"
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
                                            rows={3}
                                            {...register("subTitle")}
                                            placeholder="E.g. Exclusive Living Spaces Designed With Architectural Precision"
                                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-serif uppercase resize-y leading-relaxed"
                                        />
                                        {errors.subTitle && (
                                            <p className="body-text text-xs text-red-500 mt-1">
                                                {errors.subTitle.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Property Types */}
                            <div className="border-t border-[#ECE9E5] pt-5">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                                        <Shapes className="h-3.5 w-3.5" />
                                        Property Types Content
                                    </h3>
                                    <span className="inline-flex items-center gap-1 text-[10px] text-neutral-500 uppercase tracking-wider bg-neutral-100 px-2 py-0.5 rounded font-mono">
                                        Managed Separately
                                    </span>
                                </div>

                                <div className="bg-[#FAF9F6] border border-[#ECE9E5] rounded-lg p-4 space-y-3">
                                    <div className="flex items-start gap-2.5">
                                        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                        <p className="body-text text-[11px] text-neutral-600 leading-relaxed">
                                            The featured residence villa and property types displayed in this section (photos, specs, room features, and dimensions) are managed dynamically in the <strong>Property Types</strong> page.
                                        </p>
                                    </div>

                                    {/* Quick Summary Cards */}
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        <div className="bg-white border border-[#ECE9E5] rounded p-2.5">
                                            <p className="body-text text-[10px] text-neutral-400 uppercase tracking-wider">
                                                Featured Villa
                                            </p>
                                            <p className="title text-xs text-neutral-900 truncate font-medium mt-0.5">
                                                {featuredProperty?.title || "Signature Oceanfront Villa"}
                                            </p>
                                        </div>
                                        <div className="bg-white border border-[#ECE9E5] rounded p-2.5">
                                            <p className="body-text text-[10px] text-neutral-400 uppercase tracking-wider">
                                                Property Types
                                            </p>
                                            <p className="title text-xs text-neutral-900 font-medium mt-0.5">
                                                {propertyTypes?.length ? `${propertyTypes.length} Active Types` : "Active"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Link to Property Types Admin Page */}
                                    <div className="pt-2">
                                        <Link
                                            to="/dashboard/property-types"
                                            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded text-xs uppercase tracking-wider font-medium transition-colors"
                                        >
                                            Manage Property Types
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </Link>
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
                                        ${deviceMode === "desktop" ? "w-full min-h-[550px]" : ""}
                                        ${deviceMode === "tablet" ? "w-[768px] max-w-full min-h-[600px] border-4 border-neutral-800" : ""}
                                        ${deviceMode === "mobile" ? "w-[375px] max-w-full min-h-[600px] border-4 border-neutral-800 rounded-2xl" : ""}
                                    `}
                                >
                                    {/* Residence Preview Component */}
                                    <ResidencePreview
                                        title={watchedValues.title || residence?.title}
                                        subTitle={watchedValues.subTitle || residence?.subTitle}
                                        featuredProperty={featuredProperty}
                                        propertyTypes={propertyTypes}
                                        deviceMode={deviceMode}
                                        className="min-h-[500px]"
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

export default Residence;