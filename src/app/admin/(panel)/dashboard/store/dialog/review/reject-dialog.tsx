import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Button } from "@/components/ui/button"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const RejectDialog = ({ open, onOpenChange }: Props) => {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-4">
                <div className="text-[18px] text-[#F31260] font-[600]">拒绝</div>
                <div className="text-[14px] text-[#5D7285]">您已拒绝该商品申请</div>
                <div className="flex justify-end">
                    <Button
                        type="button"
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
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

export default RejectDialog