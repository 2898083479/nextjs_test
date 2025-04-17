"use client"
import { Input } from "@/components/ui/input"
import { useTableFilter } from "./filter.hook";
import { SearchIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export const Filter = () => {
    const { searchValue, setSearchValue, reset, filter } = useTableFilter();
    const queryClient = useQueryClient();
    return (
        <div className="flex flex-row gap-2">
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