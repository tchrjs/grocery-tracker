import { TableCell, TableRow } from "@/components/ui/table";
import { RatingRange, StarRating } from "./star-rating";

export interface Product {
  name: string;
  store: string;
  total: number;
  quantity: number;
  quality: RatingRange;
  unit: {
    price: number;
    type: string;
  };
  date: Date;
}

export function Product({ product }: { product: Product }) {
  return (
    <TableRow>
      <TableCell>{product.store}</TableCell>
      <TableCell>{`$${product.total.toFixed(2)}`}</TableCell>
      <TableCell>{`$${product.unit.price.toFixed(2)}/${
        product.unit.type
      }`}</TableCell>
      <TableCell>{`${product.quantity} ${product.unit.type}`}</TableCell>
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
  total: number,
  quantity: number,
  unit_type: string,
  quality: RatingRange
): Product {
  let newProduct: Product = {
    name: name,
    store: store,
    total: total,
    quantity: quantity,
    quality: quality,
    unit: {
      price: total / quantity,
      type: unit_type,
    },
    date: new Date(),
  };
  return newProduct;
}
