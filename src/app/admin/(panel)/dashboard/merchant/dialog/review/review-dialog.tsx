import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Admin, AdminStatus } from "../../types"
import { Button } from "@/components/ui/button"
import { ReviewStep, useStore } from "../../store"
import { Label } from "@/components/ui/label"
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
            className="w-[400px] border-none"
        >
            <div className="flex flex-col gap-[12px]">
                <div className="text-[24px] font-bold">
                    账户审核
                </div>
                <Label>name</Label>
                <div className="bg-[#f5f5f5] rounded-md p-[12px]">
                    <div className="text-[16px] text-[#101828]">{data?.name}</div>
                    <div className="text-[14px] text-[#8E95A9]">{data?.email}</div>
                </div>
                <Label>status</Label>
                <div className="bg-[#f5f5f5] rounded-md p-[12px] text-[16px] text-[#101828]">
                    {data?.status === AdminStatus.Pending ?
                        "Pending" : data?.status === AdminStatus.Approved ?
                            "Approved" : "Rejected"}
                </div>
                <Label>created at</Label>
                <div className="bg-[#f5f5f5] rounded-md p-[12px]">{data?.createdAt}</div>
                <div className="flex justify-end gap-[12px]">
                    <Button
                        variant="outline"
                        className="bg-[#F31260] hover:bg-[#F31260]/80 text-white"
                        onClick={() => {
                            setStep(ReviewStep.RejectReason)
                        }}
                    >
                        Reject
                    </Button>
                    <Button
                        className="bg-[#0C7FDA] hover:bg-[#0C7FDA]/80 text-white"
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