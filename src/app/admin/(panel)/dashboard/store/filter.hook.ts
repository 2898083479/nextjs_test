import { useState } from "react";

export const useTableFilter = () => {
    const [searchValue, setSearchValue] = useState("");
    const [merchantCount, setMerchantCount] = useState("Merchant Count");
    const [goodCount, setGoodCount] = useState("Good Count");

    const reset = () => {
        setSearchValue("");
        setMerchantCount("Merchant Count");
        setGoodCount("Good Count");
    };

    return {
        searchValue,
        setSearchValue,
        reset,
        merchantCount,
        setMerchantCount,
        goodCount,
        setGoodCount
    };
}