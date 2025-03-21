import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { Product } from "@/src/db/schema";
import { DeleteAlertDialog } from "./delete-alert-dialog";
import { useState } from "react";
import { deleteProductById } from "@/src/db/db";
import { ProductDrawer } from "../product-drawer/product-drawer";

interface ProductOptionsProps {
  product: Product;
  productNames?: string[];
}

function ProductOptions(props: ProductOptionsProps) {
  const { product, productNames = [] } = props;
  const [alertOpen, setAlertOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCancel = () => {
    setAlertOpen(false);
  };

  const handleDelete = async () => {
    setAlertOpen(false);
    await deleteProductById(Number(product.id));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <Ellipsis className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="-translate-x-2" sideOffset={0}>
          <DropdownMenuItem
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setAlertOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlertDialog
        open={alertOpen}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
      <ProductDrawer
        onExit={() => {
          setDrawerOpen(false);
        }}
        type="edit"
        open={drawerOpen}
        productNames={productNames}
        defaultProduct={product}
      />
    </>
  );
}

export { ProductOptions };
