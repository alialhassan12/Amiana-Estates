import { toast } from "../components/ui/toast";
import axiosInstance from "../lib/axios"

export type LoginType={
    email:string,
    password:string
}

export const login=async({
    email,
    password
}:LoginType)=>{
    try {
        const response=await axiosInstance.post('/login',{
            email,
            password
        });

        if(response.data.token){
            localStorage.setItem('token',response.data.token);
        }

        toast.add({
            description:response.data.message,
            type:'success'
        });

        return response.data.user;
        
    } catch (error:any) {
        console.log(error)
        toast.add({
            description:error.response.data.message,
            type:'error'
        })
        throw new Error(error.response.data.message)
    }
}

export const checkAuth=async()=>{
    try {
        const token = localStorage.getItem('token')
        if(!token){
            return null;
        }
        const response=await axiosInstance.get('/auth/check');
        return response.data.user;
    } catch (error:any) {
        console.log(error)
        throw new Error(error.response.data.message)
    }
}

export const logout=async()=>{
    try {
        const token = localStorage.getItem('token')
        if(!token){
            return null;
        }
        const response=await axiosInstance.post('/logout');
        localStorage.removeItem('token');
        return response.data.user;
    } catch (error:any) {
        console.log(error)
        throw new Error(error.response.data.message)
    }
}