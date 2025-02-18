import EditDialog from "./edit-dialog";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function EditIndexDialog({ open, onOpenChange }: Props){
    return (
        <EditDialog
            open={open}
            onOpenChange={onOpenChange}
        />
    )
}