"use server";

import { revalidatePath } from "next/cache";
import { db } from ".";
import { Product, products } from "./schema";
import { eq } from "drizzle-orm";

export async function getProducts(): Promise<Product[]> {
  return await db.select().from(products);
}

export async function createProduct(newProduct: Product) {
  await db.insert(products).values(newProduct);
  revalidatePath("/");
}

export async function getProductNames(): Promise<string[]> {
  const result = await db
    .selectDistinct({ name: products.name })
    .from(products)
    .orderBy(products.name);
  return result.map((row) => row.name);
}

export async function deleteProductById(productId: number): Promise<void> {
  await db.delete(products).where(eq(products.id, productId));
  revalidatePath("/");
}

export async function updateProduct(product: Product) {
  if (!product.id) return;
  await db.update(products).set(product).where(eq(products.id, product.id));
  revalidatePath("/");
}
