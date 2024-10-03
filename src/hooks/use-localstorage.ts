import { useState, useEffect } from "react";

// Định nghĩa interface cho activeBot
interface ActiveBot {
  key: string;
  type: string;
}

function useLocalStorage(
  key: string,
  initialValue: ActiveBot | null
): [ActiveBot | null, (value: ActiveBot | null) => void] {
  // Đọc giá trị ban đầu từ localStorage hoặc sử dụng initialValue
  const readValue = (): ActiveBot | null => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<ActiveBot | null>(readValue);

  // Trả về một phiên bản đóng gói của hàm setState của useState
  const setValue = (value: ActiveBot | null) => {
    try {
      // Cho phép value là một hàm để chúng ta có cú pháp tương tự như useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Lưu state
      setStoredValue(valueToStore);
      // Lưu vào localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    // Lắng nghe sự kiện storage để cập nhật nếu có thay đổi từ tab khác
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return [storedValue, setValue];
}

export default useLocalStorage;
