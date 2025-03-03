import { Input } from "@/components/ui/input"
import { useTableFilter } from "./filter.hook"
import { MerchantCountSelect } from "@/components/core/select-filter/merchant-count"
import { GoodCountSelect } from "@/components/core/select-filter/good-count"

export const Filter = () => {
    const {
        searchValue,
        setSearchValue,
        reset,
        merchantCount,
        setMerchantCount,
        goodCount,
        setGoodCount
    } = useTableFilter();
    return (
        <div className="flex flex-row gap-2">
            <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="搜索"
                className="max-w-[200px] text-[#94A3B8]"
            />
            <div className="flex items-center justify-center text-[#94A3B8]">
                店員數量:
            </div>
            <MerchantCountSelect
                value={merchantCount}
                onChange={(value) => {
                    setMerchantCount(value)
                }}
                className="max-w-[200px] h-[37px] text-[#94A3B8]"
            />
            <div className="flex items-center justify-center text-[#94A3B8]">
                商品數量:
            </div>
            <GoodCountSelect
                value={goodCount}
                onChange={(value) => {
                    setGoodCount(value)
                }}
                className="max-w-[200px] h-[37px] text-[#94A3B8]"
                placeholder="商品數量"
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