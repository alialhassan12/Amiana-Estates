import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addSocial, deleteSocial, getSocials, updateSocial } from "../services/socialsService"

export const socialKeys = {
    all: ['socials']
}

export const useGetSocials = (enabled: boolean = true) => {
    return useQuery({
        queryKey: socialKeys.all,
        queryFn: () => getSocials(),
        enabled
    });
};

export const useAddSocial=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:({label,url}:{
            label:string,
            url:string,
        })=>addSocial({label,url}),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:socialKeys.all,
            })
        }
    })
}

export const useEditSocial=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:({id,label,url}:{
            id:number,
            label:string,
            url:string,
        })=>updateSocial({id,label,url}),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:socialKeys.all,
            })
        }
    })
}

export const useDeleteSocial=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(id:number)=>deleteSocial(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:socialKeys.all,
            })
        }
    })
}