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
import { insertProductName } from "@/src/db/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";

interface ProductTableSearchProps {
  productNames: string[];
  onProductSelected: (selectedProduct: string) => void;
  selectedProduct: string;
}

function ProductTableSearch(props: ProductTableSearchProps) {
  const { productNames, onProductSelected = () => {}, selectedProduct } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  return (
    <Popover
      open={open}
      onOpenChange={(toggled_on) => {
        setOpen(toggled_on);
        setValue("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedProduct ? selectedProduct : "Select product..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search product..."
            onValueChange={setValue}
          />
          <SignedOut>
            <CommandEmpty>Product not found</CommandEmpty>
          </SignedOut>
          <CommandList>
            <CommandGroup>
              {productNames.map((name, i) => (
                <CommandItem
                  key={i}
                  value={name}
                  onSelect={(currentValue) => {
                    const product = currentValue === value ? "" : currentValue;
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
            <SignedIn>
              {value != "" && !productNames.includes(toTitleCase(value)) ? (
                <CommandGroup forceMount={true}>
                  <CommandItem
                    forceMount={true}
                    onSelect={async () => {
                      let newSelected = toTitleCase(value);
                      onProductSelected(newSelected);
                      setOpen(false);
                      await insertProductName(newSelected);
                    }}
                  >
                    <Plus />
                    <div className="opacity-0">placholder</div>
                  </CommandItem>
                </CommandGroup>
              ) : (
                ""
              )}
            </SignedIn>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { ProductTableSearch };
