import { PreDeleteDialog } from "./preDelete-dialog";
import { DelStore, useDelStore } from "../../store";
import { SuccessDialog } from "./success-dialog";
import { Good } from "../../types";
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    data: Good
}

export default function DeleteIndexDialog({ open, onOpenChange, data }: Props) {
    const { step } = useDelStore()
    if (step === DelStore.success) {
        return (
            <SuccessDialog
                open={open}
                onOpenChange={onOpenChange}
            />
        )
    }

    return (
        <PreDeleteDialog
            open={open}
            onOpenChange={onOpenChange}
            id={data.id}
        />
    )
}