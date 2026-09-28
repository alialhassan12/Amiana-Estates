import {z} from "zod";

export const addExperienceSpecificationSchema = z.object({
    title:z.string().min(1, "Title is required"),
    short_description:z.string().min(1, "Short description is required"),
    icon:z.string().min(1, "Icon is required"),
    estate_experience_id:z.number().min(1, "Estate experience is required"),
});

export type AddExperienceSpecificationFormData=z.infer<typeof addExperienceSpecificationSchema>;