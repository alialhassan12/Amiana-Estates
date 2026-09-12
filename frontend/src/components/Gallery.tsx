import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export interface MediaItem {
    id?: number | string;
    media_url?: string;
    media_path?: string;
    title?: string | null;
    description?: string | null;
    level?: string | null;
    [key: string]: any;
}

interface GalleryProps {
    media?: MediaItem[];
    className?: string;
}

const padZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

const Gallery: React.FC<GalleryProps> = ({ media = [], className = "" }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    const thumbnailsRef = useRef<HTMLDivElement>(null);
    const carouselContainerRef = useRef<HTMLDivElement>(null);

    // If media is not yet available, we can fallback or handle gracefully
    const items = media.length > 0 ? media : [];
    const totalPlates = items.length;

    // Helper to get plate data with fallback
    const getPlateData = useCallback((item: MediaItem, index: number) => {
        return {
            url: item.media_url || item.media_path || "",
            title: item.title,
            description: item.description,
            plateNum: padZero(index + 1),
            totalNum: padZero(totalPlates),
        };
    }, [totalPlates]);

    const handlePrev = useCallback(() => {
        if (totalPlates === 0) return;
        setActiveIndex((prev) => (prev === 0 ? totalPlates - 1 : prev - 1));
    }, [totalPlates]);

    const handleNext = useCallback(() => {
        if (totalPlates === 0) return;
        setActiveIndex((prev) => (prev === totalPlates - 1 ? 0 : prev + 1));
    }, [totalPlates]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "Escape" && isLightboxOpen) setIsLightboxOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handlePrev, handleNext, isLightboxOpen]);

    // Auto-scroll active thumbnail into view
    useEffect(() => {
        if (!thumbnailsRef.current) return;
        const activeThumb = thumbnailsRef.current.children[activeIndex] as HTMLElement;
        if (activeThumb) {
            activeThumb.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, [activeIndex]);

    // Touch swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) handleNext();
            else handlePrev();
        }
        setTouchStartX(null);
    };

    if (totalPlates === 0) {
        return (
            <div className="w-full h-80 bg-[#141311] border border-[#21211E] flex items-center justify-center text-neutral-500 font-mono text-sm tracking-widest uppercase">
                Loading Monograph Media...
            </div>
        );
    }

    const currentPlate = getPlateData(items[activeIndex], activeIndex);

    return (
        <div className={`flex flex-col w-full select-none ${className}`}>
            {/* Top Section: Peek Carousel */}
            <div
                ref={carouselContainerRef}
                className="relative w-full overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Carousel Track */}
                <div
                    className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{
                        // Translates based on card percentage width (68%) + gap (24px)
                        transform: `translateX(calc(-${activeIndex} * (68% + 24px)))`,
                    }}
                >
                    {items.map((item, index) => {
                        const plate = getPlateData(item, index);
                        const isActive = index === activeIndex;

                        return (
                            <div
                                key={item.id || index}
                                onClick={() => setActiveIndex(index)}
                                className={`relative flex-shrink-0 cursor-pointer overflow-hidden border transition-all duration-700 group
                                    w-[85%] sm:w-[75%] lg:w-[68%]
                                    h-[420px] sm:h-[500px] lg:h-[580px]
                                    mr-6
                                    ${
                                        isActive
                                            ? "border-[#3A3832] opacity-100 shadow-2xl"
                                            : "border-[#21211E] opacity-40 hover:opacity-75"
                                    }
                                `}
                            >
                                {/* Background Image */}
                                <img
                                    src={plate.url}
                                    alt={plate.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                    loading={index < 2 ? "eager" : "lazy"}
                                />

                                {/* Subtle top gradient for plate badge legibility */}
                                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />

                                {/* Deep bottom gradient for editorial typography */}
                                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />

                                {/* Plate Badge (Top Left) */}
                                <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-20">
                                    <div className="flex items-center gap-2 bg-[#0E0D0B]/85 backdrop-blur-md px-3.5 py-1.5 border border-white/15 text-[11px] sm:text-xs font-mono tracking-widest text-neutral-200 uppercase font-medium shadow-md">
                                        <span>
                                            PLATE {plate.plateNum} / {plate.totalNum}
                                        </span>
                                    </div>
                                </div>

                                {/* Fullscreen / Zoom Button (Top Right) */}
                                {isActive && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsLightboxOpen(true);
                                        }}
                                        title="View Fullscreen Plate"
                                        className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 p-2.5 bg-[#0E0D0B]/70 hover:bg-[#0E0D0B] backdrop-blur-md border border-white/15 text-neutral-300 hover:text-white transition-colors duration-200 cursor-pointer"
                                    >
                                        <Maximize2 className="w-4 h-4" />
                                    </button>
                                )}

                                {/* Bottom Editorial Caption */}
                                <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 z-20 flex flex-col gap-2 pointer-events-none">
                                    <h2 className="title text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-tight tracking-tight drop-shadow-md">
                                        {plate.title && plate.plateNum+'.'} {plate.title}
                                    </h2>
                                    <p className="body-text text-xs sm:text-sm text-[#C1C2CD] font-normal leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-3">
                                        {plate.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Floating Navigation Chevrons */}
                <div className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 z-30 pointer-events-auto">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                        }}
                        aria-label="Previous Plate"
                        className="p-3 rounded-none bg-black/70 hover:bg-[#B38F5B] text-white hover:text-black border border-white/10 hover:border-[#B38F5B] backdrop-blur-md transition-all duration-300 cursor-pointer group"
                    >
                        <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
                    </button>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-4 z-30 pointer-events-auto">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                        }}
                        aria-label="Next Plate"
                        className="p-3 rounded-none bg-black/70 hover:bg-[#B38F5B] text-white hover:text-black border border-white/10 hover:border-[#B38F5B] backdrop-blur-md transition-all duration-300 cursor-pointer group"
                    >
                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>

            {/* Bottom Monograph Filmstrip Controls */}
            <div className="mt-8 flex flex-col gap-3">
                {/* Filmstrip Title Bar */}
                <div className="flex flex-row items-center justify-between text-[#8E8D8A]">
                    <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] uppercase font-medium">
                        INTERACTIVE MONOGRAPH FILMSTRIP ({totalPlates} PLATES)
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono tracking-[0.22em] uppercase font-medium hidden sm:inline-block">
                        SELECT PLATE TO VIEW DETAILS
                    </span>
                </div>

                {/* Filmstrip Thumbnails Row */}
                <div
                    ref={thumbnailsRef}
                    className="flex flex-row gap-2.5 sm:gap-3.5 overflow-x-auto pb-3 pt-1 scrollbar-none scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {items.map((item, index) => {
                        const plate = getPlateData(item, index);
                        const isActive = index === activeIndex;

                        return (
                            <button
                                key={item.id || index}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Select plate ${plate.plateNum}: ${plate.title}`}
                                className={`relative flex-shrink-0 w-28 sm:w-36 md:w-40 aspect-[16/10] overflow-hidden border cursor-pointer transition-all duration-300
                                    ${
                                        isActive
                                            ? "border-[#B38F5B] ring-1 ring-[#B38F5B] opacity-100 scale-[1.02] shadow-lg shadow-[#B38F5B]/10"
                                            : "border-[#21211E] opacity-50 hover:opacity-85 hover:border-neutral-500"
                                    }
                                `}
                            >
                                <img
                                    src={plate.url}
                                    alt={plate.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />

                                {/* Dark overlay when inactive */}
                                {!isActive && (
                                    <div className="absolute inset-0 bg-black/30 transition-opacity hover:opacity-0" />
                                )}

                                {/* Bottom Right Plate Index Badge */}
                                <div className="absolute bottom-1 right-1 bg-black/85 border border-white/10 px-1.5 py-0.5 text-[9px] font-mono text-neutral-300">
                                    {plate.plateNum}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    {/* Lightbox Header */}
                    <div className="flex items-center justify-between z-20" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono tracking-widest text-[#B38F5B] uppercase font-semibold">
                                PLATE {currentPlate.plateNum} / {currentPlate.totalNum}
                            </span>
                        </div>
                        <button
                            onClick={() => setIsLightboxOpen(false)}
                            className="p-2 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Lightbox Image Stage */}
                    <div
                        className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={currentPlate.url}
                            alt={currentPlate.title}
                            className="max-h-full max-w-full object-contain shadow-2xl border border-white/10"
                        />

                        {/* Chevrons in Lightbox */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 hover:bg-[#B38F5B] text-white hover:text-black border border-white/15 transition-colors cursor-pointer"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 hover:bg-[#B38F5B] text-white hover:text-black border border-white/15 transition-colors cursor-pointer"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Lightbox Footer Caption */}
                    <div
                        className="flex flex-col gap-1 max-w-3xl mx-auto text-center z-20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="title text-xl sm:text-2xl text-white font-normal">
                            {currentPlate.plateNum}. {currentPlate.title}
                        </h3>
                        <p className="body-text text-xs sm:text-sm text-[#C1C2CD] leading-relaxed">
                            {currentPlate.description}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;