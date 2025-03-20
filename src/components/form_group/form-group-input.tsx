import { cn } from "@/src/lib/utils";
import { Input } from "../ui/input";
import { useState } from "react";
import { FormSuggestions } from "./form-suggestions";

function FormGroupInput({
  suggestions = [],
  onChange = () => {},
  ...props
}: React.ComponentProps<"input"> & {
  suggestions?: string[];
  onChange?: (e: any) => void;
}) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");

  const handleSuggestionChange = (e: any) => {
    setFocus(e.target.value != "");
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <div>
      <Input
        {...props}
        autoComplete="off"
        onFocus={() => setFocus(value != "")}
        onBlur={() => {
          setTimeout(() => {
            setFocus(false);
          }, 150);
        }}
        onClick={() => setFocus(value != "")}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            setFocus(false);
          }
        }}
        onChange={handleSuggestionChange}
        className={cn(
          "rounded-none shadow-none border-none hover:bg-accent hover:text-accent-foreground",
          "focus-visible:border-none focus-visible:ring-0"
        )}
      />
      <FormSuggestions
        focus={focus}
        suggestions={suggestions}
        filterValue={value}
        onSuggestionClick={handleSuggestionChange}
      ></FormSuggestions>
    </div>
  );
}

export { FormGroupInput };
