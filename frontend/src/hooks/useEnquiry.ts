import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEnquiries, submitEnquiry, type EnquiryPayload } from "../services/enquiryService";

export const enquiryKeys = {
    all: ['enquiries'],
    list: (page:number=1,search:string)=> [...enquiryKeys.all,'list',page,search]
};

export const useSubmitEnquiry = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: EnquiryPayload) => submitEnquiry(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: enquiryKeys.all });
        },
    });
};

export const useGetEnquiries = (enabled: boolean = true,page:number=1,search:string) => {
    return useQuery({
        queryKey: enquiryKeys.list(page,search),
        queryFn: () => getEnquiries(page,search),
        enabled,
    });
};
