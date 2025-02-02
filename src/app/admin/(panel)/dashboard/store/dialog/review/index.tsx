import { ReviewStep } from "../../store"
import { Store } from "../../types"
import { useReviewStore } from "../../store"
import ReviewDialog from "./review-dialog"
import ApprovedDialog from "./approved-dialog"
interface Props {
    open: boolean
    openChange: (open: boolean) => void
    data: Store
}

export const IndexDialog = ({ open, openChange, data }: Props) => {
    const { step, setStep } = useReviewStore()
    if (step === ReviewStep.Approved) {
        return (
            <ApprovedDialog/>
        )
    }

    return (
        <ReviewDialog
            open={open}
            openChange={openChange}
            data={data}
        />
    )
}