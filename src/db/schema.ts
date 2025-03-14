import { pgTable, serial, text, integer, real } from "drizzle-orm/pg-core";
import { RatingRange } from "../components/product_table/star-rating";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text(),
  store: text(),
  total_price: real(),
  unit_price: real(),
  measurement: text(),
  quantity: real(),
  quality: integer(),
});

export type Product = {
  id: number;
  name: string;
  store: string;
  total_price: number;
  unit_price: number;
  measurement: any;
  quantity: number;
  quality: RatingRange;
};
