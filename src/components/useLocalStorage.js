import React from 'react';
import { useEffect } from 'react';

function useLocalState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
        const localStorageValue = window.localStorage.getItem(key);

        return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value]);

    return [value, setValue];
}

export { useLocalState }