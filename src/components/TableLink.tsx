import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TableLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode | string;
};

export default function TableLink({
  href,
  className,
  children,
}: TableLinkProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: "link" }), "p-0", className)}
    >
      {children}
    </Link>
  );
}
