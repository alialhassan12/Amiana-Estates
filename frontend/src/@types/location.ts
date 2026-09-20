export interface LocationData {
    id: number;
    title: string;
    subTitle: string;
    description?: string | null;
    address: string;
    latitude: string;
    longitude: string;
    map_zoom: number;
    created_at?: string;
    updated_at?: string;
}
