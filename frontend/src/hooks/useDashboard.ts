import { useQuery } from "@tanstack/react-query";
import { getDashboardLogs, getDashboardStats } from "../services/dashboardService";
import type { DashboardLogsResponse } from "../@types/activityLog";

export const dashboardKeys = {
    all: ["dashboard"] as const,
    stats: () => [...dashboardKeys.all, "stats"] as const,
    logs: () => [...dashboardKeys.all, "logs"] as const,
};

export const useGetDashboardStats = () => {
    return useQuery({
        queryKey: dashboardKeys.stats(),
        queryFn: getDashboardStats,
    });
};

export const useGetDashboardLogs = () => {
    return useQuery<DashboardLogsResponse>({
        queryKey: dashboardKeys.logs(),
        queryFn: getDashboardLogs,
    });
};