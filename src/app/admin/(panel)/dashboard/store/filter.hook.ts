import { useState } from "react";
import { useQueryStates, parseAsString } from "nuqs";

export const useTableFilter = () => {
    const [searchValue, setSearchValue] = useState("");
    const [merchantCount, setMerchantCount] = useState<number | null>(null);

    const reset = () => {
        setSearchValue("");
        setMerchantCount(1);
    };

    return { searchValue, setSearchValue, reset, merchantCount, setMerchantCount };
}