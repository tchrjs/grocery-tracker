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

interface ProductOptionsProps {
  product: Product;
}

function ProductOptions({ product }: ProductOptionsProps) {
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteProductById(Number(product.id));
    setOpen(false);
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
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlertDialog
        open={open}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
    </>
  );
}

export { ProductOptions };
