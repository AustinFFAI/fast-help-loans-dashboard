"use client";

import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { ResidentialRefinanceRow } from "@/types/applications";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const columns: ColumnDef<ResidentialRefinanceRow, unknown>[] = [
  { accessorKey: "submissionTime", header: "Submitted" },
  { accessorKey: "clientFullName", header: "Client" },
  { accessorKey: "phoneNumber", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "propertyAddress", header: "Property" },
  { accessorKey: "propertyType", header: "Type" },
  { accessorKey: "occupancyType", header: "Occupancy" },
  { accessorKey: "refinanceType", header: "Refi Type" },
  { accessorKey: "propertyValueDisplay", header: "Property Value" },
  { accessorKey: "loanAmountRequestedDisplay", header: "Loan Amount" },
  { accessorKey: "ltvDisplay", header: "LTV" },
  { accessorKey: "lienPosition", header: "Lien" },
  {
    id: "action",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Button asChild size="sm">
          <Link href={`/applications/residential_refinance/${id}`}>View</Link>
        </Button>
      );
    },
  },
];

export function ResidentialRefinanceTable({
  rows,
}: {
  rows: ResidentialRefinanceRow[];
}) {
  return <DataTable data={rows} columns={columns} />;
}
