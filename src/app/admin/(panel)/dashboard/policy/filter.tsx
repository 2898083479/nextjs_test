import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePolicyFilter } from "./filter.hook";
import { SearchIcon } from "lucide-react";
export const Filter = () => {

    const { search, setSearch, reset } = usePolicyFilter();

    const formSchema = z.object({
        search: z.string().optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: search,
        }
    })

    const submit = async (data: z.infer<typeof formSchema>) => {
        data.search = search;
        console.log(data);
    }

    return (
        <div className="flex flex-row gap-[12px]">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submit)}
                >
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={search}
                                        placeholder="Search"
                                        onChange={(e) => setSearch(e.target.value)}
                                        endContent={
                                            <div
                                                className="flex items-center justify-center cursor-pointer"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    form.handleSubmit(submit)();
                                                }}
                                            >
                                                <SearchIcon
                                                    className="flex text-gray-500 w-4 h-4" />
                                            </div>
                                        }
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <div
                className="flex text-gray-500 items-center justify-center cursor-pointer mr-2"
                onClick={reset}
            >
                reset
            </div>
        </div>

    )
}

export default Filter;