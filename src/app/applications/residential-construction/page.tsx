import type { Metadata } from "next";
import type { ResidentialConstructionResponse } from "@/types/api";
import { transformResidentialConstruction } from "@/lib/transformers";
import { ResidentialConstructionTable } from "@/components/tables/ResidentialConstructionTable";

export const metadata: Metadata = {
  title: "Residential Construction Loans | Fast Help Loans",
  description:
    "Finance your residential construction project with competitive rates and flexible terms",
};

export default async function ResidentialConstructionPage() {
  const API_URL = process.env.API_URL;

  const response = await fetch(
    `${API_URL}/applications/residential_construction`,
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

  const applicationData: ResidentialConstructionResponse =
    await response.json();
  const rows = transformResidentialConstruction(applicationData);

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Residential Construction Applications
          </h1>
          <p className="text-muted-foreground">
            Review construction submissions, key project details, and terms.
          </p>
        </div>
        <ResidentialConstructionTable rows={rows} />
      </main>
    </div>
  );
}
