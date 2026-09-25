export interface EstateExperience{
    id:number;
    title:string;
    subTitle:string;
    card_1_image:string;
    card_1_image_url:string;
    card_1_image_heading:string;
    card_1_title:string;
    card_1_quote:string;
    card_1_description:string;
    card_2_title:string;
    card_2_description:string;
    card_2_image:string;
    card_2_image_url:string;
    closing_title:string;
    closing_statement:string;
    specifications_title:string;
    specifications_subTitle:string;
    specifications_description:string;
    specifications?:EstateExperienceSpecification[];
    created_at:Date;
    updated_at:Date;
}

export interface EstateExperienceSpecification{
    id:number;
    estate_experience_id:number;
    title:string;
    short_description:string;
    icon:string;
    created_at:Date;
    updated_at:Date;
}

export interface EstateExperienceCardData{
    card_image_url:string;
    card_image_heading?:string;
    card_title:string;
    card_quote?:string;
    card_description:string;
}