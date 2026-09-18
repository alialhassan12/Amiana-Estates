import axiosInstance from "../lib/axios";

export const getResidence = async () => {
    try {
        const response = await axiosInstance.get(`/residences`);
        return response.data.data;
    } catch (error: any) {
        console.log(error?.response?.data);
        throw error;
    }
};

export const updateResidence = async (data:{ id: string; title: string; subTitle: string }) => {
    try {
        const response = await axiosInstance.put('/residences/update', data);
        return response.data;
    } catch (error: any) {
        console.log(error?.response?.data);
        throw error;
    }
};