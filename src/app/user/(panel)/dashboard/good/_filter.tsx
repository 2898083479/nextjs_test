import { useGoodFilter } from "./filter.hook";
import { Input } from "@/components/ui/input";
import { RotateCw } from "lucide-react";
const GoodFilter = () => {
    const { search, setSearch, reset } = useGoodFilter();
    return (
        <div className="flex flex-row gap-2">
            <Input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
            />
            <div
                className="cursor-pointer"
                onClick={reset}
            >
                <span className="flex flex-row gap-2 items-center"><RotateCw />reset</span>
            </div>
        </div>
    )
}

export default GoodFilter;