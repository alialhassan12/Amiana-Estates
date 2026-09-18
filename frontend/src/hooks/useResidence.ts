import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getResidence, updateResidence } from "../services/residenceService";

export const residenceKeys = {
    all: ['residences'],
};

export const useGetResidence = (enabled: boolean = true) => {
    return useQuery({
        queryKey: residenceKeys.all,
        queryFn: () => getResidence(),
        enabled
    });
};

export const useUpdateResidence = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data:{ id: string; title: string; subTitle: string }) => updateResidence(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: residenceKeys.all });
        }
    });
};