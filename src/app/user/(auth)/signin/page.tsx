'use client'

import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    EyeOpenIcon,
    EyeClosedIcon
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/app/user/store";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { userSignInAPI } from "@/api/merchant/auth/signin";
import { ResponseStatusCode } from "@/api/types";

const SigninPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { setUserId } = useUserStore();
    const router = useRouter();
    const formSchema = z.object({
        email: z.string()
            .nonempty({ message: "Please Enter email" })
            .email({ message: "Please enter a valid email" }),
        password: z.string()
            .nonempty({ message: "Please Enter password" })
            // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            //     { message: "Please enter a valid password" }
            // )
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await new Promise(resolve => setTimeout(resolve, 3000))
        if (values.email !== "123@gmail.com") {
            form.setError("email", { message: "The email is not registered" })
            return;
        }
        if (values.password !== "123456") {
            form.setError("password", { message: "The password is incorrect" })
            return;
        }
        setUserId('Ethan-fall')
        const response = await userSignInAPI({
            email: values.email,
            password: values.password
        })
        if (response.code === ResponseStatusCode.success) {
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            router.push('/user/dashboard')
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card
                className="w-[450px]"
            >
                <CardHeader>
                    User Login
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
                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                                endContent={
                                                    showPassword ? (
                                                        <EyeOpenIcon
                                                            className="w-4 h-4 cursor-pointer"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        />
                                                    ) : (
                                                        <EyeClosedIcon
                                                            className="w-4 h-4 cursor-pointer"
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
                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    className="bg-[#6366f1] text-white hover:bg-[#6366f1]/80"
                                    onClick={() => router.push('/user/signup')}
                                >
                                    signup
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!form.formState.isDirty || form.formState.isSubmitting}
                                    className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                                >
                                    {form.formState.isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <Loader className="w-4 h-4 animate-spin" /> Signing in...
                                        </span>
                                    ) : (
                                        "signin"
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

export default SigninPage;