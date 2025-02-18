import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Button } from "@/components/ui/button"
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function ApprovedDialog({ open, onOpenChange }: Props) {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-4">
                <div className="text-[20px] text-[#101828] font-[600]">审核通过</div>
                <div className="text-[14px] text-[#667085]">
                    您已通过审核，请耐心等待审核结果。
                </div>
                <div className="flex justify-end">
                    <Button
                        type="button"
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        onClick={() => onOpenChange(false)}
                    >
                        确定
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}