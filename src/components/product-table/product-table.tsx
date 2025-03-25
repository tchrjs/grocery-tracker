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
import { useEffect, useState } from "react";
import { ProductDrawer } from "../product-drawer/product-drawer";
import { Product } from "@/src/db/schema";
import { ProductOptions } from "../product-options/product-options";
import { ArrowUp, Star } from "lucide-react";
import { Button } from "../ui/button";

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

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setDate(currentDate.getDate() - 1);

  useEffect(() => {
    handleProductSelected(selectedProduct);
  }, [products, activeFilter, isAsc]);

  const handleProductSelected = (selectedProduct: string | null) => {
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
      case "date":
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-35">
              <button
                className="flex justify-between w-full items-center"
                onClick={() => handleSort("store")}
              >
                <span className="pr-2">Store</span>
                {activeFilter === "store" && (
                  <ArrowUp className={`size-4 ${isAsc ? "" : "rotate-180"}`} />
                )}
              </button>
            </TableHead>
            <TableHead className="min-w-30">
              <button
                className="flex justify-between w-full items-center"
                onClick={() => handleSort("total_price")}
              >
                <span className="pr-2">Price</span>
                {activeFilter === "total_price" && (
                  <ArrowUp className={`size-4 ${isAsc ? "" : "rotate-180"}`} />
                )}
              </button>
            </TableHead>
            <TableHead className="min-w-30">
              <button
                className="flex justify-between w-full items-center"
                onClick={() => handleSort("unit_price")}
              >
                <span className="pr-2">Unit</span>
                {activeFilter === "unit_price" && (
                  <ArrowUp className={`size-4 ${isAsc ? "" : "rotate-180"}`} />
                )}
              </button>
            </TableHead>
            <TableHead className="min-w-30">
              <button
                className="flex justify-between w-full items-center"
                onClick={() => handleSort("quantity")}
              >
                <span className="pr-2">Quantity</span>
                {activeFilter === "quantity" && (
                  <ArrowUp className={`size-4 ${isAsc ? "" : "rotate-180"}`} />
                )}
              </button>
            </TableHead>
            <TableHead className="min-w-30">
              <button
                className="flex justify-between w-full items-center "
                onClick={() => handleSort("quality")}
              >
                <span className="pr-2">Quality</span>
                {activeFilter === "quality" && (
                  <ArrowUp className={`size-4 ${isAsc ? "" : "rotate-180"}`} />
                )}
              </button>
            </TableHead>
            <TableHead className="min-w-35">
              <button
                className="flex justify-between w-full items-center"
                onClick={() => handleSort("date")}
              >
                <span className="pr-2">Last Updated</span>
                {activeFilter === "date" && (
                  <ArrowUp className={`size-4 ${isAsc ? "" : "rotate-180"}`} />
                )}
              </button>
            </TableHead>
            <TableHead className="min-w-35">
              <span className="flex justify-between w-full items-center pr-2">
                Sale End Date
              </span>
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts &&
            filteredProducts.map((product, i) => (
              <TableRow
                key={i}
                className={
                  !product.sale || !product.sale_date
                    ? ""
                    : currentDate > new Date(product.sale_date)
                    ? "bg-red-500 text-background"
                    : "bg-green-500 text-background"
                }
              >
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
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < product.quality
                            ? product.sale && product.sale_date
                              ? "text-background fill-background"
                              : "text-foreground fill-foreground"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>{product.date}</TableCell>
                <TableCell>
                  {product.sale && product.sale_date ? product.sale_date : ""}
                </TableCell>
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
