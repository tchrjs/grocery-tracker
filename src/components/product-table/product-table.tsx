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
import { ProductDrawer } from "../product-drawer/product-drawer";
import { Product } from "@/src/db/schema";
import { ProductOptions } from "../product-options/product-options";
import { ArrowUp, Star } from "lucide-react";
import { Button } from "../ui/button";

type SortingOrder = "asc" | "dsc";

interface ProductTableProps {
  products: Product[];
  productNames: string[];
}

function ProductTable({ products, productNames }: ProductTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [isAsc, setAsc] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<keyof Product>("store");
  const [filteredProducts, setFilteredProduct] = useState<Product[]>([]);

  const handleProductSelected = (selectedProduct: string) => {
    setSelectedProduct(selectedProduct);
    const array = products.filter((product) => product.name == selectedProduct);
    filterProduct(array, activeFilter, isAsc);
  };

  const handleSort = (product: keyof Product) => {
    const initialSort = activeFilter != product || !isAsc;
    setAsc(initialSort);
    setActiveFilter(product);
    filterProduct(filteredProducts, product, initialSort);
  };

  const filterProduct = (list: Product[], col: string, isAsc: boolean) => {
    if (!list) return;

    switch (col) {
      case "name":
      case "store":
        list.sort((a, b) => {
          const valueA = a[col];
          const valueB = b[col];
          if (typeof valueA === "string" && typeof valueB === "string") {
            return isAsc
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          }
          return 0;
        });
        break;
      case "total_price":
      case "unit_price":
      case "quality":
      case "quantity":
        list.sort((a, b) => {
          const valueA = Number(a[col]);
          const valueB = Number(b[col]);
          return isAsc ? valueA - valueB : valueB - valueA;
        });
        break;
      case "date":
        break;
    }

    setFilteredProduct(list);
  };

  return (
    <div className="flex flex-col py-4 gap-4">
      <div className="w-full px-2 flex justify-between">
        <ProductTableSearch
          productNames={productNames}
          onProductSelected={handleProductSelected}
        />
        <ProductDrawer
          open={drawerOpen}
          productNames={productNames}
          onExit={() => {
            setDrawerOpen(false);
          }}
        />
        <Button
          onClick={() => {
            setDrawerOpen(true);
          }}
          variant={"outline"}
        >
          Add product
        </Button>
      </div>
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex justify-center items-center">
                <Button
                  variant={"ghost"}
                  className="flex w-full"
                  onClick={() => handleSort("store")}
                >
                  Store
                  {activeFilter == "store" ? (
                    <ArrowUp className={`${isAsc ? "" : "rotate-180"}`} />
                  ) : (
                    <></>
                  )}
                </Button>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex justify-center items-center">
                <Button
                  variant={"ghost"}
                  className="flex w-full"
                  onClick={() => handleSort("total_price")}
                >
                  Price
                  {activeFilter == "total_price" ? (
                    <ArrowUp className={`${isAsc ? "" : "rotate-180"}`} />
                  ) : (
                    <></>
                  )}
                </Button>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex justify-center items-center">
                <Button
                  variant={"ghost"}
                  className="flex w-full"
                  onClick={() => handleSort("unit_price")}
                >
                  Unit
                  {activeFilter == "unit_price" ? (
                    <ArrowUp className={`${isAsc ? "" : "rotate-180"}`} />
                  ) : (
                    <></>
                  )}
                </Button>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex justify-center items-center">
                <Button
                  variant={"ghost"}
                  className="flex w-full"
                  onClick={() => handleSort("quantity")}
                >
                  Quantity
                  {activeFilter == "quantity" ? (
                    <ArrowUp className={`${isAsc ? "" : "rotate-180"}`} />
                  ) : (
                    <></>
                  )}
                </Button>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex justify-center items-center">
                <Button
                  variant={"ghost"}
                  className="flex w-full"
                  onClick={() => handleSort("quality")}
                >
                  Quality
                  {activeFilter == "quality" ? (
                    <ArrowUp className={`${isAsc ? "" : "rotate-180"}`} />
                  ) : (
                    <></>
                  )}
                </Button>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex justify-center items-center">
                <Button
                  variant={"ghost"}
                  className="flex w-full"
                  onClick={() => handleSort("date")}
                >
                  Last Updated
                  {activeFilter == "date" ? (
                    <ArrowUp className={`${isAsc ? "" : "rotate-180"}`} />
                  ) : (
                    <></>
                  )}
                </Button>
              </div>
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts &&
            filteredProducts.map((product, i) => (
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
                            : ""
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
            ))}
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
