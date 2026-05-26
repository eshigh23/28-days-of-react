import { useEffect, useState } from 'react'

export default function useLocalStorage<T>( key: string, initialValue: T) {

    const [storedItem, setStoredItem] = useState(() => {
        const item = localStorage.getItem(key)

        return item ? (JSON.parse(item) as T) : initialValue;
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedItem))
    }, [key, storedItem])


    return [storedItem, setStoredItem] as const
}