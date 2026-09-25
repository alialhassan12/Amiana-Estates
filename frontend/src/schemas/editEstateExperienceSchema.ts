import { z } from "zod";

export const editEstateExperienceSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    subTitle: z.string().min(1, { message: 'Title is required' }),

    card_1_image: z.any(),
    card_1_image_url: z.string().nullable(),
    card_1_image_heading: z.string().min(1, { message: 'Card 1 image heading is required' }),
    card_1_title: z.string().min(1, { message: 'Card 1 title is required' }),
    card_1_quote: z.string().min(1, { message: 'Card 1 quote is required' }),
    card_1_description: z.string().min(1, { message: 'Card 1 description is required' }),

    specifications_title: z.string().min(1, { message: 'Specifications title is required' }),
    specifications_subTitle: z.string().min(1, { message: 'Specifications sub-title is required' }),
    specifications_description: z.string().min(1, { message: 'Specifications description is required' }),

    card_2_title: z.string().min(1, { message: 'Card 2 title is required' }),
    card_2_description: z.string().min(1, { message: 'Card 2 description is required' }),
    card_2_image: z.any(),
    card_2_image_url: z.string().nullable().optional(),

    closing_title: z.string().min(1, { message: 'Closing title is required' }),
    closing_statement: z.string().min(1, { message: 'Closing statement is required' }),
});

export type EditEstateExperienceFormData = z.infer<typeof editEstateExperienceSchema>;