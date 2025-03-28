import {
  pgTable,
  serial,
  text,
  integer,
  real,
  date,
  boolean,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text().notNull(),
  store: text().notNull(),
  total_price: real().notNull(),
  unit_price: real().notNull(),
  measurement: text().notNull(),
  quantity: real().notNull(),
  quality: integer().notNull(),
  date: date(),
  sale: boolean(),
  sale_date: date(),
});

export type Product = Omit<
  InferSelectModel<typeof products>,
  "id" | "quality"
> & {
  id?: number;
  quality: number;
};

export const uniqueProductNames = pgTable("unique_product_names", {
  name: text("name").notNull(),
});
