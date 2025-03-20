import React, { useRef, useEffect, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClickInside?: () => void;
  onClickOutside?: () => void;
};

const AreaDetector = ({ children, onClickInside, onClickOutside }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickInside = () => {
    onClickInside?.();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      onClickOutside?.();
    }
  };

  useEffect(() => {
    wrapperRef.current?.addEventListener("click", handleClickInside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      wrapperRef.current?.removeEventListener("click", handleClickInside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickInside, onClickOutside]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default AreaDetector;
