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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";

const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const SettingInfoPage = () => {
    const router = useRouter()
    const merchantId = localStorage.getItem('merchantId')
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const formSchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        avatar: z.string().optional(),
    })

    const queryMerchantInfo = async () => {
        const response = await getMerchantInfo(merchantId || undefined)
        return response.data
    }

    const { data: merchantInfo } = useQuery({
        queryKey: ['merchantSettingInfo'],
        queryFn: queryMerchantInfo,
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: merchantInfo?.[0].name,
            email: merchantInfo?.[0].email,
            avatar: merchantInfo?.[0].avatar,
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const response = await editMerchantAPI({
            merchantId: merchantId || '',
            name: data.name || merchantInfo?.[0].name || '',
            email: data.email || merchantInfo?.[0].email || '',
            avatar: imageUrl || data.avatar || '',
        })
        if (response.code === ResponseStatusCode.success) {
            toast.success('修改成功')
        }
    }

    useEffect(() => {
        setImageUrl(merchantInfo?.[0].avatar || null)
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            router.push('/user/signin')
        }
    }, [])

    const generateAvatarURL = async (avatar: File) => {
        const blob = new Blob([avatar]);
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col max-w-[500px] gap-4">
                <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>头像</FormLabel>
                            <FormControl>
                                <label className="w-[56px] h-[56px] bg-[#F6F6F6] flex flex-col items-center justify-center cursor-pointer border rounded-full overflow-hidden">
                                    <input
                                        type="file"
                                        id="avatar"
                                        accept={ACCEPTED_FILE_TYPES.join(
                                            ",",
                                        )}
                                        onBlur={field.onBlur}
                                        name={field.name}
                                        className="hidden"
                                        onChange={(e) => {
                                            generateAvatarURL(
                                                e.target.files?.[0] ||
                                                new File([], ""),
                                            );
                                        }}
                                        ref={field.ref}
                                    />
                                    {isUploading ? (
                                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                    ) : field.value ? (
                                        <Avatar className="w-[56px] h-[56px]">
                                            <AvatarImage
                                                alt="volunteer-image"
                                                src={
                                                    imageUrl
                                                        ? imageUrl
                                                        : field.value
                                                }
                                                className="w-full h-full object-cover"
                                            />
                                            <AvatarFallback>
                                                <Skeleton />
                                            </AvatarFallback>
                                        </Avatar>
                                    ) : (
                                        <PlusIcon className="w-4 h-4 text-primary" />
                                    )}
                                </label>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>姓名</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    defaultValue={merchantInfo?.[0].name}
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
                                <Input {...field} defaultValue={merchantInfo?.[0].email} />
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