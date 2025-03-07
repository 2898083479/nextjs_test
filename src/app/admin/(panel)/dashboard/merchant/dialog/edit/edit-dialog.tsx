import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Merchant } from "../../types"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MerchantStatus } from "../../types"
import { EditStep } from "../../store"
import { useEditStore } from "../../store"
import { editMerchant } from "@/api/merchant"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ResponseStatusCode } from "@/api/types"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: Merchant
}


export default function EditDialog({ open, onOpenChange, data }: Props) {
  const queryClient = useQueryClient()
  const { setStep } = useEditStore()
  const formSchema = z.object({
    name: z.string()
      .min(1, { message: "name must longer than 1 character" }),
    email: z.string()
      .email({ message: "email is invalid" }),
    status: z.nativeEnum(MerchantStatus, {
      errorMap: () => ({
        message: "status is invalid"
      })
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      status: data.status,
    },
  })

  const editMerchantInfo = async () => {
    const { code } = await editMerchant({
      id: data.id,
      name: form.getValues("name"),
      email: form.getValues("email"),
      status: form.getValues("status"),
    })
    if (code === ResponseStatusCode.success) {
      onOpenChange(false)
    }
  }

  useMutation({
    mutationKey: ["editMerchant"],
    mutationFn: editMerchantInfo,
  }, queryClient)

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(data)
    setStep(EditStep.Success)
  }

  return (
    <WrapperDialog
      open={open}
      onOpenChange={onOpenChange}
      className="w-[436px]"
    >
      <div className="flex flex-col gap-4">
        <div className="text-2xl font-bold">编辑</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>姓名</FormLabel>
                  <Input
                    className="max-w-[450px]"
                    placeholder="请输入姓名"
                    {...field}
                  />
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
                  <Input
                    className="max-w-[450px]"
                    placeholder="请输入邮箱"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>状态</FormLabel>
                  <Select>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-w-[450px]">
                      <SelectGroup>
                        {
                          Object.values(MerchantStatus).map(status => (
                            <SelectItem key={status} value={status as string}>
                              {status}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => onOpenChange(false)}
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
      </div>
    </WrapperDialog>
  )
}
