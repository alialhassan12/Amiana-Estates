import { useQuery } from "@tanstack/react-query";
import { getDesignPhilosophy } from "../services/designPhilosophyService";

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