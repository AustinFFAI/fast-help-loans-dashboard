import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchLender } from "@/lib/fetchLender";
import { transformMatchingLenders } from "@/lib/transformers";
import { ArrowLeftToLine } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const lender = await fetchLender(id);

  return {
    title: `${lender?.lender_name || "Lender"} | Details`,
    description: `View details for ${
      lender?.lender_name || "lender"
    } including contact information and lending criteria.`,
  };
}

export default async function LenderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const lender = await fetchLender(id);

  if (!lender) notFound();

  const transformedLender = transformMatchingLenders([lender])[0];
  const lenderName = transformedLender.lenderName || "Unknown Lender";
  const companyName = transformedLender.companyName || "";

  const lendingStates = transformedLender.lendingStates;
  const propertyTypes = transformedLender.propertyTypes;
  const loanRangeDisplay = transformedLender.loanRangeDisplay;

  return (
    <main className="w-full">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/lenders">Lenders</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{lenderName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div className="min-w-0">
          <div className="mb-2">
            <Link
              href="/lenders"
              aria-label="Back to List"
              className="inline-flex items-center gap-1.5 hover:underline"
            >
              <ArrowLeftToLine className="size-4" />
              <span className="sm:inline">Back to List</span>
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            {lenderName}
          </h1>
          <p className="text-muted-foreground">
            {companyName || "Lender Details"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-sm tracking-wide uppercase text-muted-foreground">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">
                    Contact Name
                  </div>
                  <div className="text-sm font-medium">
                    {transformedLender.contactName || "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Company</div>
                  <div className="text-sm font-medium">
                    {companyName || "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Phone</div>
                  <div className="text-sm font-medium">
                    {transformedLender.contactPhone || "-"}
                  </div>
                  {lender.contact_phone_notes && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {lender.contact_phone_notes}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="text-sm font-medium break-words">
                    {transformedLender.contactEmail || "-"}
                  </div>
                  {lender.contact_email_notes && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {lender.contact_email_notes}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lending Criteria */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-sm tracking-wide uppercase text-muted-foreground">
                Lending Criteria
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">
                    Loan Range
                  </div>
                  <div className="text-sm font-medium">{loanRangeDisplay}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Maximum LTV
                  </div>
                  <div className="text-sm font-medium">
                    {transformedLender.maxLtvDisplay || "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Minimum FICO Score
                  </div>
                  <div className="text-sm font-medium">
                    {transformedLender.ficoMinDisplay || "-"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Geographic Coverage */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-sm tracking-wide uppercase text-muted-foreground">
                Geographic Coverage
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div>
                <div className="text-xs text-muted-foreground mb-2">
                  Lending States
                </div>
                <div className="flex flex-wrap gap-1">
                  {lendingStates.length > 0 ? (
                    lendingStates.slice(0, 10).map((state) => (
                      <Badge
                        key={state}
                        variant="secondary"
                        className="text-xs"
                      >
                        {state}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No states specified
                    </span>
                  )}
                  {lendingStates.length > 10 && (
                    <Badge variant="outline" className="text-xs">
                      +{lendingStates.length - 10} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Types */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-sm tracking-wide uppercase text-muted-foreground">
                Property Types
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Supported Types
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {propertyTypes.length > 0 ? (
                      propertyTypes.slice(0, 8).map((type) => (
                        <Badge
                          key={type}
                          variant="secondary"
                          className="text-xs"
                        >
                          {type}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No types specified
                      </span>
                    )}
                    {propertyTypes.length > 8 && (
                      <Badge variant="outline" className="text-xs">
                        +{propertyTypes.length - 8} more
                      </Badge>
                    )}
                  </div>
                </div>
                {transformedLender.notes && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      Additional Notes
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {transformedLender.notes}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
