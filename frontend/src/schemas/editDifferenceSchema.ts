import {z} from "zod";

export const editDifferenceSchema=z.object({
    title:z.string().min(1,"Title is required").max(100,"Title must be at most 100 characters"),
    subTitle:z.string().min(1,"Subtitle is required").max(100,"Subtitle must be at most 100 characters"),
    description:z.string().min(1,"Description is required").max(5000,"Description must be at most 5000 characters"),
    image:z.any().nullable().optional(),
    image_url:z.string().nullable().optional(),
});

export type EditDifferenceFormData=z.infer<typeof editDifferenceSchema>;
