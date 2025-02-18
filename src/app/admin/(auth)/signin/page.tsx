"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { signInAPI } from "@/api/auth/signin";
import { ResponseStatusCode } from "@/api/types";
import { useEffect, useState } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

export default function SignInPage() {
    const router = useRouter()
    const [passwordVisible, setPasswordVisible] = useState(false);

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
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { code, message, data } = await signInAPI({
            email: values.email,
            password: values.password,
        })

        if (code === ResponseStatusCode.success) {
            localStorage.setItem("accessToken", data.accessToken)
            localStorage.setItem("refreshToken", data.refreshToken)
            router.push("/admin/dashboard")
        } else {
            form.setError("email", { message: message })
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>管理员登录</CardTitle>
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
                                                        {
                                                            passwordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />
                                                        }
                                                    </div>
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-row justify-end gap-[12px]">
                                <Button
                                    variant="link"
                                    className="text-blue-500 hover:underline"
                                    onClick={() => router.push("/admin/signin/reset")}
                                >
                                    重置密码
                                </Button>
                                <Button
                                    variant="link"
                                    className="text-blue-500 hover:underline"
                                    onClick={() => router.push("/admin/signup")}
                                >
                                    注册
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!form.formState.isDirty}
                                    className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                                >
                                    {form.formState.isSubmitting ? "登录中..." : "登录"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}