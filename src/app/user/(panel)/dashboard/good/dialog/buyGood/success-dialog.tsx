import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const SuccessDialog = ({ open, onOpenChange }: Props) => {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            Success
        </WrapperDialog>
    )
}

export default SuccessDialog;