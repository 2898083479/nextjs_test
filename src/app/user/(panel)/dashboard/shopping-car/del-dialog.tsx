import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Button } from "@/components/ui/button";
interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const DelSuccessDialog = ({ isOpen, setIsOpen }: Props) => {
    return (
        <WrapperDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-[20px]">
                <div className="text-[24px] font-medium">
                    刪除成功
                </div>
                <div className="flex justify-end">
                    <Button
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        onClick={() => setIsOpen(false)}
                    >
                        確定
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}
export default DelSuccessDialog;