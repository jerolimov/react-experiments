import { useEffect, useRef, useState } from "react";

export interface Size {
  width: number;
  height: number;
}

export interface ViewProps {
  children: React.ReactNode,
  onLayout: (size: Size) => void,
}

export function View(props: ViewProps) {
  const sizeRef = useRef<Size | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('update ResizeObserver')
    if (!containerRef.current) {
      return;
    }
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const newSize = entries[0].contentRect;
      if (!sizeRef.current ||
          sizeRef.current.width !== newSize.width ||
          sizeRef.current.height !== newSize.height) {
        sizeRef.current = newSize;
        console.log('onLayout', newSize);
        props.onLayout(newSize);
      }
    })
    observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    }
  }, [containerRef]);

  return (
    <div ref={containerRef}>
      {props.children}
    </div>
  )
}
