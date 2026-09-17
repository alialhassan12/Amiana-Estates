import {z} from "zod";

export const homeSchema=z.object({
    id:z.string().min(1,"ID is required"),
    hero_title:z.string().min(1,"Hero title is required"),
    hero_description:z.string().min(1,"Hero description is required"),
    hero_cta1_text:z.string().min(1,"Hero CTA 1 text is required"),
    hero_cta1_url:z.string().optional(),
    hero_cta2_text:z.string().min(1,"Hero CTA 2 text is required"),
    hero_cta2_url:z.string().optional(),
    hero_media_type:z.string().min(1,"Hero media type is required"),
    hero_media:z.string().optional(),
});

export type HomeFormData=z.infer<typeof homeSchema>;