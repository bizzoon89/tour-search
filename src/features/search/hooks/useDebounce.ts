import { useRef } from 'react';

type Timer = ReturnType<typeof setTimeout>;

export const useDebounce = (callback: (value: string) => void, delay: number) => {
  const timer = useRef<Timer | null>(null);

  const debounced = (value: string) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback(value);
    }, delay);
  };

  return debounced;
};
