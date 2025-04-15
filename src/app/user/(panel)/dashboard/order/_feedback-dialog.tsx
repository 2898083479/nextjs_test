import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { feedbackOrderAPI } from "@/api/order";
import { ResponseStatusCode } from "@/api/types";
import { toast } from "sonner";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface Props {
    orderId: string;
}

export const FeedbackDialog = ({ open, onOpenChange, orderId }: Props) => {
    const [reason, setReason] = useState("")

    const feedback = async (orderId: string) => {
        const res = await feedbackOrderAPI(orderId, reason)
        if (res.code !== ResponseStatusCode.success) {
            toast.error(res.message)
            return
        }
        toast.success("反馈成功")
        onOpenChange(false)
    }

    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="max-w-[400px]"
            title="对订单持有疑惑？"
        >
            <div className="flex flex-col gap-4">
                <div>
                    原因
                    <Textarea
                        className="resize-none"
                        onChange={(e) => {
                            setReason(e.target.value)
                        }}
                    />
                </div>
                <div className="flex items-center justify-end gap-2">
                    <Button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className="bg-destructive text-white hover:bg-destructive/80"
                    >
                        取消
                    </Button>
                    <Button
                        type="submit"
                        disabled={!reason}
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        onClick={() => feedback(orderId)}
                    >
                        提交
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}