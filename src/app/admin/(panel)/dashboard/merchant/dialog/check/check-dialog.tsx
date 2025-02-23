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
                <div className="text-[14px] text-[#8E95A9]">商户信息</div>
                <div className="bg-[#F8FAFC] h-[70px] flex items-center rounded-[4px] p-2">
                    {data.name}
                    {data.email}
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-[14px] text-[#8E95A9]">状态</div>
                    <div className="bg-[#F8FAFC] h-[46px] flex items-center rounded-[4px] p-2">
                        {data.status}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-[14px] text-[#8E95A9]">店铺</div>
                    <div className="bg-[#F8FAFC] h-[46px] flex items-center rounded-[4px] p-2">
                        {data.store}
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
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