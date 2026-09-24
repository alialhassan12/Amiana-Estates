import type { PropertyType } from "./propertyType";

export interface PropertyFeature{
    id:number;
    property_type_id:number;
    title:string;
    value:string;
    display_order:number;
    property_type?:PropertyType;
    created_at:string;
    updated_at:string;
}