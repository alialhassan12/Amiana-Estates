import {z} from "zod";

export const estateSchema=z.object({
    id:z.string().min(1,"ID is required"),
    title:z.string().min(1,"Title is required"),
    subTitle:z.string().min(1,"Sub title is required"),
    description:z.string().min(1,"Description is required"),
    media:z.any().optional(),
});

export type EstateFormData=z.infer<typeof estateSchema>;