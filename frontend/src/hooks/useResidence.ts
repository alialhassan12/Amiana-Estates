import { useQuery } from "@tanstack/react-query"
import { getResidence } from "../services/residenceService"

export const residenceKeys={
    all:['residences'],
}

export const useGetResidence=(enabled:boolean=true)=>{
    return useQuery({
        queryKey:residenceKeys.all,
        queryFn:()=> getResidence(),
        enabled
    })
}