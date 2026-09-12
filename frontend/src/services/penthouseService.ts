import axiosInstance from "../lib/axios"

export const getPenthouse= async()=>{
    try {
        const response=await axiosInstance.get('/penthouse');
        return response.data;
    } catch (error:any) {
        console.log(error?.response?.data);
        throw error.response?.data?.message || error.message;
    }
}