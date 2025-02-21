import { Input } from "@/components/ui/input"
import { useTableFilter } from "./filter.hook"
import { Button } from "@/components/ui/button"
import { MerchantCountSelect } from "@/components/core/select-filter/merchant-count"
import { GoodCountSelect } from "@/components/core/select-filter/good-count"

export const Filter = () => {
    const { searchValue, setSearchValue, reset, merchantCount, setMerchantCount, goodCount, setGoodCount } = useTableFilter();
    return (
        <div className="flex flex-row gap-2">
            <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search"
                className="max-w-[200px] text-[#94A3B8]"
            />
            <MerchantCountSelect
                value={merchantCount}
                onChange={(value) => setMerchantCount(value)}
                className="max-w-[200px] h-[37px] text-[#94A3B8]"
            />
            <GoodCountSelect
                value={goodCount}
                onChange={(value) => setGoodCount(value)}
                className="max-w-[200px] h-[37px] text-[#94A3B8]"
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