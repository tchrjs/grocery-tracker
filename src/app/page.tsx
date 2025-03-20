import { ProductTable } from "@/src/components/product_table/product-table";
import { Product } from "../db/schema";
import { getProductNames, getProducts } from "../db/db";

interface Suggestions {
  names?: string[];
}

export default async function Home() {
  let products: Product[] = await getProducts();
  let productNames: string[] = await getProductNames();

  return (
    <div>
      <main>
        <ProductTable products={products} productNames={productNames} />
      </main>
    </div>
  );
}
