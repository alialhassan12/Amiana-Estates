import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPropertyFeature, deletePropertyFeature, editPropertyFeature, getPropertyFeatures } from "../services/propertyFeaturesService";

export const propertyFeaturesKeys = {
    all: ['property-features'] as const,
    list: (page: number, searchQuery?: string, type?: number | null) => ['property-features', page, searchQuery, type] as const,
};

export const useGetPropertyFeatures = (page: number = 1, searchQuery?: string, type?: number | null) => {
    return useQuery({
        queryKey: propertyFeaturesKeys.list(page, searchQuery, type),
        queryFn: () => getPropertyFeatures(page, searchQuery, type),
    });
};

export const useAddPropertyFeature = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: {
            property_type_id: number;
            title: string;
            value: string;
        }) => addPropertyFeature(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: propertyFeaturesKeys.all });
        },
    });
};

export const useDeletePropertyFeature = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deletePropertyFeature(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: propertyFeaturesKeys.all });
        },
    });
};

export const useEditPropertyFeature = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: {
            id: number;
            property_type_id: number;
            title: string;
            value: string;
        }) => editPropertyFeature(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: propertyFeaturesKeys.all });
        },
    });
};