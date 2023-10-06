import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
    const storedValue = JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue));

    const [value, setValue] = useState<T>(storedValue);

    const setLocalStorageValue = (newValue: T) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, setLocalStorageValue] as const;
}

export default useLocalStorage;
