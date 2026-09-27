import axiosInstance from "../lib/axios";

export const getDifference=async()=>{
    try {
        const response=await axiosInstance.get('/difference');
        return response.data;
    } catch (error: any) {
        console.log("error in fetching difference",error?.response?.data?.message || error?.message);
        throw error?.response?.data?.message || error?.message;
    }
}

export const updateDifference=async(data:FormData)=>{
    try {
        const response=await axiosInstance.put('/difference/update',data,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        return response.data;
    } catch (error: any) {
        console.log("error in updating difference",error?.response?.data?.message || error?.message);
        throw error?.response?.data?.message || error?.message;
    }
}