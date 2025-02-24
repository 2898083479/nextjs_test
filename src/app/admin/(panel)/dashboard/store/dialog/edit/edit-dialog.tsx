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
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader } from "lucide-react";
import { 
    Select, 
    SelectTrigger, 
    SelectValue, 
    SelectContent, 
    SelectItem 
} from "@/components/ui/select";

interface EditDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: Store;
}

export default function EditDialog({ open, onOpenChange, data }: EditDialogProps) {

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
        createdAt: z.date().optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.name,
            email: data.email,
            status: data.status,
            createdAt: dayjs(data.createdAt).toDate(),
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(values);
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
                                <Select>
                                    <FormControl>
                                        <SelectTrigger className="w-[350px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            Object.values(StoreStatus).map(status => (
                                                <SelectItem key={status} value={status as string}>
                                                    {status}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="createdAt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>創建時間</FormLabel>
                                <div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    className={cn(
                                                        "w-[350px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "yyyy/MM/dd")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value === undefined ? undefined : new Date(field.value)}
                                                onSelect={field.onChange}
                                                initialFocus
                                                className="w-[350px]"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            取消
                        </Button>
                        <Button
                            type="submit"
                            disabled={form.formState.isDirty}
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