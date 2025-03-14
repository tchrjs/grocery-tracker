import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useState } from "react";
import { ProductForm } from "./product-form";
import { ArrowLeft } from "lucide-react";

const formId: string = "product-form";

export function ProductDrawer() {
  const [open, setOpen] = useState<boolean>(false);

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
      <Button
        variant={"outline"}
        onClick={() => {
          setOpen(true);
        }}
      >
        Add product
      </Button>
      <DrawerContent>
        <DrawerHeader className="p-2">
          <DrawerTitle>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                setOpen(false);
              }}
            >
              <ArrowLeft />
            </Button>
          </DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto no-scrollbar">
          <ProductForm
            id={formId}
            onSubmit={() => {
              setOpen(false);
            }}
          />
        </div>
        <DrawerFooter className="mb-4">
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
