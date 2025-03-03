import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Button } from "@/components/ui/button";

interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

const SuccessDialog = ({ open, onOpenChange }: Props) => {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-4">
                <div>
                    operation success
                </div>
                <div className="flex justify-end">
                    <Button
                        onClick={() => onOpenChange(false)}
                        className="bg-destructive text-white hover:bg-destructive/80"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}

export default SuccessDialog;