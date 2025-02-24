import { useState } from "react";

export const usePolicyFilter = () => {
    const [ search, setSearch ] = useState<string>("");

    const reset = () => {
        setSearch("");
    }

    return {
        search,
        setSearch,
        reset,
    }
}
