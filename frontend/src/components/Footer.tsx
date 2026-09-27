import { ArrowUpRight, ExternalLink, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useGetHero } from "../hooks/useHero";
import { useGetLocation } from "../hooks/useLocation";
import { useGetSocials } from "../hooks/useSocials";
import { useInView } from "../hooks/useInView";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const exploreLinks = [
    { label: "Residences", href: "/#residences" },
    { label: "Penthouse", href: "/#penthouse" },
    { label: "Location", href: "/#location" },
];

const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
];

const Footer = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markerRef = useRef<mapboxgl.Marker | null>(null);
    
    const {isInView,ref}=useInView({rootMargin:"250px"});
    
    const { data: heroData } = useGetHero(isInView);
    const { data: location } = useGetLocation(isInView);
    const {data:socials}=useGetSocials(isInView);

    const companyName = heroData?.hero?.name || "AMIANA ESTATES";
    const address = location?.address || "Aberdeen, Sierra Leone";

    // Coordinates (Aberdeen, Sierra Leone)
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

        // If map already exists, smoothly update coordinates and ensure zoom is enabled
        if (mapRef.current) {
            mapRef.current.scrollZoom.enable();
            mapRef.current.dragPan.enable();
            mapRef.current.doubleClickZoom.enable();
            mapRef.current.flyTo({
                center: [lng, lat],
                zoom: zoom ? Math.min(zoom, 14) : 13,
                essential: true,
            });
            if (markerRef.current) {
                markerRef.current.setLngLat([lng, lat]);
            }
            mapRef.current.resize();
            return;
        }

        // Create new map instance
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/standard",
            center: [lng, lat],
            zoom: zoom ? Math.min(zoom, 14) : 13,
            pitch: 30,
            bearing: -10,
            attributionControl: false,
            scrollZoom: true,
            dragPan: true,
            doubleClickZoom: true,
            cooperativeGestures: false,
        });

        // Explicitly enable scroll zoom handler
        map.scrollZoom.enable();
        map.dragPan.enable();
        map.doubleClickZoom.enable();

        // Add compact zoom (+ / -) controls
        map.addControl(
            new mapboxgl.NavigationControl({ showCompass: false }),
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

        // Attach marker
        const marker = new mapboxgl.Marker({ element: markerEl })
            .setLngLat([lng, lat])
            .addTo(map);

        markerRef.current = marker;
        mapRef.current = map;

        // Ensure proper dimensions after layout rendering
        const timer1 = setTimeout(() => map.resize(), 150);
        const timer2 = setTimeout(() => map.resize(), 600);

        // Cleanup on unmount
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            map.remove();
            mapRef.current = null;
            markerRef.current = null;
        };
    }, [lat, lng, zoom]);

    // Force map resize whenever footer enters view or resizes
    useEffect(() => {
        if (isInView && mapRef.current) {
            mapRef.current.resize();
        }
    }, [isInView]);

    return (
        <footer ref={ref} className="bg-[#161513] px-6 py-10 text-white sm:px-10 sm:py-12 md:px-16 lg:px-20">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-8 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-12 sm:pb-10">
                    <div className="max-w-xl">
                        <p className="body-text mb-3 text-[10px] font-medium uppercase tracking-[0.24em] text-primary">
                            Private residences
                        </p>
                        <h2 className="title text-3xl uppercase leading-none tracking-tight text-white sm:text-4xl lg:text-5xl">
                            {companyName}
                        </h2>
                    </div>

                    <a
                        href="/#home"
                        className="group flex w-fit items-center gap-2.5 border-b border-primary/60 pb-2 body-text text-xs uppercase tracking-[0.16em] text-neutral-300 transition-colors hover:text-white"
                    >
                        <span>Back to top</span>
                        <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                </div>

                <div className="grid gap-8 py-8 md:grid-cols-2 lg:grid-cols-4 sm:gap-6">
                    <div className=" flex flex-col items-start gap-2">
                        <p className="body-text text-[10px] font-medium uppercase tracking-[0.22em] text-primary">Contact</p>
                        <div className="flex flex-col items-start gap-2">
                            <a
                                href="/#location"
                                className="group flex w-fit items-start gap-2 body-text text-xs uppercase leading-relaxed tracking-[0.14em] text-neutral-400 transition-colors hover:text-white"
                                >
                                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                <span>{address}</span>
                            </a>
                            <a
                                href="/"
                                className="group flex w-fit items-start gap-2 body-text text-xs leading-relaxed tracking-[0.14em] text-neutral-400 transition-colors hover:text-white"
                                >
                                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                <span>{heroData?.hero?.contact_email}</span>
                            </a>
                            <a
                                href="/"
                                className="group flex w-fit items-start gap-2 body-text text-xs uppercase leading-relaxed tracking-[0.14em] text-neutral-400 transition-colors hover:text-white"
                                >
                                <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                <span>{heroData?.hero?.contact_phone}</span>
                            </a>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="body-text text-[10px] font-medium uppercase tracking-[0.22em] text-primary">Explore</p>
                        <div className="flex flex-col items-start gap-2">
                            {exploreLinks.map((link) => (
                                <a key={link.label} href={link.href} className="body-text text-xs uppercase tracking-[0.14em] text-neutral-400 transition-colors hover:text-white cursor-pointer">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="body-text text-[10px] font-medium uppercase tracking-[0.22em] text-primary">Follow</p>
                        <div className="flex flex-col items-start gap-2">
                            {socials?.map((link) => (
                                <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="body-text text-xs uppercase tracking-[0.14em] text-neutral-400 transition-colors hover:text-white cursor-pointer">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* location */}
                    <div className="space-y-3 flex flex-col">
                        <p className="body-text text-[10px] font-medium uppercase tracking-[0.22em] text-primary">Location</p>
                        <div className="flex flex-col items-start gap-1">
                            <a
                                href="/#location"
                                className="group flex w-fit items-start gap-1.5 body-text text-xs uppercase leading-relaxed tracking-[0.14em] text-neutral-400 transition-colors hover:text-white"
                            >
                                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                <span className="line-clamp-1">{address}</span>
                            </a>
                        </div>
                        {/* Minimal Map Container */}
                        <div className="relative w-full h-36 min-h-[140px] rounded-sm overflow-hidden border border-white/15 bg-neutral-950 group">
                            <div
                                ref={mapContainerRef}
                                className="w-full h-full"
                                style={{ minHeight: "140px", height: "100%", width: "100%" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        </div>
                        
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
                        </div>
                    </div>
                </div>

                <div className="body-text flex flex-col gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.16em] text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} {companyName}</p>
                    <div className="flex items-center gap-4">
                        {legalLinks.map((link) => (
                            <a key={link.label} href={link.href} className="transition-colors hover:text-primary">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
