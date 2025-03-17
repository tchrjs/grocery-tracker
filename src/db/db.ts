"use server";

import { revalidatePath } from "next/cache";
import { db } from ".";
import { Product, products } from "./schema";

export async function getProducts(): Promise<Product[]> {
  return await db.select().from(products);
}

export async function createProduct(newProduct: Product) {
  await db.insert(products).values(newProduct);
  revalidatePath("/");
}
