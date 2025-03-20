import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import { Button } from "../ui/button";
import { useState } from "react";
import { ProductDrawerForm } from "./product-drawer-form";
import { X } from "lucide-react";
import { createProduct } from "@/src/db/db";

interface ProductDrawerProps {
  productNames: string[];
}

export function ProductDrawer({ productNames = [] }: ProductDrawerProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    setOpen(false);
    await createProduct(e);
  };

  return (
    <Drawer
      direction="right"
      dismissible={true}
      handleOnly={true}
      open={open}
      onOpenChange={(isOpened) => {
        if (isOpened !== open) setOpen(isOpened);
      }}
    >
      <DrawerTrigger asChild>
        <Button variant={"outline"}>Add product</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="p-2 flex flex-row items-center">
          <div className="w-1/3 justify-start">
            <DrawerClose asChild>
              <Button variant={"ghost"}>
                <X className="size-4" />
              </Button>
            </DrawerClose>
          </div>
          <DrawerTitle className="w-1/3 text-center">Product</DrawerTitle>
          <div className="w-1/3 flex justify-end">
            <Button
              className="text-blue-500 disabled:text-foreground/25"
              variant={"ghost"}
              type={"submit"}
              form={"product-form"}
            >
              Create
            </Button>
          </div>
        </DrawerHeader>
        <div className="overflow-y-auto no-scrollbar pt-4">
          <ProductDrawerForm
            id={"product-form"}
            onSubmit={handleSubmit}
            productNames={productNames}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
