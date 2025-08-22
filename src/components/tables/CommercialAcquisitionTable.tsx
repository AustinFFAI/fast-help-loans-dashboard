"use client";

import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { CommercialAcquisitionRow } from "@/types/applications";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const columns: ColumnDef<CommercialAcquisitionRow, unknown>[] = [
  { accessorKey: "submissionTime", header: "Submitted" },
  { accessorKey: "clientFullName", header: "Client" },
  { accessorKey: "companyName", header: "Company" },
  { accessorKey: "phoneNumber", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "propertyAddress", header: "Property" },
  { accessorKey: "propertyType", header: "Type" },
  { accessorKey: "units", header: "Units" },
  {
    accessorKey: "purchasePriceOrPropertyValueDisplay",
    header: "Price/Value",
  },
  { accessorKey: "downPaymentDisplay", header: "Down Payment" },
  { accessorKey: "downPaymentPctDisplay", header: "Down %" },
  { accessorKey: "loanAmountRequestedDisplay", header: "Loan Amount" },
  { accessorKey: "ltvDisplay", header: "LTV" },
  { accessorKey: "lienPosition", header: "Lien" },
  { accessorKey: "occupancyRateDisplay", header: "Occupancy" },
  { accessorKey: "annualLeaseRentRevenueDisplay", header: "Annual Rent" },
  {
    accessorKey: "projectedAnnualLeaseRentRevenueDisplay",
    header: "Projected Rent",
  },
  { accessorKey: "isUnderContract", header: "Under Contract" },
  { accessorKey: "closeOfEscrowDate", header: "COE" },
  {
    id: "action",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Button asChild size="sm">
          <Link href={`/applications/commercial-acquisition/${id}`}>View</Link>
        </Button>
      );
    },
  },
];

export function CommercialAcquisitionTable({
  rows,
}: {
  rows: CommercialAcquisitionRow[];
}) {
  return <DataTable data={rows} columns={columns} />;
}
