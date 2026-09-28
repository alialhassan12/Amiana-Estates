import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useGetEnquiries } from "../../hooks/useEnquiry";
import { Pagination, type PaginatedData } from "../../components/Pagination";
import type { Enquiry } from "../../@types/enquirye";
import { Eye, Loader2, Search, X } from "lucide-react";

const Enquiries=()=>{
    const [page,setPage]=useState<number>(1);
    const [searchQuery,setSearchQuery]=useState<string>("");
    const debouncedSearch=useDebounce(searchQuery,500);

    const {data:enquiriesData,isLoading,isFetching,isError}=useGetEnquiries(true,page,debouncedSearch);
    const enquiries=enquiriesData?.enquiries as PaginatedData<Enquiry>;
    const rows=enquiries?.data;

    const currentPage=enquiries?.current_page ?? page;
    const lastPage=enquiries?.last_page ?? 1;
    const hasPreviousPage=currentPage>1;
    const hasNextPage=currentPage<lastPage;

    return(
        <div className="flex flex-col gap-6 w-full max-w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#ECE9E5] pb-5">
                <div>
                    <h1 className="title text-2xl sm:text-3xl text-neutral-900 tracking-tight">
                        Visitors Enquiries
                    </h1>
                    <p className="body-text text-xs sm:text-sm text-neutral-500 mt-1">
                        View The Visitor Enquiries.
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
            </div>

            {/* Experience specifications table */}
            <section className="bg-white border border-[#ECE9E5] rounded-xl shadow-xs overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-[#ECE9E5] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h2 className="title text-lg text-neutral-900 tracking-tight">
                            Experience Specifications
                        </h2>
                        <p className="body-text text-xs text-neutral-500 mt-0.5">
                            {enquiries
                                ? `${enquiries.total} ${enquiries.total === 1 ? "experience specification" : "experience specifications"} available`
                                : "Loading experience specifications..."}
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
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500 whitespace-nowrap">Name</th>
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Email</th>
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Phone Number</th>
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Interest</th>
                                <th scope="col" className="px-4 sm:px-6 py-3 body-text text-[10px] font-semibold uppercase tracking-widest text-neutral-500 whitespace-nowrap">Message</th>
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
                                            {searchQuery ? "Try a different search term." : "Create a experience specification to begin building the residences catalogue."}
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                rows.map((enquiry:Enquiry) => {

                                    return (
                                        <tr key={enquiry.id} className="group hover:bg-[#FAF9F6]/70 transition-colors">
                                            <td className="px-4 sm:px-6 py-4">
                                                <p className="body-text text-sm text-neutral-600 leading-relaxed max-w-xl line-clamp-2">
                                                    {enquiry.name}
                                                </p>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <p className="body-text text-sm text-neutral-600 leading-relaxed max-w-xl line-clamp-2">
                                                    {enquiry.email}
                                                </p>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <span className="body-text text-sm text-neutral-800 whitespace-nowrap">
                                                    {enquiry.phone}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <span className="body-text text-sm text-neutral-800 whitespace-nowrap">
                                                    {enquiry.interest}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4  line-clamp-2">
                                                <span className="body-text text-sm text-neutral-800 whitespace-nowrap">
                                                    {enquiry.message}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        type="button"
                                                        title={`View ${enquiry.name}`}
                                                        aria-label={`View ${enquiry.name}`}
                                                        onClick={()=>{
                                                            // handleOpenEdit(specification);
                                                        }}
                                                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#ECE9E5] text-neutral-600 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary cursor-pointer"
                                                    >
                                                        <Eye className="h-3.5 w-3.5" />
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
                {enquiries && (
                    <Pagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                        hasPreviousPage={hasPreviousPage}
                        hasNextPage={hasNextPage}
                        onPageChange={(page)=>setPage(page)}
                        data={enquiries}
                        isFetching={isFetching}
                    />
                )}
            </section>
        </div>
    );
}

export default Enquiries;