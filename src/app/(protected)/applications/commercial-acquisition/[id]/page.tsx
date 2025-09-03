import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { CommercialAcquisitionApi } from "@/types/api";
import { createApplicationFetcher } from "@/lib/fetchApplication";
import { ApplicationTypeEndpoints } from "@/enums/applicationTypeEndpointsEnum";
import { ArrowLeftToLine } from "lucide-react";
import { MatchingLendersTable } from "@/components/tables/MatchingLendersTable";
import { fetchMatchingLenders } from "@/lib/fetchMatchingLenders";
import { transformMatchingLenders } from "@/lib/transformers";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Commercial Acquisition | Application Details",
};

const fetchApplication = createApplicationFetcher<CommercialAcquisitionApi>(
  ApplicationTypeEndpoints.CommercialAcquisition
);

export default async function CommercialAcquisitionDetailPage({
  params,
}: PageProps) {
  const { id } = await params;
  const record = await fetchApplication(id);

  if (!record) notFound();

  // Fetch matching lenders
  const matchingLendersData = await fetchMatchingLenders(
    "commercial-acquisition",
    id
  );
  const matchingLenders = transformMatchingLenders(matchingLendersData);

  const clientFullName = [
    record.client_first_name ?? record.first_name ?? "",
    record.client_last_name ?? record.last_name ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const propertyAddress = record.property_address ?? "";
  const underContractRaw =
    record.is_under_contract ?? record.property_under_contract ?? null;
  const underContractStr = underContractRaw ? String(underContractRaw) : "";
  const isUnderContract = ["yes", "true", "y"].includes(
    underContractStr.toLowerCase()
  );

  return (
    <main className="w-full">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/applications/commercial-acquisition">
                Commercial Acquisition
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>#{record.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div className="min-w-0">
          <div className="mb-2">
            <Link
              href="/applications/commercial-acquisition"
              aria-label="Back to List"
              className="inline-flex items-center gap-1.5 hover:underline"
            >
              <ArrowLeftToLine className="size-4" />
              <span className="sm:inline">Back to List</span>
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Commercial Acquisition — Details
          </h1>
          <p className="text-muted-foreground">
            {propertyAddress || "No property address provided"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isUnderContract ? (
            <Badge variant="default">Under Contract</Badge>
          ) : (
            <Badge variant="secondary">Not Under Contract</Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-sm tracking-wide uppercase text-muted-foreground">
                Applicant
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Client</div>
                  <div className="text-sm font-medium">
                    {clientFullName || "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Company</div>
                  <div className="text-sm font-medium">
                    {record.company_name ?? "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Phone</div>
                  <div className="text-sm font-medium">
                    {record.phone_number ?? "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="text-sm font-medium break-words">
                    {record.email ?? "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Submitted</div>
                  <div className="text-sm font-medium">
                    {record.submission_time ?? "-"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-sm tracking-wide uppercase text-muted-foreground">
                Property
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <div className="text-xs text-muted-foreground">Address</div>
                  <div className="text-sm font-medium break-words">
                    {propertyAddress || "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Type</div>
                  <div className="text-sm font-medium">
                    {record.property_type ?? "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Units</div>
                  <div className="text-sm font-medium">
                    {record.units ?? "-"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-sm tracking-wide uppercase text-muted-foreground">
                Loan
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">
                    Price/Value
                  </div>
                  <div className="text-sm font-medium">
                    {String(record.purchase_price_or_property_value ?? "-")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Down Payment
                  </div>
                  <div className="text-sm font-medium">
                    {String(record.down_payment ?? "-")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Down %</div>
                  <div className="text-sm font-medium">
                    {String(record.percent_of_company_owned ?? "-")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Loan Amount
                  </div>
                  <div className="text-sm font-medium">
                    {String(record.loan_amount_requested ?? "-")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">LTV</div>
                  <div className="text-sm font-medium">
                    {String(record.ltv ?? "-")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Lien Position
                  </div>
                  <div className="text-sm font-medium">
                    {record.lien_position ?? "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">COE</div>
                  <div className="text-sm font-medium">
                    {record.close_of_escrow_date ?? "-"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-sm tracking-wide uppercase text-muted-foreground">
                Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Occupancy</div>
                  <div className="text-sm font-medium">
                    {String(record.occupancy_rate ?? "-")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Annual Rent
                  </div>
                  <div className="text-sm font-medium">
                    {String(record.annual_lease_rent_revenue ?? "-")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Projected Rent
                  </div>
                  <div className="text-sm font-medium">
                    {String(record.projected_annual_lease_rent_revenue ?? "-")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Matching Lenders Section */}
        <div>
          <h2 className="text-lg font-semibold tracking-tight mb-4">
            Matching Lenders
          </h2>
          <MatchingLendersTable rows={matchingLenders} />
        </div>
      </div>
    </main>
  );
}
