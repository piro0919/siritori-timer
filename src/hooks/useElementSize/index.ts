import { useLayoutEffect, useState } from "react";

export type ElementSize = {
  height?: number;
  width?: number;
};

/**
 * usehooks-ts 3 で無くなった useElementSize の代わり。2 系と同じく
 * offsetWidth と offsetHeight を測り、描く前に最初の値を入れる。
 */
function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  ElementSize
] {
  const [node, setNode] = useState<T | null>(null);
  const [size, setSize] = useState<ElementSize>({});

  useLayoutEffect(() => {
    if (!node) {
      return;
    }

    const measure = (): void => {
      const { offsetHeight: height, offsetWidth: width } = node;

      setSize((prev) =>
        prev.height === height && prev.width === width
          ? prev
          : { height, width }
      );
    };

    measure();

    const observer = new ResizeObserver(measure);

    observer.observe(node);

    return (): void => {
      observer.disconnect();
    };
  }, [node]);

  return [setNode, size];
}

export default useElementSize;
