import { Loader2, Pencil, Plus, Search, Trash2, X, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useDeleteExperienceSpecification, useGetExperienceSpecifications } from "../../hooks/useExperienceSpecification";
import { Pagination, type PaginatedData } from "../../components/Pagination";
import type { EstateExperienceSpecification } from "../../@types/estateExperience";
import AddSpecificationDialog from "../../components/admin/AddSpecificationDialog";
import DeleteAlertDialog from "../../components/admin/DeleteAlertDialog";
import { toast } from "../../components/ui/toast";
import EditSpecificationDialog from "../../components/admin/EditSpecificationDialog";

const ExperienceSpecifications = () => {
    const [openAdd,setOpenAdd]=useState<boolean>(false);
    const [openDelete,setOpenDelete]=useState<boolean>(false);
    const [openEdit,setOpenEdit]=useState<boolean>(false);
    const [selectedSpecification,setSelectedSpecification]=useState<EstateExperienceSpecification | null>(null);
    
    const [page,setPage]=useState<number>(1);
    const [searchQuery,setSearchQuery]=useState<string>("");
    const debouncedSearch=useDebounce(searchQuery,500);

    const {mutateAsync:deleteSpecificationMutation,isPending:isDeletingSpecification}=useDeleteExperienceSpecification();
    
    const {data:experienceSpecificationsData,isLoading:isLoadingExperienceSpecifications,isFetching,isError}=useGetExperienceSpecifications(page,debouncedSearch);
    const experienceSpecifications=experienceSpecificationsData?.experienceSpecifications as PaginatedData<EstateExperienceSpecification> | undefined;
    const rows=experienceSpecifications?.data;
    
    const currentPage=experienceSpecifications?.current_page ?? page;
    const lastPage=experienceSpecifications?.last_page ?? 1;
    const hasPreviousPage=currentPage>1;
    const hasNextPage=currentPage<lastPage;
    
    const handleOpenEdit=(specification:EstateExperienceSpecification)=>{
        setSelectedSpecification(specification);
        setOpenEdit(true);
    }

    const handleOpenDeleteDialog=(specification:EstateExperienceSpecification)=>{
        setSelectedSpecification(specification);
        setOpenDelete(true);
    }

    const handleDelete=async()=>{
        if(!selectedSpecification) return;
        try{
            await deleteSpecificationMutation(selectedSpecification.id);
            setOpenDelete(false);
            setSelectedSpecification(null);
            toast.add({
                description:"Specification deleted successfully",
                type:"success",
            })
        }catch(error:any){
            toast.add({
                description:"Failed to delete specification",
                type:"error",
            })
        }
    }


    return (
        <div className="flex flex-col gap-6 w-full max-w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#ECE9E5] pb-5">
                <div>
                    <h1 className="title text-2xl sm:text-3xl text-neutral-900 tracking-tight">
                        Experience Specifications Settings
                    </h1>
                    <p className="body-text text-xs sm:text-sm text-neutral-500 mt-1">
                        Manage experience specifications.
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
                    onClick={()=>setOpenAdd(true)}
                    className="bg-primary hover:bg-primary/90 text-white gap-2 text-xs uppercase tracking-wider font-semibold shadow-xs cursor-pointer"
                >
                    <Plus className="h-4 w-4" />
                    Add Experience Specification
                </Button>
            </div>

            {/* Experience specifications table */}
            <section className="bg-white border border-[#ECE9E5] rounded-xl shadow-xs overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-[#ECE9E5] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h2 className="title text-lg text-neutral-900 tracking-tight">
                            Experience Specifications
                        </h2>
                        <p className="body-text text-xs text-neutral-500 mt-0.5">
                            {experienceSpecifications
                                ? `${experienceSpecifications.total} ${experienceSpecifications.total === 1 ? "experience specification" : "experience specifications"} available`
                                : "Loading experience specifications..."}
                        </p>
                    </div>

                    {isFetching && !isLoadingExperienceSpecifications && (
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
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500 whitespace-nowrap">Icon</th>
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Specification Title</th>
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Short Description</th>
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500 text-right whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#ECE9E5]">
                            {isLoadingExperienceSpecifications ? (
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
                                            {searchQuery ? "Try a different search term." : "Create a experience specification to begin building the residences catalogue."}
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                rows.map((specification:EstateExperienceSpecification) => {
                                    const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[specification.icon];

                                    return (
                                        <tr key={specification.id} className="group hover:bg-[#FAF9F6]/70 transition-colors">
                                            <td className="px-4 sm:px-6 py-4">
                                                <p className="body-text text-sm text-neutral-600 leading-relaxed max-w-xl line-clamp-2">
                                                    {Icon && <Icon className="h-6 w-6"/>}
                                                </p>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <p className="body-text text-sm text-neutral-600 leading-relaxed max-w-xl line-clamp-2">
                                                    {specification.title}
                                                </p>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <span className="body-text text-sm text-neutral-800 whitespace-nowrap">
                                                    {specification?.short_description}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        type="button"
                                                        title={`Edit ${specification.title}`}
                                                        aria-label={`Edit ${specification.title}`}
                                                        onClick={()=>{
                                                            handleOpenEdit(specification);
                                                        }}
                                                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#ECE9E5] text-neutral-600 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary cursor-pointer"
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        title={`Delete ${specification.title}`}
                                                        aria-label={`Delete ${specification.title}`}
                                                        onClick={()=>{
                                                            handleOpenDeleteDialog(specification);
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
                {experienceSpecifications && (
                    <Pagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                        hasPreviousPage={hasPreviousPage}
                        hasNextPage={hasNextPage}
                        onPageChange={(page)=>setPage(page)}
                        data={experienceSpecifications}
                        isFetching={isFetching}
                    />
                )}
            </section>
            <AddSpecificationDialog
                open={openAdd}
                setOpen={setOpenAdd}
                estateExperienceId={rows?.[0]?.estate_experience_id?? 1}
            />

            <EditSpecificationDialog
                open={openEdit}
                setOpen={setOpenEdit}
                specification={selectedSpecification}
            />

            <DeleteAlertDialog
                open={openDelete}
                setOpen={setOpenDelete}
                title={`Delete ${selectedSpecification?.title}`}
                description={`Are you sure you want to delete ${selectedSpecification?.title}?`}
                onConfirm={handleDelete}
                isLoading={isDeletingSpecification}
                onCancel={()=>setOpenDelete(false)}
            />
        </div>
    );
};

export default ExperienceSpecifications;