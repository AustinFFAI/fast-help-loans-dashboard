"use client";

import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { CommercialConstructionRow } from "@/types/applications";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const columns: ColumnDef<CommercialConstructionRow, unknown>[] = [
  { accessorKey: "submissionTime", header: "Submitted" },
  { accessorKey: "clientFullName", header: "Client" },
  { accessorKey: "companyName", header: "Company" },
  { accessorKey: "phoneNumber", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "propertyAddress", header: "Property" },
  { accessorKey: "propertyType", header: "Type" },
  { accessorKey: "units", header: "Units" },
  { accessorKey: "typeOfConstruction", header: "Construction" },
  { accessorKey: "purchasePriceOrPropertyValueDisplay", header: "Price/Value" },
  { accessorKey: "costOfConstructionDisplay", header: "Cost" },
  { accessorKey: "constructionFinancedAmountDisplay", header: "Financed" },
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
          <Link href={`/applications/commercial-construction/${id}`}>View</Link>
        </Button>
      );
    },
  },
];

export function CommercialConstructionTable({
  rows,
}: {
  rows: CommercialConstructionRow[];
}) {
  return <DataTable data={rows} columns={columns} />;
}
