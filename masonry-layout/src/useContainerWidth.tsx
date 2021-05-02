import { useEffect, useRef, useState } from "react";

export default function useContainerWidth() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      console.log('xx', entries);
      setWidth(entries[0].contentRect.width)
    })
    observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    }
  }, [containerRef]);
  
  const [width, setWidth] = useState<number>();
  return [containerRef, width] as const;
}
