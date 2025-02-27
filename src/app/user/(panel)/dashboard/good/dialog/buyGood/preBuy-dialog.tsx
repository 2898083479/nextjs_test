import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Button } from "@/components/ui/button";
import { useBuyStore } from "@/app/user/(panel)/dashboard/good/dialog/store";
import { BuyStep } from "@/app/user/(panel)/dashboard/good/dialog/store";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}   

const PreBuyDialog = ({ open, onOpenChange }: Props) => {
    const { setStep: setBuyStep } = useBuyStore();
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            PreBuy
            <div>
                <Button
                    className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                    onClick={() => {
                        setBuyStep(BuyStep.Success);
                    }}
                >
                    确定
                </Button>
            </div>
        </WrapperDialog>
    )
}

export default PreBuyDialog;