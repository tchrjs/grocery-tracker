import { Button } from "../ui/button";

interface SuggestionsPopoverProps {
  suggestions?: string[];
  onPick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  focus: boolean;
}

function SuggestionsPopover(props: SuggestionsPopoverProps) {
  const { suggestions = [], onPick = () => {}, focus } = props;

  return (
    <div className={focus && suggestions.length > 0 ? "" : "hidden"}>
      <div className="absolute rounded-md w-full bg-background border-1 mt-1 p-1 shadow-md flex flex-col z-10">
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
