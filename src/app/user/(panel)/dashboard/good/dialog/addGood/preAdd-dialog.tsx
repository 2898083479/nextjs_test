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

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    goodId: string;
}

const PreAddDialog = ({ open, onOpenChange, goodId }: Props) => {

    const formSchema = z.object({
        quantity: z.number().min(1, { message: "數量不能小於1" }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantity: 1,
        },
    })

    const { setStep } = useAddStore();

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const response = await addGoodToShoppingCarAPI();
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
                <div>
                    Add Good
                </div>
                <div>
                    Do you confirm to add this good to your shopping car?
                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
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
                        </form>
                    </Form>
                </div>
                <div className="flex flex-row gap-4 justify-end">
                    <Button
                        className="bg-destructive text-white hover:bg-destructive/80"
                        onClick={() => {
                            onOpenChange(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        type="submit"
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}

export default PreAddDialog;