import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav aria-label="breadcrumb" className={cn("", className)} {...props} />
  );
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return <ol className={cn("flex items-center gap-1", className)} {...props} />;
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("flex items-center", className)} {...props} />;
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      className={cn(
        "text-[#9E9E9E] hover:text-primary transition-colors text-sm",
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-primary text-sm font-medium", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  className,
  isBeforeCurrent = false,
  ...props
}: React.ComponentProps<"li"> & {
  isBeforeCurrent?: boolean;
}) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn(
        isBeforeCurrent ? "text-primary" : "text-[#9E9E9E]",
        className
      )}
      {...props}
    >
      <ChevronRight size={16} />
    </li>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
