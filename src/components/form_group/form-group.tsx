import React from "react";
import { FormDescription, FormItem, FormLabel } from "../ui/form";
import { Separator } from "../ui/separator";
import { cn } from "@/src/lib/utils";
import { FieldError } from "react-hook-form";
import { Check, X } from "lucide-react";

function FormGroup({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

function FormGroupLabel({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <FormLabel className="pb-1 px-2 text-sm text-foreground/80">
      {children}
    </FormLabel>
  );
}

function FormGroupDescription({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <FormDescription className="text-xs pt-1 px-2">{children}</FormDescription>
  );
}

function FormGroupContent({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <div className="bg-transparent rounded-md border-1">
      {React.Children.map(children, (child, index) => (
        <>
          {index > 0 && <Separator />}
          {child}
        </>
      ))}
    </div>
  );
}

function FormGroupItem({
  children,
  className,
}: Readonly<{
  children?: React.ReactNode;
  className?: string;
}>) {
  return (
    <FormItem
      className={cn("gap-0 dark:hover:bg-input/50 relative", className)}
    >
      {children}
    </FormItem>
  );
}

export {
  FormGroup,
  FormGroupLabel,
  FormGroupDescription,
  FormGroupContent,
  FormGroupItem,
};
