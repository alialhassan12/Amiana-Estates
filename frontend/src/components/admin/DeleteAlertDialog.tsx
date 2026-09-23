import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from "../ui/alert-dialog";

type DeleteAlertDialogProps = {
    open: boolean;
    setOpen?: (open: boolean) => void;
    onOpenChange?: (open: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
};

const DeleteAlertDialog = ({
    open,
    setOpen,
    onOpenChange,
    title,
    description,
    onConfirm,
    onCancel,
    isLoading = false,
}: DeleteAlertDialogProps) => {
    const handleOpenChange = onOpenChange ?? setOpen;
    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange}>
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
                        disabled={isLoading}
                        >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        size="sm"
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isLoading}
                        >
                        {isLoading ? "Deleting..." : "Confirm"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteAlertDialog;