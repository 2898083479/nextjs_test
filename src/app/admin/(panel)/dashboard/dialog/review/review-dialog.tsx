import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Admin, AdminStatus } from "../../types"
import { Button } from "@/components/ui/button"
import { ReviewStep, useStore } from "../../store"
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    data: Admin
}

export default function ReviewDialog({ open, onOpenChange, data }: Props) {
    const { setStep } = useStore()
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[436px] border-none"
        >
            <div className="flex flex-col gap-[12px]">
                <div className="text-[24px] font-bold">
                    账户审核
                </div>
                <div>name</div>
                <div className="bg-[#f5f5f5] rounded-md p-[12px]">{data?.name}</div>
                <div>status</div>
                <div className="bg-[#f5f5f5] rounded-md p-[12px]">{data?.status === AdminStatus.Pending ? "Pending" : data?.status === AdminStatus.Approved ? "Approved" : "Rejected"}</div>
                <div>good amount</div>
                <div className="bg-[#f5f5f5] rounded-md p-[12px]">{data?.goodAmount}</div>
                <div>created at</div>
                <div className="bg-[#f5f5f5] rounded-md p-[12px]">{data?.createdAt}</div>
                <div className="flex justify-end gap-[12px]">
                    <Button
                        variant="outline"
                        className="bg-[#ff0000] text-white hover:text-white/80"
                        onClick={() => {
                            setStep(ReviewStep.RejectReason)
                        }}
                    >
                        Reject
                    </Button>
                    <Button
                        onClick={() => {
                            setStep(ReviewStep.Approved)
                        }}
                    >
                        Approve
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}