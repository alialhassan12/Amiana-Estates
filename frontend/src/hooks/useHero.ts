import { useQuery } from "@tanstack/react-query"
import { getHero } from "../services/heroService"

export const heroKeys={
    all:['hero']
}

export const useGetHero=()=>{
    return useQuery({
        queryKey:heroKeys.all,
        queryFn:()=> getHero(),
    })
}