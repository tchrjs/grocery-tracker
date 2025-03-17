import { pgTable, serial, text, integer, real } from "drizzle-orm/pg-core";
import { QualityRating } from "../components/product_table/star-rating";
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
});

export type Product = Omit<
  InferSelectModel<typeof products>,
  "id" | "quality"
> & {
  id?: number;
  quality: QualityRating;
};
