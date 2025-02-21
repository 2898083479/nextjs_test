import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Button } from "@/components/ui/button"
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const SuccessDialog = ({ open, onOpenChange }: Props) => {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-4">
                <div className="text-[18px] text-[#101828] font-[600]">删除成功</div>
                <div className="flex justify-end">
                    <Button
                        type="button"
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