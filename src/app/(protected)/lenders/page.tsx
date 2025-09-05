import { MatchingLendersTable } from "@/components/tables/MatchingLendersTable";
import { fetchAllLenders } from "@/lib/fetchAllLenders";
import { transformMatchingLenders } from "@/lib/transformers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lenders | Fast Help Loans Dashboard",
  description: "View and manage all lenders in the system",
};

export default async function LendersPage() {
  // Fetch all lenders from the API
  const lendersData = await fetchAllLenders();
  const lenders = transformMatchingLenders(lendersData);

  return (
    <main className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Lenders
        </h1>
        <p className="text-muted-foreground">
          Manage and view all lenders in the system. Review lender details,
          contact information, and lending criteria.
        </p>
      </div>
      <MatchingLendersTable rows={lenders} />
    </main>
  );
}
