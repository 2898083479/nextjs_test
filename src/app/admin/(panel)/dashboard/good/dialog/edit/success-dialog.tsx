import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const EditSuccessDialog = ({ open, onOpenChange }: Props) => {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-2">
                <div className="text-[18px] text-[#101828] font-[600]">
                    编辑成功
                </div>
            </div>
        </WrapperDialog>
    )
}

export default EditSuccessDialog;