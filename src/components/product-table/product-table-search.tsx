"use client";

import { Check, ChevronsUpDown, Plus } from "lucide-react";

import { cn, toTitleCase } from "@/src/lib/utils";
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
import { CommandSeparator } from "cmdk";

interface ProductTableSearchProps {
  productNames: string[];
  onProductSelected: (selectedProduct: string) => void;
}

function ProductTableSearch(props: ProductTableSearchProps) {
  const { productNames, onProductSelected = () => {} } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  const [value, setValue] = useState<string>("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selected ? selected : "Select product..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search product..."
            onValueChange={setValue}
          />
          <CommandList>
            <CommandGroup>
              {productNames.map((name, i) => (
                <CommandItem
                  key={i}
                  value={name}
                  onSelect={(currentValue) => {
                    const product = currentValue === value ? "" : currentValue;
                    setSelected(product);
                    onProductSelected(product);
                    setOpen(false);
                  }}
                >
                  {name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            {value != "" && !productNames.includes(toTitleCase(value)) ? (
              <CommandGroup forceMount={true}>
                <CommandItem
                  forceMount={true}
                  onSelect={() => {
                    let newSelected = toTitleCase(value);
                    setSelected(newSelected);
                    onProductSelected(newSelected);
                    setOpen(false);
                  }}
                >
                  <Plus />
                  <div className="opacity-0">placholder</div>
                </CommandItem>
              </CommandGroup>
            ) : (
              ""
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { ProductTableSearch };
