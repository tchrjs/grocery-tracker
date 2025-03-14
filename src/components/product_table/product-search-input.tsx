"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { useState } from "react";
import { Product } from "@/src/db/schema";

export function ProductSearchInput({
  products,
  onProductSelected,
}: {
  products: Product[];
  onProductSelected: Function;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const labels = Array.from(new Set(products.map((product) => product.name)));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value : "Select product..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search product..." />
          <CommandList>
            <CommandEmpty>No products found</CommandEmpty>
            <CommandGroup>
              {labels.map((label, i) => (
                <CommandItem
                  key={i}
                  value={label}
                  onSelect={(currentValue) => {
                    const product = currentValue === value ? "" : currentValue;
                    setValue(product);
                    onProductSelected(product);
                    setOpen(false);
                  }}
                >
                  {label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === label ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
