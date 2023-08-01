import { useEffect } from "react";

const useKeyboardShortcut = (key: string, func: Function) => {
  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) => {
      if (event.key === key) {
        func();
      }
    };

    window.addEventListener("keypress", onKeyPress);

    return () => {
      window.removeEventListener("keypress", onKeyPress);
    };
  }, [key, func]);
};

export default useKeyboardShortcut;
