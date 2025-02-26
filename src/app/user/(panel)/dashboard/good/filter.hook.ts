import { useState } from "react";

export const useGoodFilter = () => {
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