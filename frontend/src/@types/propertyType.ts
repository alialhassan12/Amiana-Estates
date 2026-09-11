export interface PropertyType{
    id:number,
    title:string,
    subTitle:string,
    description:string,
    image:string,
    image_url:string,
    area:number,
    area_unit:string,
    display_order:number,
    features?:{
        id:number,
        title:string,
        value:string
    }[],
}