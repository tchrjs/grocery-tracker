import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
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
import {
  FormGroup,
  FormGroupContent,
  FormGroupDescription,
  FormGroupItem,
  FormGroupLabel,
} from "../form_group/form-group";
import { FormGroupInput } from "../form_group/form-group-input";

enum TabValue {
  UNIT_PRICE = "unit_price",
  TOTAL_PRICE = "total_price",
  QUANTITY = "quantity",
}

export function ProductCalculator({ form }: { form: any }) {
  const [activeTab, setActiveTab] = useState<string>(TabValue.UNIT_PRICE);

  return (
    <Tabs defaultValue={TabValue.UNIT_PRICE} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value={TabValue.UNIT_PRICE}>Unit Price</TabsTrigger>
        <TabsTrigger value={TabValue.TOTAL_PRICE}>Total Price</TabsTrigger>
        <TabsTrigger value={TabValue.QUANTITY}>Quantity</TabsTrigger>
      </TabsList>

      <TabsContent value={TabValue.UNIT_PRICE}>
        <CalculationCard
          title="Calculate Unit Price"
          description="= Total Price / Quantity"
        >
          <TotalPriceFormField form={form} activeTab={activeTab} />
          <QuantityFormField form={form} activeTab={activeTab} />
          <Separator className="my-4" />
          <UnitPriceFormField form={form} activeTab={activeTab} />
        </CalculationCard>
      </TabsContent>

      <TabsContent value={TabValue.TOTAL_PRICE}>
        <CalculationCard
          title="Calculate Total Price"
          description="= Unit Price * Quantity"
        >
          <UnitPriceFormField form={form} activeTab={activeTab} />
          <QuantityFormField form={form} activeTab={activeTab} />
          <Separator className="my-4" />
          <TotalPriceFormField form={form} activeTab={activeTab} />
        </CalculationCard>
      </TabsContent>

      <TabsContent value={TabValue.QUANTITY}>
        <CalculationCard
          title="Calculate Quantity"
          description="= Total Price / Unit Price"
        >
          <TotalPriceFormField form={form} activeTab={activeTab} />
          <UnitPriceFormField form={form} activeTab={activeTab} />
          <Separator className="my-4" />
          <QuantityFormField form={form} activeTab={activeTab} />
        </CalculationCard>
      </TabsContent>
    </Tabs>
  );
}

const CalculationCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <Card className="py-6 gap-4">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>
        <span className="text-sm italic">{description}</span>
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">{children}</CardContent>
  </Card>
);

const TotalPriceFormField = ({
  form,
  activeTab,
}: {
  form: any;
  activeTab: string;
}) => {
  return (
    <CustomFormField
      form={form}
      name={TabValue.TOTAL_PRICE}
      label="Total Price ($)"
      readOnly={activeTab === TabValue.TOTAL_PRICE}
      onChangeCallback={(value, form) => {
        const quantity = Number(form.getValues(TabValue.QUANTITY));
        const unit_price = Number(form.getValues(TabValue.UNIT_PRICE));
        if (activeTab === TabValue.UNIT_PRICE) {
          form.setValue(
            TabValue.UNIT_PRICE,
            (quantity > 0 ? value / quantity : 0).toFixed(2)
          );
        } else if (activeTab === TabValue.QUANTITY) {
          form.setValue(
            TabValue.QUANTITY,
            (unit_price > 0 ? value / unit_price : 0).toFixed(2)
          );
        }
      }}
    />
  );
};

const UnitPriceFormField = ({
  form,
  activeTab,
}: {
  form: any;
  activeTab: string;
}) => {
  return (
    <CustomFormField
      form={form}
      name={TabValue.UNIT_PRICE}
      label="Unit Price ($)"
      readOnly={activeTab === TabValue.UNIT_PRICE}
      onChangeCallback={(value, form) => {
        const total_price = Number(form.getValues(TabValue.TOTAL_PRICE));
        const quantity = Number(form.getValues(TabValue.QUANTITY));
        if (activeTab === TabValue.TOTAL_PRICE) {
          form.setValue(TabValue.TOTAL_PRICE, (value * quantity).toFixed(2));
        } else if (activeTab === TabValue.QUANTITY) {
          form.setValue(
            TabValue.QUANTITY,
            (value > 0 ? total_price / value : 0).toFixed(2)
          );
        }
      }}
    />
  );
};

const QuantityFormField = ({
  form,
  activeTab,
}: {
  form: any;
  activeTab: string;
}) => {
  return (
    <CustomFormField
      form={form}
      name={TabValue.QUANTITY}
      label="Quantity"
      readOnly={activeTab === TabValue.QUANTITY}
      onChangeCallback={(value, form) => {
        const unit_price = Number(form.getValues(TabValue.UNIT_PRICE));
        const total_price = Number(form.getValues(TabValue.TOTAL_PRICE));
        if (activeTab === TabValue.UNIT_PRICE) {
          form.setValue(
            TabValue.UNIT_PRICE,
            (value > 0 ? total_price / value : 0).toFixed(2)
          );
        } else if (activeTab === TabValue.TOTAL_PRICE) {
          form.setValue(TabValue.TOTAL_PRICE, (unit_price * value).toFixed(2));
        }
      }}
    />
  );
};

const CustomFormField = ({
  form,
  name,
  label,
  readOnly,
  onChangeCallback,
}: {
  form: any;
  name: string;
  label: string;
  prefix?: string;
  readOnly: boolean;
  onChangeCallback: (value: number, form: any) => void;
}) => {
  const handleChange = (e: any, field: any) => {
    const cleanValue = cleanNumber(e.target.value);
    const numericValue = Number(cleanValue);
    field.onChange(cleanValue);
    onChangeCallback(numericValue, form);
  };

  const handleBlur = (e: any, field: any) => {
    const value = !isNaN(Number(e.target.value))
      ? Number(e.target.value).toFixed(2)
      : "0.00";
    field.onChange(value);
  };

  return (
    <FormGroup>
      <FormGroupLabel>{label}</FormGroupLabel>
      <FormGroupContent>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormGroupItem>
              <div className="flex justify-between"></div>
              <div className="relative">
                <FormControl>
                  <FormGroupInput
                    placeholder="0.00"
                    readOnly={readOnly}
                    inputMode="decimal"
                    pattern="[0-9]*"
                    {...field}
                    onChange={(e) => handleChange(e, field)}
                    onBlur={(e) => handleBlur(e, field)}
                  />
                </FormControl>
              </div>
            </FormGroupItem>
          )}
        />
      </FormGroupContent>
    </FormGroup>
  );
};

function cleanNumber(value: string): string {
  return value
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1")
    .replace(/^0+(?=\d)/, "")
    .replace(/(\.\d{2})\d+$/, "$1");
}
