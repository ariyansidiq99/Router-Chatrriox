import { useEffect, useState } from "react";

function useDebounce (value, delay = 300) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounceValue(value),delay);
        return () => clearTimeout(timer);
    }, [value, timer]);
    return debounceValue;
}

export default useDebounce;