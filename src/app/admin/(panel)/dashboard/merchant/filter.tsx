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
                    <SearchIcon
                        className="w-[16px] h-[16px]"
                    />
                }
            />
            <Button
                variant="link"
                className="flex ml-auto"
                onClick={reset}
            >
                Reset
            </Button>
        </div>
    )
}