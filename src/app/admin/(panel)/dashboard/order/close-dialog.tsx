import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Button } from "@/components/ui/button"
import { deleteOrderAPI } from "@/api/order"
import { toast } from "sonner"
import { ResponseStatusCode } from "@/api/types"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    orderId: string
}

export const CloseDialog = ({ open, onOpenChange, orderId }: Props) => {
    const handleClose = async () => {
        const response = await deleteOrderAPI(orderId)
        if (response.code === ResponseStatusCode.success) {
            toast.success("订单终止成功")
            onOpenChange(false)
        } else {
            toast.success("订单终止失败")
        }
    }
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-4">
                <div className="text-[18px]">终止订单成功</div>
                <div className="text-[14px] text-[#8E95A9]">已终止该交易</div>
                <div className="flex justify-end">
                    <Button
                        className="bg-[#0C7FDA] hover:bg-[#0C7FDA]/80 text-white"
                        onClick={handleClose}
                    >
                        确定
                    </Button>
                </div>

            </div>
        </WrapperDialog>
    )
}
