import PreBuyDialog from "./preBuy-dialog";
import SuccessDialog from "./success-dialog";
import { useBuyStore, BuyStep } from "../store";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}   

const BuyGoodDialog = ({ open, onOpenChange }: Props) => {
    const { step } = useBuyStore();

    if (step === BuyStep.Success) {
        return (
            <SuccessDialog
                open={open} 
                onOpenChange={onOpenChange}
            />
        )
    }

    return (
        <PreBuyDialog
            open={open}
            onOpenChange={onOpenChange}
        />
    )
}

export default BuyGoodDialog;