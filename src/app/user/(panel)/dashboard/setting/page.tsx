'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMerchantInfo } from "@/api/merchant";
import { useQuery } from "@tanstack/react-query";
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
import { Button } from "@/components/ui/button";
import { editMerchantAPI } from "@/api/merchant";
import { toast } from "sonner";
import { ResponseStatusCode } from "@/api/types";

const SettingInfoPage = () => {
    const merchantId = localStorage.getItem('merchantId')
    const formSchema = z.object({
        name: z.string().min(1),
        email: z.string().email(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const response = await editMerchantAPI({
            merchantId: merchantId || '',
            name: data.name,
            email: data.email,
        })
        if (response.code === ResponseStatusCode.success) {
            toast.success('修改成功')
        }
    }

    const router = useRouter()
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            router.push('/user/signin')
        }
    }, [])
    const queryMerchantInfo = async () => {
        const response = await getMerchantInfo(merchantId || undefined)
        return response.data
    }
    const { data: merchantInfo } = useQuery({
        queryKey: ['merchantSettingInfo'],
        queryFn: queryMerchantInfo,
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col max-w-[500px] gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>姓名</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={merchantInfo?.[0].name}
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
                                <Input {...field} placeholder={merchantInfo?.[0].email} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/90"
                    >
                        提交
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default SettingInfoPage;