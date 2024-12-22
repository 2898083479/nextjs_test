"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import FinishDialog from "./finish-dialog"
export default function ResetPage() {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const formSchema = z.object({
        old_pwd: z
            .string()
            .min(8, {
                message: "旧密码至少8位"
            }),
        new_pwd: z
            .string()
            .min(8, {
                message: "新密码至少8位"
            }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            old_pwd: "",
            new_pwd: "",
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        setOpen(true)
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>管理员重置密码</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            className="flex flex-col gap-[12px]"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name="old_pwd"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>旧密码</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="请输入旧密码"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="new_pwd"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>新密码</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="请输入新密码"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={!form.formState.isDirty}
                                >
                                    {form.formState.isSubmitting ? "重置中..." : "重置"}
                                </Button>
                                {
                                    open && (
                                        <FinishDialog open={open} onOpenChange={setOpen} />
                                    )
                                }
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}