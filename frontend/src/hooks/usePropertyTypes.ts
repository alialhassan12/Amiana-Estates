import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addPropertyType, deletePropertyType, editPropertyType, getPropertyTypes, getPropertyTypesForFeatures } from "../services/propertyTypesService"
import { residenceKeys } from "./useResidence"

export const propertyTypeKeys={
    all:['property-types'] as const,
    list:(page:number,search?:string)=>(['property-types',page,search]) as const
}

export const useGetPropertyTypes=(page:number=1,search?:string)=>{
    return useQuery({
        queryKey:propertyTypeKeys.list(page,search),
        queryFn:()=>getPropertyTypes(page,search),
    })
}

export const useGetPropertyTypesForFeatures=()=>{
    return useQuery({
        queryKey:propertyTypeKeys.all,
        queryFn:()=>getPropertyTypesForFeatures(),
    })
}

export const useAddPropertyType=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(data:FormData)=>addPropertyType(data),
        onSuccess:async()=>{
            await Promise.all([
                queryClient.invalidateQueries({queryKey:propertyTypeKeys.all}),
                queryClient.invalidateQueries({queryKey:residenceKeys.all})
            ]);
        }
    })
}

export const useEditPropertyType=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(data:FormData)=>editPropertyType(data),
        onSuccess:async()=>{
            await Promise.all([
                queryClient.invalidateQueries({queryKey:propertyTypeKeys.all}),
                queryClient.invalidateQueries({queryKey:residenceKeys.all})
            ]);
        }
    })
}

export const useDeletePropertyType=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(id:number)=>deletePropertyType(id),
        onSuccess:async()=>{
            await Promise.all([
                queryClient.invalidateQueries({queryKey:propertyTypeKeys.all}),
                queryClient.invalidateQueries({queryKey:residenceKeys.all})
            ]);
        }
    })
}
