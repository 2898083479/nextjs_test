'use client'

import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
    EyeOpenIcon,
    EyeClosedIcon
} from "@radix-ui/react-icons";
import { Loader } from "lucide-react";

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const formSchema = z.object({
        email: z.string()
            .nonempty({ message: "Please enter your email" })
            .email({ message: "Please enter a valid email" }),
        password: z.string()
            .nonempty({ message: "Please enter your password" }),
        confirmPassword: z.string()
            .nonempty({ message: "Please confirm your password" })
    }).refine((data) => {
        if (data.password !== data.confirmPassword) {
            return false;
        }
        return true;
    }, {
        message: "Two passwords must be the same",
        path: ["confirmPassword"]
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        router.push('/user/signin')
        console.log(data)
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[450px]">
                <CardHeader>
                    用户注册
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                {...field}
                                                endContent={
                                                    showPassword ? (
                                                        <EyeOpenIcon
                                                            className="cursor-pointer"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        />
                                                    ) : (
                                                        <EyeClosedIcon
                                                            className="cursor-pointer"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        />
                                                    )
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
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                {...field}
                                                endContent={
                                                    showConfirmPassword ? (
                                                        <EyeOpenIcon
                                                            className="cursor-pointer"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        />
                                                    ) : (
                                                        <EyeClosedIcon
                                                            className="cursor-pointer"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        />
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end gap-2">
                                <Button
                                    className="bg-[#4f46e5] text-white hover:bg-[#4f46e5]/80"
                                    type="button"
                                    onClick={() => router.push('/user/signin')}
                                >
                                    返回登录
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!form.formState.isDirty || form.formState.isSubmitting}
                                    className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                                >
                                    {form.formState.isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <Loader className="w-4 h-4 animate-spin" /> 注册中...
                                        </span>
                                    ) : (
                                        "注册"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignupPage;