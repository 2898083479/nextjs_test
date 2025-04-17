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
import { resetPasswordAPI } from "@/api/auth/resetPassword"
import { ResponseStatusCode } from "@/api/types"
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

export default function ResetPage() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

    const formSchema = z.object({
        email: z
            .string()
            .min(1, {
                message: "请输入邮箱"
            }),
        password: z
            .string()
            .min(1, {
                message: "密码至少8位"
            }),
        confirmPassword: z
            .string()
            .min(1, {
                message: "密码至少8位"
            }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "两次密码必须相同",
        path: ["confirmPassword"]
    });


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { code, message } = await resetPasswordAPI({
            email: values.email,
            password: values.password,
        })
        if (code !== ResponseStatusCode.success) {
            form.setError("email", { message: message })
            return
        }
        toast.success("重置成功")
        router.push("/admin/signin")
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>邮箱</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="请输入邮箱"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>密码</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="请输入密码"
                                                type={passwordVisible ? "text" : "password"}
                                                endContent={
                                                    <div
                                                        className="w-full h-full flex items-center justify-center cursor-pointer"
                                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                                    >
                                                        {passwordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                                                    </div>
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>确认密码</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type={confirmPasswordVisible ? "text" : "password"}
                                                placeholder="请输入密码"
                                                endContent={
                                                    <div
                                                        className="w-full h-full flex items-center justify-center cursor-pointer"
                                                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                                    >
                                                        {confirmPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                                                    </div>
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => router.push("/admin/signin")}>返回</Button>
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