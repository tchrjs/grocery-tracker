import { Button } from "../ui/button";

function FormSuggestions({
  suggestions = [],
  onSuggestionClick = () => {},
}: React.ComponentProps<"button"> & {
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => any;
}) {
  return (
    <div className="absolute rounded-md w-full bg-background border-1 mt-1 p-1 shadow-md flex flex-col z-10">
      {suggestions.map((suggestion) => (
        <Button
          className="text-foreground font-normal justify-start px-2"
          variant={"ghost"}
          key={suggestion}
          value={suggestion}
          onClick={() => {
            onSuggestionClick(suggestion);
          }}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}

export { FormSuggestions };
