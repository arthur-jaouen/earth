import { useCallback, useRef, useState } from 'react';

export type Cancel = () => void;

export type UsePromise<T> = {
  state: 'pending' | 'loading' | 'success' | 'error';
  data?: T;
  error?: unknown;
  load: (promise: Promise<T>) => Cancel;
};

export function usePromise<T>(): UsePromise<T> {
  const [state, setState] = useState<Omit<UsePromise<T>, 'load'>>({ state: 'pending' });

  const load = useCallback((promise: Promise<T>) => {
    let cancelled = false;

    setState({ state: 'loading' });

    promise
      .then((data) => {
        if (!cancelled) {
          setState({ state: 'success', data });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ state: 'error', error });
        }
      });

    return () => {
      cancelled = true;
      setState({ state: 'pending' });
    };
  }, []);

  return { load, ...state };
}

export function useDebounce<A extends unknown[]>(
  f: (...args: A) => void,
  ms = 0,
): (...args: A) => void {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        f(...args);
      }, ms);
    },
    [f, ms],
  );
}
