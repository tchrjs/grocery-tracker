import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Product } from "@/src/db/schema";
import { toTitleCase } from "@/src/lib/utils";
import React from "react";

import {
  FormGroup,
  FormGroupContent,
  FormGroupDescription,
  FormGroupItem,
  FormGroupLabel,
} from "../form_group/form-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/src/components/ui/form";
import { FormGroupInput } from "../form_group/form-group-input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { ArrowLeftIcon, ChevronRightIcon, X } from "lucide-react";
import { DatePicker } from "./product-date-picker";
import { ProductCalculator } from "./product-calculator";
import { FormGroupButton } from "../form_group/form-button";
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
  measurement: z.string(),
  total_price: z.string(),
  unit_price: z.string(),
  quantity: z.string(),
  quality: z.string().min(1, { message: "Required" }),
  date: z.coerce.date(),
});

const stores: string[] = [
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

export function ProductForm({
  id,
  onSubmit,
  productNames = [],
}: {
  id: string | undefined;
  onSubmit: SubmitHandler<Product>;
  productNames?: string[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      store: "",
      measurement: "each",
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
        className="flex flex-col gap-6 px-4 text-sm"
        id={id}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormGroup>
          <FormGroupLabel>General</FormGroupLabel>
          <FormGroupContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormGroupItem>
                  <FormControl>
                    <FormGroupInput
                      suggestions={productNames}
                      placeholder="Enter product name"
                      {...field}
                    />
                  </FormControl>
                </FormGroupItem>
              )}
            />
            <FormField
              control={form.control}
              name="store"
              render={({ field }) => (
                <FormGroupItem>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full rounded-none border-none shadow-none hover:bg-accent hover:text-accent-foreground">
                        <SelectValue placeholder="Select a store" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Stores</SelectLabel>
                          {stores.map((store) => (
                            <SelectItem key={store} value={store}>
                              {store}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormGroupItem>
              )}
            />
          </FormGroupContent>
        </FormGroup>
        <FormGroup>
          <FormGroupLabel>About</FormGroupLabel>
          <FormGroupContent>
            <FormField
              control={form.control}
              name="quality"
              render={({ field }) => (
                <FormGroupItem>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full rounded-none border-none shadow-none hover:bg-accent hover:text-accent-foreground">
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Quality Ratings</SelectLabel>
                          <SelectItem value="5">5 - Excellent</SelectItem>
                          <SelectItem value="4">4 - Good</SelectItem>
                          <SelectItem value="3">3 - Okay</SelectItem>
                          <SelectItem value="2">2 - Fair</SelectItem>
                          <SelectItem value="1">1 - Poor</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormGroupItem>
              )}
            />
            {/* TODO - turn into a component */}
            <Drawer dismissible={true} handleOnly={true} direction="right">
              <DrawerTrigger asChild>
                <FormGroupButton
                  className="flex justify-between items-center w-full"
                  variant={"ghost"}
                >
                  <span>Set prices</span>
                  <ChevronRightIcon className="size-4" />
                </FormGroupButton>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="p-2 flex flex-row items-center">
                  <div className="w-1/3 justify-start">
                    <Button className="flex" variant={"ghost"} asChild>
                      <DrawerClose className="flex">
                        <ArrowLeftIcon className="size-4" />
                      </DrawerClose>
                    </Button>
                  </div>
                  <DrawerTitle className="w-1/3 text-center">
                    Set Prices
                  </DrawerTitle>
                  <div className="w-1/3 flex justify-end"></div>
                </DrawerHeader>
                <div className="px-4 flex flex-col gap-4 overflow-y-auto no-scrollbar h-full">
                  <FormGroup>
                    <FormGroupLabel>Measurement Type</FormGroupLabel>
                    <FormGroupContent>
                      <FormField
                        control={form.control}
                        name="measurement"
                        render={({ field }) => (
                          <FormGroupItem>
                            <FormControl>
                              <Select
                                defaultValue="each"
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full rounded-none border-none shadow-none hover:bg-accent hover:text-accent-foreground">
                                  <SelectValue placeholder="Select measurement" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Non Specific Measurements
                                    </SelectLabel>
                                    {nonSpecificMeasurements.map((item) => (
                                      <SelectItem
                                        key={item.value}
                                        value={item.value}
                                      >
                                        {item.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Weight Measurements
                                    </SelectLabel>
                                    {weightMeasurements.map((item) => (
                                      <SelectItem
                                        key={item.value}
                                        value={item.value}
                                      >
                                        {item.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Liquid Measurements
                                    </SelectLabel>
                                    {liquidMeasurements.map((item) => (
                                      <SelectItem
                                        key={item.value}
                                        value={item.value}
                                      >
                                        {item.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormGroupItem>
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
          </FormGroupContent>
        </FormGroup>
        <FormGroup>
          <FormGroupLabel>Timestamp</FormGroupLabel>
          <FormGroupContent>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker placeholder="Pick a date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormGroupContent>
        </FormGroup>
      </form>
    </Form>
  );
}
