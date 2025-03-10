import { useStore } from "../../store";
import { ReviewStep } from "../../store";
import ReviewDialog from "./review-dialog";
import { ApproveDialog } from "./approve-dialog";
import { RejectDialog } from "./reject-dialog";
import { RejectReasonDialog } from "./reject-reason-dialog";
import { Merchant } from "../../types";
import ReviewFailedDialog from "./reviewFailed-dialog";

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    data: Merchant
}

export const IndexDialog = ({ open, onOpenChange, data }: Props) => {
    const { step } = useStore()
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
    if (step === ReviewStep.ReviewFailed) {
        return (
            <ReviewFailedDialog
                open={open}
                onOpenChange={onOpenChange}
            />
        )
    }
    return (
        <ReviewDialog
            open={open}
            onOpenChange={onOpenChange}
            data={data}
        />
    )
}

export default IndexDialog