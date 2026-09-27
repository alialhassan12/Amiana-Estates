import { useState } from "react";

export type DifferencePreviewProps = {
    title?: string | null;
    subTitle?: string | null;
    description?: string | null;
    image_url?: string | null;
    className?: string;
    deviceMode?: "desktop" | "tablet" | "mobile";
};


const DifferencePreview = ({
    title,
    subTitle,
    description,
    image_url,
    className = "",
    deviceMode = "desktop",
}: DifferencePreviewProps) => {
    const isMobile = deviceMode === "mobile";
    const isTablet = deviceMode === "tablet";
    const [imgErr, setImgErr] = useState<boolean>(false);

    const displayTitle = title?.trim() || "The Amiana Difference";
    const displaySubTitle = subTitle?.trim() || "Luxury, Thoughtfully Redefined.";
    const displayDescription =
        description?.trim() ||
        "Amiana Estates brings together refined architecture, spacious living, premium amenities, security, panoramic views, and a carefully considered atmosphere to create a modern residential experience inspired by international luxury standards.";

    const displayImage = image_url;

    // Responsive styles tailored for device simulation
    const containerPadding = isMobile
        ? "p-4 sm:p-5"
        : isTablet
        ? "p-6 sm:p-8"
        : "p-6 sm:p-10 lg:p-12";

    const gridLayout = isMobile
        ? "flex flex-col gap-6"
        : isTablet
        ? "flex flex-col gap-8"
        : "grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center";

    const titleSize = isMobile
        ? "text-xl sm:text-2xl leading-[1.2]"
        : isTablet
        ? "text-2xl sm:text-3xl leading-[1.18]"
        : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15]";

    const descSize = isMobile
        ? "text-xs leading-relaxed mt-3"
        : isTablet
        ? "text-sm leading-relaxed mt-4"
        : "text-sm sm:text-base lg:text-lg leading-relaxed mt-4 sm:mt-6";

    const pillarsGrid = isMobile
        ? "grid grid-cols-1 gap-2.5 mt-5 pt-5"
        : isTablet
        ? "grid grid-cols-3 gap-3 mt-6 pt-6"
        : "grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 pt-8";

    const imageHeight = isMobile
        ? "h-[260px]"
        : isTablet
        ? "h-[360px]"
        : "h-[340px] sm:h-[440px] lg:h-[500px]";

    return (
        <div className={`w-full bg-[#FAF9F6] dark:bg-neutral-950 transition-colors ${className}`}>
            <section className={`relative w-full overflow-hidden ${containerPadding}`}>
                <div className={gridLayout}>
                    {/* Left Narrative Column */}
                    <div className={isMobile || isTablet ? "w-full" : "lg:col-span-6 xl:col-span-7 flex flex-col justify-center"}>
                        {/* Category Pre-heading */}
                        <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
                            <p className="text-primary tracking-widest uppercase text-xs sm:text-sm font-medium">
                                {displayTitle}
                            </p>
                        </div>

                        {/* Main Headline */}
                        <h2 className={`title uppercase tracking-tight text-neutral-900 dark:text-white max-w-2xl ${titleSize}`}>
                            {displaySubTitle}
                        </h2>

                        {/* Narrative Description */}
                        <p className={`body-text text-neutral-600 dark:text-neutral-400 font-light max-w-2xl ${descSize}`}>
                            {displayDescription}
                        </p>

                    </div>

                    {/* Right Visual Showcase Column */}
                    <div className={isMobile || isTablet ? "w-full" : "lg:col-span-6 xl:col-span-5 relative w-full group"}>
                        {/* Image Container */}
                        <div className={`relative w-full ${imageHeight} overflow-hidden rounded-sm bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl`}>
                            <img
                                src={displayImage}
                                alt={displayTitle}
                                onError={() => setImgErr(true)}
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                            />
                            {/* Luxury Gradient Vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DifferencePreview;