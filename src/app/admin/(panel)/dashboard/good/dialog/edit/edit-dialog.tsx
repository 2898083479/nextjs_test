import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog";
import { Good, GoodCategory } from "@/app/admin/(panel)/dashboard/good/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { useState } from "react";
import { EditSuccessDialog } from "./success-dialog";
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    good: Good
}

export const EditDialog = ({ open, onOpenChange, good }: Props) => {

    const [successDialogOpen, setSuccessDialogOpen] = useState(false)

    const formSchema = z.object({
        id: z.string().optional(),
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
            id: good.id,
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
        onOpenChange(false)
        setSuccessDialogOpen(true)
        console.log(successDialogOpen)
    }

    return (
        <>
            <WrapperDialog
                open={open}
                onOpenChange={onOpenChange}
                className='w-[400px]'
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-2"
                    >
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
                            render={({ field }) => (
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
                            render={({ field }) => (
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
                            render={({ field }) => (
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
                            render={({ field }) => (
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Button
                                            type="button"
                                            className="w-full bg-[#07CFDA] text-white hover:bg-[#07CFDA]/80"
                                        >
                                            Check Policy
                                        </Button>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-end gap-2">
                            <Button
                                onClick={() => onOpenChange(false)}
                                className="bg-destructive text-white hover:bg-destructive/80"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={!form.formState.isDirty || form.formState.isSubmitting}
                                className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                            >
                                {form.formState.isSubmitting ? <span className="flex items-center gap-2">
                                    <Loader className="animate-spin" /> Saving...</span> : "Save"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </WrapperDialog>
            <EditSuccessDialog
                open={successDialogOpen}
                onOpenChange={setSuccessDialogOpen}
            />
        </>
    )
}