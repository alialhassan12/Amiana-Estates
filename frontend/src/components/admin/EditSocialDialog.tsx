import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { toast } from "../ui/toast";
import { Link, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import type { Social } from "../../@types/social";
import { useEditSocial } from "../../hooks/useSocials";

type EditSocialDialogProps = {
    social: Social;
    open: boolean;
    setOpen: (open: boolean) => void;
};

const EditSocialDialog = ({ social, open, setOpen }: EditSocialDialogProps) => {

    const [label,setLabel]=useState<string>(social?.label);
    const [url,setUrl]=useState<string>(social?.url);

    useEffect(() => {
        if (social) {
            setLabel(social?.label || "");
            setUrl(social?.url || "");
        }
    }, [social]);

    const {mutateAsync:editSocial,isPending:isEditingSocial}=useEditSocial();

    const handleSubmit=async()=>{
        try{
            await editSocial({
                id:social.id,
                label,
                url,
            });
            setOpen(false);
            setLabel("");
            setUrl("");
        }catch(error:any){
            toast.add({
                description:"Failed to edit social",
                type:"error",
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Social</DialogTitle>
                    <DialogDescription>
                        Edit a social media platform.
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
                        disabled={isEditingSocial} 
                        onClick={handleSubmit}
                        className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
                    >
                        {isEditingSocial ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Editing...
                            </>
                        ) : "Edit Social"}
                    </Button>
                    <DialogClose
                        render={
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isEditingSocial}
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

export default EditSocialDialog;