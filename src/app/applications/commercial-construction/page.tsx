import type { Metadata } from "next";
import type { CommercialConstructionResponse } from "@/types/api";
import { transformCommercialConstruction } from "@/lib/transformers";
import { CommercialConstructionTable } from "@/components/tables/CommercialConstructionTable";

export const metadata: Metadata = {
  title: "Commercial Construction Loans | Fast Help Loans",
  description:
    "Finance your commercial construction project with flexible terms and competitive rates",
};

export default async function CommercialConstructionPage() {
  const API_URL = process.env.API_URL;

  const response = await fetch(
    `${API_URL}/applications/commercial_construction`,
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

  const applicationData: CommercialConstructionResponse = await response.json();
  const rows = transformCommercialConstruction(applicationData);

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Commercial Construction Applications
          </h1>
          <p className="text-muted-foreground">
            Track construction submissions, project details, and financing at a
            glance.
          </p>
        </div>
        <CommercialConstructionTable rows={rows} />
      </main>
    </div>
  );
}
