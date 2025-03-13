import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useState } from "react";
import { ProductForm } from "./product-form";

const formId: string = "product-form";

export function ProductDrawer() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Drawer direction="right" dismissible={false} open={open}>
      <Button
        variant={"outline"}
        onClick={() => {
          setOpen(true);
        }}
      >
        Add product
      </Button>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add product</DrawerTitle>
          <DrawerDescription>Add details to new product.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto">
          <ProductForm
            id={formId}
            onSubmit={(e) => {
              setOpen(false);
            }}
          />
        </div>
        <DrawerFooter>
          <Button variant={"default"} type={"submit"} form={formId}>
            Submit
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
