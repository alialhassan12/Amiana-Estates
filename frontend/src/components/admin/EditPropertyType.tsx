import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { PropertyType } from "../../@types/propertyType";
import { zodResolver } from "@hookform/resolvers/zod";
import { editPropertyTypeSchema, type EditPropertyTypeFormData } from "../../schemas/editPropertyTypeSchema";
import { toast } from "../ui/toast";
import { useEditPropertyType } from "../../hooks/usePropertyTypes";

import { Crown, ImageIcon, Loader2, UploadCloud } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

type EditPropertyTypeProps = {
    propertyType: PropertyType,
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
};

const EditPropertyType=({propertyType,open,setOpen}:EditPropertyTypeProps)=>{
    const {mutateAsync:editPropertyType,isPending:editLoading}=useEditPropertyType();

    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitting},
        watch,
        setValue,
        reset
    }=useForm<EditPropertyTypeFormData>({
        resolver:zodResolver(editPropertyTypeSchema),
        defaultValues:{
            title:propertyType?.title || '',
            description:propertyType?.description || '',
            area:propertyType?.area || 0,
            imageFile:undefined,
            previewImage:propertyType?.image_url || '',
            is_penthouse:Boolean(propertyType?.is_penthouse || false),
        },
        mode:'onChange',
    });

    useEffect(()=>{
        if(!propertyType) return;

        reset({
            title:propertyType.title || '',
            description:propertyType.description || '',
            area:propertyType.area || 0,
            imageFile:undefined,
            previewImage:propertyType.image_url || '',
            is_penthouse:Boolean(propertyType.is_penthouse),
        });
    },[propertyType,reset]);

    const previewImage=watch("previewImage");
    const isPenthouse=watch("is_penthouse");
    

    // Handle media file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setValue("imageFile", file, { shouldDirty: true });
        const objectUrl = URL.createObjectURL(file);
        setValue("previewImage", objectUrl, { shouldDirty: true });
    };
    
    const onSubmit=async(data:EditPropertyTypeFormData)=>{
        try{
            const formData=new FormData();
            formData.append("id",propertyType.id.toString());
            formData.append("title",data.title);
            formData.append("description",data.description);
            formData.append("area",data.area.toString());
            formData.append("is_penthouse",data.is_penthouse?"1":"0");
            if(data.imageFile){
                formData.append("image",data.imageFile);
            }

            await editPropertyType(formData);
            toast.add({
                description:"Property type updated successfully.",
                type:"success"
            });
            setOpen(false);

        }catch(error:any){
            console.error("Error updating property type:",error);
            toast.add({
                description:error?.response?.data?.message || "Failed to update property type.",
                type:"error"
            });
        }
    };

    return(
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="sm:max-w-2xl h-[min(44rem,calc(100vh-2rem))] max-h-[calc(100vh-2rem)] !grid !grid-rows-[auto_minmax(0,1fr)] !gap-0 !p-0 overflow-hidden">
                <DialogHeader className="shrink-0 border-b border-[#ECE9E5] px-4 py-4 pr-12">
                    <DialogTitle className="title text-xl text-neutral-900 tracking-tight">
                        Edit Property Type
                    </DialogTitle>
                    <DialogDescription className="body-text text-xs leading-relaxed text-neutral-500">
                        Update the residence details shown across the website catalogue.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto]">
                    <div className="min-h-0 overflow-y-auto custom-scrollbar">
                        <div className="p-4 sm:p-6 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                                <div className="sm:col-span-3">
                                    <label htmlFor="property-type-title" className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                        Property Type Title
                                    </label>
                                    <input
                                        id="property-type-title"
                                        type="text"
                                        {...register("title")}
                                        placeholder="E.g. 3-Bedroom Residence"
                                        className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                    {errors.title && (
                                        <p className="body-text text-xs text-red-500 mt-1.5">{errors.title.message}</p>
                                    )}
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="property-type-area" className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                        Area
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="property-type-area"
                                            type="number"
                                            min="1"
                                            {...register("area", { valueAsNumber: true })}
                                            className="w-full px-3.5 py-2.5 pr-12 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                        />
                                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 body-text text-xs text-neutral-500 pointer-events-none">
                                            {propertyType?.area_unit}
                                        </span>
                                    </div>
                                    {errors.area && (
                                        <p className="body-text text-xs text-red-500 mt-1.5">{errors.area.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="property-type-description" className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    id="property-type-description"
                                    rows={4}
                                    {...register("description")}
                                    placeholder="Describe this residence type..."
                                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y leading-relaxed"
                                />
                                <div className="flex items-start justify-between gap-3 mt-1.5">
                                    {errors.description ? (
                                        <p className="body-text text-xs text-red-500">{errors.description.message}</p>
                                    ) : (
                                        <span />
                                    )}
                                    <p className="body-text text-[10px] text-neutral-400 text-right">
                                        This text is displayed on the residence card.
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-[#ECE9E5] pt-5">
                                <div className="flex items-center justify-between gap-4 mb-3">
                                    <div>
                                        <h3 className="body-text text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                                            <ImageIcon className="h-3.5 w-3.5" />
                                            Cover Image
                                        </h3>
                                        <p className="body-text text-[11px] text-neutral-500 mt-1">
                                            Upload a replacement only if you want to change the current image.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-4 items-stretch">
                                    <div className="aspect-[4/3] sm:aspect-auto min-h-32 rounded-md overflow-hidden bg-[#ECE9E5] border border-[#ECE9E5]">
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full min-h-32 flex flex-col items-center justify-center gap-2 text-neutral-400">
                                                <ImageIcon className="h-5 w-5" />
                                                <span className="body-text text-[10px] uppercase tracking-wider">No image</span>
                                            </div>
                                        )}
                                    </div>

                                    <label className="relative min-h-32 border-2 border-dashed border-[#ECE9E5] hover:border-primary/60 rounded-md p-4 text-center transition-colors bg-[#FAF9F6]/50 flex items-center justify-center cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <span className="flex flex-col items-center gap-1.5 pointer-events-none">
                                            <UploadCloud className="h-6 w-6 text-neutral-400" />
                                            <span className="body-text text-xs text-neutral-700 font-medium">Click or drag an image here</span>
                                            <span className="body-text text-[10px] text-neutral-400">JPEG, PNG, or WebP up to 2MB</span>
                                        </span>
                                    </label>
                                </div>
                                {errors.imageFile && (
                                    <p className="body-text text-xs text-red-500 mt-1.5">{errors.imageFile.message}</p>
                                )}
                            </div>

                            <div className="border-t border-[#ECE9E5] pt-5">
                                <input type="checkbox" {...register("is_penthouse")} className="hidden" tabIndex={-1} />
                                <button
                                    type="button"
                                    aria-pressed={Boolean(isPenthouse)}
                                    onClick={()=>setValue("is_penthouse",!Boolean(isPenthouse),{ shouldDirty:true, shouldValidate:true })}
                                    className={`w-full flex items-center justify-between gap-4 rounded-lg border p-4 text-left transition-colors cursor-pointer ${
                                    isPenthouse
                                        ? "border-primary bg-primary/5"
                                        : "border-[#ECE9E5] bg-[#FAF9F6] hover:border-neutral-400"
                                }`}>
                                    <span className="flex items-center gap-3">
                                        <span className={`flex h-9 w-9 items-center justify-center rounded-md ${
                                            isPenthouse ? "bg-primary text-white" : "bg-white text-neutral-500 border border-[#ECE9E5]"
                                        }`}>
                                            <Crown className="h-4 w-4" />
                                        </span>
                                        <span>
                                            <span className="block body-text text-sm font-semibold text-neutral-900">Feature this property type</span>
                                            <span className="block body-text text-[11px] text-neutral-500 mt-0.5">Featured types are used for the penthouse residence.</span>
                                        </span>
                                    </span>
                                    <span className={`relative h-5 w-9 rounded-full transition-colors ${
                                        isPenthouse ? "bg-primary" : "bg-neutral-300"
                                    }`} aria-hidden="true">
                                        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                                            isPenthouse ? "translate-x-4" : "translate-x-0.5"
                                        }`} />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse gap-2 border-t border-[#ECE9E5] bg-[#FAF9F6] px-4 py-4 sm:flex-row sm:justify-end">
                        <Button type="submit" disabled={isSubmitting || editLoading} className="bg-primary hover:bg-primary/90 text-white cursor-pointer">
                            {isSubmitting || editLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Update Property Type"
                            )}
                        </Button>
                        <DialogClose 
                            render={
                                <Button 
                                    type="button"
                                    variant="outline"
                                    disabled={isSubmitting || editLoading}
                                    onClick={()=>setOpen(false)}
                                    className="border-[#ECE9E5] text-neutral-700 hover:bg-[#FAF9F6] cursor-pointer"
                                >
                                    Cancel
                                </Button>
                            } 
                        />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditPropertyType;
