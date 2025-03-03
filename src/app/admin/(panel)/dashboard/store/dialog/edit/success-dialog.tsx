import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Button } from "@/components/ui/button";
interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function SuccessDialog({ open, onOpenChange }: Props) {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="max-w-[400px]"
        >
            <div className="flex flex-col gap-4">
                <div className="text-[16px] font-[600] text-[#101828]">編輯成功</div>
                <div className="text-[14px] text-[#5D7285]">您已成功編輯商店信息</div>
                <div className="flex justify-end">
                    <Button
                        type="button"
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        onClick={() => onOpenChange(false)}
                    >
                        確定
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}