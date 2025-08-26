import type { Metadata } from "next";
import { ResidentialAcquisitionTable } from "@/components/tables/ResidentialAcquisitionTable";
import { transformResidentialAcquisition } from "@/lib/transformers";
import type { ResidentialAcquisitionResponse } from "@/types/api";

export const metadata: Metadata = {
  title: "Residential Acquisition Loans | Fast Help Loans",
  description:
    "Finance your home purchase or investment property with competitive rates and flexible terms",
};

export default async function ResidentialAcquisitionPage() {
  const API_URL = process.env.API_URL;

  const response = await fetch(
    `${API_URL}/applications/residential_acquisition`,
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

  const applicationData: ResidentialAcquisitionResponse = await response.json();
  const rows = transformResidentialAcquisition(applicationData);

  return (
    <main className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Residential Acquisition Applications
        </h1>
        <p className="text-muted-foreground">
          Review residential purchase submissions, terms, and status.
        </p>
      </div>

      <ResidentialAcquisitionTable rows={rows} />
    </main>
  );
}
