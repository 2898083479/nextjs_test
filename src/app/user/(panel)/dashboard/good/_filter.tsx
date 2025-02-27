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
                placeholder="Search"
                endContent={
                    <SearchIcon 
                        className="cursor-pointer"
                        size={16}
                    />
                }
            />
            <div
                className="flex flex-row items-center cursor-pointer"
                onClick={reset}
            >
                reset
            </div>
        </div>
    )
}

export default GoodFilter;