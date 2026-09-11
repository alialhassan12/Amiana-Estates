import { useQuery } from "@tanstack/react-query"
import { getEstate } from "../services/EstateService";

export const estateKeys={
    all:['estate']
}

export const useGetEstate=()=>{
    return useQuery({
        queryKey:estateKeys.all,
        queryFn:()=>getEstate()
    });
}