import {
  FormGroup,
  FormGroupContent,
  FormGroupDescription,
  FormGroupLabel,
} from "../form-ui/form-group";
import { FormControl, FormField } from "@/src/components/ui/form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ProductCalculator } from "../form-ui/product-calculator";
import { Button } from "../ui/button";
import { ArrowLeftIcon, ChevronRightIcon } from "lucide-react";

interface InfoPricingProps {
  form: any;
}

const nonSpecificMeasurements = [{ label: "Per Item (each)", value: "each" }];

const weightMeasurements = [
  { label: "Milligram (mg)", value: "mg" },
  { label: "Grams (g)", value: "g" },
  { label: "Kilograms (kg)", value: "kg" },
  { label: "Ounce (oz)", value: "oz" },
  { label: "Pound (lb)", value: "lb" },
];

const liquidMeasurements = [
  { label: "Fluid Ounce (fl oz)", value: "fl oz" },
  { label: "Quarts (qt)", value: "qt" },
  { label: "Pints (pt)", value: "pt" },
  { label: "Gallons (gal)", value: "gal" },
  { label: "Cups (c)", value: "c" },
  { label: "Tablespoons (tbsp)", value: "tbsp" },
  { label: "Teaspoons (tsp)", value: "tsp" },
  { label: "Liters (L)", value: "L" },
  { label: "Milliliters (mL)", value: "mL" },
];

export default function InfoPricing({ form }: InfoPricingProps) {
  return (
    <Drawer dismissible={true} handleOnly={true} direction="right">
      <DrawerTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex justify-between items-center w-full"
        >
          <span>Set Prices</span>
          <ChevronRightIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="p-2 flex flex-row items-center">
          <div className="w-1/3">
            <Button className="flex" variant={"ghost"} asChild>
              <DrawerClose className="flex">
                <ArrowLeftIcon className="size-4" />
              </DrawerClose>
            </Button>
          </div>
          <DrawerTitle className="w-1/3 text-center">Set Prices</DrawerTitle>
          <div className="w-1/3"></div>
        </DrawerHeader>
        <div className="px-4 flex flex-col gap-4">
          <FormGroup>
            <FormGroupLabel>Measurement Type</FormGroupLabel>
            <FormGroupContent>
              <FormField
                control={form.control}
                name="measurement"
                render={({ field }) => (
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full border-none shadow-none hover:bg-accent hover:text-accent-foreground">
                      <SelectValue placeholder="Select measurement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Non Specific</SelectLabel>
                        {nonSpecificMeasurements.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Weight</SelectLabel>
                        {weightMeasurements.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Liquid</SelectLabel>
                        {liquidMeasurements.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormGroupContent>
            <FormGroupDescription>
              Used for unit prices ($1.00/each) and for quantity values
            </FormGroupDescription>
          </FormGroup>
          <FormGroup>
            <FormGroupLabel>Calculator</FormGroupLabel>
            <ProductCalculator form={form} />
            <FormGroupDescription>
              Takes in x and y values to find z
            </FormGroupDescription>
          </FormGroup>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
