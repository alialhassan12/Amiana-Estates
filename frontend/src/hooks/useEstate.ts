import { useQuery } from "@tanstack/react-query"
import { getEstate } from "../services/EstateService";

export const estateKeys={
    all:['estate']
}

export const useGetEstate=(enabled:boolean=true)=>{
    return useQuery({
        queryKey:estateKeys.all,
        queryFn:()=>getEstate(),
        enabled
    });
}