import {z} from "zod";

export const residenceSchema=z.object({
    id:z.string().min(1,"ID is required"),
    title:z.string().min(1,"Title is required"),
    subTitle:z.string().min(1,"Sub title is required")
});

export type ResidenceFormData=z.infer<typeof residenceSchema>;