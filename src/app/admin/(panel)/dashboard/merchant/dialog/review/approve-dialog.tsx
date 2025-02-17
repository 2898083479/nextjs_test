import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Button } from "@/components/ui/button"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const ApproveDialog = ({ open, onOpenChange }: Props) => {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-4">
                <div className="text-[18px]">审核通过</div>
                <div className="text-[14px] text-[#8E95A9]">您已同意该商品申请</div>
                <div className="flex justify-end">
                    <Button
                        className="bg-[#0C7FDA] hover:bg-[#0C7FDA]/80 text-white"
                        onClick={() => {
                            onOpenChange(false)
                        }}
                    >
                        确定
                    </Button>
                </div>

            </div>
        </WrapperDialog>
    )
}

export default ApproveDialog