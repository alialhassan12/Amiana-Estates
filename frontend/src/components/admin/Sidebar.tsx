import { 
    Building, 
    BuildingComplex, 
    Compass, 
    Home, 
    House, 
    Houses, 
    LayoutDashboard, 
    Loader2, 
    LogOut, 
    Shapes, 
    X 
} from "lucide-react";
import { useGetHero } from "../../hooks/useHero";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";

export interface SidebarProps {
    open: boolean;
    onClose?: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
    const { data } = useGetHero();
    const companyName = data?.hero?.name;

    const location = useLocation();
    const path = location.pathname;

    const {mutateAsync,isPending:isLoggingOut}=useLogout();
    const handleLogout=async()=>{
        try {
            await mutateAsync();
        } catch (error) {
            console.log(error);
        }
    }

    const sidebarGroups = [
        {
            title: "Overview",
            items: [
                {
                    title: "Dashboard",
                    href: "/",
                    path: "/dashboard",
                    icon: LayoutDashboard
                }
            ]
        },
        {
            title: "Website",
            items: [
                {
                    title: "Home",
                    href: "/home",
                    path: "/dashboard/home",
                    icon: Home
                },
                {
                    title: "Estate",
                    href: "/estate",
                    path: "/dashboard/estate",
                    icon: BuildingComplex
                },
                {
                    title: "Residences",
                    href: "/residences",
                    path: "/dashboard/residences",
                    icon: Building
                },
                {
                    title: "Penthouse",
                    href: "/penthouse",
                    path: "/dashboard/penthouse",
                    icon: House
                },
                {
                    title: "Experience",
                    href: "/experience",
                    path: "/dashboard/experience",
                    icon: Compass
                }
            ]
        },
        {
            title: "Properties",
            items: [
                {
                    title: "Property Types",
                    href: "/property-types",
                    path: "/dashboard/property-types",
                    icon: Shapes
                },
                {
                    title: "Properties",
                    href: "/properties",
                    path: "/dashboard/properties",
                    icon: Houses
                }
            ]
        }
    ];

    const handleNavClick = () => {
        if (window.innerWidth < 1024 && onClose) {
            onClose();
        }
    };

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300 ${
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Sidebar Container */}
            <aside
                className={`
                    fixed top-0 left-0 z-50 h-screen bg-white
                    transition-all duration-300 ease-in-out
                    w-72 max-w-[85vw] border-r border-[#ECE9E5] shadow-2xl
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:sticky lg:top-0 lg:z-30 lg:shadow-none lg:translate-x-0 lg:shrink-0 lg:self-start
                    ${
                        open
                            ? "lg:w-64 xl:w-72 lg:border-r lg:border-[#ECE9E5] lg:opacity-100"
                            : "lg:w-0 lg:border-r-0 lg:overflow-hidden lg:opacity-0 lg:pointer-events-none"
                    }
                `}
            >
                {/* Inner Fixed-Width Wrapper to prevent squishing during width transition */}
                <div className="w-72 lg:w-64 xl:w-72 h-full flex flex-col justify-between overflow-hidden">
                    {/* Header */}
                    <div className="flex flex-row items-center justify-between border-b border-[#ECE9E5] py-4 px-6 shrink-0">
                        <div className="flex flex-col group text-left">
                            <h2 className="body-text uppercase tracking-wider text-base sm:text-lg text-neutral-900 group-hover:text-primary transition-colors">
                                {companyName || "AMIANA ESTATES"}
                            </h2>
                            <div className="flex flex-row items-center gap-1.5">
                                <span className="uppercase body-text text-[10px] sm:text-[11px] text-primary tracking-wider font-medium">aberdeen</span>
                                <span className="w-1 h-1 rounded-full bg-primary/70"></span>
                                <span className="uppercase body-text text-[10px] sm:text-[11px] text-primary tracking-wider font-medium">sierra leone</span>
                            </div>
                        </div>

                        {/* Mobile Close Button */}
                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="lg:hidden p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-[#E9E8E5] transition-colors focus:outline-none cursor-pointer"
                                aria-label="Close sidebar"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {/* Navigation Groups*/}
                    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
                        {sidebarGroups.map((group, index) => {
                            return (
                                <div className="flex flex-col mt-4" key={index}>
                                    <p className="uppercase body-text tracking-widest text-xs text-primary px-2 mb-2 font-medium">
                                        {group.title}
                                    </p>
                                    <div className="flex flex-col gap-1.5">
                                        {group.items.map((item, i) => {
                                            const Icon = item.icon;
                                            const isActive = path === item.path;

                                            return (
                                                <Link
                                                    to={item.path}
                                                    onClick={handleNavClick}
                                                    className={`flex flex-row px-3 py-2 items-center gap-2.5 group cursor-pointer hover:bg-[#E9E8E5] transition-all duration-200 rounded-sm ${
                                                        isActive
                                                            ? "bg-[#E9E8E5] border-l-2 border-primary font-bold text-neutral-900"
                                                            : "text-neutral-700 hover:text-neutral-900"
                                                    }`}
                                                    key={i}
                                                >
                                                    {Icon && (
                                                        <Icon
                                                            className={`h-4 w-4 shrink-0 transition-colors ${
                                                                isActive ? "text-primary" : "text-neutral-900 group-hover:text-primary"
                                                            }`}
                                                        />
                                                    )}
                                                    <p className="uppercase body-text tracking-widest text-xs truncate">
                                                        {item.title}
                                                    </p>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                        {/* Logout */}
                        <div onClick={handleLogout} className="flex flex-row items-center gap-2.5 px-3 py-2 group cursor-pointer hover:bg-[#E9E8E5] transition-all duration-200 rounded-sm">
                            {isLoggingOut? <Loader2 className="h-4 w-4 shrink-0 transition-colors text-neutral-700 hover:text-neutral-900"/>:<LogOut className="h-4 w-4 shrink-0 transition-colors text-neutral-700 hover:text-neutral-900"/>}
                            <p className="uppercase body-text tracking-widest text-xs truncate">
                                {isLoggingOut?'Logging out...':'Logout'}
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;