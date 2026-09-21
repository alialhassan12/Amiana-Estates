import axiosInstance from "../lib/axios"

export const getPropertyTypes=async(page:number=1,search?:string)=>{
    try {
        const response=await axiosInstance.get(`/property/types?page=${page}&search=${search}`);
        return response.data;
    } catch (error:any) {
        console.log("error fetching property types:",error);
        throw error;
    }
}

export const addPropertyType=async(data:FormData)=>{
    try{
        const response = await axiosInstance.post('/property/types/create',data,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }catch(error:any){
        console.log("error fetching property types:",error);
        throw error;
    }
}

export const editPropertyType= async(data:FormData)=>{
    try{
        const response = await axiosInstance.put('/property/types/edit',data);
        return response.data;
    }catch(error:any){
        console.log("error fetching property types:",error);
        throw error;
    }
}

export const deletePropertyType=async(id:number)=>{
    try{
        const response = await axiosInstance.delete(`/property/types/delete/${id}`);
        return response.data;
    }catch(error:any){
        console.log("error fetching property types:",error);
        throw error;
    }
}
