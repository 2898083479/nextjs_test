import { useStoreFilter } from "./filter.hook";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const StoreFilter = () => {
    const { search, setSearch, reset } = useStoreFilter();
    return (
        <div className="flex items-center gap-2">
            <Input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索"
                endContent={
                    <Search className="size-[15px] cursor-pointer" />
                }
            />
            <div
                className="cursor-pointer text-[#afafaf]"
                onClick={reset}
            >
                重置
            </div>
        </div>
    )
}

export default StoreFilter;