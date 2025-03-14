import { ProductTable } from "@/src/components/product_table/product-table";
import { Product } from "../db/schema";

let products: Array<Product> = [];

export default function Home() {
  return (
    <div>
      <main>
        <ProductTable products={products} />
      </main>
    </div>
  );
}
