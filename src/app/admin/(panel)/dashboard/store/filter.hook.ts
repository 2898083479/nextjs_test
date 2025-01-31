import { useState } from "react";

export const useTableFilter = () => {
    const [searchValue, setSearchValue] = useState("");

    const reset = () => {
        setSearchValue("");
    }

    return { searchValue, setSearchValue, reset };
}