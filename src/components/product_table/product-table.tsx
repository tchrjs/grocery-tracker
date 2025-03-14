"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { ProductSearchInput } from "./product-search-input";
import { useState } from "react";
import { ProductDrawer } from "../product_drawer/product-drawer";
import { StarRating } from "./star-rating";
import { Product } from "@/src/db/schema";

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
        <ProductDrawer />
      </div>
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead>Store</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Quality</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProduct ? (
            products
              .filter((product) => product.name === selectedProduct)
              .map((product, i) => (
                <TableRow>
                  <TableCell>{product.store}</TableCell>
                  <TableCell>{`$${product.total_price.toFixed(2)}`}</TableCell>
                  <TableCell>{`$${product.unit_price.toFixed(2)}/${
                    product.measurement
                  }`}</TableCell>
                  <TableCell>{`${product.quantity} ${product.measurement}`}</TableCell>
                  <TableCell>
                    <StarRating value={product.quality} />
                  </TableCell>
                </TableRow>
              ))
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
