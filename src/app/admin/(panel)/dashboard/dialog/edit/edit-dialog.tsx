import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Admin } from "../../types"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AdminStatus } from "../../types"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: Admin
}


export default function EditDialog({ open, onOpenChange }: Props) {
  const formSchema = z.object({
    name: z.string()
      .min(1, { message: "name must longer than 1 character" }),
    email: z.string()
      .email({ message: "email is invalid" }),
    status: z.string(),
    createdAt: z.string()
      .datetime({ message: "createdAt is invalid" }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      status: "",
      createdAt: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000))
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>姓名</FormLabel>
                  <Input
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
                        <SelectValue placeholder="请选择状态" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {
                          Object.values(AdminStatus).map(status => (
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
            <FormField
              control={form.control}
              name="createdAt"
              render={({field}) => (
                <FormItem>
                  <FormLabel>创建时间</FormLabel>

                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </WrapperDialog>
  )
}
