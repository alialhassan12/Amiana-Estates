import axiosInstance from "../lib/axios"

export const getDesignPhilosophy = async()=>{
    try {
        const response=await axiosInstance.get('/design-philosophy');
        return response.data.design_philosophy;
    } catch (error:any) {
        console.log("error in getting design philosophy",error);
        throw error.response.data.message || error.message;
    }
}

export const updateDesignPhilosophy = async (data:FormData)=>{
    try {
        const response = await axiosInstance.put(`/design-philosophy/update`,data,{
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error: any) {
        console.log("error in updating design philosophy", error);
        throw error.response?.data?.message || error.message || error;
    }
}