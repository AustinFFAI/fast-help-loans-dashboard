import type { Metadata } from "next";
import type { CommercialAcquisitionResponse } from "@/types/api";
import { transformCommercialAcquisition } from "@/lib/transformers";
import { CommercialAcquisitionTable } from "@/components/tables/CommercialAcquisitionTable";

export const metadata: Metadata = {
  title: "Commercial Acquisition Loans | Fast Help Loans",
  description:
    "Finance your commercial property acquisition with competitive rates and flexible terms",
};

export default async function CommercialAcquisitionPage() {
  const API_URL = process.env.API_URL;

  const response = await fetch(
    `${API_URL}/applications/commercial_acquisition`,
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

  const applicationData: CommercialAcquisitionResponse = await response.json();
  const rows = transformCommercialAcquisition(applicationData);

  return (
    <main className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Commercial Acquisition Applications
        </h1>
        <p className="text-muted-foreground">
          Review acquisition submissions, key terms, and status at a glance.
        </p>
      </div>
      <CommercialAcquisitionTable rows={rows} />
    </main>
  );
}
