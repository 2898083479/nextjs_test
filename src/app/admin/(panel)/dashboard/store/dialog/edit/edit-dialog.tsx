import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";

interface EditDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function EditDialog({ open, onOpenChange }: EditDialogProps){
    return (
        <WrapperDialog
            title="编辑"
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div>EditDialog</div>
        </WrapperDialog>
    )
}