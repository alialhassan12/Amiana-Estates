import { useQuery } from "@tanstack/react-query"
import { getSocials } from "../services/socialsService"

export const socialKeys = {
    all: ['socials']
}

export const useGetSocials = (enabled: boolean = true) => {
    return useQuery({
        queryKey: socialKeys.all,
        queryFn: () => getSocials(),
        enabled
    });
};