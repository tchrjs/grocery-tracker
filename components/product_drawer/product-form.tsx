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

const formSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  store: z.string().min(1, { message: "Required" }),
  measurement: z.string().min(1, { message: "Required" }),
  total_price: z
    .string()
    .min(1, { message: "Required" })
    .regex(/^\d*\.?\d{0,2}$/, { message: "Invalid Format" }),
  unit_price: z
    .string()
    .min(1, { message: "Required" })
    .regex(/^\d*\.?\d{0,2}$/, { message: "Invalid Format" }),
  quantity: z.string(),
});

const defaultValues: Object = {
  name: "",
  store: "",
  measurement: "",
  total_price: "0",
  unit_price: "0",
  quantity: "0",
};

export function ProductForm({
  id,
  onSubmit,
}: {
  id: string | undefined;
  onSubmit: SubmitHandler<z.infer<typeof formSchema>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 overflow-scroll"
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
                <Input placeholder="Enter measurement name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="total_price"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Total Price</FormLabel>
                <FormMessage />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <FormControl>
                  <Input
                    className="pl-6"
                    placeholder="0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                    }
                    onBlur={(e) => {
                      if (e.target.value.startsWith(".")) {
                        field.onChange("0" + e.target.value);
                      } else if (e.target.value.endsWith(".")) {
                        field.onChange(e.target.value.slice(0, -1));
                      }
                    }}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit_price"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Unit Price</FormLabel>
                <FormMessage />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <FormControl>
                  <Input
                    className="pl-6"
                    placeholder="0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/[^0-9.]/g, ""))
                    }
                    onBlur={(e) => {
                      if (e.target.value.startsWith(".")) {
                        field.onChange("0" + e.target.value);
                      } else if (e.target.value.endsWith(".")) {
                        field.onChange(e.target.value.slice(0, -1));
                      }
                    }}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Quantity</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Enter product size" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
