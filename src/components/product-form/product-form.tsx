import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Product } from "@/src/db/schema";
import { toTitleCase } from "@/src/lib/utils";
import React, { useState } from "react";
import { Form } from "@/src/components/ui/form";
import InfoSale from "./info-sale";
import InfoTimestamp from "./info-timestamp";
import InfoPricing from "./info-pricing";
import InfoGeneral from "./info-general";
import InfoAbout from "./info-about";

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
  measurement: z.string(),
  total_price: z.string(),
  unit_price: z.string(),
  quantity: z.string(),
  quality: z.string().min(1, { message: "Required" }),
  date: z.coerce.date(),
  sale: z.boolean(),
  sale_date: z.coerce.date(),
});

export const stores: string[] = [
  "Albertsons",
  "Costco",
  "La Bonita",
  "Smiths",
  "Sprouts",
  "Walmart",
  "Whole Foods",
  "WinCo",
  "Trader Joes",
  "Aldi",
  "HMart",
  "Grocery Outlet",
];

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
    measurement: defaultProduct?.measurement ?? "each",
    total_price: defaultProduct?.total_price.toString().toLowerCase() ?? "",
    unit_price: defaultProduct?.unit_price.toString().toLowerCase() ?? "",
    quantity: defaultProduct?.quantity.toString().toLowerCase() ?? "",
    quality: defaultProduct?.quality.toString().toLowerCase() ?? "",
    date: new Date(),
    sale: defaultProduct?.sale ?? false,
    sale_date: saleDate ?? new Date(),
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (e: z.infer<typeof formSchema>) => {
    const product: Product = {
      id: defaultProduct?.id ?? undefined,
      name: toTitleCase(e.name).trim(),
      store: e.store,
      total_price: Number(e.total_price),
      unit_price: Number(e.unit_price),
      measurement: e.measurement,
      quantity: Number(e.quantity),
      quality: Number(e.quality),
      date: e.date.toDateString(),
      sale: e.sale,
      sale_date: e.sale
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
        <InfoAbout form={form} />
        <InfoTimestamp form={form} />
        <InfoSale form={form} defaultValue={defaultValues.sale} />
      </form>
    </Form>
  );
}

export { ProductForm };
