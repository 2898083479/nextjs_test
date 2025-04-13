'use client'

import StoreTable from "./store-table";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { CreateStoreAPI } from "@/api/store";
import { ResponseStatusCode } from "@/api/types";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const SettingMyStorePage = () => {
    const merchantId = localStorage.getItem('merchantId')
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const formSchema = z.object({
        name: z.string().min(1, { message: "请输入店铺名称" }),
        description: z.string().min(1, { message: "请输入店铺描述" }),
        email: z.string().email({ message: "请输入正确的邮箱" }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            email: "",
        }
    })
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            router.push('/user/signin')
        }
    }, [])
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const response = await CreateStoreAPI(merchantId || '', data)
        if (response.code === ResponseStatusCode.success) {
            toast.success('创建店铺成功')
            setOpen(false)
        } else {
            form.setError('email', { message: response.message })
        }
    }
    return (
        <>
            <div className="flex flex-col gap-2">
                <div>
                    <Button
                        type="button"
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80 text-white"
                        onClick={() => setOpen(true)}
                    >
                        创建个人店铺
                    </Button>
                </div>
                <StoreTable />
            </div>
            <WrapperDialog
                open={open}
                onOpenChange={setOpen}
                className="max-w-[400px]"
                title="创建个人店铺"
            >
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
                                    <FormLabel>店铺名称</FormLabel>
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
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>店铺描述</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="resize-none"
                                            {...field}
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
                                    <FormLabel>邮箱</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div
                            className="flex justify-end"
                        >
                            <Button
                                type="submit"
                                className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80 text-white"
                            >
                                创建店铺
                            </Button>
                        </div>
                    </form>
                </Form>
            </WrapperDialog>
        </>
    )
}

export default SettingMyStorePage;