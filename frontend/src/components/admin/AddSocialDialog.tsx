import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useAddSocial } from "../../hooks/useSocials";
import { toast } from "../ui/toast";
import { Link, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

type AddSocialDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const AddSocialDialog = ({ open, setOpen }: AddSocialDialogProps) => {

    const [label,setLabel]=useState<string>("");
    const [url,setUrl]=useState<string>("");

    const {mutateAsync:addSocial,isPending:isAddingSocial}=useAddSocial();

    const handleSubmit=async()=>{
        try{
            await addSocial({
                label,
                url,
            });
            setOpen(false);
            setLabel("");
            setUrl("");
        }catch(error:any){
            toast.add({
                description:"Failed to add social",
                type:"error",
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Social</DialogTitle>
                    <DialogDescription>
                        Add a new social media platform.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div>
                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                            Social Media Platform
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="e.g Facebook"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:none outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block uppercase body-text text-[11px] font-semibold tracking-wider text-neutral-700 mb-1.5">
                            Social Media Link
                        </label>
                        <div className="relative">
                            <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="https://facebook.com/username"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAF9F6] border border-[#ECE9E5] rounded-sm text-sm text-neutral-900 focus:none outline-none"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col-reverse gap-2 border-t border-[#ECE9E5] bg-[#FAF9F6] px-4 py-4 sm:flex-row sm:justify-end">
                    <Button 
                        type="submit" 
                        disabled={isAddingSocial} 
                        onClick={handleSubmit}
                        className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
                    >
                        {isAddingSocial ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Adding...
                            </>
                        ) : "Add Social"}
                    </Button>
                    <DialogClose
                        render={
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isAddingSocial}
                                onClick={() => setOpen(false)}
                                className="border-[#ECE9E5] text-neutral-700 hover:bg-[#FAF9F6] cursor-pointer"
                            >
                                Cancel
                            </Button>
                        }
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddSocialDialog;