import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const linkVariants = cva(
  "rounded-md font-medium p-[1px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline",
  {
    variants: {
      size: {
        base: "text-base",
        sm: "text-sm",
        xs: "text-xs underline-offset-2",
      },
      number: {
        single: "truncate line-clamp-1 whitespace-normal break-all",
        list: "",
      },
      color: {
        primary: "text-primary",
        muted: "text-muted-foreground",
        green: "text-green-500",
      },
    },
    defaultVariants: {
      size: "sm",
      number: "single",
      color: "muted",
    },
  }
);

export interface LinkProps extends VariantProps<typeof linkVariants> {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Link({
  href,
  className,
  children,
  size,
  number,
  color,
}: LinkProps) {
  return (
    <NextLink
      href={href}
      className={cn(linkVariants({ size, number, color }), className)}
    >
      {children}
    </NextLink>
  );
}
