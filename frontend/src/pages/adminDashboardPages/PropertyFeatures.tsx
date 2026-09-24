import { Loader2, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useDeletePropertyFeature, useGetPropertyFeatures } from "../../hooks/usePropertyFeatures";
import { Pagination, type PaginatedData } from "../../components/Pagination";
import type { PropertyFeature } from "../../@types/propertyFeature";
import { useGetPropertyTypesForFeatures } from "../../hooks/usePropertyTypes";
import type { PropertyType } from "../../@types/propertyType";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui/select";
import AddPropertyFeatureDialog from "../../components/admin/AddPropertyFeatureDialog";
import DeleteAlertDialog from "../../components/admin/DeleteAlertDialog";
import EditPropertyFeatureDialog from "../../components/admin/EditPropertyFeatureDialog";


const PropertyFeatures=()=>{
    const [openAddFeature,setOpenAddFeature]=useState<boolean>(false);
    const [searchQuery,setSearchQuery]=useState<string>('');

    const [openEditDialog,setOpenEditDialog]=useState<boolean>(false);
    const [openDeleteDialog,setOpenDeleteDialog]=useState<boolean>(false);
    const [selectedFeature,setSelectedFeature]=useState<PropertyFeature | null>(null);

    const [type,setType]=useState<number|null>(null);
    const [page,setPage]=useState<number>(1);

    const debouncedSearch=useDebounce(searchQuery,500);

    const {data:propertyTypes}=useGetPropertyTypesForFeatures();
    const types=propertyTypes?.propertyTypes as PropertyType[];

    const {data:PropertyFeatures,isLoading,isFetching,isError,refetch}=useGetPropertyFeatures(page,debouncedSearch,type);
    const propertyFeatures=PropertyFeatures?.propertyFeatures as PaginatedData<PropertyFeature> | undefined;
    const rows=propertyFeatures?.data ?? [];

    const {mutateAsync:deletePropertyFeature,isPending:isDeleting}=useDeletePropertyFeature();

    const currentPage=propertyFeatures?.current_page ?? page;
    const lastPage=propertyFeatures?.last_page ?? 1;
    const hasPreviousPage=currentPage>1;
    const hasNextPage=currentPage<lastPage;

    const handleTypeChange=(value: string | null)=>{
        if(!value || value==="All"){
            setType(null);
            setPage(1);
            return;
        }
        //map the title to id
        const typeId=types?.find((type)=>type.title===value)?.id;
        if(typeId){
            setType(typeId);
            setPage(1);
        }
    }

    const handleOpenEditDialog=(feature:PropertyFeature)=>{
        setSelectedFeature(feature);
        setOpenEditDialog(true);
    }

    const handleCloseEditDialog=()=>{
        setSelectedFeature(null);
        setOpenEditDialog(false);
    }

    const handleOpenDeleteDialog=(feature:PropertyFeature)=>{
        setSelectedFeature(feature);
        setOpenDeleteDialog(true);
    }

    const handleCloseDeleteDialog=()=>{
        setSelectedFeature(null);
        setOpenDeleteDialog(false);
    }

    const handleConfirmDelete=async()=>{
        if(!selectedFeature) return;
        try {
            await deletePropertyFeature(selectedFeature.id);
            setOpenDeleteDialog(false);
            refetch();
        } catch (error) {
            console.error("Error deleting property feature:", error);
        }
    }

    return(
        <div className="flex flex-col gap-6 w-full max-w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#ECE9E5] pb-5">
                <div>
                    <h1 className="title text-2xl sm:text-3xl text-neutral-900 tracking-tight">
                        Property Features Settings
                    </h1>
                    <p className="body-text text-xs sm:text-sm text-neutral-500 mt-1">
                        Manage property features for all types of properties.
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
                    onClick={()=>setOpenAddFeature(true)}
                    className="bg-primary hover:bg-primary/90 text-white gap-2 text-xs uppercase tracking-wider font-semibold shadow-xs cursor-pointer"
                >
                    <Plus className="h-4 w-4" />
                    Add Property Type
                </Button>
            </div>

            {/* Property features table */}
            <section className="bg-white border border-[#ECE9E5] rounded-xl shadow-xs overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-[#ECE9E5] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h2 className="title text-lg text-neutral-900 tracking-tight">
                            Property Features
                        </h2>
                        <p className="body-text text-xs text-neutral-500 mt-0.5">
                            {propertyFeatures
                                ? `${propertyFeatures.total} ${propertyFeatures.total === 1 ? "property feature" : "property features"} available`
                                : "Loading property features..."}
                        </p>
                    </div>
                    <Select onValueChange={handleTypeChange} value={type?.toString()}>
                        <SelectTrigger className="cursor-pointer w-full max-w-48">
                            <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Property Type</SelectLabel>
                                <SelectItem key={0} className="cursor-pointer" value="All" >
                                        All
                                </SelectItem>
                                {types?.map((item) => (
                                    <SelectItem key={item.id} className="cursor-pointer" value={item.title} >
                                        {item.title}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
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
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Feature Title</th>
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Feature Value</th>
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500 whitespace-nowrap">Property Type</th>
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500 whitespace-nowrap">Display Order</th>
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
                                        <p className="body-text text-sm text-neutral-700">Unable to load property features.</p>
                                        <p className="body-text text-xs text-neutral-500 mt-1">Please refresh the page and try again.</p>
                                    </td>
                                </tr>
                            ) : rows.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <p className="body-text text-sm text-neutral-700">No property features found.</p>
                                        <p className="body-text text-xs text-neutral-500 mt-1">
                                            {searchQuery ? "Try a different search term." : "Create a property feature to begin building the residences catalogue."}
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                rows.map((propertyFeature) => {

                                    return (
                                        <tr key={propertyFeature.id} className="group hover:bg-[#FAF9F6]/70 transition-colors">
                                            <td className="px-4 sm:px-6 py-4">
                                                <p className="body-text text-sm text-neutral-600 leading-relaxed max-w-xl line-clamp-2">
                                                    {propertyFeature.title}
                                                </p>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <p className="body-text text-sm text-neutral-600 leading-relaxed max-w-xl line-clamp-2">
                                                    {propertyFeature.value}
                                                </p>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <span className="body-text text-sm text-neutral-800 whitespace-nowrap">
                                                    {propertyFeature?.property_type?.title}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <p className="body-text text-sm text-neutral-600 leading-relaxed max-w-xl line-clamp-2">
                                                    {propertyFeature.display_order}
                                                </p>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        type="button"
                                                        title={`Edit ${propertyFeature.title}`}
                                                        aria-label={`Edit ${propertyFeature.title}`}
                                                        onClick={()=>{
                                                            handleOpenEditDialog(propertyFeature);
                                                        }}
                                                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#ECE9E5] text-neutral-600 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary cursor-pointer"
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        title={`Delete ${propertyFeature.title}`}
                                                        aria-label={`Delete ${propertyFeature.title}`}
                                                        onClick={()=>{
                                                            handleOpenDeleteDialog(propertyFeature);
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
                {propertyFeatures && (
                    <Pagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                        hasPreviousPage={hasPreviousPage}
                        hasNextPage={hasNextPage}
                        onPageChange={(page)=>setPage(page)}
                        data={propertyFeatures}
                        isFetching={isFetching}
                    />
                )}
            </section>
            <AddPropertyFeatureDialog
                open={openAddFeature}
                setOpen={setOpenAddFeature}
            />

            <DeleteAlertDialog
                open={openDeleteDialog}
                onOpenChange={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
                onCancel={handleCloseDeleteDialog}
                isLoading={isDeleting}
                title="Delete Property Feature"
                description={`Are you sure you want to delete "${selectedFeature?.title}" feature?`}
            />

            <EditPropertyFeatureDialog
                open={openEditDialog}
                setOpen={setOpenEditDialog}
                propertyFeature={selectedFeature}
            />
        </div>
    );
}

export default PropertyFeatures;