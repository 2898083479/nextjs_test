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

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    goodId: string;
}

const PreAddDialog = ({ open, onOpenChange, goodId }: Props) => {

    const formSchema = z.object({
        quantity: z.string()
            .transform(value => Number(value)),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantity: 0,
        },
    })

    const { setStep } = useAddStore();

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        if (data.quantity <= 0) {
            form.setError("quantity", { message: "The quantity must be greater than 0" });
            return;
        }
        const response = await addGoodToShoppingCarAPI(
            {
                goodId,
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
                <div>
                    Add Good
                </div>
                <div>
                    Do you confirm to add this good to your shopping car?
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
                            <div className="flex flex-row gap-4 justify-end">
                                <Button
                                    type="button"
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
                                    disabled={!form.formState.isDirty || form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <Loader className="w-4 h-4 animate-spin" /> Adding...
                                        </span>
                                    ) : (
                                        "Add"
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