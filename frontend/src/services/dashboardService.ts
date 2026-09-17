import axiosInstance from "../lib/axios";

export const getDashboardStats = async () => {
    try {
        const response = await axiosInstance.get('/dashboard');
        return response.data;
    } catch (error: any) {
        console.log("dashboard error: ", error.response.data.message);
        return error.response.data.message;
    }
}