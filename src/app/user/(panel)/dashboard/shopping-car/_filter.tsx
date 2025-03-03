import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useShoppingCarFilter } from "./filter.hook";

const ShoppingCarFilter = () => {
    const { search, setSearch, reset } = useShoppingCarFilter();
    return (
        <div className="flex flex-row gap-[12px]">
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索"
                endContent={
                    <SearchIcon
                        className="cursor-pointer"
                        size={15}
                    />
                }
            />
            <div
                className="flex items-center cursor-pointer text-[#afafaf]"
                onClick={reset}
            >
                重置
            </div>
        </div>
    )
}

export default ShoppingCarFilter;