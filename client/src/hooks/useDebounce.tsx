import type { Timer } from "../assets/types";
import { useRef, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDebounce = <T extends any[]>( func: (...args: T) => void, delay: number): (...args: T) => void => {
  const timerRef = useRef<Timer | null>(null);

  const debounced = useCallback((...args: T) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => func(...args), delay);
  }, [func, delay]);
  return debounced;
}
export default useDebounce