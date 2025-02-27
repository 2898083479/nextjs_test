import PreAddDialog from "./preAdd-dialog";
import SuccessDialog from "./success-dialog";
import { useAddStore, AddStep } from "../store";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const AddGoodDialog = ({ open, onOpenChange }: Props) => {
    const { step } = useAddStore();

    if (step === AddStep.Success) {
        return (
            <SuccessDialog
                open={open}
                onOpenChange={onOpenChange}
            />
        )
    }

    return (
        <PreAddDialog
            open={open}
            onOpenChange={onOpenChange}
        />
    )
}

export default AddGoodDialog;