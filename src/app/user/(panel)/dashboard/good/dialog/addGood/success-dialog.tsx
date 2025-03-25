'use client'

import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const SuccessDialog = ({ open, onOpenChange }: Props) => {
    const router = useRouter();
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col justify-center h-full">
                商品添加成功
            </div>
            <div className="flex justify-end gap-2">
                <div className="text-[14px] text-gray-500 cursor-pointer flex items-center justify-center"
                    onClick={() => {
                        onOpenChange(false);
                        router.push('/user/dashboard/shopping-car');
                    }}
                >
                    去购物车查看
                </div>
                <Button
                    className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                    onClick={() => {
                        onOpenChange(false);
                    }}
                >
                    確定
                </Button>
            </div>
        </WrapperDialog>
    )
}

export default SuccessDialog;