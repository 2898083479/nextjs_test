import { EditStore, useEditStore } from "../../store";
import { Good } from "../../types";
import { EditDialog } from "./edit-dialog";
import { EditSuccessDialog } from "./success-dialog";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    good: Good;
}

const EditIndexDialog = ({ open, onOpenChange, good }: Props) => {
    const { step: editStep } = useEditStore();

    if (editStep === EditStore.success) {
        return (
            <EditSuccessDialog
                open={open}
                onOpenChange={onOpenChange}
            />
        )
    }

    return (
        <EditDialog
            open={open}
            onOpenChange={onOpenChange}
            good={good}
        />
    )
}

export default EditIndexDialog;