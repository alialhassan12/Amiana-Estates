import type { Penthouse, PenthouseMedia } from "../../@types/penthouse";
import type { PropertyFeature } from "../../@types/propertyFeature";
import Gallery from "../Gallery";

export type PenthousePreviewProps = {
    title?: string;
    subTitle?: string;
    description?: string;
    penthouse?: Penthouse | null;
    features?: PropertyFeature[] | any[];
    media?: PenthouseMedia[] | any[];
    className?: string;
    deviceMode?: "desktop" | "tablet" | "mobile";
};

const defaultFeatures = [
    { id: 1, title: "Total Area", value: "9,200 sq ft" },
    { id: 2, title: "Private Terrace", value: "3,400 sq ft" },
    { id: 3, title: "Ceiling Height", value: "4.2m Glazing" },
    { id: 4, title: "Private Lift", value: "Direct Penthouse Access" }
];

const defaultMedia = [
    {
        id: 1,
        media_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
        title: "Skyline Panorama",
        description: "Uninterrupted vistas from the grand salon",
        level: "Level 48"
    },
    {
        id: 2,
        media_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        title: "Master Sanctuary",
        description: "Expansive primary suite with private terrace access",
        level: "Level 49"
    }
];

const PenthousePreview = ({
    title,
    subTitle,
    description,
    penthouse,
    features,
    media,
    className = "",
    deviceMode = "desktop"
}: PenthousePreviewProps) => {
    const isMobile = deviceMode === "mobile";
    const isTablet = deviceMode === "tablet";

    const displayTitle = title || penthouse?.title || "EXCLUSIVE PENTHOUSE";
    const displaySubTitle = subTitle || penthouse?.subTitle || "THE CROWN SKY VILLA";
    const displayDescription = description || penthouse?.description || "Perched above the skyline, the Grand Penthouse redefines elevated living with 360-degree vistas, private rooftop entertaining sanctuaries, and bespoke architectural detailing throughout.";

    const displayFeatures = (features && features.length > 0)
        ? features
        : (penthouse?.penthouse_media && defaultFeatures);

    const displayMedia = (media && media.length > 0)
        ? media
        : (penthouse?.penthouse_media && penthouse.penthouse_media.length > 0)
        ? penthouse.penthouse_media
        : defaultMedia;

    const paddingStyles = isMobile
        ? "px-4 py-8"
        : isTablet
        ? "px-6 py-10"
        : "px-4 sm:px-6 md:px-10 lg:px-12 py-12 sm:py-16 md:py-20";

    const titleStyles = isMobile
        ? "text-xl sm:text-2xl leading-snug"
        : isTablet
        ? "text-2xl sm:text-3xl leading-tight"
        : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight";

    const descriptionStyles = isMobile
        ? "text-xs leading-relaxed"
        : isTablet
        ? "text-sm leading-relaxed"
        : "text-sm sm:text-base leading-relaxed";

    const featureCount = displayFeatures?.length || 4;

    const getFeaturesGridCols = () => {
        if (isMobile) {
            return "grid-cols-1";
        }
        if (isTablet) {
            return featureCount <= 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3";
        }
        // Desktop device mode: adapts dynamically to feature count
        if (featureCount <= 2) return "grid-cols-2";
        if (featureCount === 3) return "grid-cols-1 sm:grid-cols-3";
        if (featureCount === 4) return "grid-cols-2 md:grid-cols-4";
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-5";
    };

    const featuresGridCols = getFeaturesGridCols();

    const featurePadding = isMobile
        ? "p-3"
        : isTablet
        ? "p-3.5 sm:p-4"
        : "p-3.5 sm:p-5";

    const featureTitleStyles = isMobile
        ? "text-[10px]"
        : "text-[10px] sm:text-xs";

    const featureValueStyles = isMobile
        ? "text-xs"
        : "text-xs sm:text-sm";

    return (
        <div className={`bg-black text-white w-full min-h-full ${className}`}>
            <div className={`flex flex-col ${paddingStyles} max-w-7xl mx-auto w-full`}>
                {/* Heading */}
                <div className="flex flex-col gap-2 sm:gap-3">
                    <p className="text-primary tracking-wider uppercase text-xs sm:text-sm font-normal">
                        {displayTitle}
                    </p>
                    <h1 className={`title uppercase font-serif w-full lg:w-3/4 xl:w-2/3 ${titleStyles}`}>
                        {displaySubTitle}
                    </h1>
                    <p className={`body-text text-[#C1C2CD] font-normal w-full lg:w-3/4 xl:w-2/3 ${descriptionStyles}`}>
                        {displayDescription}
                    </p>
                </div>

                {/* Features */}
                {displayFeatures && displayFeatures.length > 0 && (
                    <div className={`mt-6 sm:mt-10 grid ${featuresGridCols} gap-px bg-[#161513] border border-[#21211E]`}>
                        {displayFeatures.map((feature: any) => (
                            <div
                                key={feature.id || feature.title}
                                className={`flex flex-col text-start items-start justify-center gap-1.5 ${featurePadding} border-r border-[#21211E] last:border-r-0`}
                            >
                                <p className={`body-text ${featureTitleStyles} text-primary font-bold uppercase tracking-widest`}>
                                    {feature?.title}
                                </p>
                                <p className={`body-text ${featureValueStyles} text-white font-bold`}>
                                    {feature?.value}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Monograph Filmstrip Carousel Gallery */}
                <div className="mt-8 sm:mt-12 w-full">
                    <Gallery media={displayMedia} />
                </div>
            </div>
        </div>
    );
};

export default PenthousePreview;