import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDesignPhilosophy, updateDesignPhilosophy } from "../services/designPhilosophyService";

export const designPhilosophyKeys={
    all:['design-philosophy'],
};

export const useGetDesignPhilosophy=(enabled:boolean=true)=>{
    return useQuery({
        queryKey:designPhilosophyKeys.all,
        queryFn:()=>getDesignPhilosophy(),
        enabled,
    })
}

export const useUpdateDesignPhilosophy=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(data:FormData)=>updateDesignPhilosophy(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:designPhilosophyKeys.all});
        },
    })
}