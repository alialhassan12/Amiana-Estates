import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addExperienceSpecification, deleteExperienceSpecification, editExperienceSpecification, getExperienceSpecifications } from "../services/ExperienceSpecificationsService"
import { estateExperienceKeys } from "./useEstateExperience"
import type { AddExperienceSpecificationFormData } from "../schemas/addExperienceSpecification"
import type { EditExperienceSpecificationFormData } from "../schemas/editExperienceSpecificationSchema"

export const experienceSpecificationsKeys={
    all:['experience-specifications'],
    list:(page:number,search:string)=> [...experienceSpecificationsKeys.all,'list',page,search]
}

export const useGetExperienceSpecifications=(page:number=1,search:string)=>{
    return useQuery({
        queryKey:experienceSpecificationsKeys.list(page,search),
        queryFn:()=>getExperienceSpecifications(search,page),
    })
}

export const useAddExperienceSpecification=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(data:AddExperienceSpecificationFormData)=>addExperienceSpecification(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:experienceSpecificationsKeys.all});
            queryClient.invalidateQueries({queryKey:estateExperienceKeys.all});
        }
    })
}

export const useDeleteExperienceSpecification=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(id:number)=>deleteExperienceSpecification(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:experienceSpecificationsKeys.all});
            queryClient.invalidateQueries({queryKey:estateExperienceKeys.all});
        }
    })
}

export const useEditExperienceSpecification=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(data:EditExperienceSpecificationFormData)=>editExperienceSpecification(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:experienceSpecificationsKeys.all});
            queryClient.invalidateQueries({queryKey:estateExperienceKeys.all});
        }
    })
}