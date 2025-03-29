import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface SuggestionsPopoverProps {
  suggestions?: string[];
  parentRef: React.RefObject<HTMLDivElement | null>;
  onPick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  focus: boolean;
}

function SuggestionsPopover(props: SuggestionsPopoverProps) {
  const { suggestions = [], onPick = () => {}, focus, parentRef } = props;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (parentRef.current) {
      setWidth(parentRef.current.offsetWidth);
    }
  }, [parentRef]);

  return (
    <div
      className={`fixed w-full z-10 ${
        focus && suggestions.length > 0 ? "" : "hidden"
      }`}
      style={{ width: width }}
    >
      <div
        aria-hidden={true}
        className="rounded-md w-full bg-background border-1 mt-1 p-1 shadow-md flex flex-col z-10"
      >
        {suggestions.map((suggestion) => (
          <Button
            className="text-foreground font-normal justify-start px-2"
            variant={"ghost"}
            key={suggestion}
            value={suggestion}
            onClick={onPick}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { SuggestionsPopover };
