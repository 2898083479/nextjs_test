import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { ShoppingCar } from "./types";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/api/order";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    shoppingCar: ShoppingCar;
}

const buy = async (shoppingCar: ShoppingCar, destination: string) => {
    const response = await createOrder({
        merchantId: shoppingCar.merchantId,
        goodId: shoppingCar.goodId,
        quantity: shoppingCar.quantity,
        totalPrice: shoppingCar.price * shoppingCar.quantity,
        destination: destination
    })
}

const CheckDialog = ({ open, onOpenChange, shoppingCar }: Props) => {
    const [destination, setDestination] = useState("");
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="max-w-[400px]"
        >
            <div className="flex flex-col gap-[12px]">
                <div className="flex flex-col gap-[12px]">
                    <div className="flex items-center gap-[12px]">
                        <div>
                            商品名稱
                        </div>
                        <div>
                            {shoppingCar.goodName}
                        </div>
                    </div>
                    <div className="flex items-center gap-[12px]">
                        <div>
                            商品價格
                        </div>
                        <div>
                            {shoppingCar.price}
                        </div>
                    </div>
                    <div className="flex items-center gap-[12px]">
                        <div>
                            商品數量
                        </div>
                        <div>
                            {shoppingCar.quantity}
                        </div>
                    </div>
                    <div className="flex items-center gap-[12px]">
                        <div>
                            商品總價
                        </div>
                        <div>
                            {shoppingCar.price * shoppingCar.quantity}
                        </div>
                    </div>
                </div>
                <div>
                    <Input
                        placeholder="請輸入地址"
                        onChange={(e) => {
                            setDestination(e.target.value);
                        }}
                    />
                </div>
                <div className="flex items-center justify-end gap-[12px]">
                    <Button
                        variant="outline"
                        className="border-[#0C7FDA] text-[#0C7FDA] hover:text-[#0C7FDA]"
                        onClick={() => {
                            onOpenChange(false);
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        onClick={() => {
                            buy(shoppingCar, destination);
                        }}
                    >
                        確認
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}

export default CheckDialog;