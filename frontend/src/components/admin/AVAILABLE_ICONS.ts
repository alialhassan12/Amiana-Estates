import {
    ArrowUpDown,
    BadgeCheck,
    Car,
    CircleParking,
    Coffee,
    Compass,
    Droplet,
    Dumbbell,
    Eye,
    Flame,
    Key,
    Lock,
    PhoneCall,
    Shield,
    Sparkles,
    Store,
    Sun,
    Trees,
    Tv,
    Video,
    Waves,
    Wifi,
    Wind,
    Zap,
    type LucideIcon,
} from "lucide-react";

export type AvailableIconItem = {
    name: string;
    label: string;
    icon: LucideIcon;
};

export const AVAILABLE_ICONS: AvailableIconItem[] = [
    { name: "CircleParking", label: "Parking", icon: CircleParking },
    { name: "Shield", label: "Security", icon: Shield },
    { name: "Video", label: "CCTV", icon: Video },
    { name: "ArrowUpDown", label: "Elevator", icon: ArrowUpDown },
    { name: "PhoneCall", label: "Intercom", icon: PhoneCall },
    { name: "Zap", label: "Power / Generator", icon: Zap },
    { name: "Droplet", label: "Water Supply", icon: Droplet },
    { name: "Wifi", label: "Fiber Internet", icon: Wifi },
    { name: "Eye", label: "Views / Sight", icon: Eye },
    { name: "Store", label: "Supermarket / Retail", icon: Store },
    { name: "Key", label: "Key Access", icon: Key },
    { name: "Lock", label: "Private Lock", icon: Lock },
    { name: "Car", label: "Garage / Valet", icon: Car },
    { name: "Waves", label: "Pool / Coastline", icon: Waves },
    { name: "Flame", label: "Fire / Heating", icon: Flame },
    { name: "Coffee", label: "Cafe / Lounge", icon: Coffee },
    { name: "Dumbbell", label: "Gym / Fitness", icon: Dumbbell },
    { name: "Sparkles", label: "Concierge / Luxury", icon: Sparkles },
    { name: "Trees", label: "Gardens / Nature", icon: Trees },
    { name: "Compass", label: "Location", icon: Compass },
    { name: "Wind", label: "Ventilation / AC", icon: Wind },
    { name: "Sun", label: "Solar / Sun Deck", icon: Sun },
    { name: "Tv", label: "Entertainment", icon: Tv },
    { name: "BadgeCheck", label: "Certified / Quality", icon: BadgeCheck },
];

export const ICON_MAP: Record<string, LucideIcon> = AVAILABLE_ICONS.reduce((acc, item) => {
    acc[item.name] = item.icon;
    return acc;
}, {} as Record<string, LucideIcon>);

export const getAvailableIcon = (name?: string): LucideIcon | undefined => {
    if (!name) return undefined;
    return ICON_MAP[name];
};
