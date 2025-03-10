import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Button } from "@/components/ui/button";

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const ReviewFailedDialog = ({ open, onOpenChange }: Props) => {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px] border-none"
        >
            <div className="flex flex-col gap-[12px]">
                <div className="text-[24px]">
                    审核失败
                </div>
                <div className="text-[16px] text-[#afafaf]">
                    审核失败，请重新审核
                </div>
                <div className="flex justify-end gap-[12px]">
                    <Button
                        className="bg-destructive hover:bg-destructive/80 text-white"
                        onClick={() => {
                            onOpenChange(false)
                        }}
                    >
                        关闭
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}

export default ReviewFailedDialog;