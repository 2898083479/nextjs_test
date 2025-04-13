import { Store } from "@/app/admin/(panel)/dashboard/store/types";
import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { UpdateMerchantStoreAPI } from "@/api/store";
import { ResponseStatusCode } from "@/api/types";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface Props {
    store: Store;
}

export const EditDialog = ({ open, onOpenChange, store }: Props) => {
    const merchantId = localStorage.getItem('merchantId')
    const queryClient = useQueryClient()
    const formSchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        email: z.string().email({ message: "邮箱格式不正确" }).optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: store.name,
            description: store.description,
            email: store.email,
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const response = await UpdateMerchantStoreAPI(merchantId || '', store.storeId, data)
        if (response.code === ResponseStatusCode.success) {
            toast.success("店铺信息更新成功")
            onOpenChange(false)
            queryClient.invalidateQueries({ queryKey: ['storeList'] })
        } else {
            toast.error("店铺信息更新失败")
        }
    }

    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="max-w-[400px]"
            title="编辑店铺"
        >
            <Form {...form}>
                <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>店铺名称</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>店铺描述</FormLabel>
                                <FormControl>
                                    <Textarea className="resize-none" {...field} />
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
                                <FormLabel>邮箱</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            onClick={() => {
                                onOpenChange(false)
                                form.reset()
                            }}
                            className="bg-destructive text-white hover:bg-destructive/80"
                        >
                            取消
                        </Button>
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting || !form.formState.isDirty}
                            className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        >
                            {form.formState.isSubmitting ? "提交中..." : "提交"}
                        </Button>
                    </div>
                </form>
            </Form>
        </WrapperDialog>
    )
}