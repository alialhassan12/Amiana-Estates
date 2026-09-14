import { useQuery } from "@tanstack/react-query"
import { getEstateExperience } from "../services/EstateExperienceService"

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