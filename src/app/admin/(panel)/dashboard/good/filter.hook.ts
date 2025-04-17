import { useState } from "react";
import { GoodCategory } from "./types";
export const useGoodFilter = () => {
    const [searchValue, setSearchValue] = useState("");
    const [category, setCategory] = useState("");

    const reset = () => {
        setSearchValue("");
        setCategory("");
    }

    return {
        searchValue,
        setSearchValue,
        reset,
        category,
        setCategory
    };
}