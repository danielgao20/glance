import * as React from "react";

const Badge = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-zinc-800 text-zinc-400 hover:bg-zinc-700",
      secondary: "bg-zinc-700 text-zinc-300 hover:bg-zinc-600",
      destructive: "bg-red-900 text-red-300 hover:bg-red-800",
    };

    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full border border-zinc-700 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 ${variantClasses[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
