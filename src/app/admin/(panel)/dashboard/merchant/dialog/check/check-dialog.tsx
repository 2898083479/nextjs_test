import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { MerchantInfo } from "@/api/merchant/types";
import { Button } from "@/components/ui/button";
interface CheckDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: MerchantInfo;
}

export const CheckDialog = ({ open, onOpenChange, data }: CheckDialogProps) => {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-2">
                <div>
                    <div>{data.name}</div>
                    <div>{data.email}</div>
                </div>
                <div>
                    {data.status}
                </div>
                <div>
                    {data.store}
                </div>
                <div>
                    <Button
                        className="bg-[#07CFDA] text-white hover:bg-[#07CFDA]/80"
                        onClick={() => onOpenChange(false)}
                    >
                        关闭
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}

export default CheckDialog