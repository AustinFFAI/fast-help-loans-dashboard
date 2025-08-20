"use client";

import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import type { CommercialConstructionRow } from "@/types/applications";

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
    header: "Action",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <a
          href={`/applications/commercial_construction/${id}`}
          className="inline-block px-3 py-1 rounded bg-primary text-primary-foreground text-xs"
        >
          View
        </a>
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
