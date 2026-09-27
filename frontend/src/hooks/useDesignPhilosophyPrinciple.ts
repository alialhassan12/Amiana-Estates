import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPhilosophyPrinciple, deletePhilosophyPrinciple, updatePhilosophyPrinciple } from "../services/designPhilosophyPrincipleService";
import { designPhilosophyKeys } from "./useDesignPhilosophy";

export const designPhilosophyPrincipleKeys={
    all:['design-philosophy-principle'],
}

export const useAddPhilosophyPrinciple=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:({design_philosophy_id,title,description}:{
            design_philosophy_id:number;
            title:string;
            description?:string
        })=>addPhilosophyPrinciple({design_philosophy_id,title,description}),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:designPhilosophyPrincipleKeys.all});
            queryClient.invalidateQueries({queryKey:designPhilosophyKeys.all});
        },
    })
}

export const useDeletePhilosophyPrinciple=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(id:number)=>deletePhilosophyPrinciple(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:designPhilosophyPrincipleKeys.all});
            queryClient.invalidateQueries({queryKey:designPhilosophyKeys.all});
        },
    })
}

export const useUpdatePhilosophyPrinciple=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:({
            id,
            design_philosophy_id,
            title,
            description
        }:{
            id:number;
            design_philosophy_id:number;
            title:string;
            description?:string
        })=>updatePhilosophyPrinciple({id,design_philosophy_id,title,description}),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:designPhilosophyPrincipleKeys.all});
            queryClient.invalidateQueries({queryKey:designPhilosophyKeys.all});
        },
    })
}