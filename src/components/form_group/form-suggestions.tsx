import { Button } from "../ui/button";

function FormSuggestions({
  suggestions = [],
  onSuggestionClick = () => {},
  filterValue = "",
  focus,
}: React.ComponentProps<"button"> & {
  suggestions?: string[];
  onSuggestionClick?: (e: any) => any;
  filterValue?: string;
  focus: boolean;
}) {
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div
      className={`${focus && filteredSuggestions.length > 0 ? "" : "hidden"}`}
    >
      <div className="absolute rounded-md w-full bg-background border-1 mt-1 p-1 shadow-md flex flex-col z-10">
        {filteredSuggestions.map((suggestion) => (
          <Button
            className="text-foreground font-normal justify-start px-2"
            variant={"ghost"}
            key={suggestion}
            value={suggestion}
            onClick={onSuggestionClick}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { FormSuggestions };
