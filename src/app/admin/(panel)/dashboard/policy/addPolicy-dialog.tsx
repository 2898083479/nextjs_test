import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { z } from "zod";
import { PolicyStatus } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { createPolicyAPI } from "@/api/policy";
import { ResponseStatusCode } from "@/api/types";

interface Props {
    isOpen: boolean,
    onOpenChange: (isOpen: boolean) => void
}

const addPolicyDialog = ({ isOpen, onOpenChange }: Props) => {

    const formSchema = z.object({
        name: z.string().nonempty("Please enter policy name"),
        status: z.nativeEnum(PolicyStatus),
        date: z.object({
            startAt: z.date(),
            endAt: z.date()
        }),
        description: z.string().optional()
    }).refine((data) => {
        if (data.date.startAt && data.date.endAt) {
            return data.date.startAt < data.date.endAt
        }
        return true
    }, {
        message: "Start time must be before end time",
        path: ["date"]
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            status: PolicyStatus.ACTIVE,
            date: {
                startAt: undefined,
                endAt: undefined
            },
            description: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log('adding ....')
        const response = await createPolicyAPI(
            {
                name: data.name,
                status: data.status,
                description: data.description || "",
                startAt: data.date.startAt?.toISOString() || "",
                endAt: data.date.endAt?.toISOString() || ""
            }
        )
        if (response.code === ResponseStatusCode.success) {
            onOpenChange(false)
            console.log(data);
        }
    }

    return (
        <WrapperDialog
            open={isOpen}
            onOpenChange={onOpenChange}
            className="w-[400px]"
        >
            <div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter policy name"
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
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(PolicyStatus).map((status) => (
                                                    <SelectItem key={status} value={status}>
                                                        {status}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>startTime-endTime</FormLabel>
                                    <div>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-[350px] pl-3 text-left font-normal",
                                                        !field.value?.startAt && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value?.startAt && field.value?.endAt ? (
                                                        format(field.value.startAt, "yyyy/MM/dd") + " - " + format(field.value.endAt, "yyyy/MM/dd")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    className="bg-white"
                                                    mode="range"
                                                    onSelect={(range) => {
                                                        field.onChange({
                                                            startAt: range?.from,
                                                            endAt: range?.to
                                                        });
                                                    }}
                                                    initialFocus
                                                    selected={{
                                                        from: field.value?.startAt,
                                                        to: field.value?.endAt
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            className="resize-none"
                                            placeholder="Enter description"
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
                                className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                                disabled={!form.formState.isDirty || form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? <span className="flex items-center gap-2">
                                    <Loader className="animate-spin" /> Saving...</span> : "Save"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

        </WrapperDialog>
    )
}

export default addPolicyDialog;