import type { Metadata } from "next";
import type { ResidentialRefinanceResponse } from "@/types/api";
import { transformResidentialRefinance } from "@/lib/transformers";
import { ResidentialRefinanceTable } from "@/components/tables/ResidentialRefinanceTable";

export const metadata: Metadata = {
  title: "Residential Refinance Loans | Fast Help Loans",
  description:
    "Refinance your home with lower rates and better terms. Save money or access your home equity.",
};

export default async function ResidentialRefinancePage() {
  const API_URL = process.env.API_URL;

  const response = await fetch(
    `${API_URL}/applications/residential_refinance`,
    {
      headers: {
        "x-fillout-secret": process.env.X_FILLOUT_SECRET || "",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`API responded with status: ${response.status}`);
  }

  const applicationData: ResidentialRefinanceResponse = await response.json();
  const rows = transformResidentialRefinance(applicationData);

  return (
    <main className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Residential Refinance Applications
        </h1>
        <p className="text-muted-foreground">
          Review refinance submissions, property details, and loan terms.
        </p>
      </div>
      <ResidentialRefinanceTable rows={rows} />
    </main>
  );
}
