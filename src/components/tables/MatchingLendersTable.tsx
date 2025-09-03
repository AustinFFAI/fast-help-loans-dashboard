"use client";

import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/tables/data-table";
import type { MatchingLenderRow } from "@/types/applications";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const columns: ColumnDef<MatchingLenderRow, unknown>[] = [
  { 
    accessorKey: "lenderName", 
    header: "Lender",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.lenderName || "-"}</div>
    ),
  },
  { 
    accessorKey: "companyName", 
    header: "Company",
    cell: ({ row }) => (
      <div>{row.original.companyName || "-"}</div>
    ),
  },
  { 
    accessorKey: "contactName", 
    header: "Contact",
    cell: ({ row }) => (
      <div>{row.original.contactName || "-"}</div>
    ),
  },
  { 
    accessorKey: "contactPhone", 
    header: "Phone",
    cell: ({ row }) => (
      <div>{row.original.contactPhone || "-"}</div>
    ),
  },
  { 
    accessorKey: "contactEmail", 
    header: "Email",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {row.original.contactEmail || "-"}
      </div>
    ),
  },
  { 
    accessorKey: "loanRangeDisplay", 
    header: "Loan Range",
    cell: ({ row }) => (
      <div className="font-mono text-sm">
        {row.original.loanRangeDisplay || "-"}
      </div>
    ),
  },
  { 
    accessorKey: "maxLtvDisplay", 
    header: "Max LTV",
    cell: ({ row }) => (
      <div className="font-mono text-sm">
        {row.original.maxLtvDisplay || "-"}
      </div>
    ),
  },
  { 
    accessorKey: "ficoMinDisplay", 
    header: "Min FICO",
    cell: ({ row }) => (
      <div className="font-mono text-sm">
        {row.original.ficoMinDisplay || "-"}
      </div>
    ),
  },
  {
    accessorKey: "lendingStates",
    header: "States",
    cell: ({ row }) => {
      const states = row.original.lendingStates;
      if (!states?.length) return <div>-</div>;
      
      const displayStates = states.slice(0, 3);
      const hasMore = states.length > 3;
      
      return (
        <div className="flex flex-wrap gap-1">
          {displayStates.map((state) => (
            <Badge key={state} variant="outline" className="text-xs">
              {state}
            </Badge>
          ))}
          {hasMore && (
            <Badge variant="outline" className="text-xs">
              +{states.length - 3}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "propertyTypes",
    header: "Property Types",
    cell: ({ row }) => {
      const types = row.original.propertyTypes;
      if (!types?.length) return <div>-</div>;
      
      const displayTypes = types.slice(0, 2);
      const hasMore = types.length > 2;
      
      return (
        <div className="flex flex-wrap gap-1">
          {displayTypes.map((type) => (
            <Badge key={type} variant="secondary" className="text-xs">
              {type}
            </Badge>
          ))}
          {hasMore && (
            <Badge variant="secondary" className="text-xs">
              +{types.length - 2}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => (
      <div className="max-w-[250px] truncate text-sm text-muted-foreground">
        {row.original.notes || "-"}
      </div>
    ),
  },
];

export function MatchingLendersTable({
  rows,
  isLoading = false,
}: {
  rows: MatchingLenderRow[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
          Loading matching lenders...
        </div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          <div className="mb-2 text-lg font-medium">No Matching Lenders Found</div>
          <p className="text-sm">
            We couldn&apos;t find any lenders that match the criteria for this application.
            Our team will manually review this application for potential matches.
          </p>
        </CardContent>
      </Card>
    );
  }

  return <DataTable data={rows} columns={columns} />;
}