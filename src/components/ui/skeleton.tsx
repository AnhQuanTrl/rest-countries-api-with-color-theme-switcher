import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const skeletonVariants = cva("animate-pulse rounded-md bg-muted", {
  variants: {
    variant: {
      rectangular: "h-full w-full",
      text: "origin-[0_55%] scale-y-[0.6] transform",
    },
  },
  defaultVariants: {
    variant: "rectangular",
  },
});

function Skeleton({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof skeletonVariants>) {
  return (
    <div
      className={cn(
        skeletonVariants({ variant, className }),
        variant === "text" ? "before:content-nbsp" : "",
      )}
      {...props}
    ></div>
  );
}

export { Skeleton };
