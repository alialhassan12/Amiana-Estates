import { useForm } from "react-hook-form";
import type { PropertyFeature } from "../../@types/propertyFeature";
import { editPropertyFeatureSchema, type EditPropertyFeatureFormData } from "../../schemas/editPropertyFeatureSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useGetPropertyTypesForFeatures } from "../../hooks/usePropertyTypes";
import type { PropertyType } from "../../@types/propertyType";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Loader2, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useEditPropertyFeature } from "../../hooks/usePropertyFeatures";
import { toast } from "../ui/toast";

type EditPropertyFeatureDialogProps = {
    propertyFeature:PropertyFeature;
    open: boolean;
    setOpen: (open: boolean) => void;
};

const EditPropertyFeatureDialog=({propertyFeature,open,setOpen}:EditPropertyFeatureDialogProps)=>{
    const { data: propertyTypesData, isLoading: isLoadingTypes } = useGetPropertyTypesForFeatures();
    const propertyTypes = (propertyTypesData?.propertyTypes ?? []) as PropertyType[];

    const {mutateAsync:editPropertyFeature,isPending:isEditingPropertyFeature}=useEditPropertyFeature();

    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitting},
        watch,
        setValue,
        reset
    }=useForm<EditPropertyFeatureFormData>({
        resolver:zodResolver(editPropertyFeatureSchema),
        defaultValues:{
            property_type_id:propertyFeature?.property_type_id || 0,
            title:propertyFeature?.title || '',
            value:propertyFeature?.value || '',
        },
        mode:'onChange',
    });

    const propertyType=watch('property_type_id');

    useEffect(()=>{
        if(!propertyFeature) return;

        reset({
            property_type_id:propertyFeature?.property_type_id || 0,
            title:propertyFeature?.title || '',
            value:propertyFeature?.value || '',
        });
    },[propertyFeature,reset]);

    const onSubmit=async(data:EditPropertyFeatureFormData)=>{
        try{
            await editPropertyFeature({
                id:propertyFeature?.id,
                property_type_id:data.property_type_id,
                title:data.title,
                value:data.value,
            });
            setOpen(false);
            toast.add({
                type:'success',
                description:'Property feature updated successfully',
            });
        }catch(error:any){
            toast.add({
                type:'error',
                description:'Error updating property feature',
            });
            console.error('Error updating property feature:', error);
        }
    }

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-xl h-auto max-h-[calc(100vh-2rem)] !grid !grid-rows-[auto_minmax(0,1fr)] !gap-0 !p-0 overflow-hidden">
                {/* Sticky Header */}
                <DialogHeader className="shrink-0 border-b border-[#ECE9E5] px-4 py-4 pr-12">
                    <DialogTitle className="title text-xl text-neutral-900 tracking-tight flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Add Property Feature
                    </DialogTitle>
                    <DialogDescription className="body-text text-xs leading-relaxed text-neutral-500">
                        Add a new specification or feature item for a residence type.
                    </DialogDescription>
                </DialogHeader>

                {/* Form with scrollable body & sticky footer */}
                <form onSubmit={handleSubmit(onSubmit)} className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto]">
                    <div className="min-h-0 overflow-y-auto custom-scrollbar">
                        <div className="p-4 sm:p-6 space-y-5">
                            {/* Property Type Selection */}
                            <div>
                                <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                    Property Type
                                </label>
                                <Select
                                    value={propertyType ? String(propertyType) : ""}
                                    onValueChange={(val) => {
                                        setValue("property_type_id", Number(val), {
                                            shouldDirty: true,
                                            shouldValidate: true,
                                        });
                                    }}
                                    disabled={isLoadingTypes}
                                >
                                    <SelectTrigger className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer">
                                        <SelectValue placeholder={isLoadingTypes ? "Loading types..." : "Select property type..."} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Available Property Types</SelectLabel>
                                            {propertyTypes.map((type) => (
                                                <SelectItem
                                                    key={type.id}
                                                    value={String(type.id)}
                                                    className="cursor-pointer"
                                                >
                                                    {type.title}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.property_type_id && (
                                    <p className="body-text text-xs text-red-500 mt-1.5">{errors.property_type_id.message}</p>
                                )}
                            </div>

                            {/* Feature Title and Value */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="feature-title" className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                        Feature Title
                                    </label>
                                    <input
                                        id="feature-title"
                                        type="text"
                                        {...register("title")}
                                        placeholder="E.g. Bedrooms, Balcony, Area"
                                        className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                    {errors.title && (
                                        <p className="body-text text-xs text-red-500 mt-1.5">{errors.title.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="feature-value" className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                                        Feature Value
                                    </label>
                                    <input
                                        id="feature-value"
                                        type="text"
                                        {...register("value")}
                                        placeholder="E.g. 4 Ensuite Bedrooms, 45 m²"
                                        className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                    {errors.value && (
                                        <p className="body-text text-xs text-red-500 mt-1.5">{errors.value.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sticky Footer */}
                    <div className="flex flex-col-reverse gap-2 border-t border-[#ECE9E5] bg-[#FAF9F6] px-4 py-4 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isSubmitting || isEditingPropertyFeature}
                            onClick={() => setOpen(false)}
                            className="border-[#ECE9E5] text-neutral-700 hover:bg-[#FAF9F6] cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || isEditingPropertyFeature}
                            className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        >
                            {isSubmitting || isEditingPropertyFeature ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Editing...
                                </>
                            ) : "Edit Feature"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditPropertyFeatureDialog;