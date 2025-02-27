import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Button } from "@/components/ui/button";
import { useAddStore } from "../store";
import { AddStep } from "../store";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    goodId: string;
}

const PreAddDialog = ({ open, onOpenChange, goodId }: Props) => {
    const { step, setStep } = useAddStore();

    const addGood = async (goodId: string) => {
        
        setStep(AddStep.Success);
    }

    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-4">
                <div>
                    Add Good
                </div>
                <div>
                    Do you confirm to add this good to your shopping car?
                </div>
                <div className="flex flex-row gap-4 justify-end">
                    <Button
                        className="bg-destructive text-white hover:bg-destructive/80"
                        onClick={() => {
                            onOpenChange(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        onClick={() => {
                            addGood(goodId);
                        }}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}

export default PreAddDialog;