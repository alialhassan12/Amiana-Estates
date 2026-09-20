import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { 
    MapPin, 
    Navigation, 
    Compass, 
    Copy, 
    Check, 
    ExternalLink, 
    Layers, 
    Crosshair 
} from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useGetLocation } from "../hooks/useLocation";
import { Skeleton } from "./ui/skeleton";
import type { LocationData } from "../@types/location";

const MAP_STYLES = [
    { id: "dark", label: "Luxury Dark", url: "mapbox://styles/mapbox/standard" },
    // { id: "satellite", label: "Satellite", url: "mapbox://styles/mapbox/standard-satellite" },
    // { id: "light", label: "Minimal Light", url: "mapbox://styles/mapbox/light-v11" },
];

const SURROUNDINGS = [
    {
        number: "01",
        title: "Atlantic Oceanfront",
        description: "Direct coastal access to the pristine Aberdeen beach and sunset promenade.",
        distance: "2 Mins Walk",
    },
    {
        number: "02",
        title: "Freetown Golf Club",
        description: "Historic 18-hole championship seaside golf course & private member club.",
        distance: "5 Mins Drive",
    },
    {
        number: "03",
        title: "Sea Coach Terminal",
        description: "Direct water-taxi airport connection to Lungi International Airport.",
        distance: "7 Mins Drive",
    },
    {
        number: "04",
        title: "Boutique Dining Strip",
        description: "Curated fine dining, beachfront cocktail lounges, and premier resorts.",
        distance: "3 Mins Drive",
    },
];

const Location = () => {
    const { ref, isInView } = useInView<HTMLDivElement>({ rootMargin: "250px" });
    const { data: rawLocation, isLoading } = useGetLocation(isInView);

    const location = rawLocation as LocationData | undefined;

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markerRef = useRef<mapboxgl.Marker | null>(null);

    const [activeStyle, setActiveStyle] = useState<string>(MAP_STYLES[0].url);
    const [copied, setCopied] = useState<boolean>(false);

    // Coordinates with fallbacks (Aberdeen, Sierra Leone)
    const lat = location?.latitude && !isNaN(Number(location.latitude)) 
        ? Number(location.latitude) 
        : 8.4900;
    const lng = location?.longitude && !isNaN(Number(location.longitude)) 
        ? Number(location.longitude) 
        : -13.2925;
    const zoom = location?.map_zoom || 15;

    // Initialize Mapbox map
    useEffect(() => {
        if (!mapContainerRef.current) return;

        const token = import.meta.env.VITE_MAPBOX_TOKEN;
        if (!token) {
            console.warn("Mapbox token missing in VITE_MAPBOX_TOKEN.");
            return;
        }

        mapboxgl.accessToken = token;

        // Create new map instance
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: activeStyle,
            center: [lng, lat],
            zoom: zoom,
            pitch: 45,
            bearing: -12,
            attributionControl: false,
        });

        // Add Navigation controls (zoom & rotate)
        map.addControl(
            new mapboxgl.NavigationControl({ visualizePitch: true }), 
            "top-right"
        );

        map.on("load", () => {
            map.resize();
        });

        // Custom pulsing gold marker element
        const markerEl = document.createElement("div");
        markerEl.className = "amiana-marker-container";
        markerEl.innerHTML = `
            <div class="amiana-marker-pulse"></div>
            <div class="amiana-marker-core"></div>
        `;

        // Luxury popup card
        const popup = new mapboxgl.Popup({ 
            offset: 20, 
            closeButton: false,
            className: "amiana-map-popup" 
        }).setHTML(`
            <div style="font-family: inherit;">
                <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #B38F5B; font-weight: 600;">AMIANA ESTATES</span>
                <h4 style="font-size: 13px; text-transform: uppercase; font-weight: 500; color: #ffffff; margin-top: 2px;">${location?.address || "Aberdeen, Sierra Leone"}</h4>
                <p style="font-size: 11px; color: #a3a3a3; margin-top: 4px; font-family: monospace;">${lat.toFixed(4)}° N, ${Math.abs(lng).toFixed(4)}° W</p>
            </div>
        `);

        // Attach marker
        const marker = new mapboxgl.Marker({ element: markerEl })
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(map);

        // Open popup by default on load
        marker.togglePopup();

        markerRef.current = marker;
        mapRef.current = map;

        // Cleanup on unmount
        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, [lat, lng, zoom]);

    // Handle map style switch
    const handleStyleChange = (styleUrl: string) => {
        setActiveStyle(styleUrl);
        if (mapRef.current) {
            mapRef.current.setStyle(styleUrl);
        }
    };

    // Recenter map back to estate
    const handleRecenter = () => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [lng, lat],
                zoom: zoom,
                pitch: 45,
                bearing: -12,
                essential: true,
                duration: 1800,
            });
            if (markerRef.current) {
                const popup = markerRef.current.getPopup();
                if (popup && !popup.isOpen()) {
                    markerRef.current.togglePopup();
                }
            }
        }
    };

    // Copy address to clipboard
    const handleCopyAddress = () => {
        const addressText = location?.address || "Aberdeen, Sierra Leone";
        navigator.clipboard.writeText(addressText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isLoading) {
        return <LocationSkeleton ref={ref} />;
    }

    return (
        <div ref={ref} className="flex flex-col gap-8 sm:gap-12 lg:gap-16 py-8 sm:py-14 lg:py-20 mt-4 sm:mt-8 lg:mt-12">
            {/* Heading */}
            <div className="flex flex-col gap-2 sm:gap-3">
                <p data-aos="fade-up" className="text-primary tracking-widest uppercase text-xs sm:text-sm font-normal">
                    {location?.title || "LOCATION"}
                </p>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 lg:gap-12">
                    <h2 data-aos="fade-up" data-aos-delay="150" className="title uppercase text-3xl sm:text-4xl lg:text-5xl w-full lg:w-3/5 leading-[1.15] tracking-tight text-neutral-900 dark:text-white">
                        {location?.subTitle || "Live where everything feels within reach"}
                    </h2>
                    
                    <div data-aos="fade-up" data-aos-delay="250" className="flex flex-col gap-3 w-full lg:w-2/5">
                        {location?.description && (
                            <p className="body-text text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
                                {location.description}
                            </p>
                        )}
                        <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                            <MapPin className="w-4 h-4 text-primary shrink-0" />
                            <span className="body-text text-xs sm:text-sm uppercase tracking-wider font-medium">
                                {location?.address || "Aberdeen, Sierra Leone"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Mapbox Section */}
            <div 
                data-aos="fade-up" 
                data-aos-delay="200"
                className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-[#161513] group shadow-xl"
            >
                {/* Map Container */}
                <div ref={mapContainerRef} className="w-full h-full" />

                {/* Map Style Switcher */}
                {/* <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-1.5 p-1 bg-[#161513]/85 backdrop-blur-md border border-white/10 shadow-lg">
                    <span className="hidden sm:flex items-center gap-1 text-[10px] uppercase tracking-wider text-neutral-400 font-medium px-2 py-1">
                        <Layers className="w-3 h-3 text-primary" />
                        View
                    </span>
                    {MAP_STYLES.map((style) => {
                        const isActive = activeStyle === style.url;
                        return (
                            <button
                                key={style.id}
                                type="button"
                                onClick={() => handleStyleChange(style.url)}
                                className={`px-2.5 py-1 text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                                    isActive
                                        ? "bg-primary text-black font-semibold shadow-sm"
                                        : "text-neutral-300 hover:text-white hover:bg-white/10"
                                }`}
                            >
                                {style.label}
                            </button>
                        );
                    })}
                </div> */}

                {/* Bottom Info & Actions Card */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-auto z-20 max-w-sm sm:max-w-md p-4 sm:p-5 bg-[#161513]/90 backdrop-blur-md border border-white/10 text-white shadow-2xl space-y-3.5">
                    <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase tracking-widest text-primary font-semibold flex items-center gap-1.5">
                                <Compass className="w-3 h-3 text-primary" />
                                Estate Coordinates
                            </p>
                            <h4 className="title text-base sm:text-lg uppercase text-white font-normal leading-snug">
                                {location?.address || "Aberdeen, Sierra Leone"}
                            </h4>
                            <p className="body-text text-xs text-neutral-400 font-mono">
                                {lat.toFixed(4)}° N, {Math.abs(lng).toFixed(4)}° W
                            </p>
                        </div>

                        {/* Recenter Button */}
                        <button
                            type="button"
                            onClick={handleRecenter}
                            title="Recenter Map"
                            className="p-2 border border-white/15 bg-white/5 hover:bg-primary hover:text-black hover:border-primary transition-all duration-200 text-neutral-300 cursor-pointer shrink-0"
                            aria-label="Recenter Map"
                        >
                            <Crosshair className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Quick action buttons */}
                    <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                        {/* Open in Google Maps */}
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] uppercase tracking-wider font-medium bg-primary text-black hover:bg-primary/90 transition-all duration-200"
                        >
                            <Navigation className="w-3 h-3" />
                            Directions
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>

                        {/* Copy Address */}
                        <button
                            type="button"
                            onClick={handleCopyAddress}
                            className="flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] uppercase tracking-wider font-medium border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-all duration-200 cursor-pointer"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-primary" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5 text-neutral-300" />
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Neighborhood & Surrounding Highlights Grid */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {SURROUNDINGS.map((item, index) => (
                    <div 
                        data-aos="fade-up" 
                        data-aos-delay={index * 120}
                        key={item.number}
                        className="group/card relative flex flex-col justify-between p-6 bg-[#F4F3F0]/60 dark:bg-neutral-900/40 border border-neutral-200/70 dark:border-neutral-800/70 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-[#F4F3F0] dark:hover:bg-neutral-900 transition-all duration-300 min-h-[170px]"
                    >
                        <div>
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <span className="title text-2xl sm:text-3xl text-primary/80 group-hover/card:text-primary transition-colors duration-300 font-normal">
                                    {item.number}
                                </span>
                                <span className="body-text text-[10px] uppercase tracking-wider text-primary font-medium border border-primary/30 px-2 py-0.5 bg-primary/10">
                                    {item.distance}
                                </span>
                            </div>

                            <h3 className="title uppercase text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-normal tracking-wide group-hover/card:text-primary transition-colors duration-300">
                                {item.title}
                            </h3>
                        </div>

                        <p className="body-text text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mt-3">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default Location;

export const LocationSkeleton = ({ ref }: { ref?: React.Ref<HTMLDivElement> }) => {
    return (
        <div ref={ref} className="flex flex-col gap-8 sm:gap-12 lg:gap-16 py-8 sm:py-14 lg:py-20 mt-4 sm:mt-8 lg:mt-12 w-full animate-pulse">
            {/* Heading Skeleton */}
            <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-28 bg-primary/25" />
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 lg:gap-12">
                    <div className="w-full lg:w-3/5 space-y-3">
                        <Skeleton className="h-9 sm:h-12 w-4/5 bg-neutral-200 dark:bg-neutral-800" />
                        <Skeleton className="h-9 sm:h-12 w-3/5 bg-neutral-200 dark:bg-neutral-800" />
                    </div>
                    <div className="w-full lg:w-2/5 space-y-2.5">
                        <Skeleton className="h-4 w-full bg-neutral-200 dark:bg-neutral-800" />
                        <Skeleton className="h-4 w-4/5 bg-neutral-200 dark:bg-neutral-800" />
                    </div>
                </div>
            </div>

            {/* Map Frame Skeleton */}
            <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-[#161513]">
                <Skeleton className="w-full h-full rounded-none bg-neutral-900" />

                {/* Floating controls skeleton */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <Skeleton className="h-8 w-24 bg-white/10" />
                    <Skeleton className="h-8 w-24 bg-white/10" />
                    <Skeleton className="h-8 w-24 bg-white/10" />
                </div>

                {/* Floating bottom card skeleton */}
                <div className="absolute bottom-6 left-6 max-w-md w-[85%] sm:w-80 p-5 bg-[#161513]/90 border border-white/10 space-y-3">
                    <Skeleton className="h-3 w-28 bg-primary/30" />
                    <Skeleton className="h-5 w-4/5 bg-neutral-700" />
                    <Skeleton className="h-3 w-36 bg-neutral-700" />
                    <div className="flex gap-2 pt-2">
                        <Skeleton className="h-8 flex-1 bg-primary/40" />
                        <Skeleton className="h-8 w-16 bg-white/10" />
                    </div>
                </div>
            </div>

            {/* Proximity Cards Skeleton */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {[0, 1, 2, 3].map((i) => (
                    <div 
                        key={i} 
                        className="p-6 bg-[#F4F3F0]/60 dark:bg-neutral-900/40 border border-neutral-200/70 dark:border-neutral-800/70 flex flex-col justify-between min-h-[170px]"
                    >
                        <div>
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <Skeleton className="h-7 w-10 bg-primary/25" />
                                <Skeleton className="h-4 w-16 bg-primary/20" />
                            </div>
                            <Skeleton className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-800" />
                        </div>
                        <div className="space-y-2 mt-4">
                            <Skeleton className="h-3.5 w-full bg-neutral-200 dark:bg-neutral-800" />
                            <Skeleton className="h-3.5 w-4/5 bg-neutral-200 dark:bg-neutral-800" />
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
};