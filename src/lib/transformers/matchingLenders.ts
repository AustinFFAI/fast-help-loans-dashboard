import type { MatchingLenderApi } from "@/types/api";
import type { MatchingLenderRow } from "@/types/applications";

/**
 * Formats a numeric value as currency
 */
function formatCurrency(value: number | string | null | undefined): string {
  if (!value) return "";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Formats a percentage value
 */
function formatPercent(value: number | string | null | undefined): string {
  if (!value) return "";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "";
  return `${num}%`;
}

/**
 * Formats a numeric value with commas
 */
function formatNumber(value: number | string | null | undefined): string {
  if (!value) return "";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "";
  return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Parses a comma-separated string into an array
 */
function parseCommaSeparated(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * Creates a loan range display string
 */
function createLoanRangeDisplay(
  loanMin: number | string | null | undefined,
  loanMax: number | string | null | undefined
): string {
  const minFormatted = formatCurrency(loanMin);
  const maxFormatted = formatCurrency(loanMax);
  
  if (minFormatted && maxFormatted) {
    return `${minFormatted} - ${maxFormatted}`;
  } else if (minFormatted) {
    return `${minFormatted}+`;
  } else if (maxFormatted) {
    return `Up to ${maxFormatted}`;
  }
  return "";
}

export function transformMatchingLenders(
  input: MatchingLenderApi[] | MatchingLenderApi | null | undefined
): MatchingLenderRow[] {
  const raw: MatchingLenderApi[] = Array.isArray(input)
    ? input
    : input
    ? [input]
    : [];

  return raw.map((r) => {
    return {
      id: r.id,
      lenderName: r.lender_name ?? "",
      companyName: r.company_name ?? "",
      contactName: r.contact_name ?? "",
      contactPhone: r.contact_phone ?? "",
      contactEmail: r.contact_email ?? "",
      
      loanRangeDisplay: createLoanRangeDisplay(r.loan_min, r.loan_max),
      maxLtvDisplay: formatPercent(r.max_ltv),
      ficoMinDisplay: formatNumber(r.fico_min),
      
      lendingStates: parseCommaSeparated(r.lending_states),
      propertyTypes: parseCommaSeparated(r.property_types),
      
      notes: r.notes ?? "",
    };
  });
}