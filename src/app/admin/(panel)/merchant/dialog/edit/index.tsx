import { useEditStore } from "../../store"
import { EditStep } from "../../store"
import { Admin } from "../../types"
import EditDialog from "./edit-dialog"
import SuccessDialog from "./success-dialog"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    data: Admin
}

export const IndexDialog2 = ({ open, onOpenChange, data }: Props) => {
    const { step } = useEditStore()
    if (step === EditStep.Success) {
        return (
            <SuccessDialog
                open={open}
                onOpenChange={onOpenChange}
            />
        )
    }
    return (
        <EditDialog
            open={open}
            onOpenChange={onOpenChange}
            data={data}
        />
    )
}

export default IndexDialog2