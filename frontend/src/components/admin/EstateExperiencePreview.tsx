import type { EstateExperience, EstateExperienceSpecification } from "../../@types/estateExperience";
import {
    CircleParking,
    Shield,
    Video,
    ArrowUpDown,
    PhoneCall,
    Zap,
    Droplet,
    Wifi,
    Eye,
    Store,
    Image as ImageIcon
} from "lucide-react";

const iconMap = {
    CircleParking,
    Shield,
    Video,
    ArrowUpDown,
    PhoneCall,
    Zap,
    Droplet,
    Wifi,
    Eye,
    Store,
};

export type EstateExperiencePreviewProps = {
    estateExperience?: Partial<EstateExperience> | null;
    title?: string;
    subTitle?: string;
    card_1_image_url?: string | null;
    card_1_image_heading?: string;
    card_1_title?: string;
    card_1_quote?: string;
    card_1_description?: string;
    specifications_title?: string;
    specifications_subTitle?: string;
    specifications_description?: string;
    specifications?: EstateExperienceSpecification[];
    card_2_title?: string;
    card_2_description?: string;
    card_2_image_url?: string | null;
    closing_title?: string;
    closing_statement?: string;
    className?: string;
    deviceMode?: "desktop" | "tablet" | "mobile";
};

const defaultSpecifications: EstateExperienceSpecification[] = [
    {
        id: 1,
        estate_experience_id: 1,
        title: "Dedicated Parking",
        short_description: "Private secured underground and surface parking stalls",
        icon: "CircleParking",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 2,
        estate_experience_id: 1,
        title: "24/7 Security",
        short_description: "Integrated biometric access and round-the-clock patrol",
        icon: "Shield",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 3,
        estate_experience_id: 1,
        title: "CCTV Surveillance",
        short_description: "Comprehensive perimeter monitoring and coverage",
        icon: "Video",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 4,
        estate_experience_id: 1,
        title: "High-Speed Elevators",
        short_description: "Private zoned lift infrastructure with express transit",
        icon: "ArrowUpDown",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 5,
        estate_experience_id: 1,
        title: "Intercom Integration",
        short_description: "Direct concierge and residence-to-gate connectivity",
        icon: "PhoneCall",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 6,
        estate_experience_id: 1,
        title: "Backup Power Generation",
        short_description: "Redundant dual diesel generators for continuous power",
        icon: "Zap",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 7,
        estate_experience_id: 1,
        title: "Treated Water Reservoirs",
        short_description: "Reverse osmosis water filtration and reserve tanks",
        icon: "Droplet",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 8,
        estate_experience_id: 1,
        title: "Fiber-Optic Connectivity",
        short_description: "Enterprise grade gigabit internet capability",
        icon: "Wifi",
        created_at: new Date(),
        updated_at: new Date(),
    },
];

export default function EstateExperiencePreview({
    estateExperience,
    title,
    subTitle,
    card_1_image_url,
    card_1_image_heading,
    card_1_title,
    card_1_quote,
    card_1_description,
    specifications_title,
    specifications_subTitle,
    specifications_description,
    specifications,
    card_2_title,
    card_2_description,
    card_2_image_url,
    closing_title,
    closing_statement,
    className = "",
    deviceMode = "desktop",
}: EstateExperiencePreviewProps) {
    const isMobile = deviceMode === "mobile";
    const isTablet = deviceMode === "tablet";

    // Resolved values prioritizing direct props, then estateExperience object, then fallback defaults
    const displayTitle = title ?? estateExperience?.title ?? "RESIDENTIAL AMENITIES & LIFESTYLE";
    const displaySubTitle = subTitle ?? estateExperience?.subTitle ?? "THE ESTATE EXPERIENCE";

    // Card 1 values
    const displayCard1Img = card_1_image_url !== undefined ? card_1_image_url : (estateExperience?.card_1_image_url ?? "");
    const displayCard1Heading = card_1_image_heading ?? estateExperience?.card_1_image_heading ?? "FIVE-STOREY OCEANFRONT MONOLITH";
    const displayCard1Title = card_1_title ?? estateExperience?.card_1_title ?? "Architectural Premise";
    const displayCard1Quote = card_1_quote ?? estateExperience?.card_1_quote ?? "Amiana Estates is a five-floor residential tower designed around peaceful, exclusive, and elite living.";
    const displayCard1Desc = card_1_description ?? estateExperience?.card_1_description ?? "Positioned delicately at the headland of the Aberdeen Peninsula, this structural statement unites Atlantic ocean horizons with world-class engineering.";

    // Specifications values
    const displaySpecsTitle = specifications_title ?? estateExperience?.specifications_title ?? "SPECIFICATIONS";
    const displaySpecsSubTitle = specifications_subTitle ?? estateExperience?.specifications_subTitle ?? "ENGINEERING & RESIDENTIAL SYSTEMS";
    const displaySpecsDesc = specifications_description ?? estateExperience?.specifications_description ?? "Built with precision engineering, redundant infrastructure, and international fixtures to deliver seamless serenity.";

    const allSpecs = (specifications && specifications.length > 0)
        ? specifications
        : (estateExperience?.specifications && estateExperience.specifications.length > 0)
            ? estateExperience.specifications
            : defaultSpecifications;

    // Card 2 values
    const displayCard2Title = card_2_title ?? estateExperience?.card_2_title ?? "Sierra Leone's Foremost Wellness Retreat";
    const displayCard2Desc = card_2_description ?? estateExperience?.card_2_description ?? "A major highlight of the development is the inclusion of what is planned to become one of the largest spa facilities in Sierra Leone, bringing wellness and luxury together within the building itself.";
    const displayCard2Img = card_2_image_url !== undefined ? card_2_image_url : (estateExperience?.card_2_image_url ?? "");

    // Closing values
    const displayClosingTitle = closing_title ?? estateExperience?.closing_title ?? "RESIDENTIAL PROFILE & TENANCY";
    const displayClosingStatement = closing_statement ?? estateExperience?.closing_statement ?? "Designed for professionals, families, diaspora residents, executives, investors, and individuals seeking a modern long-term rental lifestyle with international standards of comfort.";

    // Split specs into columns based on device mode
    const isSingleColumn = isMobile;
    const firstColumnSpecs = isSingleColumn
        ? allSpecs
        : allSpecs.slice(0, Math.ceil(allSpecs.length / 2));
    const secondColumnSpecs = isSingleColumn
        ? []
        : allSpecs.slice(Math.ceil(allSpecs.length / 2));

    // Device responsive styles
    const containerPadding = isMobile
        ? "py-8 px-4"
        : isTablet
            ? "py-12 px-6"
            : "py-16 md:py-20 px-6 sm:px-10 lg:px-12";

    const titleStyles = isMobile
        ? "text-2xl leading-tight w-full"
        : isTablet
            ? "text-3xl leading-tight w-3/4"
            : "text-3xl sm:text-4xl lg:text-5xl w-full md:w-3/4 lg:w-1/2 leading-tight";

    const cardContainerStyles = isMobile
        ? "flex-col h-auto my-6 gap-2"
        : isTablet
            ? "flex-col gap-4 md:flex-row h-auto md:h-[460px] my-8"
            : "flex-col gap-8 lg:flex-row h-auto lg:h-[550px] my-10 lg:pr-20";

    const cardImageStyles = isMobile
        ? "w-full h-52 sm:h-64"
        : isTablet
            ? "w-full md:w-[50%] h-64 md:h-full"
            : "w-full lg:max-w-[60%] h-64 sm:h-80 md:h-96 lg:h-full";

    const cardTextPadding = isMobile
        ? "p-4 sm:p-5 w-full gap-3"
        : isTablet
            ? "p-5 md:p-6 w-full gap-3.5"
            : "p-6 sm:p-8 lg:p-0 flex-1 gap-4";

    const cardQuoteStyles = isMobile
        ? "text-lg italic leading-snug"
        : isTablet
            ? "text-xl sm:text-2xl italic leading-snug"
            : "text-2xl sm:text-3xl italic leading-snug";

    const specsHeaderStyles = isMobile
        ? "flex-col gap-3 pb-4"
        : "flex-col md:flex-row md:items-end justify-between pb-5 gap-4";

    const specsSubTitleStyles = isMobile
        ? "text-xl leading-tight"
        : isTablet
            ? "text-2xl leading-tight"
            : "text-2xl sm:text-3xl leading-tight";

    const specsDescStyles = isMobile
        ? "w-full text-xs text-[#504C51]"
        : isTablet
            ? "w-1/3 text-xs sm:text-sm text-[#504C51]"
            : "w-full md:w-1/3 lg:w-1/4 text-xs sm:text-sm text-[#504C51]";

    const specsColumnsContainer = isMobile
        ? "flex flex-col w-full divide-y"
        : "flex flex-col md:flex-row w-full md:gap-4 lg:gap-8 divide-y md:divide-y-0";

    const closingContainerStyles = isMobile
        ? "flex-col gap-4 p-4 mt-6"
        : isTablet
            ? "flex-row items-center justify-between gap-4 p-6 mt-8"
            : "flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 sm:p-8 mt-10";

    const closingTitleStyles = isMobile
        ? "text-base sm:text-lg italic leading-snug"
        : isTablet
            ? "text-xl italic leading-snug"
            : "text-xl sm:text-2xl italic leading-snug";

    return (
        <div className={`flex flex-col bg-white text-neutral-900 w-full transition-all duration-300 ${containerPadding} ${className}`}>
            {/* Heading */}
            <div className="flex flex-col gap-2 pb-5 border-b border-[#ECE9E5]">
                <p className="text-primary tracking-wider uppercase text-xs sm:text-sm font-normal">
                    {displayTitle}
                </p>
                <h1 className={`title uppercase font-serif tracking-tight ${titleStyles}`}>
                    {displaySubTitle}
                </h1>
            </div>

            {/* Card 1 */}
            <div className={`w-full flex items-center bg-[#F4F3F0] group overflow-hidden ${cardContainerStyles}`}>
                {/* Image plate */}
                <div className={`relative overflow-hidden shrink-0 bg-neutral-200 ${cardImageStyles}`}>
                    {displayCard1Img ? (
                        <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            src={displayCard1Img}
                            alt={displayCard1Title || "Card 1"}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 p-4 text-center">
                            <ImageIcon className="h-8 w-8 mb-1.5 opacity-40" />
                            <span className="text-[11px] uppercase tracking-wider font-mono">No Card 1 Image</span>
                        </div>
                    )}
                    {displayCard1Heading && (
                        <div className="absolute p-2.5 sm:p-3 bg-black text-primary bottom-3 left-3 max-w-[90%]">
                            <p className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase truncate sm:whitespace-normal">
                                {displayCard1Heading}
                            </p>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className={`flex flex-col items-start ${cardTextPadding}`}>
                    <p className="body-text tracking-widest text-primary uppercase text-xs">
                        {displayCard1Title}
                    </p>
                    {displayCard1Quote && (
                        <h2 className={`title ${cardQuoteStyles}`}>
                            "{displayCard1Quote}"
                        </h2>
                    )}
                    <p className="body-text text-[#504C51] text-xs sm:text-sm leading-relaxed">
                        {displayCard1Desc}
                    </p>
                </div>
            </div>

            {/* Specifications Section */}
            <div className="flex flex-col mt-6 sm:mt-10 w-full pb-5 mb-5">
                <div className={`flex border-b border-[#ECE9E5] ${specsHeaderStyles}`}>
                    <div className="flex flex-col gap-1">
                        <p className="text-primary tracking-wider uppercase text-xs sm:text-sm font-normal">
                            {displaySpecsTitle}
                        </p>
                        <h2 className={`title tracking-wider ${specsSubTitleStyles}`}>
                            {displaySpecsSubTitle}
                        </h2>
                    </div>
                    <p className={`body-text leading-normal ${specsDescStyles}`}>
                        {displaySpecsDesc}
                    </p>
                </div>

                <div className={`mt-6 sm:mt-8 border-t border-b border-[#ECE9E5] ${specsColumnsContainer}`}>
                    {/* First column */}
                    <div className={`${isSingleColumn ? "w-full" : "w-full md:w-1/2"} flex flex-col items-center`}>
                        {firstColumnSpecs.map((spec: any, index: number) => {
                            const Icon = iconMap[spec?.icon as keyof typeof iconMap];
                            const itemNum = index + 1;
                            const formattedNum = itemNum < 10 ? `0${itemNum}` : itemNum;

                            return (
                                <div
                                    key={spec.id || index}
                                    className="flex flex-row items-center justify-between border-b border-[#ECE9E5] p-3 sm:p-4 last:border-b-0 w-full hover:bg-[#F4F3F0] transition-colors duration-200 group"
                                >
                                    <div className="flex flex-row items-center gap-3 sm:gap-4 min-w-0">
                                        <p className="body-text text-xs sm:text-sm text-primary font-mono shrink-0">
                                            {formattedNum}
                                        </p>
                                        <div className="flex flex-col min-w-0">
                                            <p className="body-text text-xs sm:text-sm font-bold tracking-widest uppercase truncate">
                                                {spec?.title}
                                            </p>
                                            <p className="body-text text-[11px] sm:text-[13px] text-[#504C51] line-clamp-1">
                                                {spec?.short_description}
                                            </p>
                                        </div>
                                    </div>
                                    {Icon && (
                                        <Icon className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors duration-200 shrink-0 ml-2" />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Second column (rendered on desktop/tablet) */}
                    {!isSingleColumn && (
                        <div className="w-full md:w-1/2 flex flex-col items-center">
                            {secondColumnSpecs.map((spec: any, index: number) => {
                                const Icon = iconMap[spec?.icon as keyof typeof iconMap];
                                const itemNum = firstColumnSpecs.length + index + 1;
                                const formattedNum = itemNum < 10 ? `0${itemNum}` : itemNum;

                                return (
                                    <div
                                        key={spec.id || index}
                                        className="flex flex-row items-center justify-between border-b border-[#ECE9E5] p-3 sm:p-4 last:border-b-0 w-full hover:bg-[#F4F3F0] transition-colors duration-200 group"
                                    >
                                        <div className="flex flex-row items-center gap-3 sm:gap-4 min-w-0">
                                            <p className="body-text text-xs sm:text-sm text-primary font-mono shrink-0">
                                                {formattedNum}
                                            </p>
                                            <div className="flex flex-col min-w-0">
                                                <p className="body-text text-xs sm:text-sm font-bold tracking-widest uppercase truncate">
                                                    {spec?.title}
                                                </p>
                                                <p className="body-text text-[11px] sm:text-[13px] text-[#504C51] line-clamp-1">
                                                    {spec?.short_description}
                                                </p>
                                            </div>
                                        </div>
                                        {Icon && (
                                            <Icon className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors duration-200 shrink-0 ml-2" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Card 2 */}
            <div className={`w-full flex items-center bg-[#F4F3F0] group overflow-hidden ${cardContainerStyles}`}>
                {/* Image plate */}
                <div className={`relative overflow-hidden shrink-0 bg-neutral-200 ${cardImageStyles}`}>
                    {displayCard2Img ? (
                        <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            src={displayCard2Img}
                            alt={displayCard2Title || "Card 2"}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 p-4 text-center">
                            <ImageIcon className="h-8 w-8 mb-1.5 opacity-40" />
                            <span className="text-[11px] uppercase tracking-wider font-mono">No Card 2 Image</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className={`flex flex-col items-start ${cardTextPadding}`}>
                    <p className="body-text tracking-widest text-primary uppercase text-xs">
                        {displayCard2Title}
                    </p>
                    <p className="body-text text-[#504C51] text-xs sm:text-sm leading-relaxed">
                        {displayCard2Desc}
                    </p>
                </div>
            </div>

            {/* Closing Statement */}
            <div className={`w-full flex border-l-2 border-primary bg-[#F4F3F0] ${closingContainerStyles}`}>
                <div className="flex-1">
                    <div className="flex flex-col gap-1">
                        <p className="body-text tracking-widest text-primary uppercase text-xs">
                            {displayClosingTitle}
                        </p>
                        <h2 className={`title ${closingTitleStyles}`}>
                            " {displayClosingStatement} "
                        </h2>
                    </div>
                </div>
                <div className={`${isMobile ? "w-full" : "w-full md:w-auto shrink-0 flex justify-start md:justify-end"}`}>
                    <button
                        type="button"
                        className={`${
                            isMobile ? "w-full" : "w-full md:w-auto"
                        } bg-black py-3 px-6 text-xs sm:text-sm text-white hover:bg-primary hover:text-white transition-all cursor-pointer duration-300 font-medium uppercase text-center`}
                    >
                        Schedule Review
                    </button>
                </div>
            </div>
        </div>
    );
}
