import axiosInstance from "../lib/axios";

export const getLocation=async ()=>{
    try {
        const response = await axiosInstance.get('/location')
        return response.data.location;
    } catch (error:any) {
        console.log("Error in fetching location",error);
        throw new Error(error.response.data.message);
    }
}