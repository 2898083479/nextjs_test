import { useState } from "react";

const useOrderFilter = () => {
    const [search, setSearch] = useState<string>('');

    const reset = () => {
        setSearch('');
    }

    return {
        search,
        setSearch,
        reset
    }
}

export default useOrderFilter;