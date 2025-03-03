import { useGoodFilter } from "./filter.hook";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const GoodFilter = () => {
    const { search, setSearch, reset } = useGoodFilter();
    return (
        <div className="flex flex-row gap-2">
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
                className="flex flex-row items-center cursor-pointer text-[#afafaf]"
                onClick={reset}
            >
                重置
            </div>
        </div>
    )
}

export default GoodFilter;