import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Button } from "@/components/ui/button";
import { useBuyStore } from "@/app/user/(panel)/dashboard/good/dialog/store";
import { BuyStep } from "@/app/user/(panel)/dashboard/good/dialog/store";
import { Good } from "@/app/admin/(panel)/dashboard/good/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buyGoodAPI } from "@/api/good";
import { ResponseStatusCode } from "@/api/types";
import { 
    Form, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormControl,
    FormMessage
} from "@/components/ui/form";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    good: Good;
}

const PreBuyDialog = ({ open, onOpenChange, good }: Props) => {

    const formSchema = z.object({
        quantity: z.number().min(1, { message: "數量不能小於1" }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantity: 1,
        },
    })


    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const response = await buyGoodAPI({
            goodId: good.id,
            quantity: data.quantity,
        })

        if (response.code !== ResponseStatusCode.success) {
            form.setError("quantity", { message: response.message });
            return;
        }
        setBuyStep(BuyStep.Success);
        console.log(data);
    }

    const { setStep: setBuyStep } = useBuyStore();
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div>
                PreBuy
            </div>
            <div>
                <div>
                    <Label>您將要購買的商品是：</Label>{good.name}
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField 
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>請輸入您要購買的數量：</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>

                </Form>
            </div>
            <div className="flex flex-row justify-end">
                <Button
                    className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                    onClick={form.handleSubmit(onSubmit)}
                >
                    確定
                </Button>
            </div>
        </WrapperDialog>
    )
}

export default PreBuyDialog;