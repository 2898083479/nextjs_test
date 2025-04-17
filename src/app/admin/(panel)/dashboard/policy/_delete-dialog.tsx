import { deletePolicyAPI } from "@/api/policy";
import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Button } from "@/components/ui/button";
import { ResponseStatusCode } from "@/api/types";
import { toast } from "sonner";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    policyId: string;
}

export const DeleteDialog = ({ open, onOpenChange, policyId }: Props) => {

    const deletePolicy = async (policyId: string) => {
        console.log(policyId);
        const response = await deletePolicyAPI(policyId);
        if (response.code === ResponseStatusCode.success) {
            toast.success("刪除成功");
            onOpenChange(false);
        } else {
            toast.error("刪除失敗");
        }
    }

    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="text-[18px] font-semibold">刪除條款</div>
                    <div className="text-[14px] text-tp">確認要刪除該條款嗎？</div>
                </div>
                <div className="flex flex-row gap-2 justify-end">
                    <Button
                        variant="outline"
                        className="text-[#0C7FDA] border-[#0C7FDA] hover:text-[#0C7FDA] border-[#0C7FDA]/80"
                        onClick={() => {
                            onOpenChange(false);
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        onClick={() => {
                            deletePolicy(policyId);
                        }}
                    >
                        刪除
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}