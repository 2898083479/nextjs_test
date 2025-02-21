import { useState } from "react";
import { GoodCategory } from "./types";
export const useGoodFilter = () => {
    const [searchValue, setSearchValue] = useState("");
    const [category, setCategory] = useState<GoodCategory | string>();
    const [source, setSource] = useState("");

    const reset = () => {
        setSearchValue("");
        setCategory("");
        setSource("");
    }

    return { searchValue, setSearchValue, reset, category, setCategory, source, setSource };
}