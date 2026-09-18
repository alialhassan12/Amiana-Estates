export type EstateStats = {
    levelOfArchitecture?: string | number;
    totalResidences?: string | number;
    propertyTypeArea?: string;
};

export type EstatePreviewProps = {
    title?: string;
    subTitle?: string;
    description?: string;
    media?: string;
    mediaType?: "image" | "video" | string;
    stats?: EstateStats;
    className?: string;
    deviceMode?: "desktop" | "tablet" | "mobile";
};

const EstatePreview = ({
    title = "The Estate",
    subTitle = "Exclusive Waterfront Sanctuaries",
    description = "A harmonious synthesis of contemporary grandeur and coastal serenity, redefining upscale living with unprecedented architectural refinement.",
    media,
    mediaType,
    stats,
    className = "",
    deviceMode = "desktop"
}: EstatePreviewProps) => {
    const isVideo =
        mediaType === "video" ||
        (typeof media === "string" &&
            (media.endsWith(".mp4") ||
                media.endsWith(".webm") ||
                media.endsWith(".mov") ||
                media.startsWith("data:video")));

    const isMobile = deviceMode === "mobile";
    const isTablet = deviceMode === "tablet";

    const statsList = [
        {
            key: "Level of Architecture",
            value: stats?.levelOfArchitecture ?? "—"
        },
        {
            key: "Residencies",
            value: stats?.totalResidences ?? "—"
        },
        {
            key: "Crown Penthouses",
            value: stats?.propertyTypeArea ?? "—"
        }
    ];

    // Responsive styles matching Estate component while honoring simulated device modes
    const titleStyles = isMobile
        ? "text-2xl leading-tight"
        : isTablet
        ? "text-3xl lg:text-4xl leading-tight"
        : "text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight";

    const descStyles = isMobile
        ? "text-xs leading-relaxed"
        : isTablet
        ? "text-sm leading-relaxed"
        : "text-sm sm:text-base md:text-md leading-relaxed md:leading-normal";

    const bodyHeightStyles = isMobile
        ? "h-[380px]"
        : isTablet
        ? "h-[460px]"
        : "h-[500px] lg:h-[580px]";

    const statNumStyles = isMobile
        ? "text-xl sm:text-2xl"
        : isTablet
        ? "text-2xl sm:text-3xl lg:text-4xl"
        : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl";

    const statLabelStyles = isMobile
        ? "text-[9px] sm:text-[10px]"
        : isTablet
        ? "text-[10px] sm:text-xs"
        : "text-[10px] sm:text-xs md:text-sm";

    return (
        <div className={`flex flex-col gap-6 sm:gap-8 py-6 sm:py-8 px-4 sm:px-6 bg-white w-full ${className}`}>
            {/* Heading */}
            <div className="flex flex-col gap-2 sm:gap-3">
                <p className="text-primary tracking-wider uppercase text-xs sm:text-sm font-normal">
                    {title || "The Estate"}
                </p>
                <div
                    className={`flex ${
                        isMobile ? "flex-col gap-3" : "flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8"
                    }`}
                >
                    <h1 className={`title uppercase ${titleStyles} ${isMobile ? "w-full" : "w-full md:w-1/2"}`}>
                        {subTitle || "Exclusive Waterfront Sanctuaries"}
                    </h1>
                    <p className={`body-text ${descStyles} font-normal ${isMobile ? "w-full" : "w-full md:w-1/2"} text-gray-900`}>
                        {description || "A harmonious synthesis of contemporary grandeur and coastal serenity, redefining upscale living with unprecedented architectural refinement."}
                    </p>
                </div>
            </div>

            {/* Body */}
            <div className={`relative w-full ${bodyHeightStyles} overflow-hidden group rounded-sm`}>
                {media ? (
                    isVideo ? (
                        <video
                            src={media}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                        />
                    ) : (
                        <img
                            src={media}
                            alt={title || "Estate Preview"}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                        />
                    )
                ) : (
                    <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center text-neutral-500">
                        <span className="uppercase text-xs tracking-widest font-mono">No Media Selected</span>
                    </div>
                )}

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>

                {/* Stats Bottom Bar */}
                <div className="absolute w-full bottom-0 py-5 sm:py-7 lg:py-8 z-20 bg-black/20 backdrop-blur-sm">
                    <div className="flex flex-row flex-wrap gap-2 items-center justify-evenly px-2 sm:px-4">
                        {statsList.map((item, index) => (
                            <div className="flex flex-col items-center text-center px-1 sm:px-2" key={index}>
                                <h1 className={`title ${statNumStyles} text-white font-normal leading-none mb-1 sm:mb-1.5`}>
                                    {item.value}
                                </h1>
                                <p className={`body-text ${statLabelStyles} text-primary uppercase tracking-wider`}>
                                    {item.key}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstatePreview;