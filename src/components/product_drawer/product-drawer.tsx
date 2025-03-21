import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import { Button } from "../ui/button";
import { ProductDrawerForm } from "./product-drawer-form";
import { createProduct, updateProduct } from "@/src/db/db";
import { Product } from "@/src/db/schema";

interface ProductDrawerProps {
  type?: "create" | "edit";
  productNames: string[];
  defaultProduct?: Product | undefined;
  open?: boolean;
  onExit?: () => void;
}

export function ProductDrawer(props: ProductDrawerProps) {
  const {
    type = "create",
    open,
    productNames = [],
    defaultProduct,
    onExit = () => {},
  } = props;

  const handleSubmit = async (e: any) => {
    if (type == "create") {
      await createProduct(e);
    } else if (type == "edit") {
      await updateProduct(e);
    }
    onExit();
  };

  return (
    <Drawer
      direction="right"
      dismissible={true}
      handleOnly={true}
      open={open}
      onOpenChange={(isOpened) => {
        if (!isOpened) onExit();
      }}
    >
      <DrawerContent>
        <DrawerHeader className="p-2 flex flex-row items-center">
          <div className="w-1/3 justify-start">
            <Button
              className="text-foreground/50"
              variant={"ghost"}
              onClick={onExit}
            >
              Cancel
            </Button>
          </div>
          <DrawerTitle className="w-1/3 text-center">
            {type == "create"
              ? "Create Product"
              : type == "edit"
              ? "Edit Product"
              : ""}
          </DrawerTitle>
          <div className="w-1/3 flex justify-end">
            <Button
              className="text-blue-500 disabled:text-foreground/25"
              variant={"ghost"}
              type={"submit"}
              form={"product-form"}
            >
              {type == "create" ? "Create" : type == "edit" ? "Confirm" : ""}
            </Button>
          </div>
          <DrawerDescription className="hidden" />
        </DrawerHeader>
        <div className="overflow-y-auto no-scrollbar pt-4">
          <ProductDrawerForm
            id={"product-form"}
            onSubmit={handleSubmit}
            productNames={productNames}
            defaultProduct={defaultProduct}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
