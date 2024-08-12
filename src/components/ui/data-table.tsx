"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table-grid";
import { type TableMeta } from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  data: TData[],
  meta?: TableMeta<TData>,
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  meta,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    meta,
    getCoreRowModel: getCoreRowModel(),
  });

  // TODO: move this to individual PlaylistTable etc components
  return (
    <Table className="border" gridTemplateCols="grid-cols-[auto_2fr_1.5fr_1.5fr_auto_auto_auto]">
      <TableHeader colSpan="col-span-7">
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id} colSpan="col-span-7" className="hover:bg-inherit">
            {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody colSpan="col-span-7">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              colSpan="col-span-7"
              data-state={row.getIsSelected() && "selected"}
              className="group/row"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow colSpan="col-span-7" className="block">
            <TableCell className="h-24 justify-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}