import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    Activity,
    ArchiveRestore,
    ArrowUpRight,
    Building,
    Building2,
    Calendar,
    CheckCircle2,
    Clock,
    Compass,
    Crown,
    Gem,
    Home,
    Layers,
    Layout,
    ListChecks,
    MapPin,
    Pencil,
    Plus,
    RefreshCw,
    Share2,
    Sparkles,
    Trash2,
    User,
} from "lucide-react";
import { useGetDashboardLogs, useGetDashboardStats } from "../../hooks/useDashboard";
import type { ActivityLog } from "../../@types/activityLog";

// Helper to format relative time
const formatRelativeTime = (dateStr?: string) => {
    if (!dateStr) return "Recently";
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;

        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 45) return "Just now";
        if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes}m ago`;
        }
        if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours}h ago`;
        }
        if (diffInSeconds < 604800) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days}d ago`;
        }

        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }).format(date);
    } catch {
        return dateStr;
    }
};

// Helper to format exact date for tooltip
const formatExactDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        }).format(date);
    } catch {
        return dateStr;
    }
};

// Map entity type to dashboard route
const getEntityRoute = (entityType: string): { path: string; label: string } | null => {
    switch (entityType) {
        case "Estate":
            return { path: "/dashboard/estate", label: "Estate" };
        case "Residence":
            return { path: "/dashboard/residences", label: "Residences" };
        case "Penthouse":
        case "PenthouseMedia":
            return { path: "/dashboard/penthouse", label: "Penthouse" };
        case "EstateExperience":
            return { path: "/dashboard/experience", label: "Experience" };
        case "ExperienceSpecification":
            return { path: "/dashboard/experience-specifications", label: "Specifications" };
        case "DesignPhilosophy":
            return { path: "/dashboard/design-philosophy", label: "Philosophy" };
        case "Difference":
            return { path: "/dashboard/difference", label: "Difference" };
        case "PropertyType":
            return { path: "/dashboard/property-types", label: "Property Types" };
        case "PropertyFeature":
            return { path: "/dashboard/property-features", label: "Property Features" };
        case "Company":
            return { path: "/dashboard/settings", label: "Settings" };
        case "Hero":
            return { path: "/dashboard/home", label: "Home" };
        case "Social":
        case "Location":
            return { path: "/dashboard/settings", label: "Settings" };
        default:
            return null;
    }
};

// Map entity type to an icon component
const getEntityIcon = (entityType: string) => {
    switch (entityType) {
        case "Estate":
            return Building2;
        case "Residence":
            return Home;
        case "Penthouse":
            return Crown;
        case "PenthouseMedia":
            return Sparkles;
        case "EstateExperience":
            return Compass;
        case "ExperienceSpecification":
            return ListChecks;
        case "DesignPhilosophy":
            return ArchiveRestore;
        case "Difference":
            return Gem;
        case "PropertyType":
            return Layers;
        case "PropertyFeature":
            return CheckCircle2;
        case "Hero":
            return Layout;
        case "Company":
            return Building;
        case "Social":
            return Share2;
        case "Location":
            return MapPin;
        default:
            return Activity;
    }
};

const Dashboard = () => {
    const {
        data: statsData,
        isLoading: isLoadingStats,
        isFetching: isFetchingStats,
    } = useGetDashboardStats();

    const {
        data: logsData,
        isLoading: isLoadingLogs,
        isFetching: isFetchingLogs,
        refetch: refetchLogs,
    } = useGetDashboardLogs();

    const [actionFilter, setActionFilter] = useState<"all" | "created" | "updated" | "deleted">("all");

    // All raw logs
    const activityLogs: ActivityLog[] = logsData?.activityLogs || [];

    // Filtered logs
    const filteredLogs = useMemo(() => {
        if (actionFilter === "all") return activityLogs;
        return activityLogs.filter(
            (log) => log.action?.toLowerCase() === actionFilter
        );
    }, [activityLogs, actionFilter]);

    // Current date display
    const currentDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date());

    const statCards = [
        {
            title: "Total Properties",
            subtitle: "Active residential portfolio",
            count: statsData?.totalProperties,
            icon: Building,
            href: "/dashboard/residences",
            accent: "from-amber-500/10 to-amber-500/0",
        },
        {
            title: "Property Types",
            subtitle: "Architectural categories",
            count: statsData?.totalPropertyTypes,
            icon: Layers,
            href: "/dashboard/property-types",
            accent: "from-primary/10 to-primary/0",
        },
        {
            title: "Penthouses",
            subtitle: "Signature sky collections",
            count: statsData?.totalPenthouses,
            icon: Crown,
            href: "/dashboard/penthouse",
            accent: "from-amber-600/10 to-amber-600/0",
        },
        {
            title: "Experience Specs",
            subtitle: "Curated estate features",
            count: statsData?.totalExperienceSpecifications,
            icon: ListChecks,
            href: "/dashboard/experience-specifications",
            accent: "from-neutral-500/10 to-neutral-500/0",
        },
    ];

    return (
        <div className="flex flex-col gap-8 w-full max-w-full pb-12">
            {/* Header Greeting */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#ECE9E5] pb-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#FAF9F6] border border-[#ECE9E5] text-[11px] font-mono text-neutral-600 mb-2">
                        <Calendar className="h-3 w-3 text-primary" />
                        <span>{currentDate}</span>
                    </div>
                    <h1 className="title text-2xl sm:text-3xl lg:text-4xl text-neutral-900 tracking-tight font-medium">
                        Welcome back, Administrator
                    </h1>
                    <p className="body-text text-xs sm:text-sm text-neutral-500 mt-1">
                        Executive overview of Amiana Estates operations, live inventory, and editorial audits.
                    </p>
                </div>


            </div>

            {/* Stat Cards Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card, index) => {
                    const IconComponent = card.icon;
                    return (
                        <Link
                            key={index}
                            to={card.href}
                            className="group relative flex flex-col justify-between p-5 sm:p-6 bg-white border border-[#ECE9E5] rounded-xl shadow-2xs hover:shadow-md hover:border-primary/40 transition-all duration-300 overflow-hidden"
                        >
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <div className="space-y-1">
                                    <h3 className="body-text text-xs font-semibold uppercase tracking-wider text-neutral-500">
                                        {card.title}
                                    </h3>
                                    <p className="body-text text-[11px] text-neutral-400">
                                        {card.subtitle}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shrink-0">
                                    <IconComponent className="h-5 w-5" />
                                </div>
                            </div>

                            <div className="flex items-baseline justify-between pt-2">
                                {isLoadingStats ? (
                                    <div className="h-9 w-16 bg-[#ECE9E5] rounded animate-pulse" />
                                ) : (
                                    <p className="title text-3xl sm:text-4xl text-neutral-900 font-semibold tracking-tight">
                                        {card.count ?? 0}
                                    </p>
                                )}
                                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-400 group-hover:text-primary transition-colors">
                                    <span>Manage</span>
                                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </section>

            {/* Recent Activity Logs Section */}
            <section className="bg-white border border-[#ECE9E5] rounded-xl shadow-2xs overflow-hidden">
                {/* Section Header */}
                <div className="px-5 sm:px-6 py-5 border-b border-[#ECE9E5] flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#FAF9F6]/60">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-neutral-900 text-[#FAF9F6] flex items-center justify-center shrink-0 shadow-2xs">
                            <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h2 className="title text-lg sm:text-xl text-neutral-900 tracking-tight font-medium">
                                Recent Activity Logs
                            </h2>
                        </div>
                    </div>

                    {/* Filter Pills & Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="inline-flex p-1 rounded-lg bg-[#ECE9E5]/50 border border-[#ECE9E5]">
                            {(
                                [
                                    { id: "all", label: "All" },
                                    { id: "updated", label: "Updated" },
                                    { id: "created", label: "Created" },
                                    { id: "deleted", label: "Deleted" },
                                ] as const
                            ).map((tab) => {
                                const isActive = actionFilter === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActionFilter(tab.id)}
                                        className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                                            isActive
                                                ? "bg-white text-neutral-900 shadow-xs"
                                                : "text-neutral-600 hover:text-neutral-900"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="divide-y divide-[#ECE9E5]">
                    {isLoadingLogs ? (
                        <div className="p-6 space-y-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="flex items-start gap-4 animate-pulse">
                                    <div className="w-9 h-9 rounded-full bg-[#ECE9E5] shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-1/3 bg-[#ECE9E5] rounded" />
                                        <div className="h-3 w-1/4 bg-[#ECE9E5] rounded" />
                                    </div>
                                    <div className="h-4 w-16 bg-[#ECE9E5] rounded" />
                                </div>
                            ))}
                        </div>
                    ) : filteredLogs.length === 0 ? (
                        <div className="p-12 text-center flex flex-col items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#ECE9E5] flex items-center justify-center text-neutral-400 mb-3">
                                <Activity className="h-6 w-6" />
                            </div>
                            <h3 className="title text-base text-neutral-800 font-medium">
                                No activity records found
                            </h3>
                            <p className="body-text text-xs text-neutral-500 max-w-sm mt-1">
                                {actionFilter !== "all"
                                    ? `There are no ${actionFilter} actions recorded in recent activity.`
                                    : "Recent administrator changes across models (Estate, Residences, Penthouses, Settings, etc.) will automatically appear here."}
                            </p>
                        </div>
                    ) : (
                        filteredLogs.map((log) => {
                            const action = log.action?.toLowerCase() || "updated";
                            const EntityIcon = getEntityIcon(log.entity_type);
                            const entityRoute = getEntityRoute(log.entity_type);
                            const exactTime = formatExactDate(log.created_at);
                            const relativeTime = formatRelativeTime(log.created_at);

                            // Action styles
                            const actionConfig = {
                                created: {
                                    badge: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
                                    iconBg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                                    icon: Plus,
                                    label: "Created",
                                },
                                updated: {
                                    badge: "bg-amber-50 text-amber-700 border-amber-200/80",
                                    iconBg: "bg-amber-500/10 text-amber-600 border-amber-500/20",
                                    icon: Pencil,
                                    label: "Updated",
                                },
                                deleted: {
                                    badge: "bg-rose-50 text-rose-700 border-rose-200/80",
                                    iconBg: "bg-rose-500/10 text-rose-600 border-rose-500/20",
                                    icon: Trash2,
                                    label: "Deleted",
                                },
                            }[action] || {
                                badge: "bg-neutral-100 text-neutral-700 border-neutral-200",
                                iconBg: "bg-neutral-100 text-neutral-600 border-neutral-200",
                                icon: Activity,
                                label: action,
                            };

                            const ActionIcon = actionConfig.icon;
                            const authorName = log.user?.name || "System Admin";

                            return (
                                <div
                                    key={log.id}
                                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF9F6]/60 transition-colors group"
                                >
                                    {/* Left: Icon & Description */}
                                    <div className="flex items-start sm:items-center gap-3.5">
                                        {/* Action Icon Badge */}
                                        <div
                                            className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs ${actionConfig.iconBg}`}
                                            title={`Action: ${actionConfig.label}`}
                                        >
                                            <ActionIcon className="h-4 w-4" />
                                        </div>

                                        <div className="space-y-1">
                                            {/* Description with high contrast readability */}
                                            <p className="body-text text-sm font-medium text-neutral-900 leading-snug">
                                                {log.description}
                                            </p>

                                            {/* Entity Badge and Author attribution */}
                                            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                                                {/* Entity Badge */}
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#FAF9F6] border border-[#ECE9E5] text-neutral-700">
                                                    <EntityIcon className="h-3 w-3 text-primary" />
                                                    <span>{log.entity_type}</span>
                                                </span>

                                                {/* Action pill */}
                                                <span
                                                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border uppercase tracking-wider ${actionConfig.badge}`}
                                                >
                                                    {actionConfig.label}
                                                </span>

                                                <span className="text-neutral-300">•</span>

                                                {/* Performed by */}
                                                <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500">
                                                    <User className="h-3 w-3 text-neutral-400" />
                                                    <span>{authorName}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* time and action link */}
                                    <div className="flex items-center justify-between sm:justify-end gap-3 pl-12 sm:pl-0 shrink-0">
                                        <div
                                            className="text-right flex items-center gap-1.5 text-xs text-neutral-400 body-text"
                                            title={exactTime}
                                        >
                                            <Clock className="h-3 w-3 text-neutral-400" />
                                            <span className="whitespace-nowrap">{relativeTime}</span>
                                        </div>

                                        {entityRoute && (
                                            <Link
                                                to={entityRoute.path}
                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-sm border border-[#ECE9E5] bg-white text-[11px] font-medium text-neutral-700 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all shadow-2xs opacity-80 group-hover:opacity-100 cursor-pointer"
                                                title={`Go to ${entityRoute.label} section`}
                                            >
                                                <span>View</span>
                                                <ArrowUpRight className="h-3 w-3" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

            </section>
        </div>
    );
};

export default Dashboard;