import { cn } from "@/src/lib/utils";
import { Input } from "../ui/input";
import { useState } from "react";
import { FormSuggestions } from "./form-suggestions";

function FormGroupInput({
  suggestions = [],
  ...props
}: React.ComponentProps<"input"> & {
  suggestions?: string[];
}) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");

  const handleSuggestionChange = (suggestion: string) => {
    setFocus(suggestion != "");
    setValue(suggestion);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setFocus(false);
    }, 150);
  };

  return (
    <div>
      <Input
        {...props}
        autoComplete="off"
        value={value}
        onFocus={() => setFocus(value != "")}
        onBlur={handleBlur}
        onClick={() => setFocus(value != "")}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            setFocus(false);
          }
        }}
        onChange={(e) => {
          console.log(e);
          handleSuggestionChange(e.target.value);
        }}
        className={cn(
          "rounded-none shadow-none border-none hover:bg-accent hover:text-accent-foreground",
          "focus-visible:border-none focus-visible:ring-0"
        )}
      />

      <div className={`${focus ? "" : "hidden"}`}>
        <FormSuggestions
          suggestions={suggestions}
          onSuggestionClick={async (value) => {
            handleSuggestionChange(value);
          }}
        ></FormSuggestions>
      </div>
    </div>
  );
}

export { FormGroupInput };
