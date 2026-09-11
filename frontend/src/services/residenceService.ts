import axiosInstance from "../lib/axios";

export const getResidence=async()=>{
    try {
        const response=await axiosInstance.get(`/residences`);
        return response.data.data;
    } catch (error:any) {
        console.log(error?.response?.data);
        throw error;
    }
}