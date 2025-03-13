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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductCalculator } from "./product-calculator";
import { Separator } from "../ui/separator";

const formSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  store: z.string().min(1, { message: "Required" }),
  measurement: z.string().min(1, { message: "Required" }),
  total_price: z.string(),
  unit_price: z.string(),
  quantity: z.string(),
});

export function ProductForm({
  id,
  onSubmit,
}: {
  id: string | undefined;
  onSubmit: SubmitHandler<z.infer<typeof formSchema>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      store: "",
      measurement: "",
      total_price: "0.00",
      unit_price: "0.00",
      quantity: "0",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 overflow-y-auto"
        id={id}
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
        <Separator className="my-4" />

        <ProductCalculator form={form} />
      </form>
    </Form>
  );
}
