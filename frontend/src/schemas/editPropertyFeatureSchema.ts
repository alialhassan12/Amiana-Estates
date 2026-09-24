import { z } from "zod";

export const editPropertyFeatureSchema = z.object({
    property_type_id: z.number().min(1, "Please select a property type"),
    title: z.string().min(1, "Title is required"),
    value: z.string().min(1, "Value is required"),
});

export type EditPropertyFeatureFormData = z.infer<typeof editPropertyFeatureSchema>;
