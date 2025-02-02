import { useState } from "react";
import { useQueryStates, parseAsString } from "nuqs";

export const useTableFilter = () => {
    const [searchValue, setSearchValue] = useState("");
    const [merchantCount, setMerchantCount] = useState("");
    const [goodCount, setGoodCount] = useState("");

    const reset = () => {
        setSearchValue("");
        setMerchantCount("Merchant Count");
        setGoodCount("Good Count");
    };

    return { searchValue, setSearchValue, reset, merchantCount, setMerchantCount, goodCount, setGoodCount };
}