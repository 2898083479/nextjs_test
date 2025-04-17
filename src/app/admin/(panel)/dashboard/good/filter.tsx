import { Input } from "@/components/ui/input";
import { useGoodFilter } from "./filter.hook";
import { GoodCategory } from "./types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";

export const Filter = () => {
    const {
        searchValue,
        setSearchValue,
        category,
        setCategory,
        reset
    } = useGoodFilter();

    return (
        <div className="flex flex-row gap-2">
            <div>
                <Select
                    value={category}
                    onValueChange={setCategory}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="请选择商品分类" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(GoodCategory).map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Input
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
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