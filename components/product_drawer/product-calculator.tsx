import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function ProductCalculator(form: any) {
  return (
    <Tabs defaultValue="unit-price">
      <TabsList>
        <TabsTrigger value="unit-price">Find Unit Price</TabsTrigger>
        <TabsTrigger value="total">Find Total</TabsTrigger>
        <TabsTrigger value="quantity">Find Quantity</TabsTrigger>
      </TabsList>
      <TabsContent value="unit-price">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Calculate Unit Price</CardTitle>
            <CardDescription>
              <span className="text-sm italic">
                Total / Quantity = Unit Price
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <TotalFormField form={form} />
            <QuantityFormField form={form} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="total">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Total</CardTitle>
            <CardDescription>
              <span className="text-sm italic">
                Unit Price * Quantity = Total
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <UnitPriceFormField form={form} />
            <QuantityFormField form={form} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="quantity">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Quantity</CardTitle>
            <CardDescription>
              <span className="text-sm italic">
                Total / Unit Price = Quantity
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <TotalFormField form={form} />
            <UnitPriceFormField form={form} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

const TotalFormField = (form: any) => {
  return (
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
                placeholder="0.00"
                {...field}
                onChange={(e) => field.onChange(setToCurrency(e.target.value))}
                onBlur={(e) => {
                  if (!isNaN(Number(e.target.value))) {
                    field.onChange(Number(e.target.value).toFixed(2));
                  } else {
                    field.onChange("0.00");
                  }
                }}
              />
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
};

const UnitPriceFormField = (form: any) => {
  return (
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
                placeholder="0.00"
                {...field}
                onChange={(e) => field.onChange(setToCurrency(e.target.value))}
                onBlur={(e) => {
                  if (!isNaN(Number(e.target.value))) {
                    field.onChange(Number(e.target.value).toFixed(2));
                  } else {
                    field.onChange("0.00");
                  }
                }}
              />
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
};

const QuantityFormField = (form: any) => {
  return (
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
  );
};

function setToCurrency(value: string): string {
  return value
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1")
    .replace(/^0+(?=\d)/, "")
    .replace(/(\.\d{2})\d+$/, "$1");
}
