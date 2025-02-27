import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Button } from "@/components/ui/button";
interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const SuccessDialog = ({ open, onOpenChange }: Props) => {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col items-center justify-center h-full">
                Good added successfully
            </div>
            <div className="flex justify-end">
                <Button
                    className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                    onClick={() => {
                        onOpenChange(false);
                    }}
                >
                    确定
                </Button>
            </div>
        </WrapperDialog>
    )
}

export default SuccessDialog;