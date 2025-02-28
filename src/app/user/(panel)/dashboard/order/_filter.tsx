import useOrderFilter from "./filter.hook";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const OrderFilter = () => {
    const { search, setSearch, reset } = useOrderFilter();
    return (
        <div className="flex items-center gap-[12px]">
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                endContent={
                    <div className="cursor-pointer">
                        <Search className="size-[20px]" />
                    </div>
                }
            />
            <div
                onClick={reset}
                className="cursor-pointer"
            >
                reset
            </div>
        </div>
    )
}

export default OrderFilter;