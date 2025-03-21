import { cn } from "@/src/lib/utils";
import { Input } from "../ui/input";
import { useState } from "react";
import AreaDetector from "../area-detector/area-detector";
import { SuggestionsPopover } from "./suggestions-popover";

interface SuggestionsInputProps extends React.ComponentProps<"input"> {
  suggestions?: string[]; // List of suggestion items that can be filtered.
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SuggestionsInput(props: SuggestionsInputProps) {
  const { suggestions = [], onChange = () => {}, ...inputProps } = props;

  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");

  const handleKeyDown = (e: any) => {
    if (e.key == "Enter") {
      setFocus(false);
    }
  };

  const handleSuggestionChange = (e: any) => {
    setFocus(e?.target?.value != "");
    setValue(e?.target?.value);
    onChange(e);
  };

  return (
    <AreaDetector onClickOutside={() => setFocus(false)}>
      <Input
        className={cn(
          "rounded-none shadow-none border-none hover:bg-accent hover:text-accent-foreground",
          "focus-visible:border-none focus-visible:ring-0"
        )}
        {...inputProps}
        autoComplete={"off"}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocus(value != "")}
        onClick={() => setFocus(value != "")}
        onChange={handleSuggestionChange}
      />
      <SuggestionsPopover
        focus={focus}
        suggestions={suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        )}
        onPick={(e) => {
          handleSuggestionChange(e);
          setFocus(false);
        }}
      ></SuggestionsPopover>
    </AreaDetector>
  );
}

export { SuggestionsInput };
