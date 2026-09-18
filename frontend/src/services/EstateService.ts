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

export const updateEstate=async(formData:FormData)=>{
    try {
        const response=await axiosInstance.put('/estate/update',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        return response.data;
    } catch (error:any) {
        console.log(error?.response?.data);
        throw error;
    }
}