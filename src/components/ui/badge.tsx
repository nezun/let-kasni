import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--accent)] text-white",
        outline: "border-[var(--border)] bg-white text-[var(--ink)]",
        muted: "border-transparent bg-slate-100 text-slate-700",
        info: "border-transparent bg-blue-50 text-blue-800",
        warning: "border-transparent bg-amber-50 text-amber-800",
        success: "border-transparent bg-emerald-50 text-emerald-800",
        danger: "border-transparent bg-red-50 text-red-800",
        violet: "border-transparent bg-violet-50 text-violet-800",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
