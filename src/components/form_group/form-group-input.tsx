import { cn } from "@/src/lib/utils";
import { Input } from "../ui/input";

function FormGroupInput({ ...props }: React.ComponentProps<"input">) {
  return (
    <Input
      {...props}
      className={cn(
        "rounded-none shadow-none border-none hover:bg-accent hover:text-accent-foreground",
        "focus-visible:border-none focus-visible:ring-0"
      )}
    />
  );
}

export { FormGroupInput };
