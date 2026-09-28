import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLocation, updateLocation } from "../services/locationService";

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

export const useUpdateLocation=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(locationData:{
            latitude:number,
            longitude:number,
            address:string
        })=>updateLocation(locationData),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:locationKeys.all,
            })
        }
    })
}