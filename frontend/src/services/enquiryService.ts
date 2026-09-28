import axiosInstance from "../lib/axios";

export interface EnquiryPayload {
    name: string;
    email: string;
    phone?: string;
    interest: string;
    message: string;
}

export const submitEnquiry = async (data: EnquiryPayload) => {
    try {
        const response = await axiosInstance.post('/enquiries/submit', data);
        return response.data;
    } catch (error: any) {
        console.log("error in submitting enquiry", error?.response?.data?.message || error?.message);
        throw error?.response?.data?.message || error?.message || "Failed to submit enquiry";
    }
};

export const getEnquiries = async (page:number=1,search:string='') => {
    try {
        const response = await axiosInstance.get(`/enquiries?page=${page}&search=${search}`);
        return response.data;
    } catch (error: any) {
        console.log("error in fetching enquiries", error?.response?.data?.message || error?.message);
        throw error?.response?.data?.message || error?.message;
    }
};
