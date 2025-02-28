import PreBuyDialog from "./preBuy-dialog"
import SuccessDialog from "./success-dialog"
import { useBuyStore, BuyStep } from "../store"
import { Good } from "@/app/admin/(panel)/dashboard/good/types"

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    good: Good;
}   

const BuyGoodDialog = ({ open, onOpenChange, good }: Props) => {
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
            good={good}
        />
    )
}

export default BuyGoodDialog;