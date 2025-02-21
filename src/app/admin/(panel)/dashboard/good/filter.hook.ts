import { useState } from "react";

export const useGoodFilter = () => {
    const [searchValue, setSearchValue] = useState("");

    const reset = () => {
        setSearchValue("");
    }

    return { searchValue, setSearchValue, reset };
}