import axiosInstance from "../lib/axios"

export const getEstate=async()=>{
    try {
        const response=await axiosInstance.get('/estate');
        return response.data.data;
    } catch (error:any) {
        console.log(error?.response?.data);
        throw error;
    }
}