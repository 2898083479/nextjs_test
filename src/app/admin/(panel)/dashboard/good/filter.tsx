import { Input } from "@/components/ui/input";
import { useGoodFilter } from "./filter.hook";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";
import { GoodCategory } from "./types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export const Filter = () => {
    const {
        searchValue,
        setSearchValue,
        category,
        setCategory,
        reset
    } = useGoodFilter();
    const queryClient = useQueryClient();

    const formSchema = z.object({
        searchValue: z.string().optional(),
        category: z.nativeEnum(GoodCategory).optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchValue: searchValue,
            category: category as GoodCategory,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        values.searchValue = searchValue;
        values.category = category as GoodCategory;
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-row gap-4">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem className="w-[250px]">
                                <FormControl>
                                    <Select
                                        value={category}
                                        onValueChange={(value) => {
                                            setCategory(value as GoodCategory);
                                            queryClient.invalidateQueries({ queryKey: ["good-list"] });
                                        }}
                                    >
                                        <SelectTrigger className="text-[#94A3B8]">
                                            <SelectValue
                                                placeholder={'select category'}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(GoodCategory).map((category) => (
                                                <SelectItem key={category} value={category}>{category}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="searchValue"
                        render={({ field }) => (
                            <FormItem className="w-[300px]">
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={searchValue}
                                        placeholder="Search"
                                        onChange={(e) => {
                                            setSearchValue(e.target.value);
                                        }}
                                        endContent={
                                            <div className="flex items-center justify-center cursor-pointer">
                                                <SearchIcon
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        form.handleSubmit(onSubmit)();
                                                    }}
                                                    className="text-[#94A3B8] size-4"
                                                />
                                            </div>
                                        }
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div
                        onClick={reset}
                        className="flex items-center justify-center text-[#94A3B8] cursor-pointer"
                    >
                        reset
                    </div>
                </div>

            </form>
        </Form>
    )
}