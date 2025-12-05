import { useEffect, useRef, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

export const useElementSize = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setSize({ width, height });
      }
    });

    observer.observe(ref.current);

    // Initial size
    const { width, height } = ref.current.getBoundingClientRect();
    setSize({ width, height });

    return () => observer.disconnect();
  }, []);

  return { ref, ...size };
};
