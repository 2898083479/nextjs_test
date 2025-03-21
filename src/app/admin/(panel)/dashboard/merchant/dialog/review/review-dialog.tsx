import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Merchant, MerchantStatus } from "../../types"
import { Button } from "@/components/ui/button"
import { ReviewStep, useStore } from "../../store"
import { Label } from "@/components/ui/label"
import { reviewMerchantAPI } from "@/api/merchant"
import { ResponseStatusCode } from "@/api/types"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    data: Merchant
}

export default function ReviewDialog({ open, onOpenChange, data }: Props) {
    const { setStep } = useStore()

    const review = async () => {
        const response = await reviewMerchantAPI(data.merchantId)
        if (response.code === ResponseStatusCode.success) {
            setStep(ReviewStep.Approved)
        } else {
            setStep(ReviewStep.ReviewFailed)
        }
    }

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
                    {data?.status === MerchantStatus.Pending ?
                        "Pending" : data?.status === MerchantStatus.Approved ?
                            "Approved" : "Rejected"}
                </div>
                <Label>created at</Label>
                <div className="bg-[#f5f5f5] rounded-md p-[12px]">{data?.createdAt}</div>
                <div className="flex justify-end gap-[12px]">
                    <Button
                        className="bg-destructive hover:bg-destructive/80 text-white"
                        onClick={() => {
                            setStep(ReviewStep.RejectReason)
                        }}
                    >
                        拒絕
                    </Button>
                    <Button
                        className="bg-[#0C7FDA] hover:bg-[#0C7FDA]/80 text-white"
                        onClick={review}
                    >
                        批准
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}