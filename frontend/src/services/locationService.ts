import axiosInstance from "../lib/axios";

export const getLocation=async ()=>{
    try {
        const response = await axiosInstance.get('/location')
        return response.data.location;
    } catch (error:any) {
        console.log("Error in fetching location",error);
        throw new Error(error.response.data.message);
    }
}

export const updateLocation=async(locationData:{latitude:number,longitude:number,address:string})=>{
    try {
        const response=await axiosInstance.put('/settings/location/update',{
            address:locationData.address,
            latitude:locationData.latitude,
            longitude:locationData.longitude
        });
        return response.data.location;
    } catch (error:any) {
        console.log("Error in updating location",error);
        throw new Error(error.response.data.message);
    }
}