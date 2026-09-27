import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getDifference, updateDifference } from "../services/differenceService"

export const differenceKeys={
    all:['difference'],
    
}

export const useGetDifference=(enabled:boolean=true)=>{
    return useQuery({
        queryKey:differenceKeys.all,
        queryFn:()=>getDifference(),
        enabled
    })
}

export const useUpdateDifference=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(data:FormData)=>updateDifference(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:differenceKeys.all});
        }
    });
}