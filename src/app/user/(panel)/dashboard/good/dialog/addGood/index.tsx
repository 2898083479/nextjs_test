import PreAddDialog from "./preAdd-dialog";
import SuccessDialog from "./success-dialog";
import { useAddStore, AddStep } from "../store";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    goodId: string;
}

const AddGoodDialog = ({ open, onOpenChange, goodId }: Props) => {
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
            goodId={goodId}
        />
    )
}

export default AddGoodDialog;