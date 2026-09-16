import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { checkAuth, login, logout, type LoginType } from "../services/authService";
import type { User } from "../@types/user";
import axios from "axios";

export const authKeys={
    user:['user'] as const,
}


export const useAuth=()=>{
    return useQuery<User| null>({
        queryKey:authKeys.user,
        queryFn:async()=>{
            try{
                return await checkAuth();
            }catch(error){
                if(axios.isAxiosError(error) &&(error.response?.status ===401 || error.response?.status ===419)){
                    await localStorage.removeItem('token');
                    return null;
                }
                throw error;
            }
        },
        retry:false,
        staleTime:5*60*1000
    })
}

export const useLogin=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(credentials:LoginType)=>login(credentials),
        onSuccess:(user)=>{
            queryClient.setQueryData<User>(authKeys.user, user as User);
        },
        onError:()=>{
            queryClient.setQueryData<User>(authKeys.user, null);
        }
    })
}

export const useLogout=()=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:()=>logout(),
        onSuccess:()=>{
            queryClient.setQueryData<User>(authKeys.user, null);
        }
    })
}
