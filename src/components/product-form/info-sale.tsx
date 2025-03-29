import { useState } from "react";
import { Switch } from "../ui/switch";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/components/ui/form";
import {
  FormGroup,
  FormGroupContent,
  FormGroupDescription,
  FormGroupLabel,
} from "../form-ui/form-group";
import { DatePicker } from "../form-ui/date-picker";

interface InfoSaleProps {
  form: any;
  defaultValue?: boolean;
}

export default function InfoSale({ form, defaultValue }: InfoSaleProps) {
  const [onSale, setOnSale] = useState(defaultValue);

  return (
    <FormGroup>
      <FormGroupLabel>Sale</FormGroupLabel>
      <FormGroupContent>
        <FormField
          control={form.control}
          name="sale"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-4">
              <div className="space-y-0.5">
                <FormLabel>On Sale</FormLabel>
                <FormDescription>
                  <span>Is this product currently on sale?</span>
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  defaultChecked={field.value}
                  onCheckedChange={(checked: boolean) => {
                    setOnSale(checked);
                    field.onChange(checked);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className={`${onSale ? "" : "hidden"}`}>
          <FormField
            control={form.control}
            name="sale_date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePicker
                    placeholder="Pick sale end date"
                    defaultDate={field.value}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </FormGroupContent>
      {onSale ? (
        <FormGroupDescription>
          Set end date, or set to today if none.
        </FormGroupDescription>
      ) : (
        ""
      )}
    </FormGroup>
  );
}
