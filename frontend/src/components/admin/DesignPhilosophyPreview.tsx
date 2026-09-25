import type { DesignPhilosophy, DesignPhilosophyPrinciple } from "../../@types/designPhilosophy";

export type DesignPhilosophyPreviewProps = {
    title?: string;
    subTitle?: string;
    description?: string;
    image_url?: string;
    principles?: DesignPhilosophyPrinciple[];
    designPhilosophy?: Partial<DesignPhilosophy> | null;
    className?: string;
    deviceMode?: "desktop" | "tablet" | "mobile";
};

const defaultPrinciples: DesignPhilosophyPrinciple[] = [
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

const fallbackImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";

const DesignPhilosophyPreview = ({
    title,
    subTitle,
    description,
    image_url,
    principles,
    designPhilosophy,
    className = "",
    deviceMode = "desktop",
}: DesignPhilosophyPreviewProps) => {
    const isMobile = deviceMode === "mobile";
    const isTablet = deviceMode === "tablet";

    // Resolved content with live override capability & graceful fallbacks
    const displayTitle = title ?? designPhilosophy?.title ?? "DESIGN PHILOSOPHY";
    const displaySubTitle = subTitle ?? designPhilosophy?.subTitle ?? "ARCHITECTURAL MASTERY ROOTED IN TIMELESS ELEGANCE";
    const displayDescription = description ?? designPhilosophy?.description ?? "Every structure we conceive is a dialogue between human emotion and physical sanctuary—merging noble materiality, sculptural geometry, and boundless horizons.";
    const displayImage = image_url ?? designPhilosophy?.image_url ?? fallbackImage;
    
    const resolvedPrinciples: DesignPhilosophyPrinciple[] = (principles && principles.length > 0)
        ? principles
        : (designPhilosophy?.design_philosophy_principles && designPhilosophy.design_philosophy_principles.length > 0)
        ? designPhilosophy.design_philosophy_principles
        : defaultPrinciples;

    // Responsive classes tailored for device simulation
    const containerSpacing = isMobile
        ? "flex flex-col gap-6 py-6 px-4"
        : isTablet
        ? "flex flex-col gap-8 py-8 px-6"
        : "flex flex-col gap-8 sm:gap-12 lg:gap-16 py-8 sm:py-14 lg:py-20 px-4 sm:px-8 lg:px-12";

    const preTitleStyles = isMobile
        ? "text-primary tracking-widest uppercase text-[11px] font-normal"
        : isTablet
        ? "text-primary tracking-widest uppercase text-xs font-normal"
        : "text-primary tracking-widest uppercase text-xs sm:text-sm font-normal";

    const headingFlexStyles = isMobile
        ? "flex flex-col gap-3"
        : isTablet
        ? "flex flex-col md:flex-row md:items-end justify-between gap-5"
        : "flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 lg:gap-12";

    const titleStyles = isMobile
        ? "title uppercase text-2xl leading-[1.2] tracking-tight text-neutral-900 dark:text-white"
        : isTablet
        ? "title uppercase text-2xl md:text-3xl leading-[1.2] tracking-tight text-neutral-900 dark:text-white md:w-3/5"
        : "title uppercase text-3xl sm:text-4xl lg:text-5xl w-full lg:w-3/5 leading-[1.15] tracking-tight text-neutral-900 dark:text-white";

    const descriptionStyles = isMobile
        ? "body-text text-xs text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed"
        : isTablet
        ? "body-text text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed md:w-2/5"
        : "body-text text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed w-full lg:w-2/5 lg:max-w-xl";

    const gridLayoutStyles = isMobile
        ? "grid grid-cols-1 gap-5 items-stretch w-full"
        : isTablet
        ? "grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch w-full"
        : "grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-stretch w-full";

    const imageColStyles = isMobile
        ? "relative w-full h-[260px] min-h-[240px] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 group"
        : isTablet
        ? "md:col-span-5 relative w-full h-[360px] min-h-[340px] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 group"
        : "lg:col-span-5 xl:col-span-5 group relative w-full h-[360px] sm:h-[460px] lg:h-full min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800";

    const principlesWrapperStyles = isMobile
        ? "w-full flex flex-col justify-center"
        : isTablet
        ? "md:col-span-7 flex flex-col justify-center"
        : "lg:col-span-7 xl:col-span-7 flex flex-col justify-center";

    const principlesGridStyles = isMobile
        ? "grid grid-cols-1 gap-3.5 h-full"
        : isTablet
        ? "grid grid-cols-2 gap-4 h-full"
        : "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 h-full";

    const cardPaddingStyles = isMobile
        ? "p-4 sm:p-5 min-h-[140px]"
        : isTablet
        ? "p-5 min-h-[155px]"
        : "p-6 sm:p-7 min-h-[170px]";

    return (
        <div className={`w-full bg-[#FAF9F6] dark:bg-neutral-950 transition-colors ${className}`}>
            <div className={`w-full max-w-7xl mx-auto ${containerSpacing}`}>
                {/* Heading */}
                <div className="flex flex-col gap-2 sm:gap-3">
                    <p className={preTitleStyles}>
                        {displayTitle || "DESIGN PHILOSOPHY"}
                    </p>
                    <div className={headingFlexStyles}>
                        <h2 className={titleStyles}>
                            {displaySubTitle || "ARCHITECTURAL MASTERY"}
                        </h2>
                        <p className={descriptionStyles}>
                            {displayDescription}
                        </p>
                    </div>
                </div>

                {/* Body Content */}
                <div className={gridLayoutStyles}>
                    {/* Left Column: Image */}
                    <div className={imageColStyles}>
                        <img 
                            src={displayImage || fallbackImage}
                            alt={displayTitle || "Design Philosophy"}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (target.src !== fallbackImage) {
                                    target.src = fallbackImage;
                                }
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                    </div>

                    {/* Right Column: Principles */}
                    <div className={principlesWrapperStyles}>
                        <div className={principlesGridStyles}>
                            {resolvedPrinciples.map((item, index) => (
                                <div 
                                    key={item.id ?? index} 
                                    className={`group/card relative flex flex-col justify-between bg-[#F4F3F0]/60 dark:bg-neutral-900/40 border border-neutral-200/70 dark:border-neutral-800/70 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-[#F4F3F0] dark:hover:bg-neutral-900 transition-all duration-300 ${cardPaddingStyles}`}
                                >
                                    <div>
                                        {/* Index number and separator line */}
                                        <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                                            <span className="title text-2xl sm:text-3xl text-primary/80 group-hover/card:text-primary transition-colors duration-300 font-normal">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800 group-hover/card:bg-primary/40 transition-colors duration-300" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="title uppercase text-sm sm:text-base lg:text-lg text-neutral-900 dark:text-neutral-100 font-normal tracking-wide group-hover/card:text-primary transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    {item.description && (
                                        <p className="body-text text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mt-2.5 sm:mt-3">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignPhilosophyPreview;