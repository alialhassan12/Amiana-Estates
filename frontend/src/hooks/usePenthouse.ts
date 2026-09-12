import { useQuery } from "@tanstack/react-query"
import { getPenthouse } from "../services/penthouseService"

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