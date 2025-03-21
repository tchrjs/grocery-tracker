"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { ProductTableSearch } from "./product-table-search";
import { useState } from "react";
import { ProductDrawer } from "../product_drawer/product-drawer";
import { Product } from "@/src/db/schema";
import { ProductOptions } from "../product_options/product-options";
import { Star } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  productNames: string[];
}

function ProductTable({ products, productNames }: ProductTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleProductSelected = (selectedProduct: string) => {
    setSelectedProduct(selectedProduct);
  };

  return (
    <div className="flex flex-col py-4 gap-4">
      <div className="w-full px-2 flex justify-between">
        <ProductTableSearch
          productNames={productNames}
          onProductSelected={handleProductSelected}
        />
        <ProductDrawer productNames={productNames} />
      </div>
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead>Store</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Quality</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProduct ? (
            products
              .filter((product) => product.name === selectedProduct)
              .map((product, i) => (
                <TableRow key={i}>
                  <TableCell>{product.store}</TableCell>
                  <TableCell>{`$${product.total_price.toFixed(2)}`}</TableCell>
                  <TableCell>{`$${product.unit_price.toFixed(2)}/${
                    product.measurement
                  }`}</TableCell>
                  <TableCell>{`${product.quantity} ${product.measurement}${
                    product.measurement == "lb" && product.quantity != 1
                      ? "s"
                      : ""
                  }`}</TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < product.quality
                              ? "text-foreground fill-foreground"
                              : "text-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{product.date}</TableCell>
                  <TableCell>
                    <ProductOptions product={product} />
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

export { ProductTable };
