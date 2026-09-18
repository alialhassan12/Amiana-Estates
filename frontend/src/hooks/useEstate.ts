import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getEstate, updateEstate } from "../services/EstateService";

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

export const useUpdateEstate=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(formData:FormData)=>updateEstate(formData),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:estateKeys.all});
        }
    });
}