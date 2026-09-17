import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getHero, updateHero } from "../services/heroService"

export const heroKeys={
    all:['hero']
}

export const useGetHero=()=>{
    return useQuery({
        queryKey:heroKeys.all,
        queryFn:()=> getHero(),
    })
}

export const useUpdateHero=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => updateHero(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: heroKeys.all });
        }
    });
}