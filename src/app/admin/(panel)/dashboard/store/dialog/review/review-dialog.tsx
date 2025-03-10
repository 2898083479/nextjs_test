import { Store } from "../../types"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { ReviewStep, useReviewStore } from "../../store"
import dayjs from "dayjs"
import { ReviewStoreAPI } from "@/api/store"
import { ResponseStatusCode } from "@/api/types"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    data: Store
}

export default function ReviewDialog({ open, onOpenChange, data }: Props){
    const { setStep } = useReviewStore()

    const reviewStore = async () => {
        const response = await ReviewStoreAPI(data.storeId)
        if (response.code === ResponseStatusCode.success) {
            onOpenChange(false)
            return
        }
    }

    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-[12px]">
                <div className="text-[#5D7285] text-[18px] font-bold">
                    店铺注册申请
                </div>
                <div>
                    <Label className="text-[14px] text-[#8E95A9]">店铺基本信息</Label>
                    <div className="bg-[#f5f5f5] rounded-md p-[12px]">
                        <div className="text-[16px] text-[#101828] font-bold">{data.name}</div>
                        <div className="text-[14px] text-[#8E95A9]">{data.email}</div>
                    </div>
                </div>
                <div>
                    <Label className="text-[14px] text-[#8E95A9]">状态</Label>
                    <div className="bg-[#f5f5f5] rounded-md p-[12px]">
                        <div>{data.status}</div>
                    </div>
                </div>
                <div>
                    <Label className="text-[14px] text-[#8E95A9]">创建时间</Label>
                    <div className="bg-[#f5f5f5] rounded-md p-[12px]">
                        <div>{dayjs(data.createAt).format("YYYY/MM/DD")}</div>
                    </div>
                </div>
                <div className="flex justify-end gap-[12px]">
                    <Button
                        type="button"
                        className="bg-[#F31260] hover:bg-[#F31260]/80 text-white"
                        onClick={() => {
                            setStep(ReviewStep.RejectReason)
                        }}
                    >
                        Reject
                    </Button>
                    <Button
                        type="button"
                        className="bg-[#0C7FDA] hover:bg-[#0C7FDA]/80 text-white"
                        onClick={reviewStore}
                    >
                        Approve
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}