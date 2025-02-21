import { Input } from "@/components/ui/input";
import { useGoodFilter } from "./filter.hook";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

export const Filter = () => {
    const { searchValue, setSearchValue, reset } = useGoodFilter();

    const formSchema = z.object({
        searchValue: z.string().optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchValue: searchValue,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-row gap-2"
            >
                <div className="flex flex-row gap-2">
                    <FormField
                        control={form.control}
                        name="searchValue"
                        render={({ field }) => (
                            <FormItem className="w-[300px]">
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row gap-2 justify-end">
                        <Button
                            type="submit"
                            variant="outline"
                        >
                            Search
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={reset}
                        >
                            reset
                        </Button>
                    </div>
                </div>

            </form>
        </Form>
    )
}