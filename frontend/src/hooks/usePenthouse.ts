import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addPenthouseMedia, deletePenthouseMedia, editPenthouse, getPenthouse } from "../services/penthouseService"

export const penthouseKeys={
    all:["penthouse"]
}

export const useGetPenthouse=(enabled:boolean=true)=>{
    return useQuery({
        queryKey:penthouseKeys.all,
        queryFn:()=>getPenthouse(),
        enabled
    })
}

export const useEditPenthouse=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:({title,subTitle,description}:{
            title:string;
            subTitle:string;
            description:string;
        })=>editPenthouse({title,subTitle,description}),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:penthouseKeys.all});
        }
    })
}

export const useAddPenthouseMedia=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(data:FormData)=>addPenthouseMedia(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:penthouseKeys.all});
        }
    })
}


export const useDeletePenthouseMedia=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(id:number)=>deletePenthouseMedia(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:penthouseKeys.all});
        }
    })
}
