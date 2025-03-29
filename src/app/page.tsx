import { ProductTable } from "@/src/components/product-table/product-table";
import { Product } from "../db/schema";
import { getProducts, getUniqueProductNames } from "../db/db";

export default async function Home() {
  let products: Product[] = await getProducts();
  let productNames: string[] = await getUniqueProductNames();

  return (
    <div>
      <main>
        <ProductTable products={products} productNames={productNames} />
      </main>
    </div>
  );
}
