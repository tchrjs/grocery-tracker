import {
  FormGroup,
  FormGroupContent,
  FormGroupItem,
  FormGroupLabel,
} from "../form-ui/form-group";
import { FormControl, FormField } from "@/src/components/ui/form";
import { SuggestionsInput } from "../suggestions/suggestions-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { stores } from "./product-form";

interface InfoGeneralProps {
  form: any;
  productNames?: string[];
}

export default function InfoGeneral({ form, productNames }: InfoGeneralProps) {
  return (
    <FormGroup>
      <FormGroupLabel>General</FormGroupLabel>
      <FormGroupContent>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormGroupItem>
              <FormControl>
                <SuggestionsInput
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
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
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
  );
}
