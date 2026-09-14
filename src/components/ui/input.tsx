import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-lg border border-[var(--border)] bg-white px-3 py-1 text-sm text-[var(--ink)] shadow-xs outline-none transition placeholder:text-[var(--muted)] focus-visible:border-slate-400 focus-visible:ring-2 focus-visible:ring-slate-200",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
