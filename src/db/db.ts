"use server";

import { revalidatePath } from "next/cache";
import { db } from ".";
import {
  extraProductNames,
  Product,
  products,
  uniqueProductNames,
} from "./schema";
import { eq } from "drizzle-orm";

export async function revalidate(path: string) {
  revalidatePath(path);
}

export async function getProducts(): Promise<Product[]> {
  return await db.select().from(products);
}

export async function createProduct(newProduct: Product) {
  await db.insert(products).values(newProduct);
  revalidatePath("/");
}

export async function insertProductName(name: string) {
  const existing = await db
    .select({ name: extraProductNames.name })
    .from(extraProductNames)
    .where(eq(extraProductNames.name, name));

  if (existing.length > 0) {
    return;
  }

  await db.insert(extraProductNames).values({ name });
  revalidatePath("/");
}

export async function removeProductName(name: string) {
  await db.delete(extraProductNames).where(eq(extraProductNames.name, name));
  revalidatePath("/");
}

export async function getUniqueProductNames(): Promise<string[]> {
  const data = await db
    .select({ name: uniqueProductNames.name })
    .from(uniqueProductNames)
    .orderBy(uniqueProductNames.name);
  return data.map((item) => item.name);
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
