import { useState, useEffect } from 'react';
import { safeJsonParse, safeJsonStringify } from '@/utils/safeJsonParse';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? safeJsonParse(item, initialValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, safeJsonStringify(valueToStore));
    } catch {
      // silently fail
    }
  };

  return [storedValue, setValue];
}
