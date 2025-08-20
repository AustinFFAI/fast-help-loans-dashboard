"use client";

import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import type { CommercialRefinanceRow } from "@/types/applications";

const columns: ColumnDef<CommercialRefinanceRow, unknown>[] = [
  { accessorKey: "submissionTime", header: "Submitted" },
  { accessorKey: "clientFullName", header: "Client" },
  { accessorKey: "companyName", header: "Company" },
  { accessorKey: "phoneNumber", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "propertyAddress", header: "Property" },
  { accessorKey: "propertyType", header: "Type" },
  { accessorKey: "occupancyType", header: "Occupancy" },
  { accessorKey: "units", header: "Units" },
  { accessorKey: "refinanceType", header: "Refi Type" },
  { accessorKey: "propertyValueDisplay", header: "Value" },
  { accessorKey: "loanAmountRequestedDisplay", header: "Loan Amount" },
  { accessorKey: "ltvDisplay", header: "LTV" },
  { accessorKey: "lienPosition", header: "Lien" },
  { accessorKey: "mortgageBalance1Display", header: "Balance #1" },
  { accessorKey: "monthlyPayment1Display", header: "Payment #1" },
  { accessorKey: "interestRate1Display", header: "Rate #1" },
  {
    id: "action",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <a
          href={`/applications/commercial_refinance/${id}`}
          className="inline-block px-3 py-1 rounded bg-primary text-primary-foreground text-xs"
        >
          View
        </a>
      );
    },
  },
];

export function CommercialRefinanceTable({
  rows,
}: {
  rows: CommercialRefinanceRow[];
}) {
  return <DataTable data={rows} columns={columns} />;
}
