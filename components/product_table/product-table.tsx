"use client";

import { Product } from "./product";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductSearchInput } from "./product-search-input";
import { useState } from "react";
import { Button } from "../ui/button";

export function ProductTable({ products }: { products: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <div className="flex flex-col py-4 gap-4">
      <div className="w-full px-2 flex justify-between">
        <ProductSearchInput
          products={products}
          onProductSelected={(selected_product: string) => {
            setSelectedProduct(selected_product);
          }}
        />
        <Button variant={"secondary"}>Add Product</Button>
      </div>
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead>Store</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Quality</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProduct ? (
            products
              .filter((product) => product.name === selectedProduct)
              .map((product, i) => <Product key={i} product={product} />)
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
      {!selectedProduct ? (
        <div className="text-muted-foreground mt-4 text-sm text-center">
          Select a product
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
