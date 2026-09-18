import { ArrowRight, ArrowUpRight } from "lucide-react";

export type ResidencePreviewProps = {
    title?: string;
    subTitle?: string;
    featuredProperty?: any;
    propertyTypes?: any[];
    className?: string;
    deviceMode?: "desktop" | "tablet" | "mobile";
};

// Fallback featured property if none is in the database yet
const defaultFeatured = {
    display_order: 1,
    title: "Signature Oceanfront Villa",
    area: "8,500",
    area_unit: " sq ft",
    description: "An extraordinary multi-level residence commanding uninterrupted 180-degree Atlantic panoramas, bespoke Italian marble finishes, and private infinity poolside entertaining.",
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    features: [
        { id: "f1", title: "Bedrooms", value: "5 En-Suite Suites" },
        { id: "f2", title: "Outdoor Terrace", value: "Private Infinity Pool" },
        { id: "f3", title: "Ceiling Height", value: "3.8m Architectural Glazing" }
    ]
};

// Fallback property types for preview completeness
const defaultPropertyTypes = [
    {
        id: "pt1",
        display_order: 2,
        title: "2 Bedroom Coastal Residence",
        area: "2,200",
        area_unit: " sq ft",
        description: "Intimate coastal luxury boasting expansive private loggias, gourmet European kitchens, and bespoke fixtures throughout.",
        image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        features: [
            { id: "ptf1", title: "Bedrooms", value: "2 En-Suite" },
            { id: "ptf2", title: "Balcony", value: "Oceanfront Loggia" },
            { id: "ptf3", title: "Parking", value: "2 Underground Spaces" }
        ]
    },
    {
        id: "pt2",
        display_order: 3,
        title: "3 Bedroom Horizon Penthouse",
        area: "3,800",
        area_unit: " sq ft",
        description: "Elevated dual-aspect residence bathed in natural sunlight with seamless indoor-outdoor transitions and master spa retreats.",
        image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        features: [
            { id: "ptf4", title: "Bedrooms", value: "3 En-Suite" },
            { id: "ptf5", title: "Terrace", value: "Wraparound Sunset Deck" },
            { id: "ptf6", title: "Elevator", value: "Direct Private Access" }
        ]
    }
];

const ResidencePreview = ({
    title = "The Residences",
    subTitle = "Exclusive Living Spaces Designed With Architectural Precision",
    featuredProperty,
    propertyTypes,
    className = "",
    deviceMode = "desktop"
}: ResidencePreviewProps) => {
    const isMobile = deviceMode === "mobile";
    const isTablet = deviceMode === "tablet";

    const featured = featuredProperty || defaultFeatured;
    const list = propertyTypes && propertyTypes.length > 0 ? propertyTypes : defaultPropertyTypes;

    const headingTitleStyles = isMobile
        ? "text-2xl leading-tight"
        : isTablet
        ? "text-3xl lg:text-4xl leading-tight"
        : "text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight";

    return (
        <div className={`flex flex-col gap-6 sm:gap-8 lg:gap-10 py-6 sm:py-8 px-4 sm:px-6 bg-white w-full ${className}`}>
            {/* Heading */}
            <div className="flex flex-col gap-2 sm:gap-3">
                <p className="text-primary tracking-wider uppercase text-xs sm:text-sm font-normal">
                    {title || "The Residences"}
                </p>
                <h1 className={`title uppercase ${headingTitleStyles} ${isMobile ? "w-full" : "w-full lg:w-2/3 xl:w-1/2"}`}>
                    {subTitle || "Exclusive Living Spaces Designed With Architectural Precision"}
                </h1>
            </div>

            {/* Featured Property */}
            <div
                className={`w-full flex ${
                    isMobile
                        ? "flex-col"
                        : isTablet
                        ? "flex-col"
                        : "flex-col lg:flex-row"
                } items-center gap-6 sm:gap-8 lg:gap-10 pb-6 sm:pb-8 lg:pb-10 pr-0 ${
                    !isMobile && !isTablet ? "lg:pr-16 xl:pr-20" : ""
                } bg-[#F4F3F0] group overflow-hidden`}
            >
                <div
                    className={`w-full ${
                        isMobile
                            ? "h-[260px]"
                            : isTablet
                            ? "h-[340px]"
                            : "lg:max-w-[60%] h-[320px] sm:h-[420px] lg:h-[480px]"
                    } overflow-hidden`}
                >
                    <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                        src={featured?.image_url}
                        alt={featured?.title || "Featured Residence"}
                    />
                </div>
                <div
                    className={`flex flex-1 flex-col items-start gap-3 sm:gap-4 w-full ${
                        isMobile ? "p-4" : "p-5 sm:p-8 lg:p-0"
                    }`}
                >
                    <p className="body-text tracking-widest text-primary uppercase text-xs">
                        Residence {featured?.display_order}
                    </p>
                    <h1 className={`title ${isMobile ? "text-xl" : "text-2xl sm:text-3xl lg:text-4xl"}`}>
                        {featured?.title}
                    </h1>
                    <h2 className={`title ${isMobile ? "text-lg" : "text-xl sm:text-2xl"} text-[#4A465D]`}>
                        Approx. {featured?.area}{featured?.area_unit}
                    </h2>
                    <p className="body-text text-[#504C51] text-xs sm:text-sm leading-relaxed">
                        {featured?.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-col mt-2 sm:mt-4 gap-2.5 sm:gap-3 w-full">
                        {featured?.features?.map((feature: any) => (
                            <div key={feature.id} className="flex flex-row items-center justify-between">
                                <p className="body-text text-[#504C51] font-semibold text-xs">
                                    {feature?.title}
                                </p>
                                <p className="body-text text-xs">
                                    {feature?.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Discover Button */}
                    <button
                        type="button"
                        className={`flex flex-row items-center justify-center sm:justify-start gap-2 tracking-widest text-xs sm:text-sm uppercase mt-4 sm:mt-6 lg:mt-8 px-5 py-3.5 sm:px-6 sm:py-4 bg-black text-white hover:bg-primary transition-all duration-300 cursor-pointer group/discover-btn ${
                            isMobile ? "w-full" : "w-full sm:w-auto"
                        }`}
                    >
                        Discover {featured?.title}
                        <ArrowRight size={18} className="group-hover/discover-btn:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            {/* Property Types Grid */}
            <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-6 sm:gap-8 lg:gap-10`}>
                {list?.map((type: any) => (
                    <div key={type.id} className="flex flex-col items-center bg-[#F4F3F0] group">
                        <div className={`w-full ${isMobile ? "h-[240px]" : "h-[300px] sm:h-[380px] lg:h-[450px]"} overflow-hidden`}>
                            <img
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                src={type.image_url}
                                alt={type.title || "Property Type"}
                            />
                        </div>
                        <div className="flex flex-col items-start w-full py-5 px-5 sm:px-8 lg:px-10 gap-3 sm:gap-4">
                            <p className="body-text tracking-widest text-primary uppercase text-xs">
                                Residence {type?.display_order}
                            </p>
                            <h1 className="title text-2xl sm:text-3xl">
                                {type?.title}
                            </h1>
                            <h2 className="title text-xl sm:text-2xl text-[#4A465D]">
                                Approx. {type?.area}{type?.area_unit}
                            </h2>
                            <p className="body-text text-[#504C51] text-xs sm:text-sm leading-relaxed">
                                {type?.description}
                            </p>

                            {/* Features */}
                            <div className="flex flex-col mt-2 sm:mt-4 gap-2.5 sm:gap-3 w-full">
                                {type?.features?.map((feature: any) => (
                                    <div key={feature.id} className="flex flex-row items-center justify-between">
                                        <p className="body-text text-[#504C51] font-semibold text-xs">
                                            {feature?.title}
                                        </p>
                                        <p className="body-text text-xs">
                                            {feature?.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Discover Button */}
                            <button
                                type="button"
                                className="flex flex-row items-center gap-2 text-xs sm:text-sm uppercase mt-6 sm:mt-8 tracking-widest text-black hover:text-primary transition-all duration-300 cursor-pointer group/discover-btn"
                            >
                                Discover {type?.title}
                                <ArrowUpRight
                                    size={20}
                                    className="text-black group-hover/discover-btn:translate-x-1 group-hover/discover-btn:-translate-y-1 group-hover/discover-btn:text-primary transition-transform duration-300"
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResidencePreview;