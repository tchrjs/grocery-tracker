import { FormField, FormControl } from "@/src/components/ui/form";
import {
  FormGroup,
  FormGroupLabel,
  FormGroupContent,
  FormGroupItem,
} from "../form-ui/form-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import InfoPricing from "./info-pricing";

interface ProductAboutProps {
  form: any;
}

export default function InfoAbout({ form }: ProductAboutProps) {
  return (
    <FormGroup>
      <FormGroupLabel>About</FormGroupLabel>
      <FormGroupContent>
        <FormField
          control={form.control}
          name="quality"
          render={({ field }) => (
            <FormGroupItem>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full rounded-none border-none shadow-none hover:bg-accent hover:text-accent-foreground">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Quality Ratings</SelectLabel>
                      <SelectItem value="5">5 - Excellent</SelectItem>
                      <SelectItem value="4">4 - Good</SelectItem>
                      <SelectItem value="3">3 - Fair</SelectItem>
                      <SelectItem value="2">2 - Okay</SelectItem>
                      <SelectItem value="1">1 - Poor</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormGroupItem>
          )}
        />
        <InfoPricing form={form} />
      </FormGroupContent>
    </FormGroup>
  );
}
