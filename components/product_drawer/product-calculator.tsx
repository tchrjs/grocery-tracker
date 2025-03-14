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
import { useState } from "react";

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
      <TabsList>
        <TabsTrigger value={TabValue.UNIT_PRICE}>Find Unit Price</TabsTrigger>
        <TabsTrigger value={TabValue.TOTAL_PRICE}>Find Total</TabsTrigger>
        <TabsTrigger value={TabValue.QUANTITY}>Find Quantity</TabsTrigger>
      </TabsList>
      <TabsContent value={TabValue.UNIT_PRICE}>
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
            <TotalFormField form={form} value={value} />
            <QuantityFormField form={form} value={value} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value={TabValue.TOTAL_PRICE}>
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
            <UnitPriceFormField form={form} value={value} />
            <QuantityFormField form={form} value={value} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value={TabValue.QUANTITY}>
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
            <TotalFormField form={form} value={value} />
            <UnitPriceFormField form={form} value={value} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

const TotalFormField = ({ form, value }: { form: any; value: string }) => {
  const handleChange = (e: any, field: any) => {
    const newTotal = Number(setToCurrency(e.target.value));
    field.onChange(newTotal.toString());

    let quantity = Number(form.getValues(TabValue.QUANTITY));
    let unit_price = Number(form.getValues(TabValue.UNIT_PRICE));
    switch (value) {
      case TabValue.UNIT_PRICE:
        unit_price = newTotal / quantity;
        form.setValue("unit_price", setToCurrency(unit_price.toString()));
        break;
      case TabValue.QUANTITY:
        quantity = newTotal / unit_price;
        form.setValue("quantity", setToCurrency(unit_price.toString()));
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
    const newUnitPrice = Number(setToCurrency(e.target.value));
    field.onChange(newUnitPrice.toString());

    let total_price = Number(form.getValues(TabValue.TOTAL_PRICE));
    let quantity = Number(form.getValues(TabValue.QUANTITY));
    switch (value) {
      case TabValue.TOTAL_PRICE:
        total_price = newUnitPrice * quantity;
        form.setValue(
          TabValue.TOTAL_PRICE,
          setToCurrency(total_price.toString())
        );
        break;
      case TabValue.QUANTITY:
        quantity = total_price / newUnitPrice;
        form.setValue(TabValue.QUANTITY, quantity);
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
    const newQuantityValue = e.target.value;
    field.onChange(newQuantityValue);

    let unit_price = Number(form.getValues(TabValue.UNIT_PRICE));
    let total_price = Number(form.getValues(TabValue.TOTAL_PRICE));
    switch (value) {
      case TabValue.UNIT_PRICE:
        unit_price = total_price * newQuantityValue;
        form.setValue(
          TabValue.UNIT_PRICE,
          setToCurrency(total_price.toString())
        );
        break;
      case TabValue.TOTAL_PRICE:
        total_price = unit_price * newQuantityValue;
        form.setValue(
          TabValue.TOTAL_PRICE,
          setToCurrency(total_price.toString())
        );
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
      name="quantity"
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between">
            <FormLabel>Quantity</FormLabel>
            <FormMessage />
          </div>
          <FormControl>
            <Input
              placeholder="Enter product size"
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

function setToCurrency(value: string): string {
  return value
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1")
    .replace(/^0+(?=\d)/, "")
    .replace(/(\.\d{2})\d+$/, "$1");
}
