import { useRef, useEffect, useCallback } from 'react';

export function useDebouncedCallback<A extends any[]>(
  callback: (...args: A) => void,
  wait: number
) {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const debouncedCallback = useCallback(
    (...args: A) => {
      cleanup();
      timeout.current = setTimeout(() => {
        callback(...args);
      }, wait);
    },
    [callback, wait, cleanup]
  );

  return debouncedCallback;
}
