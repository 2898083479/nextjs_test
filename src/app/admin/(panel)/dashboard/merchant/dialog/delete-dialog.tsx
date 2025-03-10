import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { deleteMerchantAPI } from "@/api/merchant";
import { useState } from "react";
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    id: string
}

export const MerchantDeleteDialog = ({ open, onOpenChange, id }: Props) => {
    const [isPending, setIsPending] = useState(false)
    const delMerchant = async () => {
        setIsPending(true)
        await deleteMerchantAPI(id)
        onOpenChange(false)
        setIsPending(false)
    }

    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-4">
                <div
                    className="text-[18px] text-[#101828] font-[600]"
                >
                    删除商户
                </div>
                <div className="text-[14px] text-[#667085]">
                    确定删除商户吗？
                </div>
                <div className="flex gap-2 justify-end">
                    <Button
                        className="bg-destructive text-white hover:bg-destructive/80"
                        onClick={() => {
                            onOpenChange(false)
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        type="button"
                        disabled={isPending}
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        onClick={() => {
                            delMerchant()
                        }}
                    >
                        {
                            isPending ? <span className="flex items-center gap-2">
                                <Loader className="animate-spin" /> 删除中...</span> : "删除"
                        }
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}