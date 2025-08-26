import type { Metadata } from "next";
import type { CommercialRefinanceResponse } from "@/types/api";
import { transformCommercialRefinance } from "@/lib/transformers";
import { CommercialRefinanceTable } from "@/components/tables/CommercialRefinanceTable";

export const metadata: Metadata = {
  title: "Commercial Refinance Loans | Fast Help Loans",
  description:
    "Refinance your commercial property with better terms and lower rates",
};

export default async function CommercialRefinancePage() {
  const API_URL = process.env.API_URL;

  const response = await fetch(`${API_URL}/applications/commercial_refinance`, {
    headers: {
      "x-fillout-secret": process.env.X_FILLOUT_SECRET || "",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API responded with status: ${response.status}`);
  }

  const applicationData: CommercialRefinanceResponse = await response.json();
  const rows = transformCommercialRefinance(applicationData);

  return (
    <main className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Commercial Refinance Applications
        </h1>
        <p className="text-muted-foreground">
          Compare refinance requests and evaluate loan metrics quickly.
        </p>
      </div>
      <CommercialRefinanceTable rows={rows} />
    </main>
  );
}
