import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Good, GoodCategory } from "@/app/admin/(panel)/dashboard/good/types"
import { PlusIcon } from "@radix-ui/react-icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader, Loader2 } from "lucide-react"
import { useState } from "react"
import { updateGoodAPI } from "@/api/good"
import { toast } from "sonner"
import { ResponseStatusCode } from "@/api/types"

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface Props {
    good: Good;
}

const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const EditGoodDialog = ({ open, onOpenChange, good }: Props) => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const formSchema = z.object({
        name: z.string().min(1),
        price: z.string().min(0),
        count: z.string().min(0),
        image: z.string().optional(),
        source: z.string().min(1),
        category: z.nativeEnum(GoodCategory).optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: good.name,
            price: String(good.price),
            count: String(good.count),
            image: good.image,
            source: good.source,
            category: good.category as GoodCategory,
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const response = await updateGoodAPI(good.goodId, {
            name: data.name,
            price: Number(data.price),
            count: Number(data.count),
            image: imageUrl,
            source: data.source,
            category: data.category || GoodCategory.CARVING,
        })
        if (response.code === ResponseStatusCode.success) {
            toast.success("商品更新成功")
            onOpenChange(false)
        } else {
            toast.error("商品更新失败")
        }
    }

    const generateImageUrl = async (file: File) => {
        const blob = new Blob([file]);
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
    }

    return (
        <WrapperDialog open={open} onOpenChange={onOpenChange} title="编辑商品">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>商品图片</FormLabel>
                                <FormControl>
                                    <label className="aspect-[3/2] bg-[#F6F6F6] flex flex-col items-center justify-center cursor-pointer border overflow-hidden">
                                        <input
                                            type="file"
                                            id="good-image"
                                            accept={ACCEPTED_FILE_TYPES.join(
                                                ",",
                                            )}
                                            onBlur={field.onBlur}
                                            onChange={(e) => {
                                                generateImageUrl(
                                                    e.target.files?.[0] ||
                                                    new File([], ""),
                                                );
                                            }}
                                            className="hidden"
                                            ref={field.ref}
                                        />
                                        {isUploading ? (
                                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                        ) : field.value ? (
                                            <Avatar className="w-[56px] h-[56px]">
                                                <AvatarImage
                                                    alt="team-image"
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
                                            <PlusIcon className="w-4 h-4" />
                                        )}
                                    </label>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>商品名称</FormLabel>
                                <FormControl>
                                    <Input {...field} defaultValue={good.name} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>商品价格</FormLabel>
                                <FormControl>
                                    <Input {...field} defaultValue={good.price} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="count"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>商品数量</FormLabel>
                                <FormControl>
                                    <Input {...field} defaultValue={good.count} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="source"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>商品来源</FormLabel>
                                <FormControl>
                                    <Input {...field} defaultValue={good.source} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>商品分类</FormLabel>
                                <FormControl>
                                    <Select defaultValue={good.category}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="请选择商品分类" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(GoodCategory).map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-end gap-2">
                        <Button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="bg-destructive text-white hover:bg-destructive/80"
                        >
                            取消
                        </Button>
                        <Button
                            type="submit"
                            disabled={!form.formState.isDirty || form.formState.isSubmitting}
                            className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        >
                            {form.formState.isSubmitting ? <span className="flex items-center gap-2">
                                <Loader className="animate-spin" /> 保存中...</span> : "保存"}
                        </Button>
                    </div>
                </form>
            </Form>
        </WrapperDialog>
    )
}