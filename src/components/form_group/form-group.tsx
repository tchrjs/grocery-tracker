import React from "react";
import { FormDescription, FormItem, FormLabel } from "../ui/form";
import { Separator } from "../ui/separator";

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
    <div className="bg-transparent rounded-md border-1 overflow-hidden">
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
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <FormItem className="gap-0 dark:hover:bg-input/50">{children}</FormItem>
  );
}

export {
  FormGroup,
  FormGroupLabel,
  FormGroupDescription,
  FormGroupContent,
  FormGroupItem,
};
