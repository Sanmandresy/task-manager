import { useState } from "react";

const useLocalStorage = (key: string, defaultValue?: any) => {
  const [value, setValue] = useState(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined"
    ) {
      const valueFromLocalStorage = window.localStorage.getItem(key);
      return valueFromLocalStorage || defaultValue;
    } else {
      return defaultValue;
    }
  });

  const setNewValue = (newValue: any) => {
    setValue(newValue);
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined"
    ) {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  return {
    value,
    setValue: setNewValue,
  };
};

export { useLocalStorage };
