import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Admin, Status } from "../types"
import { Button } from "@/components/ui/button"
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    data: Admin
}


export default function ReviewDialog({ open, onOpenChange, data }: Props) {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[436px]"
        >
            <div className="flex flex-col gap-[12px]">
                <div className="text-[24px] font-bold">
                    账户审核
                </div>
                <div>name</div>
                <div className="bg-[#f5f5f5] rounded-md p-[12px]">{data?.name}</div>
                <div>status</div>
                <div className="bg-[#f5f5f5] rounded-md p-[12px]">{data?.status === Status.Pending ? "Pending" : data?.status === Status.Approved ? "Approved" : "Rejected"}</div>
                <div>good amount</div>
                <div className="bg-[#f5f5f5] rounded-md p-[12px]">{data?.goodAmount}</div>
                <div>created at</div>
                <div className="bg-[#f5f5f5] rounded-md p-[12px]">{data?.createdAt}</div>
                <div className="flex justify-end gap-[12px]">
                    <Button
                        variant="outline"
                        className="bg-[#ff0000] text-white hover:text-white/80"
                        onClick={() => {
                            onOpenChange(false)
                        }}
                    >
                        Reject
                    </Button>
                    <Button>Approve</Button>
                </div>
            </div>

        </WrapperDialog>
    )
}