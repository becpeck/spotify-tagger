"use client";

import {
  type ColumnDef,
  type SortingState,
  type OnChangeFn,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
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
  sorting: SortingState,
  setSorting: OnChangeFn<SortingState>,
  gridTemplateCols: string,
  colSpan: string,
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  sorting, 
  setSorting,
  gridTemplateCols,
  colSpan,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    meta,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  // TODO: move this to individual PlaylistTable etc components
  return (
    <Table className="border" gridTemplateCols={gridTemplateCols}>
      <TableHeader colSpan={colSpan}>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id} colSpan={colSpan} className="hover:bg-inherit">
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
      <TableBody colSpan={colSpan}>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              colSpan={colSpan}
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
          <TableRow colSpan={colSpan} className="block">
            <TableCell className="h-24 justify-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}