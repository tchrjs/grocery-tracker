import { createProduct, Product } from "@/components/product_table/product";
import { ProductTable } from "@/components/product_table/product-table";

let products: Array<Product> = [];
products.push(createProduct("Apple", "Albertsons", 1.49, 1, "lb", 5));
products.push(createProduct("Apple", "La Bonita", 0.99, 1, "lb", 3));
products.push(
  createProduct("Orange Juice", "Albertsons", 7.99, 128, "fl oz", 4)
);
products.push(createProduct("Orange Juice", "Costco", 23.49, 240, "fl oz", 4));
products.push(createProduct("Orange Juice", "La Bonita", 8.99, 89, "fl oz", 5));
products.push(createProduct("Orange Juice", "Smiths", 4.49, 120, "fl oz", 4));

export default function Home() {
  return (
    <div>
      <main>
        <ProductTable products={products} />
      </main>
    </div>
  );
}
