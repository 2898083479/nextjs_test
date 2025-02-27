import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}   

const PreBuyDialog = ({ open, onOpenChange }: Props) => {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            PreBuy
        </WrapperDialog>
    )
}

export default PreBuyDialog;