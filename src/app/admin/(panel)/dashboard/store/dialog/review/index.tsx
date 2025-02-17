import { ReviewStep } from "../../store"
import { Store } from "../../types"
import { useReviewStore } from "../../store"
import ReviewDialog from "./review-dialog"
import ApprovedDialog from "./approved-dialog"
import { RejectReasonDialog } from "./reject-reason-dialog"
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    data: Store
}

export const IndexDialog = ({ open, onOpenChange, data }: Props) => {
    const { step, setStep } = useReviewStore()
    if (step === ReviewStep.Approved) {
        return (
            <ApprovedDialog/>
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

    return (
        <ReviewDialog
            open={open}
            onOpenChange={onOpenChange}
            data={data}
        />
    )
}