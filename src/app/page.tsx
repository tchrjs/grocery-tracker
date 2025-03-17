import { ProductTable } from "@/src/components/product_table/product-table";
import { Product } from "../db/schema";
import { getProducts } from "../db/db";

export default async function Home() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <div>
      <main>
        <ProductTable products={products} />
      </main>
    </div>
  );
}
