
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../services/dashboardService";

export const dashboardKeys={
    all:["dashboard"]
}

export const useGetDashboardStats = () => {
    return useQuery({
        queryKey: dashboardKeys.all,
        queryFn: getDashboardStats,
    });
}