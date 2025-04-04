import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { Product } from "@/src/db/schema";
import { DeleteAlertDialog } from "./delete-alert-dialog";
import { useState } from "react";
import { deleteProductById, updateProduct } from "@/src/db/db";
import { ProductDrawer } from "../product-drawer/product-drawer";
import { ConfirmAlertDialog } from "./confirm-alert-dialog";

interface ProductOptionsProps {
  product: Product;
  productNames?: string[];
}

function ProductOptions(props: ProductOptionsProps) {
  const { product, productNames = [] } = props;
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [confirmAlertOpen, setConfirmAlertOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCancel = () => {
    setConfirmAlertOpen(false);
    setDeleteAlertOpen(false);
  };

  const handleDelete = async () => {
    setDeleteAlertOpen(false);
    await deleteProductById(Number(product.id));
  };

  const handleConfirm = async () => {
    setConfirmAlertOpen(false);
    await updateProduct({ ...product, date: new Date().toDateString() });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <EllipsisVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={"start"} sideOffset={0}>
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
              setDeleteAlertOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setConfirmAlertOpen(true);
            }}
          >
            Confirm
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlertDialog
        open={deleteAlertOpen}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
      <ConfirmAlertDialog
        open={confirmAlertOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
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
