import { useState, useEffect, Dispatch, SetStateAction } from "react";

const useLocalStorage = (
  key: string
): [string | null, Dispatch<SetStateAction<string | null>>] => {
  const [value, setValue] = useState<string | null>(() =>
    localStorage.getItem(key)
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setValue(localStorage.getItem(key));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  const setLocalStorage: Dispatch<SetStateAction<string | null>> = (
    newValue
  ) => {
    if (typeof newValue === "function") {
      const computedValue = (
        newValue as (prevState: string | null) => string | null
      )(value);
      localStorage.setItem(key, computedValue!);
      setValue(computedValue);
    } else {
      if (newValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, newValue);
      }
      setValue(newValue);
    }
  };

  return [value, setLocalStorage];
};

export default useLocalStorage;
