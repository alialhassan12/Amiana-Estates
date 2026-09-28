import axiosInstance from "../lib/axios";

export const getSocials=async()=>{
    try {
        const response=await axiosInstance.get("/socials");
        return response.data.socials;
    } catch (error:any) {
        console.log("Socials Error: ", error.response.data.message);
        throw Error(error.response.data.message);
    }
}

export const addSocial=async({label,url}:{
    label:string,
    url:string,
})=>{
    try {
        const response=await axiosInstance.post('/settings/socials/create',{label,url});
        return response.data.social;
    } catch (error:any) {
        console.log("Socials Error: ", error.response.data.message);
        throw Error(error.response.data.message);
    }
}

export const updateSocial=async({id,label,url}:{
    id:number,
    label:string,
    url:string,
})=>{
    try {
        const response=await axiosInstance.put(`/settings/socials/update`,{id,label,url});
        return response.data;
    } catch (error:any) {
        console.log("Socials Error: ", error.response.data.message);
        throw Error(error.response.data.message);
    }
}

export const deleteSocial=async(id:number)=>{
    try {
        const response=await axiosInstance.delete(`/settings/socials/delete/${id}`);
        return response.data;
    } catch (error:any) {
        console.log("Socials Error: ", error.response.data.message);
        throw Error(error.response.data.message);
    }
}