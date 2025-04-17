import { Input } from "@/components/ui/input"
import { useTableFilter } from "./filter.hook"

export const Filter = () => {
    const {
        searchValue,
        setSearchValue,
        reset,
    } = useTableFilter();
    return (
        <div className="flex flex-row gap-2">
            <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="搜索"
                className="max-w-[200px] text-[#94A3B8]"
            />
            <div
                onClick={reset}
                className="flex items-center justify-center text-[#94A3B8] cursor-pointer"
            >
                重置
            </div>
        </div>
    )
}