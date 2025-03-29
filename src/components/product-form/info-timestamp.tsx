import { FormField, FormItem, FormControl } from "@/src/components/ui/form";
import { DatePicker } from "../form-ui/date-picker";
import {
  FormGroup,
  FormGroupContent,
  FormGroupLabel,
} from "../form-ui/form-group";

interface InfoTimestampProps {
  form: any;
}

export default function InfoTimestamp({ form }: InfoTimestampProps) {
  return (
    <FormGroup>
      <FormGroupLabel>Timestamp</FormGroupLabel>
      <FormGroupContent>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  placeholder="Pick a date"
                  defaultDate={field.value}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </FormGroupContent>
    </FormGroup>
  );
}
