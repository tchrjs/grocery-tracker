import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Product } from "@/src/db/schema";
import { toTitleCase } from "@/src/lib/utils";
import React, { useState } from "react";
import { Form } from "@/src/components/ui/form";
import InfoSale from "./info-sale";
import InfoTimestamp from "./info-timestamp";
import InfoGeneral from "./info-general";
import InfoAbout from "./info-about";
import InfoAvailable from "./info-available";

interface ProductFormProps {
  id: string | undefined;
  onSubmit: SubmitHandler<Product>;
  productNames?: string[];
  defaultProduct?: Product;
  selectedProduct?: string;
}

export const formSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  store: z.string().min(1, { message: "Required" }),
  available: z.boolean(),
  measurement: z.string(),
  total_price: z.string(),
  unit_price: z.string(),
  quantity: z.string(),
  quality: z.string().min(1, { message: "Required" }),
  date: z.coerce.date(),
  sale: z.boolean(),
  sale_date: z.coerce.date(),
});

function ProductForm(props: ProductFormProps) {
  const { id, onSubmit, productNames, defaultProduct, selectedProduct } = props;

  let saleDate = null;
  if (defaultProduct?.sale_date) {
    saleDate = new Date(defaultProduct.sale_date);
    saleDate.setDate(saleDate.getDate() + 1);
  }

  const defaultValues = {
    name: defaultProduct?.name ?? selectedProduct,
    store: defaultProduct?.store ?? "",
    available: defaultProduct?.available ?? true,
    measurement: defaultProduct?.measurement ?? "each",
    total_price: defaultProduct?.total_price.toString().toLowerCase() ?? "",
    unit_price: defaultProduct?.unit_price.toString().toLowerCase() ?? "",
    quantity: defaultProduct?.quantity.toString().toLowerCase() ?? "",
    quality: defaultProduct?.quality ? defaultProduct?.quality.toString() : "4",
    date: new Date(),
    sale: defaultProduct?.sale ?? false,
    sale_date: saleDate ?? new Date(),
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const [isAvailable, setIsAvailable] = useState(defaultValues.available);

  const handleSubmit = (e: z.infer<typeof formSchema>) => {
    const product: Product = {
      id: defaultProduct?.id ?? undefined,
      name: toTitleCase(e.name).trim(),
      store: e.store,
      available: e.available,
      total_price: e.available ? Number(e.total_price) : 0,
      unit_price: e.available ? Number(e.unit_price) : 0,
      measurement: e.available ? e.measurement : "each",
      quantity: e.available ? Number(e.quantity) : 0,
      quality: e.available ? Number(e.quality) : 0,
      date: e.date.toDateString(),
      sale: e.available ? e.sale : false,
      sale_date:
        e.available && e.sale
          ? e.sale_date.toDateString()
          : new Date().toDateString(),
    };
    onSubmit(product);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 px-4 text-sm"
        id={id}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <InfoGeneral form={form} productNames={productNames} />
        <InfoAvailable form={form} onChange={setIsAvailable} />
        {isAvailable ? (
          <>
            <InfoAbout form={form} />
            <InfoTimestamp form={form} />
            <InfoSale form={form} defaultValue={defaultValues.sale} />
          </>
        ) : (
          <></>
        )}
      </form>
    </Form>
  );
}

export { ProductForm };
