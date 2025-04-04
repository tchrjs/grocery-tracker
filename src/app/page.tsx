import { ProductTable } from "@/src/components/product-table/product-table";
import { Product } from "../db/schema";
import { getProducts, getUniqueProductNames } from "../db/db";
import Header from "../components/layout/header";

export default async function Home() {
  let products: Product[] = await getProducts();
  let productNames: string[] = await getUniqueProductNames();

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ProductTable products={products} productNames={productNames} />
      </main>
    </div>
  );
}
