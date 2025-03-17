import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader } from "lucide-react";
import { deleteGoodAPI } from "@/api/good";
import { ResponseStatusCode } from "@/api/types";

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    id: string
}

export const PreDeleteDialog = ({ open, onOpenChange, id }: Props) => {
    const [isPending, setIsPending] = useState(false)
    const delGood = async (id: string) => {
        setIsPending(true)
        const response = await deleteGoodAPI(id)
        if (response.code === ResponseStatusCode.success) {
            onOpenChange(false)
        }
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
                    删除商品
                </div>
                <div className="text-[14px] text-[#667085]">
                    确定删除商品吗？
                </div>
                <div className="flex gap-2 justify-end">
                    <Button
                        type="button"
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
                            delGood(id)
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