import axiosInstance from "../lib/axios"
import type { AddExperienceSpecificationFormData } from "../schemas/addExperienceSpecification";
import type { EditExperienceSpecificationFormData } from "../schemas/editExperienceSpecificationSchema";

export const getExperienceSpecifications=async(searchQuery:string,page:number=1)=>{
    try {
        const response=await axiosInstance.get(`/estate-experience-specifications/?search=${searchQuery}&page=${page}`);
        return response.data;
    } catch (error:any) {
        console.log(error?.response?.data);
        throw error;
    }
}

export const addExperienceSpecification=async(data:AddExperienceSpecificationFormData)=>{
    try{
        const response=await axiosInstance.post("/estate-experience-specifications/create",data);
        return response.data;
    }catch(error:any){
        console.log(error?.response?.data);
        throw error;
    }
}

export const deleteExperienceSpecification=async(id:number)=>{
    try{
        const response=await axiosInstance.delete(`/estate-experience-specifications/delete/${id}`);
        return response.data;
    }catch(error:any){
        console.log(error?.response?.data);
        throw error;
    }
}

export const editExperienceSpecification=async(data:EditExperienceSpecificationFormData)=>{
    try{
        const response=await axiosInstance.put("/estate-experience-specifications/update",data);
        return response.data;
    }catch(error:any){
        console.log(error?.response?.data);
        throw error;
    }
}