import PreAddDialog from "./preAdd-dialog";
import SuccessDialog from "./success-dialog";
import { useAddStore, AddStep } from "../store";
import { Good } from "@/app/admin/(panel)/dashboard/good/types";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface Props {
    good: Good;
}

const AddGoodDialog = ({ open, onOpenChange, good }: Props) => {
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
            good={good}
        />
    )
}

export default AddGoodDialog;