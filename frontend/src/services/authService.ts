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
        
    } catch (error: any) {
        const message = error?.response?.data?.message || "Failed to log in. Please check your credentials.";
        toast.add({
            description: message,
            type: 'error'
        });
        throw error;
    }
}

export const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }
    const response = await axiosInstance.get('/auth/check');
    return response.data.user;
}

export const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return null;
        }
        const response = await axiosInstance.post('/logout');
        return response.data.user;
    } finally {
        localStorage.removeItem('token');
    }
}

export type UpdatePasswordType={
    current_password:string,
    new_password:string,
    confirm_password:string
}

export const updatePassword=async(data:UpdatePasswordType)=>{
    try {
        const response=await axiosInstance.put('/settings/password/update',data);
        return response.data.user;
    } catch (error: any) {
        throw error;
    }
}