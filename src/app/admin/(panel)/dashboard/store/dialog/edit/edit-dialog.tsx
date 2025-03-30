import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";
import { StoreStatus, type Store } from "../../types";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { useEditStore, EditStep } from "../../store";
import { EditStoreAPI } from "@/api/store";
import { ResponseStatusCode } from "@/api/types";
import { Textarea } from "@/components/ui/textarea";

interface EditDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: Store;
}

export default function EditDialog({ open, onOpenChange, data }: EditDialogProps) {
    const { setStep } = useEditStore();
    const formSchema = z.object({
        name: z
            .string().min(1, { message: "請輸入名稱" }),
        email: z
            .string().min(1, { message: "請輸入郵箱" }).email({ message: "請輸入正確的郵箱" }),
        status: z.nativeEnum(StoreStatus, {
            errorMap: () => ({
                message: "status is invalid"
            })
        }),
        description: z.string().nonempty({ message: "請輸入描述" })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.name,
            email: data.email,
            status: data.status as StoreStatus,
            description: data.description,
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await EditStoreAPI(
            data.storeId,
            {
                name: values.name,
                email: values.email,
                status: values.status,
                description: values.description,
            })
        if (response.code === ResponseStatusCode.success) {
            setStep(EditStep.Success);
            console.log(values);
        }
    }

    return (
        <WrapperDialog
            title="编辑"
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <Form {...form}>
                <form
                    className="flex flex-col gap-2"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>名稱</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="請輸入名稱"
                                        className="w-[350px]"
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
                                <FormLabel>郵箱</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="請輸入郵箱"
                                        className="w-[350px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>狀態</FormLabel>
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="w-[350px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            Object.values(StoreStatus).map(status => (
                                                <SelectItem key={status} value={status}>
                                                    {status}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>描述</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="請輸入描述"
                                        className="w-[350px] resize-none"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            className="bg-destructive text-white hover:bg-destructive/80"
                            onClick={() => onOpenChange(false)}
                        >
                            取消
                        </Button>
                        <Button
                            type="submit"
                            disabled={!form.formState.isDirty || form.formState.isSubmitting}
                            className="bg-[#0C7FD9] hover:bg-[#0C7FD9]/80 text-white"
                        >
                            {form.formState.isSubmitting ? <span className="flex items-center gap-2">
                                <Loader className="animate-spin" /> 提交中...</span> : "提交"}
                        </Button>
                    </div>
                </form>
            </Form>
        </WrapperDialog>
    )
}
