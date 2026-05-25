import { useState, useEffect } from "react";

export default function useLocalStorage(keyName, initialValue) {

  // lazy initialization
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(keyName);

    if (item) {
      return JSON.parse(item);
    }

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(
      keyName,
      JSON.stringify(storedValue)
    );
  }, [keyName, storedValue]);

  return [storedValue, setStoredValue];
}