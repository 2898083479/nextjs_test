"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function SignInPage() {
    const router = useRouter()

    const formSchema = z.object({
        email: z
            .string()
            .min(1, {
                message: "请输入邮箱"
            }),
        password: z
            .string()
            .min(8, {
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
        if (values.email === "ethan_wangxiang@outlook.com" && values.password === "12345678") {
            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push("/admin/merchant")
        } else {
            form.setError("email", { message: "邮箱或密码错误" })
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
                                    {form.formState.isSubmitting ? "登录中..." : "登录"}
                                </Button>
                            </div>
                            <div onClick={() => router.push("/admin/signin/reset")}>重置密码</div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}