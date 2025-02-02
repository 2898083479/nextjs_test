import { Store } from "../../types"
import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"

interface Props {
    open: boolean
    openChange: (open: boolean) => void
    data: Store
}

export default function ReviewDialog({ open, openChange, data }: Props){
    return (
        <WrapperDialog open={open} onOpenChange={openChange}>
            <div>ReviewDialog</div>
        </WrapperDialog>
    )
}