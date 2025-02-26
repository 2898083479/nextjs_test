import { useState } from "react";

export const useStoreFilter = () => {
    const [search, setSearch] = useState("")

    const reset = () => {
        setSearch("")
    }

    return {
        search,
        setSearch,
        reset
    }
}