import { useEffect, useRef, useState } from "react";
import { useGetLocation, useUpdateLocation } from "../../hooks/useLocation";
import mapboxgl from "mapbox-gl";
import { toast } from "../ui/toast";
import { Check, Compass, Copy, ExternalLink, Loader2, MapPin, RotateCcw, Save, Search, X } from "lucide-react";
import { Button } from "../ui/button";

interface GeocodingFeature {
    id: string;
    place_name: string;
    center: [number, number]; // [lng, lat]
}

const LocationSettingsTab=({activeTab})=>{
    const {data:location}=useGetLocation(activeTab === "location");
    const {mutateAsync:updateLocation,isPending:isUpdatingLocation}=useUpdateLocation();

    const [lat, setLat] = useState<number>(location?.latitude || 0);
    const [lng, setLng] = useState<number>(location?.longitude || 0);
    const [locationLabel, setLocationLabel] = useState(location?.address || "");

    const isLocationChanged=lat!==location?.latitude || lng!==location?.longitude
    
    useEffect(() => {
        if (location) {
            setLat(location.latitude);
            setLng(location.longitude);
            setLocationLabel(location.address);
        }
    }, [location]);

    const handleUpdateLocation=async()=>{
        try {
            await updateLocation({
                latitude:lat,
                longitude:lng,
                address:locationLabel
            })
            toast.add({
                description:"Location updated successfully",
                type:"success"
            })
        } catch (error:any) {
            toast.add({
                description:error?.response?.data?.message || "Failed to update location",
                type:"error"
            })
        }
    }

    const [copiedCoords, setCopiedCoords] = useState(false);

    // Mapbox Geocoding Search
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<GeocodingFeature[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResultsDropdown, setShowResultsDropdown] = useState(false);

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markerRef = useRef<mapboxgl.Marker | null>(null);
    
    // Initialize Mapbox Map
    useEffect(() => {
        if (activeTab !== "location") return;
        if (!mapContainerRef.current) return;

        const token = import.meta.env.VITE_MAPBOX_TOKEN || "";
        if (!token) {
            console.warn("Mapbox token missing in VITE_MAPBOX_TOKEN");
            return;
        }

        mapboxgl.accessToken = token;

        // Cleanup existing map if any
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/standard",
            center: [lng, lat],
            zoom: 15,
            pitch: 35,
            bearing: -10,
            attributionControl: false,
        });

        map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");

        // Custom Gold Marker
        const markerEl = document.createElement("div");
        markerEl.className = "amiana-marker-container";
        markerEl.innerHTML = `
            <div class="amiana-marker-pulse"></div>
            <div class="amiana-marker-core"></div>
        `;

        const marker = new mapboxgl.Marker({
            element: markerEl,
            draggable: true,
        })
            .setLngLat([lng, lat])
            .addTo(map);

        // Marker drag handler
        marker.on("dragend", () => {
            const lngLat = marker.getLngLat();
            setLat(Number(lngLat.lat.toFixed(6)));
            setLng(Number(lngLat.lng.toFixed(6)));
        });

        // Click on map to place pin
        map.on("click", (e) => {
            const newLng = Number(e.lngLat.lng.toFixed(6));
            const newLat = Number(e.lngLat.lat.toFixed(6));
            marker.setLngLat([newLng, newLat]);
            setLat(newLat);
            setLng(newLng);
        });

        map.on("load", () => {
            map.resize();
        });

        mapRef.current = map;
        markerRef.current = marker;

        return () => {
            map.remove();
            mapRef.current = null;
            markerRef.current = null;
        };
    }, [activeTab]);

    // Handle tab change resize
    useEffect(() => {
        if (activeTab === "location" && mapRef.current) {
            setTimeout(() => {
                mapRef.current?.resize();
            }, 100);
        }
    }, [activeTab]);

    // Geocoding Search via Mapbox API
    const handleSearchLocation = async (queryText: string) => {
        setSearchQuery(queryText);
        if (!queryText.trim() || queryText.trim().length < 3) {
            setSearchResults([]);
            setShowResultsDropdown(false);
            return;
        }

        const token = import.meta.env.VITE_MAPBOX_TOKEN || "";
        if (!token) {
            toast.add({
                description: "Mapbox token is missing in .env configuration.",
                type: "error",
            });
            return;
        }

        try {
            setIsSearching(true);
            const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                queryText
            )}.json?access_token=${token}&limit=5`;

            const res = await fetch(endpoint);
            const data = await res.json();

            if (data?.features) {
                setSearchResults(data.features);
                setShowResultsDropdown(true);
            }
        } catch (err) {
            console.error("Geocoding search failed:", err);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectLocation = (feature: GeocodingFeature) => {
        const [featureLng, featureLat] = feature.center;
        const newLng = Number(featureLng.toFixed(6));
        const newLat = Number(featureLat.toFixed(6));

        setLat(newLat);
        setLng(newLng);
        setLocationLabel(feature.place_name);
        setShowResultsDropdown(false);
        setSearchQuery(feature.place_name);

        if (mapRef.current && markerRef.current) {
            markerRef.current.setLngLat([newLng, newLat]);
            mapRef.current.flyTo({
                center: [newLng, newLat],
                zoom: 15,
                essential: true,
            });
        }

        toast.add({
            description: `Map pinned to: ${feature.place_name}`,
            type: "success",
        });
    };

    const handleResetToDefaultLocation = () => {
        setLat(location?.latitude || 0);
        setLng(location?.longitude || 0);
        setLocationLabel(location?.address || "");
        setSearchQuery("");

        if (mapRef.current && markerRef.current) {
            markerRef.current.setLngLat([location?.longitude || 0, location?.latitude || 0]);
            mapRef.current.flyTo({
                center: [location?.longitude || 0, location?.latitude || 0],
                zoom: 15,
                essential: true,
            });
        }

        toast.add({
            description: "Location reset to default.",
            type: "success",
        });
    };

    const copyCoordinates = () => {
        navigator.clipboard.writeText(`${lat}, ${lng}`);
        setCopiedCoords(true);
        setTimeout(() => setCopiedCoords(false), 2000);
        toast.add({
            description: "Coordinates copied to clipboard.",
            type: "success",
        });
    };


    return(
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Map Controls & Search */}
            <div className="lg:col-span-1 space-y-6">
                <section className="bg-white border border-[#ECE9E5] rounded-xl p-5 shadow-xs space-y-5">
                    <div>
                        <h2 className="title text-lg text-neutral-900 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            Mapbox Location Picker
                        </h2>
                        <p className="body-text text-xs text-neutral-500 mt-1">
                            Search for a city or address, drag the marker on the map, or click anywhere to pinpoint your exact coordinates.
                        </p>
                    </div>

                    {/* Search Location Input */}
                    <div className="relative">
                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                            Search Location (Mapbox Geocoding)
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => handleSearchLocation(e.target.value)}
                                placeholder="Type city, landmark, or street..."
                                className="w-full pl-9 pr-8 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            />
                            {isSearching && (
                                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-primary" />
                            )}
                            {searchQuery && !isSearching && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setShowResultsDropdown(false);
                                    }}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Autocomplete Results Dropdown */}
                        {showResultsDropdown && searchResults.length > 0 && (
                            <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-[#ECE9E5] rounded-md shadow-lg overflow-hidden max-h-56 overflow-y-auto custom-scrollbar">
                                {searchResults.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => handleSelectLocation(item)}
                                        className="w-full text-left px-3.5 py-2.5 hover:bg-[#FAF9F6] transition-colors border-b border-[#ECE9E5] last:border-b-0 cursor-pointer flex items-start gap-2.5"
                                    >
                                        <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <p className="body-text text-xs text-neutral-900 font-medium leading-snug">
                                                {item.place_name}
                                            </p>
                                            <span className="text-[10px] text-neutral-400 font-mono">
                                                {item.center[1].toFixed(4)}° N, {item.center[0].toFixed(4)}° E
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Coordinates Box */}
                    <div className="bg-[#FAF9F6] border border-[#ECE9E5] rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="uppercase body-text text-[10px] tracking-wider text-neutral-500 font-semibold">
                                Pinned Coordinates
                            </span>
                            <button
                                type="button"
                                onClick={copyCoordinates}
                                className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer"
                            >
                                {copiedCoords ? (
                                    <>
                                        <Check className="h-3 w-3" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3 w-3" />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] uppercase text-neutral-500 mb-1">
                                    Latitude
                                </label>
                                <input
                                    type="number"
                                    step="0.0001"
                                    value={lat}
                                    onChange={(e) => {
                                        const val = parseFloat(e.target.value) || 0;
                                        setLat(val);
                                        if (markerRef.current) markerRef.current.setLngLat([lng, val]);
                                    }}
                                    className="w-full px-2.5 py-1.5 bg-white border border-[#ECE9E5] rounded text-xs font-mono text-neutral-900"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase text-neutral-500 mb-1">
                                    Longitude
                                </label>
                                <input
                                    type="number"
                                    step="0.0001"
                                    value={lng}
                                    onChange={(e) => {
                                        const val = parseFloat(e.target.value) || 0;
                                        setLng(val);
                                        if (markerRef.current) markerRef.current.setLngLat([val, lat]);
                                    }}
                                    className="w-full px-2.5 py-1.5 bg-white border border-[#ECE9E5] rounded text-xs font-mono text-neutral-900"
                                />
                            </div>
                        </div>

                        <p className="body-text text-xs text-neutral-600 line-clamp-2">
                            <span className="font-semibold text-neutral-800">Address Label: </span>
                            {locationLabel}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                        {
                            isLocationChanged &&(
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleUpdateLocation}
                                    disabled={isUpdatingLocation}
                                    className="w-full text-xs uppercase tracking-wider border-[#ECE9E5] text-neutral-700 hover:bg-[#FAF9F6] cursor-pointer"
                                >
                                    {
                                        isUpdatingLocation?
                                        <>
                                            <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                                            Saving...
                                        </>
                                        :
                                        <>
                                            <Save className="h-3.5 w-3.5 mr-1.5" />
                                            Save Location
                                        </>
                                    }
                                </Button>
                            )
                        }
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleResetToDefaultLocation}
                            className="w-full text-xs uppercase tracking-wider border-[#ECE9E5] text-neutral-700 hover:bg-[#FAF9F6] cursor-pointer"
                        >
                            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                            Reset to Aberdeen Pin
                        </Button>

                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs text-neutral-600 hover:text-primary transition-colors text-center"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Verify on Google Maps
                        </a>
                    </div>
                </section>
            </div>

            {/* Map Container */}
            <div className="lg:col-span-2">
                <section className="bg-white border border-[#ECE9E5] rounded-xl overflow-hidden shadow-xs h-full flex flex-col">
                    {/* Map Card Header */}
                    <div className="px-5 py-3.5 border-b border-[#ECE9E5] flex flex-wrap items-center justify-between gap-2 bg-[#FAF9F6]">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs uppercase font-semibold tracking-wider text-neutral-800">
                                Interactive Satellite & Standard Preview
                            </span>
                        </div>
                        <div className="text-[11px] text-neutral-500 flex items-center gap-1.5">
                            <Compass className="h-3.5 w-3.5 text-primary" />
                            Click map or drag the gold pin to reposition
                        </div>
                    </div>

                    {/* Map Canvas */}
                    <div className="relative w-full h-[460px] sm:h-[540px] ">
                        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

                        {/* Map Overlay Badge */}
                        <div className="absolute bottom-4 left-4 z-10 pointer-events-none bg-[#161513]/90 backdrop-blur-md border border-[#B38F5B]/50 px-3.5 py-2 rounded-sm shadow-xl max-w-xs text-white">
                            <span className="text-[10px] text-[#B38F5B] uppercase tracking-[0.15em] font-semibold block">
                                Active Pin
                            </span>
                            <p className="text-xs font-medium text-white truncate mt-0.5">
                                {locationLabel}
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default LocationSettingsTab;