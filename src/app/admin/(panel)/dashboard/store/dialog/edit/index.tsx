import EditDialog from "./edit-dialog";
import SuccessDialog from "./success-dialog";
import { Store } from "../../types";
import { EditStep, useEditStore } from "../../store";
interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: Store;
}

export default function EditIndexDialog({ open, onOpenChange, data }: Props) {
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