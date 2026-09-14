import axiosInstance from "../lib/axios";

export const getEstateExperience = async () => {
    try{
        const response = await axiosInstance.get('/estate-experience');
        return response.data;
    }catch(error:any){
        console.log(error?.response?.data);
        throw error;
    }
}