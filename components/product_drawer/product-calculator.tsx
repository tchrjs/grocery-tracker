import {
  FormControl,
  FormDescription,
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
import { useState } from "react";
import { Separator } from "../ui/separator";

enum TabValue {
  UNIT_PRICE = "unit_price",
  TOTAL_PRICE = "total_price",
  QUANTITY = "quantity",
}

export function ProductCalculator({ form }: { form: any }) {
  const [value, setValue] = useState<string>(TabValue.UNIT_PRICE);

  return (
    <Tabs
      defaultValue={TabValue.UNIT_PRICE}
      onValueChange={(value) => {
        setValue(value);
      }}
    >
      <FormLabel className="pt-2">Cost Calculator</FormLabel>
      <FormDescription>Takes in x and y values to find z</FormDescription>

      <TabsList>
        <TabsTrigger value={TabValue.UNIT_PRICE}>Unit Price</TabsTrigger>
        <TabsTrigger value={TabValue.TOTAL_PRICE}>Total Price</TabsTrigger>
        <TabsTrigger value={TabValue.QUANTITY}>Quantity</TabsTrigger>
      </TabsList>
      <TabsContent value={TabValue.UNIT_PRICE}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Calculate Unit Price</CardTitle>
            <CardDescription>
              <span className="text-sm italic">= Total Price / Quantity</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <TotalPriceFormField form={form} value={value} />
            <QuantityFormField form={form} value={value} />
            <Separator className="my-4" />
            <UnitPriceFormField form={form} value={value} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value={TabValue.TOTAL_PRICE}>
        <Card>
          <CardHeader>
            <CardTitle>Calculate Total Price</CardTitle>
            <CardDescription>
              <span className="text-sm italic">= Unit Price * Quantity</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <UnitPriceFormField form={form} value={value} />
            <QuantityFormField form={form} value={value} />
            <Separator className="my-4" />
            <TotalPriceFormField form={form} value={value} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value={TabValue.QUANTITY}>
        <Card>
          <CardHeader>
            <CardTitle>Calculate Quantity</CardTitle>
            <CardDescription>
              <span className="text-sm italic">= Total Price / Unit Price</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <TotalPriceFormField form={form} value={value} />
            <UnitPriceFormField form={form} value={value} />
            <Separator className="my-4" />
            <QuantityFormField form={form} value={value} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

const TotalPriceFormField = ({ form, value }: { form: any; value: string }) => {
  const handleChange = (e: any, field: any) => {
    const newTotalPrice = cleanNumber(e.target.value);
    field.onChange(newTotalPrice);

    let quantity = Number(form.getValues(TabValue.QUANTITY));
    let unit_price = Number(form.getValues(TabValue.UNIT_PRICE));
    switch (value) {
      case TabValue.UNIT_PRICE:
        unit_price = Number(newTotalPrice) / quantity;
        form.setValue(TabValue.UNIT_PRICE, cleanNumber(unit_price.toString()));
        break;
      case TabValue.QUANTITY:
        quantity = Number(newTotalPrice) / unit_price;
        form.setValue(TabValue.QUANTITY, cleanNumber(quantity.toString()));
        break;
    }
  };

  const handleBlur = (e: any, field: any) => {
    if (!isNaN(Number(e.target.value))) {
      field.onChange(Number(e.target.value).toFixed(2));
    } else {
      field.onChange("0.00");
    }
  };

  return (
    <FormField
      control={form.control}
      name={TabValue.TOTAL_PRICE}
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
                readOnly={TabValue.TOTAL_PRICE === value}
                {...field}
                onChange={(e) => {
                  handleChange(e, field);
                }}
                onBlur={(e) => {
                  handleBlur(e, field);
                }}
              />
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
};

const UnitPriceFormField = ({ form, value }: { form: any; value: string }) => {
  const handleChange = (e: any, field: any) => {
    const newUnitPrice = cleanNumber(e.target.value);
    field.onChange(newUnitPrice);

    let total_price = Number(form.getValues(TabValue.TOTAL_PRICE));
    let quantity = Number(form.getValues(TabValue.QUANTITY));
    switch (value) {
      case TabValue.TOTAL_PRICE:
        total_price = Number(newUnitPrice) * quantity;
        form.setValue(
          TabValue.TOTAL_PRICE,
          cleanNumber(total_price.toString())
        );
        break;
      case TabValue.QUANTITY:
        quantity = total_price / Number(newUnitPrice);
        form.setValue(TabValue.QUANTITY, cleanNumber(quantity.toString()));
        break;
    }
  };

  const handleBlur = (e: any, field: any) => {
    if (!isNaN(Number(e.target.value))) {
      field.onChange(Number(e.target.value).toFixed(2));
    } else {
      field.onChange("0.00");
    }
  };

  return (
    <FormField
      control={form.control}
      name={TabValue.UNIT_PRICE}
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
                readOnly={TabValue.UNIT_PRICE === value}
                {...field}
                onChange={(e) => {
                  handleChange(e, field);
                }}
                onBlur={(e) => {
                  handleBlur(e, field);
                }}
              />
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
};

const QuantityFormField = ({ form, value }: { form: any; value: string }) => {
  const handleChange = (e: any, field: any) => {
    const newQuantityValue = cleanNumber(e.target.value);
    field.onChange(newQuantityValue);

    let unit_price = Number(form.getValues(TabValue.UNIT_PRICE));
    let total_price = Number(form.getValues(TabValue.TOTAL_PRICE));
    switch (value) {
      case TabValue.UNIT_PRICE:
        unit_price = total_price / Number(newQuantityValue);
        form.setValue(TabValue.UNIT_PRICE, cleanNumber(unit_price.toString()));
        break;
      case TabValue.TOTAL_PRICE:
        total_price = unit_price * Number(newQuantityValue);
        form.setValue(
          TabValue.TOTAL_PRICE,
          cleanNumber(total_price.toString())
        );
        break;
    }
  };

  const handleBlur = (e: any, field: any) => {
    if (!isNaN(Number(e.target.value))) {
      field.onChange(Number(e.target.value).toFixed(2));
    } else {
      field.onChange(0);
    }
  };
  return (
    <FormField
      control={form.control}
      name={TabValue.QUANTITY}
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between">
            <FormLabel>Quantity</FormLabel>
            <FormMessage />
          </div>
          <FormControl>
            <Input
              placeholder="0.00"
              readOnly={TabValue.QUANTITY === value}
              {...field}
              onChange={(e) => {
                handleChange(e, field);
              }}
              onBlur={(e) => {
                handleBlur(e, field);
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

function cleanNumber(value: string): string {
  return value
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1")
    .replace(/^0+(?=\d)/, "")
    .replace(/(\.\d{2})\d+$/, "$1");
}
