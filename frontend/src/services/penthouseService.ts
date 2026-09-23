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

export const editPenthouse=async({
    title,
    subTitle,
    description,
}:{
    title:string;
    subTitle:string;
    description:string;
})=>{
    try {
        const response=await axiosInstance.put('/penthouse/edit',{title,subTitle,description});
        return response.data;
    } catch (error:any) {
        console.log(error?.response?.data);
        throw error.response?.data?.message || error.message;
    }
}

export const addPenthouseMedia=async(data:FormData)=>{
    try {
        const response=await axiosInstance.post('/penthouse/media/insert',data,{
            headers:{
                'Content-Type':'multipart/form-data',
            }
        });
        return response.data;
    } catch (error:any) {
        console.log(error?.response?.data);
        throw error.response?.data?.message || error.message;
    }
}

export const deletePenthouseMedia=async(id:number)=>{
    try {
        const response=await axiosInstance.post(`/penthouse/media/delete/${id}`);
        return response.data;
    } catch (error:any) {
        console.log(error?.response?.data);
        throw error.response?.data?.message || error.message;
    }
}