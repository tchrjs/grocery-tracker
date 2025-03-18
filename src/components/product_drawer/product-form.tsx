import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { ProductCalculator } from "./product-calculator";
import { Product } from "@/src/db/schema";
import { toTitleCase } from "@/src/lib/utils";
import { DatePicker } from "./product-date-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  store: z.string().min(1, { message: "Required" }),
  measurement: z.string().min(1, { message: "Required" }),
  total_price: z.string(),
  unit_price: z.string(),
  quantity: z.string(),
  quality: z.string(),
  date: z.coerce.date(),
});

export function ProductForm({
  id,
  onSubmit,
}: {
  id: string | undefined;
  onSubmit: SubmitHandler<Product>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      store: "",
      measurement: "",
      total_price: "",
      unit_price: "",
      quantity: "",
      quality: "",
      date: new Date(),
    },
  });

  const handleSubmit = (e: z.infer<typeof formSchema>) => {
    const product: Product = {
      name: toTitleCase(e.name),
      store: e.store,
      total_price: Number(e.total_price),
      unit_price: Number(e.unit_price),
      measurement: e.measurement,
      quantity: Number(e.quantity),
      quality: Number(e.quality),
      date: e.date.toDateString(),
    };
    onSubmit(product);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-12 h-full px-4 text-sm"
        id={id}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col gap-4">
          <div className="text-lg">General Information</div>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Name</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="store"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Store</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="Enter store name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quality"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Quality</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Select defaultValue="3" onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Quality Ratings</SelectLabel>
                          <SelectItem value="1">1 - Poor</SelectItem>
                          <SelectItem value="2">2 - Fair</SelectItem>
                          <SelectItem value="3">3 - Okay</SelectItem>
                          <SelectItem value="4">4 - Good</SelectItem>
                          <SelectItem value="5">5 - Excellent</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Date Created</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <DatePicker placeholder="Pick a date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-lg">Pricing Information</div>
          <div className="flex flex-col gap-4 pb-4">
            <FormField
              control={form.control}
              name="measurement"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Measurement</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="Enter measurement" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <ProductCalculator form={form} />
          </div>
        </div>
      </form>
    </Form>
  );
}
