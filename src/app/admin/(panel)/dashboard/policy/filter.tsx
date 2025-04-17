import { Input } from "@/components/ui/input";
import { usePolicyFilter } from "./filter.hook";
import { SearchIcon } from "lucide-react";
export const Filter = () => {

    const { search, setSearch, reset } = usePolicyFilter();

    return (
        <div className="flex flex-row gap-2">
            <Input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                placeholder="搜索"
                className="max-w-[200px]"
                endContent={
                    <div className="flex items-center gap-2 cursor-pointer">
                        <SearchIcon className="size-[15px]" />
                    </div>
                }
            />
            <div
                className="flex items-center text-[#94A3B8] cursor-pointer mr-2"
                onClick={reset}
            >
                重置
            </div>
        </div>
    )
}

export default Filter;