import { z } from "zod";

export const editDesignPhilosophySchema = z.object({
    title: z.string().min(1, "Title is required"),
    subTitle: z.string().min(1, "Sub Title is required"),
    description: z.string().min(1, "Description is required"),
    image:z.any().nullable().optional(),
    image_url:z.string().nullable().optional(),
});

export type EditDesignPhilosophyFormData = z.infer<typeof editDesignPhilosophySchema>;