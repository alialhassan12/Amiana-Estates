import axiosInstance from "../lib/axios";

export const getHero=async()=>{
    try {
        const response=await axiosInstance.get('/hero');
        return response.data;
    } catch (error:any) {
        console.log(error?.response?.data);
        return null;
    }
}