import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ReviewStep, useReviewStore } from "../../store"
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const RejectReasonDialog = ({ open, onOpenChange }: Props) => {
    const { setStep } = useReviewStore()
    const formSchema = z.object({
        reason: z.string().min(1, { message: "请输入拒绝理由" }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reason: "",
        } 
    })


    async function onSubmit(data: z.infer<typeof formSchema>) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setStep(ReviewStep.Rejected)
    }
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px] border-none"
        >
            <div className="flex flex-col gap-4">
                <div className="text-[18px] text-[#5D7285]">请输入拒绝原因</div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end mt-4 ml-auto gap-2">
                        <Button
                            type="button"
                            variant="link"
                            onClick={() => setStep(ReviewStep.Default)}
                        >
                            返回
                        </Button>
                        <Button
                            className="bg-[#F31260] hover:bg-[#F31260]/80 text-white"
                            type="submit"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? "提交中..." : "提交"}
                        </Button>
                    </div>
                    </form>
                </Form>
            </div>
        </WrapperDialog>
    )
}
