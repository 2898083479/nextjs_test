import { ReviewStep } from "../../store"
import { Store } from "../../types"
import { useReviewStore } from "../../store"
import ReviewDialog from "./review-dialog"
import ApprovedDialog from "./approved-dialog"
import { RejectReasonDialog } from "./reject-reason-dialog"
import { RejectDialog } from "./reject-dialog"
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    data: Store
}

export const IndexDialog = ({ open, onOpenChange, data }: Props) => {
    const { step } = useReviewStore()
    if (step === ReviewStep.Approved) {
        return (
            <ApprovedDialog
                open={open}
                onOpenChange={onOpenChange}
            />
        )
    }
    if (step === ReviewStep.RejectReason) {
        return (
            <RejectReasonDialog
                open={open}
                onOpenChange={onOpenChange}
            />
        )
    }
    if (step === ReviewStep.Rejected) {
        return (
            <RejectDialog
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