import { TableCell, TableRow } from "@/components/ui/table";
import { RatingRange, StarRating } from "./star-rating";

export interface Product {
  name: string;
  store: string;
  total_price: number;
  unit_price: number;
  measurement: any;
  quantity: number;
  quality: RatingRange;
  date: Date;
}

export function Product({ product }: { product: Product }) {
  return (
    <TableRow>
      <TableCell>{product.store}</TableCell>
      <TableCell>{`$${product.total_price.toFixed(2)}`}</TableCell>
      <TableCell>{`$${product.unit_price.toFixed(2)}/${
        product.measurement
      }`}</TableCell>
      <TableCell>{`${product.quantity} ${product.measurement}`}</TableCell>
      <TableCell>
        <StarRating value={product.quality} />
      </TableCell>
      <TableCell>{`${product.date.getMonth()}/${product.date.getDay()}/${product.date.getFullYear()}`}</TableCell>
    </TableRow>
  );
}

export function createProduct(
  name: string,
  store: string,
  total_price: number,
  quantity: number,
  measurement: any,
  quality: RatingRange
): Product {
  let newProduct: Product = {
    name: name,
    store: store,
    total_price: total_price,
    unit_price: total_price / quantity,
    measurement: measurement,
    quantity: quantity,
    quality: quality,
    date: new Date(),
  };
  return newProduct;
}
