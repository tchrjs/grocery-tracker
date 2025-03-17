import { ProductTable } from "@/src/components/product_table/product-table";
import { Product } from "../db/schema";
import { getProducts } from "../db/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  let products: Product[] = await getProducts();

  return (
    <div>
      <main>
        <ProductTable products={products} />
      </main>
    </div>
  );
}
