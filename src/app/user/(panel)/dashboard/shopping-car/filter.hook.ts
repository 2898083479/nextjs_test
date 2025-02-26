import { useState } from "react";

export const useShoppingCarFilter = () => {
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