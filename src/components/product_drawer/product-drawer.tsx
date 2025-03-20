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
import { ProductForm } from "./product-form";
import { X } from "lucide-react";
import { createProduct } from "@/src/db/db";

const formId: string = "product-form";

export function ProductDrawer({
  productNames = [],
}: {
  productNames: string[];
}) {
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
              form={formId}
            >
              Create
            </Button>
          </div>
        </DrawerHeader>
        <div className="overflow-y-auto no-scrollbar pt-4">
          <ProductForm
            id={formId}
            onSubmit={handleSubmit}
            productNames={productNames}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
