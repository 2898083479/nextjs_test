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
            <div>
                <div>
                    購買成功，您已成功購買該商品。
                </div>
                <div className="flex justify-end">
                    <Button 
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        onClick={() => {
                            onOpenChange(false);
                        }}
                    >
                        確定
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}

export default SuccessDialog;