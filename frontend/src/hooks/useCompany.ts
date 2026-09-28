import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCompanyInfo, updateCompanyInfo, updateContactInfo } from "../services/companyService";
import { heroKeys } from "./useHero";

export const companyKeys={
    all:['company'] as const,
}

export const useGetCompanyInfo=(enabled:boolean=true)=>{
    return useQuery({
        queryKey:companyKeys.all,
        queryFn:()=>getCompanyInfo(),
        enabled:enabled,
    })
}

export const useUpdateCompany=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(formData:FormData)=>updateCompanyInfo(formData),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:companyKeys.all});
            queryClient.invalidateQueries({queryKey:heroKeys.all});
        }
    })
}

export const useUpdateContactInfo=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(contactData:{contact_email:string,contact_phone:string})=>updateContactInfo(contactData),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:companyKeys.all});
            queryClient.invalidateQueries({queryKey:heroKeys.all});
        }
    })
}