'use client'

import { usePolicyStore } from "../store"
import { updatePolicyInfo } from "@/api/policy"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import dayjs from "dayjs"
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
    FormLabel
} from "@/components/ui/form"
import { Loader } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import SuccessDialog from "./success-dialog"
import { ResponseStatusCode } from "@/api/types"

export const InfoPage = () => {
    const { policyInfo, setPolicyInfo } = usePolicyStore()
    const [open, setOpen] = useState(false)

    const formSchema = z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        date: z.object({
            startAt: z.date(),
            endAt: z.date()
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: policyInfo.policyId,
            name: policyInfo.name,
            description: policyInfo.description,
            date: {
                startAt: dayjs(policyInfo.startAt).toDate(),
                endAt: dayjs(policyInfo.endAt).toDate()
            }
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data)
        const response = await updatePolicyInfo({
            policyId: data.id || "",
            name: data.name || "",
            description: data.description || "",
            startAt: data.date.startAt.toISOString(),
            endAt: data.date.endAt.toISOString()
        })
        if (response.code === ResponseStatusCode.success) {
            setOpen(true)
        }
    }

    return (
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
                            <FormItem
                                className="w-[300px]"
                            >
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={policyInfo.name}
                                        placeholder="Enter policy name"
                                        onChange={(e) => {
                                            field.onChange(e)
                                            setPolicyInfo({ ...policyInfo, name: e.target.value })
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem
                                className="w-[600px]"
                            >
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about yourself"
                                        className="resize-none"
                                        {...field}
                                        value={policyInfo.description}
                                        onChange={(e) => {
                                            field.onChange(e.target.value)
                                            setPolicyInfo({ ...policyInfo, description: e.target.value })
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date: </FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {policyInfo.startAt && policyInfo.endAt ? (
                                                        format(policyInfo.startAt as string, "yyyy/MM/dd") + " - " + format(policyInfo.endAt as string, "yyyy/MM/dd")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="range"
                                                selected={{
                                                    from: field.value?.startAt,
                                                    to: field.value?.endAt
                                                }}
                                                onSelect={(date) => {
                                                    if (date) {
                                                        field.onChange({
                                                            ...field.value,
                                                            startAt: date?.from,
                                                            endAt: date?.to
                                                        })
                                                    }
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={!form.formState.isDirty || form.formState.isSubmitting}
                            className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        >
                            {form.formState.isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <Loader className="animate-spin" />
                                    Saving...
                                </span>
                            ) : (
                                "Save"
                            )}
                        </Button>
                        {
                            open && (
                                <SuccessDialog
                                    open={open}
                                    onOpenChange={setOpen}
                                />
                            )
                        }
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default InfoPage;