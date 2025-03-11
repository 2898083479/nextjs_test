import { useAddStore, AddStep } from "../../store";
import PreAddDialog from "./preAdd-dialog";
import AddSuccessDialog from "./addSuccess-dialog";
import AddFailedDialog from "./addFailed-dialog";

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    storeId: string
}

const AddMerchantDialog = ({ open, onOpenChange, storeId }: Props) => {
    const { step } = useAddStore()
    if (step === AddStep.AddSuccess) {
        return (
            <AddSuccessDialog
                open={open}
                onOpenChange={onOpenChange}
            />
        )
    }
    if (step === AddStep.AddFailed) {
        return (
            <AddFailedDialog
                open={open}
                onOpenChange={onOpenChange}
            />
        )
    }
    return (
        <PreAddDialog
            open={open}
            onOpenChange={onOpenChange}
            storeId={storeId}
        />
    )
}

export default AddMerchantDialog;