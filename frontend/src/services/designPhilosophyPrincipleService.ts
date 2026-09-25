import axiosInstance from "../lib/axios";

export const addPhilosophyPrinciple=async({design_philosophy_id,title,description}:{
    design_philosophy_id:number;
    title:string;
    description?:string
})=>{
    try {
        const response=await axiosInstance.post('/design-philosophy/principles/create',{
            design_philosophy_id,
            title,
            description
        });
        return response.data;
    } catch (error:any) {
        console.log("error in adding philosophy principle",error);
        throw error.response.data.message || error.message;
    }
}

export const deletePhilosophyPrinciple=async(id:number)=>{
    try {
        const response=await axiosInstance.delete(`/design-philosophy/principles/delete/${id}`);
        return response.data;
    } catch (error:any) {
        console.log("error in deleting philosophy principle",error);
        throw error.response.data.message || error.message;
    }
}

export const updatePhilosophyPrinciple=async({
    id,
    design_philosophy_id,
    title,
    description
}:{
    id:number;
    design_philosophy_id:number;
    title:string;
    description?:string
})=>{
    try {
        const response=await axiosInstance.put(`/design-philosophy/principles/update`,{
            id,
            design_philosophy_id,
            title,
            description
        });

        return response.data;
    } catch (error:any) {
        console.log("error in updating philosophy principle",error);
        throw error.response.data.message || error.message;
    }
}