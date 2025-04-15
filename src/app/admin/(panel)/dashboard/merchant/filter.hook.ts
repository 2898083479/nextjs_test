import { useState } from "react";
import { useQueryStates, parseAsString } from "nuqs";

export const useTableFilter = () => {
    const [searchValue, setSearchValue] = useState("");
    const [filter, setFilter] = useQueryStates({
        search: parseAsString.withDefault(""),
    });
    const reset = () => {
        setSearchValue("");
        setFilter({ search: "" });
    }

    return { searchValue, setSearchValue, reset, filter, setFilter };
}