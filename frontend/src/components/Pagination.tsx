import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export type PaginatedData<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    from: number | null;
    to: number | null;
};

export const Pagination =<T,>({
    currentPage,
    lastPage,
    hasPreviousPage,
    hasNextPage,
    onPageChange,
    data,
    isFetching
}:{
    currentPage:number;
    lastPage:number;
    hasPreviousPage:boolean;
    hasNextPage:boolean;
    onPageChange:(page:number)=>void;
    data:PaginatedData<T>;
    isFetching:boolean;
})=>{
    return(
        <div className="px-4 sm:px-6 py-3.5 border-t border-[#ECE9E5] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="body-text text-xs text-neutral-500">
                {data.total === 0 || data.from === null
                    ? "No results to show"
                    : `Showing ${data.from}-${data.to} of ${data.total}`}
            </p>
            <div className="flex items-center gap-2 self-end sm:self-auto">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
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
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasNextPage || isFetching}
                    className="border-[#ECE9E5] text-neutral-700 hover:bg-[#FAF9F6] gap-1.5 text-xs cursor-pointer disabled:cursor-not-allowed"
                >
                    Next
                    <ArrowRight className="h-3.5 w-3.5" />
                </Button>
            </div>
        </div>
    );
}