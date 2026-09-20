import axiosInstance from "../lib/axios";

export const getSocials=async()=>{
    try {
        const response=await axiosInstance.get("/socials");
        return response.data.socials;
    } catch (error:any) {
        console.log("Socials Error: ", error.response.data.message);
        throw Error(error.response.data.message);
    }
}