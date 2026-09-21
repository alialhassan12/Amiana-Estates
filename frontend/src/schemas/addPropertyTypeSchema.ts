import { z } from "zod";

export const addPropertyTypeSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    area: z.number().min(1, "Area is required"),
    imageFile: z.instanceof(File).refine((file) => file.size <= 2097152, "Image size must be less than 2MB"),
    previewImage: z.string().optional(),
    is_penthouse: z.boolean(),
});

export type AddPropertyTypeFormData = z.infer<typeof addPropertyTypeSchema>;
