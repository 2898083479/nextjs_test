import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
    Form, 
    FormField, 
    FormItem, 
    FormControl, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addMerchant } from "@/api/merchant";
import { ResponseStatusCode } from "@/api/types";
interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const AddMerchantDialog = ({ open, onOpenChange }: Props) => {

    const formSchema = z.object({
        name: z.string()
            .nonempty({ message: "Please enter merchant name" }),
        email: z.string()
            .nonempty({ message: "Please enter email" })
            .email({ message: "Invalid email address" }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        }
    })

    async function onSubmit(formData: z.infer<typeof formSchema>) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        const response = await addMerchant(
            {
                name: formData.name,
                email: formData.email
            }
        );
        if (response.code !== ResponseStatusCode.success) {
            return;
        }
        onOpenChange(false);
        form.reset();
    }
    return (
        <WrapperDialog
            open={open}
            title="Add merchant"
            onOpenChange={onOpenChange}
            className="max-w-[400px]"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-[12px]"
                >
                    <div className="flex flex-col gap-[12px]">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Merchant name</Label>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter merchant name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Enter merchant email</Label>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter merchant email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-end gap-[12px]">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={form.formState.isDirty}
                            className="bg-[#0C7FDA] hover:bg-[#0C7FDA]/80 text-white"
                        >
                            {form.formState.isSubmitting ? "Adding..." : "Add merchant"}
                        </Button>
                    </div>
                </form>
            </Form>
        </WrapperDialog>
    )
}