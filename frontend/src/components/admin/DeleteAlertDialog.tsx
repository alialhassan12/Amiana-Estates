import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from "../ui/alert-dialog";

type DeleteAlertDialogProps={
    open:boolean,
    setOpen:(open:boolean)=>void,
    title:string,
    description:string,
    onConfirm:()=>void,
    onCancel:()=>void,
}

const DeleteAlertDialog=({open,setOpen,title,description,onConfirm,onCancel}:DeleteAlertDialogProps)=>{
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogTitle>
                    {title}
                </AlertDialogTitle>
                <AlertDialogDescription>
                    {description}
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        size="sm"
                        variant="outline"
                        onClick={onCancel}
                        >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        size="sm"
                        variant="destructive"
                        onClick={onConfirm}
                        >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteAlertDialog;