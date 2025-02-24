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
                <div className="text-2xl font-bold">拒绝</div>
                <div className="text-sm text-gray-500">您已拒绝该商户申请</div>
                <div className="flex justify-end">
                    <Button
                        onClick={() => {
                            onOpenChange(false)
                        }}
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                    >
                        确定
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}

export default RejectDialog