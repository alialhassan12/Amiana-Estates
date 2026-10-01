export interface ActivityLogUser {
    id: number;
    name: string;
    email: string;
}

export interface ActivityLog {
    id: number;
    user_id: number | null;
    action: "created" | "updated" | "deleted" | string;
    entity_type: string;
    entity_id: number | null;
    description: string;
    created_at: string;
    updated_at: string;
    user?: ActivityLogUser | null;
}

export interface DashboardLogsResponse {
    message: string;
    activityLogs: ActivityLog[];
}
