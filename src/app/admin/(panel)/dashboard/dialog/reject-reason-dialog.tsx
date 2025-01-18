import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useStore } from "../store"
import { ReviewStep } from "../store"
import z from "zod"
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}


export const RejectReasonDialog = ({ open, onOpenChange }: Props) => {
    const { setStep } = useStore()
    const formSchema = z.object({
        reason: z.string()
            .min(1, { message: "请输入拒绝原因" })
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reason: "",
        }
    })
    async function onSubmit(data: z.infer<typeof formSchema>) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        onOpenChange(false)
    }
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[436px]"
        >
            <div>拒绝原因填写</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="reason"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>拒绝原因</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                        placeholder="请输入拒绝原因"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end mt-4 ml-auto gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep(ReviewStep.Default)}
                        >
                            返回
                        </Button>
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? "提交中..." : "提交"}
                        </Button>
                    </div>
                </form>
            </Form>
        </WrapperDialog>
    )
}

export default RejectReasonDialog