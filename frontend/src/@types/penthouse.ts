export interface Penthouse{
    title:string;
    subTitle:string;
    description:string;
    penthouse_media:PenthouseMedia[];
    created_at:string;
    updated_at:string;
};

export interface PenthouseMedia{
    id:number;
    media_path:string;
    media_url:string;
    title?:string;
    description?:string;
    created_at?:string;
    updated_at?:string;
}