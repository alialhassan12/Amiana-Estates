import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getEstateExperience, updateEstateExperience } from "../services/EstateExperienceService"

const estateExperienceKeys={
    all:['estate-experience'],
}

export const useGetEstateExperience=(enabled:boolean=true)=>{
    return useQuery({
        queryKey:estateExperienceKeys.all,
        queryFn:()=>getEstateExperience(),
        enabled,
    });
}

export const useUpdateEstateExperience=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(data:FormData)=>updateEstateExperience(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:estateExperienceKeys.all,
            })
        }
    })
}