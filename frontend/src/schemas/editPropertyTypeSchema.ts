import {z} from "zod";

export const editPropertyTypeSchema=z.object({
    title:z.string().min(1,"Title is required"),
    description:z.string().min(1,"Description is required"),
    area:z.number().min(1,"Area is required"),
    imageFile:z.instanceof(File)
        .optional()
        .nullable()
        .refine((file)=>file?.size??0<2097152,
            "Image size must be less than 2MB"
        ),
    previewImage:z.string().optional(),
    is_penthouse:z.boolean().default(false).optional(),
});

export type EditPropertyTypeFormData=z.infer<typeof editPropertyTypeSchema>;