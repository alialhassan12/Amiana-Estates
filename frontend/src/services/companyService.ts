import axiosInstance from "../lib/axios"

export const getCompanyInfo=async()=>{
    try {
        const response=await axiosInstance.get('/settings/company');
        return response?.data?.company;
    } catch (error) {
        throw error;
    }
}

export const updateCompanyInfo=async(formData:FormData)=>{
    try {
        const response=await axiosInstance.put('/settings/company/update',formData,{
            headers:{
                'Content-Type':'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateContactInfo=async(contactData:{
    contact_email:string,
    contact_phone:string
})=>{
    try {
        const response=await axiosInstance.put('/settings/company/update/contact',contactData);
        return response.data;
    } catch (error) {
        throw error;
    }
}