
export type HomePreviewProps = {
    title?: string;
    description?: string;
    cta1Text?: string;
    cta2Text?: string;
    cta1Url?: string;
    cta2Url?: string;
    media?: string;
    mediaType?: string;
    className?: string;
    deviceMode?: "desktop" | "tablet" | "mobile";
};

const HomePreview = ({
    title = "Luxury Waterfront Living In Sierra Leone",
    description = "Discover a private sanctuary where contemporary elegance meets the Atlantic coastline. Designed for discerning individuals who seek an unmatched lifestyle.",
    cta1Text = "Explore Residences",
    cta2Text = "Download Brochure",
    cta1Url = "#",
    cta2Url = "#",
    media,
    mediaType,
    className,
    deviceMode = "desktop",
}: HomePreviewProps) => {
    const words: string[] = (title || "").trim().split(/\s+/).filter(Boolean);
    const isVideo = mediaType === "video" || 
        (typeof media === "string" && (
            media.endsWith(".mp4") || 
            media.endsWith(".webm") || 
            media.endsWith(".mov") || 
            media.startsWith("data:video")
        ));

    // True device simulation styles:
    // When embedded in a desktop browser, CSS media queries (@media) evaluate the entire computer screen (1920px),
    // not the 375px or 768px wrapper div. We map deviceMode to appropriate styles.
    const isMobile = deviceMode === "mobile";
    const isTablet = deviceMode === "tablet";

    const paddingStyles = isMobile
        ? "px-5 py-10"
        : isTablet
        ? "px-8 py-14"
        : "px-6 sm:px-10 md:px-16 lg:px-20 py-20";

    const titleSizeStyles = isMobile
        ? "text-2xl sm:text-3xl leading-snug mb-3"
        : isTablet
        ? "text-4xl lg:text-5xl leading-tight mb-4"
        : "text-3xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4 sm:mb-6";

    const subtextSizeStyles = isMobile
        ? "text-xs sm:text-sm max-w-xs"
        : isTablet
        ? "text-sm sm:text-base max-w-md"
        : "text-sm sm:text-base md:text-lg max-w-xl";

    const buttonsContainerStyles = isMobile
        ? "flex flex-col items-stretch gap-2.5 mt-5"
        : isTablet
        ? "flex flex-row items-center gap-3 mt-6"
        : "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-6 sm:mt-8";

    const buttonSizeStyles = isMobile
        ? "py-2.5 px-4 text-xs"
        : "py-3 px-6 text-xs sm:text-sm";

    return (
        <div className={`${className ? className : ""} w-full flex flex-col justify-center relative ${paddingStyles} mb-10 overflow-hidden`}>
            {/* Background Media */}
            {isVideo ? (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src={media}
                />
            ) : media ? (
                <img
                    src={media}
                    alt={title || "Amiana Estates"}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 z-0" />
            )}

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-20 max-w-7xl">
                {/* Main heading */}
                <h1 className={`title font-normal ${titleSizeStyles} text-white break-words`}>
                    {words.map((word, index) => {
                        if (index === words.length - 1) {
                            return (
                                <span key={index} className="italic text-primary ml-1.5 sm:ml-2 inline-block">
                                    {word}
                                </span>
                            );
                        }
                        return <span key={index}>{word}{" "}</span>;
                    })}
                </h1>

                {/* Subtext */}
                <p className={`body-text ${subtextSizeStyles} text-white/70 leading-relaxed`}>
                    {description}
                </p>

                <div className={buttonsContainerStyles}> 
                    {cta1Text && (
                        <button 
                            type="button"
                            onClick={() => cta1Url && window.open(cta1Url, '_blank')}
                            className={`bg-white ${buttonSizeStyles} text-black hover:bg-primary hover:text-white transition-all cursor-pointer duration-300 font-medium uppercase tracking-wider text-center`}
                        >
                            {cta1Text}
                        </button>
                    )}
                    {cta2Text && (
                        <button 
                            type="button"
                            onClick={() => cta2Url && window.open(cta2Url, '_blank')}
                            className={`bg-white/20 backdrop-blur-xl ${buttonSizeStyles} text-white hover:bg-white hover:text-black transition-all cursor-pointer duration-300 font-medium uppercase tracking-wider text-center`}
                        >
                            {cta2Text}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePreview;
