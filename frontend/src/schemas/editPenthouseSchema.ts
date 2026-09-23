import { z } from "zod";

export const editPenthouseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subTitle: z.string().min(1, "Sub title is required"),
    description: z.string().min(1, "Description is required"),
});

export type EditPenthouseFormData = z.infer<typeof editPenthouseSchema>;