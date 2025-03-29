import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
} from "@/src/components/ui/form";
import {
  FormGroup,
  FormGroupContent,
  FormGroupLabel,
} from "../form-ui/form-group";
import { Switch } from "../ui/switch";

interface InfoAvailableProps {
  form: any;
  onChange?: (toggled_on: boolean) => any;
}

export default function InfoAvailable({
  form,
  onChange = () => {},
}: InfoAvailableProps) {
  return (
    <FormGroup>
      <FormGroupLabel>Available</FormGroupLabel>
      <FormGroupContent>
        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-4">
              <div className="space-y-0.5">
                <FormLabel>Is Available</FormLabel>
                <FormDescription>
                  <span>Is product available in store location?</span>
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  defaultChecked={field.value}
                  onCheckedChange={(checked: boolean) => {
                    onChange(checked);
                    field.onChange(checked);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </FormGroupContent>
    </FormGroup>
  );
}
