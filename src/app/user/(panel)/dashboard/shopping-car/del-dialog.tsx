import { deleteShoppingCarAPI } from "@/api/shoppingCar";
import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    shoppingCarId: string;
}

const DelSuccessDialog = ({ isOpen, setIsOpen, shoppingCarId }: Props) => {

    const deleteGood = async (shoppingCarId: string) => {
        await deleteShoppingCarAPI(shoppingCarId);
        toast.success("已成功将商品从购物车中移除");
        setIsOpen(false);
    }

    return (
        <WrapperDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-3">
                <div className="text-[18px] font-medium">
                    确定要移除此商品吗？
                </div>
                <div className="text-[14px] font-normal">
                    移除后，您可以重新添加到购物车
                </div>
                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        className="border-[#0C7FDA] text-[#0C7FDA] hover:text-[#0C7FDA] hover:bg-[#0C7FDA]/10"
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        onClick={() => {
                            deleteGood(shoppingCarId);
                        }}
                    >
                        確定
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}
export default DelSuccessDialog;