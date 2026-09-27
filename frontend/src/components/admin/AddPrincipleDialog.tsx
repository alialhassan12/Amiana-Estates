import { ListOrdered, Loader2 } from "lucide-react";
import { useAddPhilosophyPrinciple } from "../../hooks/useDesignPhilosophyPrinciple";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";

type AddPrincipleDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    design_philosophy_id:number;
};

const AddPrincipleDialog = ({
    open,
    setOpen,
    design_philosophy_id,
}: AddPrincipleDialogProps) => {
    const {mutateAsync:addPhilosophyPrinciple,isPending:isAddingPhilosophyPrinciple}=useAddPhilosophyPrinciple();
    const [principleTitle,setPrincipleTitle]=useState<string>('');

    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        try {
            await addPhilosophyPrinciple({design_philosophy_id,title:principleTitle.trim()});
            toast.add({
                description:"Principle added successfully.",
                type:"success",
            })
            setOpen(false);
            setPrincipleTitle("");
        } catch (error) {
            const apiError = error as { response?: { data?: { message?: string } } };
            console.error("Error creating philosophy principle:", error);
            toast.add({
                description: apiError.response?.data?.message || "Failed to add principle.",
                type: "error",
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg w-full !p-0 !gap-0 overflow-hidden bg-white">
                {/* Sticky Header */}
                <DialogHeader className="shrink-0 border-b border-[#ECE9E5] px-6 py-4 pr-12">
                    <DialogTitle className="title text-xl text-neutral-900 tracking-tight flex items-center gap-2">
                        <ListOrdered className="h-5 w-5 text-primary" />
                        Add Philosophy Principle
                    </DialogTitle>
                    <DialogDescription className="body-text text-xs leading-relaxed text-neutral-500">
                        Add a new philosophy principle.
                    </DialogDescription>
                </DialogHeader>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="px-6 py-5">
                        <label htmlFor="principle-title" className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                            Principle Title
                        </label>
                        <input
                            id="principle-title"
                            value={principleTitle}
                            onChange={(e) => setPrincipleTitle(e.target.value)}
                            type="text"
                            placeholder="E.g. bedrooms, balcony, bathrooms, living area, etc..."
                            className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            required
                            autoFocus
                        />
                    </div>

                    {/* Sticky Footer */}
                    <div className="flex flex-col-reverse gap-2 border-t border-[#ECE9E5] bg-[#FAF9F6] px-6 py-4 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isAddingPhilosophyPrinciple}
                            onClick={() => {
                                setOpen(false);
                                setPrincipleTitle("");
                            }}
                            className="border-[#ECE9E5] text-neutral-700 hover:bg-[#FAF9F6] cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isAddingPhilosophyPrinciple || !principleTitle.trim()}
                            className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
                        >
                            {isAddingPhilosophyPrinciple ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Adding...
                                </>
                            ) : "Add Principle"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddPrincipleDialog;