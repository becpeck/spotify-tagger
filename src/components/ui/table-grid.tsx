import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { gridTemplateCols: string }
>(({ className, gridTemplateCols, ...props }, ref) => (
  <div className="w-full">
    <div
      ref={ref}
      className={cn("w-full caption-bottom text-sm grid gap-x-4", gridTemplateCols, className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { colSpan: string }
>(({ className, colSpan, ...props }, ref) => (
  <div ref={ref} className={cn("border-b grid grid-cols-subgrid", colSpan, className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { colSpan: string }
>(({ className, colSpan, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("[&_>_div:last-child]:border-0 grid grid-cols-subgrid", colSpan, className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

// const TableFooter = React.forwardRef<
//   HTMLTableSectionElement,
//   React.HTMLAttributes<HTMLTableSectionElement>
// >(({ className, ...props }, ref) => (
//   <tfoot
//     ref={ref}
//     className={cn(
//       "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
//       className
//     )}
//     {...props}
//   />
// ))
// TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { colSpan: string }
>(({ className, colSpan, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted px-2 py-2 grid grid-cols-subgrid",
      colSpan,
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center min-h-8 min-w-0 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center min-w-0 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

// const TableCaption = React.forwardRef<
//   HTMLTableCaptionElement,
//   React.HTMLAttributes<HTMLTableCaptionElement>
// >(({ className, ...props }, ref) => (
//   <caption
//     ref={ref}
//     className={cn("mt-4 text-sm text-muted-foreground", className)}
//     {...props}
//   />
// ))
// TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  // TableFooter,
  TableHead,
  TableRow,
  TableCell,
  // TableCaption,
}
