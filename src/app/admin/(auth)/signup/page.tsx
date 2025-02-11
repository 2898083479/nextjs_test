"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { signUpAPI } from "@/api/auth/siginup"
import { ResponseStatusCode } from "@/api/types"
import { useCountdown, useMounted } from "@/components/hooks";
import { useEffect } from "react";
export const SignupPage = () => {

    const router = useRouter()
    const isMounted = useMounted();
    const { countdown, active, start } = useCountdown(60);

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(2),
        confirmPassword: z.string().min(2),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (formData: z.infer<typeof formSchema>) => {
        const { code, message } = await signUpAPI({
            email: formData.email,
            password: formData.password,
        })
        if (code === ResponseStatusCode.SUCCESS) {
            setTimeout(() => {
                router.push("/admin/signin")
            }, 3000)
        }
        if (code === ResponseStatusCode.FAILED) {
            form.setError("email", { message: message })
        }
    }

    useEffect(() => {
        if (!isMounted) return;
        start();
    }, [isMounted]);

    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>管理员注册</CardTitle>
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
                                            <Input {...field} />
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
                                            <Input {...field} />
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
                                        <FormLabel>请再次输入密码</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-between">
                                <Button variant="link" className="text-blue-500 hover:underline" onClick={() => router.push("/admin/signin")}>返回登录</Button>
                                <Button type="submit" disabled={!form.formState.isDirty}>
                                    {form.formState.isSubmitting ? "注册中..." : "注册"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignupPage