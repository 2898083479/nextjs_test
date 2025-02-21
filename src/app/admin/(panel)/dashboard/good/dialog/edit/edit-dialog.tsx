import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Good, GoodCategory } from "@/app/admin/(panel)/dashboard/good/types";
import { z } from "zod";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    good: Good
}

export const EditDialog = ({ open, onOpenChange, good }: Props) => {

    const formSchema = z.object({
        name: z.string().optional(),
        source: z.string().optional(),
        category: z.nativeEnum(GoodCategory).optional(),
        price: z.number().optional(),
        count: z.number().optional(),
        policys: z.array(z.string()).optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: good.name,
            source: good.source,
            category: good.category as GoodCategory,
            price: good.price,
            count: good.count,
            policys: good.policys,
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data)
    }

    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="source"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>source</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>category</FormLabel>
                                <FormControl>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
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
                    <FormField
                        control={form.control}
                        name="price"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>price</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="count"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>count</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="policys"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>policys</FormLabel>
                                <FormControl>
                                    
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </WrapperDialog>
    )
}