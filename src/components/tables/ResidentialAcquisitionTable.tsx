"use client";

import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { ResidentialAcquisitionRow } from "@/types/applications";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const columns: ColumnDef<ResidentialAcquisitionRow, unknown>[] = [
  { accessorKey: "submissionTime", header: "Submitted" },
  { accessorKey: "clientFullName", header: "Client" },
  { accessorKey: "phoneNumber", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "propertyAddress", header: "Property" },
  { accessorKey: "propertyType", header: "Type" },
  { accessorKey: "occupancyType", header: "Occupancy" },
  { accessorKey: "purchasePriceDisplay", header: "Price" },
  { accessorKey: "downPaymentDisplay", header: "Down Payment" },
  { accessorKey: "downPaymentPctDisplay", header: "Down %" },
  { accessorKey: "loanAmountRequestedDisplay", header: "Loan Amount" },
  { accessorKey: "ltvDisplay", header: "LTV" },
  { accessorKey: "lienPosition", header: "Lien" },
  { accessorKey: "isUnderContract", header: "Under Contract" },
  { accessorKey: "closeOfEscrowDate", header: "COE" },
  {
    id: "action",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Button asChild size="sm">
          <Link href={`/applications/residential-acquisition/${id}`}>View</Link>
        </Button>
      );
    },
  },
];

export function ResidentialAcquisitionTable({
  rows,
}: {
  rows: ResidentialAcquisitionRow[];
}) {
  return <DataTable data={rows} columns={columns} />;
}
