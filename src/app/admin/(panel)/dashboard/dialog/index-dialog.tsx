import { useStore } from "../store";
import { ReviewStep } from "../store";
import ReviewDialog from "./review-dialog";
import { ApproveDialog } from "./approve-dialog";
import { RejectDialog } from "./reject-dialog";
import { RejectReasonDialog } from "./reject-reason-dialog";
import { Admin } from "../types";

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    data: Admin
}

export default function IndexDialog({ open, onOpenChange, data }: Props) {
    const { step, setStep } = useStore()
    if (step === ReviewStep.Approved) {
        // TODO: 审核通过
        return (
            <ApproveDialog
                open={open}
                onOpenChange={onOpenChange}
            />
        )
    }
    if (step === ReviewStep.Rejected) {
        // TODO: 审核拒绝
        return (
            <RejectDialog
                open={open}
                onOpenChange={onOpenChange}
            />
        )
    }
    if (step === ReviewStep.RejectReason) {
        // TODO: 审核拒绝理由
        return (
            <RejectReasonDialog 
                open={open}
                onOpenChange={onOpenChange}
            />
        )
    }
    return (
        <ReviewDialog
            open={step === ReviewStep.Default}
            onOpenChange={() => setStep(ReviewStep.Default)}
            data={data}
        />
    )
}