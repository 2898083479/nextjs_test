import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const PreAddDialog = ({ open, onOpenChange }: Props) => {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            PreAdd
        </WrapperDialog>
    )
}

export default PreAddDialog;