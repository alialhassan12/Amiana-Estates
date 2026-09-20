import { useQuery } from "@tanstack/react-query";
import { getLocation } from "../services/locationService";

export const locationKeys={
    all:['location'],
};

export const useGetLocation=(enabled:boolean=true)=>{
    return useQuery({
        queryKey:locationKeys.all,
        queryFn:()=>getLocation(),
        enabled,
    })
}