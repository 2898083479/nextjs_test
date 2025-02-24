import { Input } from "@/components/ui/input";
import { useGoodFilter } from "./filter.hook";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { GoodCategory } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
export const Filter = () => {
    const { searchValue, setSearchValue, category, setCategory, reset } = useGoodFilter();

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
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-row gap-4">
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
                                            <Button
                                                variant="ghost"
                                                type="submit"
                                                size="icon"
                                            >
                                                <SearchIcon
                                                    className="text-[#94A3B8] size-4"
                                                />
                                            </Button>
                                        }
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
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