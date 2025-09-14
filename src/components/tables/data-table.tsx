"use client";

import type { CSSProperties } from "react";
import {
  Column,
  ColumnDef,
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
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnPinning: { right: ["action"] },
    },
  });

  const getCommonPinningStyles = (column: Column<unknown>): CSSProperties => {
    const isPinned = column.getIsPinned();

    return {
      left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
      right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
      position: isPinned ? ("sticky" as const) : ("relative" as const),
      zIndex: isPinned ? 10 : 0,
    };
  };

  const hasRows = table.getRowModel().rows?.length > 0;

  return (
    <div className="overflow-x-auto rounded-md border w-full">
      <Table className={hasRows ? "min-w-[720px]" : "w-full min-w-[720px]"}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const { column } = header;
                const headerMetaClass = (
                  column.columnDef as { meta?: { className?: string } }
                ).meta?.className;
                const isPinned = column.getIsPinned();
                const headerPinnedBg = isPinned ? "bg-background" : "";
                const headerPinnedBorder =
                  isPinned === "right" ? "border-l" : "";
                const isActionColumn = column.id === "action";
                const padRightBeforeAction =
                  !isPinned && column.getIsLastColumn("center") ? "pr-4" : "";
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={[
                      headerMetaClass,
                      headerPinnedBg,
                      headerPinnedBorder,
                      "sticky top-0 z-20",
                      "first:pl-4",
                      padRightBeforeAction,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={getCommonPinningStyles(column as Column<unknown>)}
                  >
                    {header.isPlaceholder
                      ? null
                      : column.columnDef.header !== undefined
                      ? flexRender(column.columnDef.header, header.getContext())
                      : isActionColumn
                      ? "Actions"
                      : null}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const { column } = cell;
                  const cellMetaClass = (
                    column.columnDef as { meta?: { className?: string } }
                  ).meta?.className;
                  const isPinned = column.getIsPinned();
                  const cellPinnedBg = isPinned ? "bg-background" : "";
                  const cellPinnedBorder =
                    isPinned === "right" ? "border-l" : "";
                  const padRightBeforeAction =
                    !isPinned && column.getIsLastColumn("center") ? "pr-4" : "";
                  return (
                    <TableCell
                      key={cell.id}
                      className={[
                        cellMetaClass,
                        cellPinnedBg,
                        cellPinnedBorder,
                        "whitespace-nowrap",
                        "first:pl-4",
                        padRightBeforeAction,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={getCommonPinningStyles(column as Column<unknown>)}
                    >
                      {flexRender(column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-10 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
