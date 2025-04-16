import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { GoodCategory } from "@/app/admin/(panel)/dashboard/good/types"
import { Loader } from "lucide-react"
import { addGoodAPI } from "@/api/good"
import { addGoodBody } from "@/api/good/types"
import { toast } from "sonner"
import { ResponseStatusCode } from "@/api/types"

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface Props {
    storeId: string;
}

export const AddGoodDialog = ({ open, onOpenChange, storeId }: Props) => {

    const formSchema = z.object({
        name: z.string().optional(),
        source: z.string().optional(),
        category: z.nativeEnum(GoodCategory).optional(),
        price: z.string().optional(),
        count: z.string().optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            source: "",
            category: GoodCategory.SPICE,
            price: "",
            count: "",
        }
    })
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const response = await addGoodAPI(storeId, data as addGoodBody)
        if (response.code === ResponseStatusCode.success) {
            toast.success("商品添加成功")
            onOpenChange(false)
        } else {
            toast.error("商品添加失败")
        }
    }
    return (
        <WrapperDialog open={open} onOpenChange={onOpenChange}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-2"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="source"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>source</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>category</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>price</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="count"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>count</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-end gap-2">
                        <Button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="bg-destructive text-white hover:bg-destructive/80"
                        >
                            取消
                        </Button>
                        <Button
                            type="submit"
                            disabled={!form.formState.isDirty || form.formState.isSubmitting}
                            className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
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