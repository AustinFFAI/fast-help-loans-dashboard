"use client";

import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { ResidentialConstructionRow } from "@/types/applications";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const columns: ColumnDef<ResidentialConstructionRow, unknown>[] = [
  { accessorKey: "submissionTime", header: "Submitted" },
  { accessorKey: "clientFullName", header: "Client" },
  { accessorKey: "phoneNumber", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "propertyAddress", header: "Property" },
  { accessorKey: "propertyType", header: "Type" },
  { accessorKey: "typeOfConstruction", header: "Construction" },
  { accessorKey: "purchasePriceOrPropertyValueDisplay", header: "Price/Value" },
  { accessorKey: "costOfConstructionDisplay", header: "Cost" },
  { accessorKey: "afterRepairValueDisplay", header: "ARV" },
  { accessorKey: "ltcDisplay", header: "LTC" },
  { accessorKey: "ltarvDisplay", header: "LTARV" },
  { accessorKey: "estimatedCompletionTime", header: "ETA" },
  { accessorKey: "permitStatus", header: "Permit" },
  { accessorKey: "lienPosition", header: "Lien" },
  {
    id: "action",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Button asChild size="sm">
          <Link href={`/applications/residential-construction/${id}`}>
            View
          </Link>
        </Button>
      );
    },
  },
];

export function ResidentialConstructionTable({
  rows,
}: {
  rows: ResidentialConstructionRow[];
}) {
  return <DataTable data={rows} columns={columns} />;
}
