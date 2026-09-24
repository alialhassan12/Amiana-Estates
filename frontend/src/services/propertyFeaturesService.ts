import axiosInstance from "../lib/axios";

export const getPropertyFeatures = async (page: number = 1, searchQuery?: string, type?: number | null) => {
    try {
        const response = await axiosInstance.get(`/property/features?page=${page}&search=${searchQuery ?? ""}&type=${type ?? ""}`);
        return response.data;
    } catch (error: any) {
        console.log("error getting property features", error);
        throw error;
    }
};

export const addPropertyFeature = async (data: {
    property_type_id: number;
    title: string;
    value: string;
}) => {
    try {
        const response = await axiosInstance.post("/property/features/create", data);
        return response.data;
    } catch (error: any) {
        console.log("error adding property feature:", error);
        throw error;
    }
};

export const deletePropertyFeature = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/property/feature/delete/${id}`);
        return response.data;
    } catch (error: any) {
        console.log("error deleting property feature:", error);
        throw error;
    }
};

export const editPropertyFeature=async(data:{
    id:number;
    property_type_id:number;
    title:string;
    value:string;
})=>{
    try {
        const response = await axiosInstance.put(`/property/feature/edit`, data);
        return response.data;
    } catch (error: any) {
        console.log("error editing property feature:", error.response?.data);
        throw error;
    }
};