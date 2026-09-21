import { useState } from "react";
import { useDeletePropertyType, useGetPropertyTypes } from "../../hooks/usePropertyTypes";
import { useDebounce } from "../../hooks/useDebounce";
import { ArrowLeft, ArrowRight, ImageOff, Loader2, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import type { PropertyType } from "../../@types/propertyType";
import EditPropertyType from "../../components/admin/EditPropertyType";
import AddPropertyTypeDialog from "../../components/admin/AddPropertyTypeDialog";
import DeleteAlertDialog from "../../components/admin/DeleteAlertDialog";
import { toast } from "../../components/ui/toast";

type PaginatedPropertyTypes = {
    data: PropertyType[];
    current_page: number;
    last_page: number;
    total: number;
    from: number | null;
    to: number | null;
};

const PropertyTypes=()=>{
    const [page,setPage]=useState<number>(1);
    const [searchQuery,setSearchQuery]=useState<string>("");
    const [selectedProperty,setSelectedProperty]=useState<PropertyType | null>(null);
    const [isEditOpen,setIsEditOpen]=useState<boolean>(false);
    const [isAddOpen,setIsAddOpen]=useState<boolean>(false);
    const [isDeleteDialogOpen,setIsDeleteDialogOpen]=useState<boolean>(false);

    const debouncedSearch=useDebounce(searchQuery,500);
    const {data:response,isLoading,isFetching,isError}=useGetPropertyTypes(page,debouncedSearch);
    const propertyTypes=response?.propertyTypes as PaginatedPropertyTypes | undefined;
    const rows=propertyTypes?.data ?? [];

    const currentPage=propertyTypes?.current_page ?? page;
    const lastPage=propertyTypes?.last_page ?? 1;
    const hasPreviousPage=currentPage>1;
    const hasNextPage=currentPage<lastPage;

    const newDisplayOrder=(propertyTypes?.total ?? 0)+1;

    const {mutateAsync:deletePropertyType,isPending:isDeleting}=useDeletePropertyType();

    const handleOpenEditChange=(state:boolean)=>{
        if(!state){
            setSelectedProperty(null);
            setIsEditOpen(false);
        }
    }

    const handelOpenDeleteChange=(state:boolean)=>{
        if(!state){
            setSelectedProperty(null);
            setIsDeleteDialogOpen(false);
        }
    }
    const handleDelete=async()=>{
        if(!selectedProperty) return;
        try {
            await deletePropertyType(selectedProperty.id);
            handelOpenDeleteChange(false);
            setSelectedProperty(null);
            toast.add({description:"Property type deleted successfully",type:"success"});
        } catch (error:any) {
            handelOpenDeleteChange(false);
            toast.add({description:error?.response?.data?.message || "Failed to delete property type",type:"error"});
        }
    }

    return(
        <div className="flex flex-col gap-6 w-full max-w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#ECE9E5] pb-5">
                <div>
                    <h1 className="title text-2xl sm:text-3xl text-neutral-900 tracking-tight">
                        Property Types Settings
                    </h1>
                    <p className="body-text text-xs sm:text-sm text-neutral-500 mt-1">
                        Manage property types for residences.
                    </p>
                </div>
            </div>

            {/* searchbar and add button*/}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-3 rounded-lg">
                <div className="relative w-full lg:w-1/2 md:w-1/2">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPage(1);
                        }}
                        className="w-full px-10 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors tracking-wider"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                        >
                            <X className="h-4 w-4 text-neutral-500" />
                        </button>
                    )}

                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />

                </div>

                {/* add button */}
                <Button
                    type="button"
                    size="sm"
                    onClick={()=>setIsAddOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-white gap-2 text-xs uppercase tracking-wider font-semibold shadow-xs cursor-pointer"
                >
                    <Plus className="h-4 w-4" />
                    Add Property Type
                </Button>
            </div>

            {/* Property types table */}
            <section className="bg-white border border-[#ECE9E5] rounded-xl shadow-xs overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-[#ECE9E5] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h2 className="title text-lg text-neutral-900 tracking-tight">
                            Property Types
                        </h2>
                        <p className="body-text text-xs text-neutral-500 mt-0.5">
                            {propertyTypes
                                ? `${propertyTypes.total} ${propertyTypes.total === 1 ? "property type" : "property types"} available`
                                : "Loading property types..."}
                        </p>
                    </div>
                    {isFetching && !isLoading && (
                        <span className="inline-flex items-center gap-1.5 body-text text-[11px] text-neutral-500 uppercase tracking-wider">
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Updating
                        </span>
                    )}
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full min-w-[860px] text-left">
                        <thead className="bg-[#FAF9F6] border-b border-[#ECE9E5]">
                            <tr>
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Property Type</th>
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Description</th>
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500 whitespace-nowrap">Area</th>
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500 whitespace-nowrap">Featured</th>
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500 text-right whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#ECE9E5]">
                            {isLoading ? (
                                Array.from({ length: 4 }).map((_, index) => (
                                    <tr key={index} className="animate-pulse">
                                        <td className="px-4 sm:px-6 py-4"><div className="flex items-center gap-3"><div className="w-14 h-12 rounded-md bg-[#ECE9E5]" /><div className="h-4 w-32 rounded bg-[#ECE9E5]" /></div></td>
                                        <td className="px-4 sm:px-6 py-4"><div className="h-4 w-full max-w-sm rounded bg-[#ECE9E5]" /></td>
                                        <td className="px-4 sm:px-6 py-4"><div className="h-4 w-16 rounded bg-[#ECE9E5]" /></td>
                                        <td className="px-4 sm:px-6 py-4"><div className="h-6 w-20 rounded-full bg-[#ECE9E5]" /></td>
                                        <td className="px-4 sm:px-6 py-4"><div className="ml-auto h-7 w-16 rounded bg-[#ECE9E5]" /></td>
                                    </tr>
                                ))
                            ) : isError ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <p className="body-text text-sm text-neutral-700">Unable to load property types.</p>
                                        <p className="body-text text-xs text-neutral-500 mt-1">Please refresh the page and try again.</p>
                                    </td>
                                </tr>
                            ) : rows.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <p className="body-text text-sm text-neutral-700">No property types found.</p>
                                        <p className="body-text text-xs text-neutral-500 mt-1">
                                            {searchQuery ? "Try a different search term." : "Create a property type to begin building the residences catalogue."}
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                rows.map((propertyType) => {
                                    const isFeatured=Boolean(propertyType.is_penthouse);

                                    return (
                                        <tr key={propertyType.id} className="group hover:bg-[#FAF9F6]/70 transition-colors">
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="flex items-center gap-3 min-w-[200px]">
                                                    <div className="w-14 h-12 rounded-md overflow-hidden bg-[#ECE9E5] shrink-0 border border-[#ECE9E5]">
                                                        {propertyType.image_url ? (
                                                            <img
                                                                src={propertyType.image_url}
                                                                alt={propertyType.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                                                <ImageOff className="h-4 w-4" aria-label="No image" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="body-text text-sm font-semibold text-neutral-900 leading-snug">
                                                        {propertyType.title}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <p className="body-text text-sm text-neutral-600 leading-relaxed max-w-xl line-clamp-2">
                                                    {propertyType.description}
                                                </p>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <span className="body-text text-sm text-neutral-800 whitespace-nowrap">
                                                    {propertyType.area} {propertyType.area_unit}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-1 body-text text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap ${
                                                    isFeatured
                                                        ? "bg-primary/10 text-primary"
                                                        : "bg-neutral-100 text-neutral-500"
                                                }`}>
                                                    {isFeatured ? "Featured" : "Standard"}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        type="button"
                                                        title={`Edit ${propertyType.title}`}
                                                        aria-label={`Edit ${propertyType.title}`}
                                                        onClick={()=>{
                                                            setSelectedProperty(propertyType);
                                                            setIsEditOpen(true);
                                                        }}
                                                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#ECE9E5] text-neutral-600 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary cursor-pointer"
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        title={`Delete ${propertyType.title}`}
                                                        aria-label={`Delete ${propertyType.title}`}
                                                        onClick={()=>{
                                                            setSelectedProperty(propertyType);
                                                            setIsDeleteDialogOpen(true);
                                                        }}
                                                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#ECE9E5] text-neutral-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* pagination*/}
                {propertyTypes && (
                    <div className="px-4 sm:px-6 py-3.5 border-t border-[#ECE9E5] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <p className="body-text text-xs text-neutral-500">
                            {propertyTypes.total === 0 || propertyTypes.from === null
                                ? "No results to show"
                                : `Showing ${propertyTypes.from}-${propertyTypes.to} of ${propertyTypes.total}`}
                        </p>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((previousPage) => previousPage - 1)}
                                disabled={!hasPreviousPage || isFetching}
                                className="border-[#ECE9E5] text-neutral-700 hover:bg-[#FAF9F6] gap-1.5 text-xs cursor-pointer disabled:cursor-not-allowed"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />
                                Previous
                            </Button>
                            <span className="body-text text-xs text-neutral-500 px-1 whitespace-nowrap">
                                Page {currentPage} of {lastPage}
                            </span>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((previousPage) => previousPage + 1)}
                                disabled={!hasNextPage || isFetching}
                                className="border-[#ECE9E5] text-neutral-700 hover:bg-[#FAF9F6] gap-1.5 text-xs cursor-pointer disabled:cursor-not-allowed"
                            >
                                Next
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </div>
                )}
            </section>
            <DeleteAlertDialog
                open={isDeleteDialogOpen && selectedProperty!==null }
                setOpen={handelOpenDeleteChange}
                title="Delete Property Type"
                description={`Are you sure you want to delete ${selectedProperty?.title}`}
                onConfirm={handleDelete}
                onCancel={()=>{handelOpenDeleteChange(false);setSelectedProperty(null);}}
            />
            <EditPropertyType open={isEditOpen && selectedProperty !==null} propertyType={selectedProperty} setOpen={handleOpenEditChange}/>
            <AddPropertyTypeDialog open={isAddOpen} setOpen={setIsAddOpen} displayOrder={newDisplayOrder}/>
            
        </div>
    );
}

export default PropertyTypes;
