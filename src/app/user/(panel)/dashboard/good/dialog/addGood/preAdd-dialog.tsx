import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Button } from "@/components/ui/button";
import { useAddStore } from "../store";
import { AddStep } from "../store";
import { addGoodToShoppingCarAPI } from "@/api/good";
import { ResponseStatusCode } from "@/api/types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { Good } from "@/app/admin/(panel)/dashboard/good/types";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface Props {
    good: Good;
}

const PreAddDialog = ({ open, onOpenChange, good }: Props) => {
    const merchantId = localStorage.getItem("merchantId") || "";
    const formSchema = z.object({
        quantity: z.string()
            .transform(value => Number(value)),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantity: Number(0),
        },
    })

    const { setStep } = useAddStore();

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        if (data.quantity <= 0) {
            form.setError("quantity", { message: "添加的数量必须大于0" });
            return;
        }
        const response = await addGoodToShoppingCarAPI(
            {
                merchantId: merchantId,
                goodId: good.goodId,
                goodName: good.name,
                price: good.price,
                quantity: Number(data.quantity),
            }
        );
        if (response.code !== ResponseStatusCode.success) {
            form.setError("quantity", { message: response.message });
            return;
        }
        setStep(AddStep.Success);
    }

    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div className="flex flex-col gap-4">
                <div className="text-[18px] font-medium">
                    添加商品
                </div>
                <div>
                    確認要添加此商品到購物車嗎？
                </div>
                <div>
                    <img
                        src={good.image}
                        alt={"图片损坏"}
                    />
                </div>
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>數量</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-row gap-4 justify-end">
                                <Button
                                    type="button"
                                    className="bg-destructive text-white hover:bg-destructive/80"
                                    onClick={() => {
                                        onOpenChange(false);
                                    }}
                                >
                                    取消
                                </Button>
                                <Button
                                    className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                                    type="submit"
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <Loader className="w-4 h-4 animate-spin" /> 添加中...
                                        </span>
                                    ) : (
                                        "添加"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </WrapperDialog>
    )
}

export default PreAddDialog;