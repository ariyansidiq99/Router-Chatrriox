import { useEffect, useState } from "react";

function useLocalStorage (key, initialValue) {
    const [value, setValue] = useState(() => {
try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    } catch {
        return initialValue;
    }
    });
    
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            console.warn(`useLocalStorage: failed to save the key '${key}'`)
        }
    },[key, value]);

    const remove = () => {_
        localStorage.removeItem(key);
        setValue(initialValue);
    };
    return [value, setValue, remove];
}

export default useLocalStorage;