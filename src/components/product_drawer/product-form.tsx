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

const formSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  store: z.string().min(1, { message: "Required" }),
  measurement: z.string().min(1, { message: "Required" }),
  total_price: z.string(),
  unit_price: z.string(),
  quantity: z.string().min(1, { message: "Required" }),
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
      total_price: "",
      unit_price: "",
      quantity: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-10 h-full px-4 text-sm"
        id={id}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <div className="text-lg text-foreground">General Information</div>
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
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-lg text-foreground">Pricing Information</div>
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
