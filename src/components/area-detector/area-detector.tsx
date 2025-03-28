import React, { useRef, useEffect, ReactNode, Ref, RefObject } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  onClickInside?: () => void;
  onClickOutside?: () => void;
  ref: RefObject<HTMLDivElement | null>;
};

const AreaDetector = ({
  children,
  className,
  onClickInside,
  onClickOutside,
  ref,
}: Props) => {
  const handleClickInside = () => {
    onClickInside?.();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClickOutside?.();
    }
  };

  useEffect(() => {
    ref.current?.addEventListener("click", handleClickInside);
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      ref.current?.removeEventListener("click", handleClickInside);
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [onClickInside, onClickOutside]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default AreaDetector;
