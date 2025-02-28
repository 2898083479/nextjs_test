"use client"
import { Input } from "@/components/ui/input"
import { useTableFilter } from "./filter.hook";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
export const Filter = () => {
    const { searchValue, setSearchValue, reset } = useTableFilter();
    return (
        <div className="flex flex-row gap-2">
            <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search"
                className="max-w-[200px]"
                endContent={
                    <Button
                        variant="ghost"
                        size={"icon"}
                    >
                        <SearchIcon
                            className="size-[15px]"
                        />
                    </Button>
                }
            />
            <div
                className="flex items-center text-[#94A3B8] cursor-pointer mr-2"
                onClick={reset}
            >
                reset
            </div>
        </div>
    )
}