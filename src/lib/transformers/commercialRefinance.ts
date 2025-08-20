import type { CommercialRefinanceApi } from "@/types/api";
import type { CommercialRefinanceRow } from "@/types/applications";

export function transformCommercialRefinance(
  input: CommercialRefinanceApi[] | CommercialRefinanceApi | null | undefined
): CommercialRefinanceRow[] {
  const raw: CommercialRefinanceApi[] = Array.isArray(input)
    ? input
    : input
    ? [input]
    : [];

  return raw.map((r) => {
    const first = r.client_first_name ?? r.first_name ?? "";
    const last = r.client_last_name ?? r.last_name ?? "";

    return {
      id: r.id,
      submissionTime: r.submission_time ?? null,

      clientFullName: [first, last].filter(Boolean).join(" "),
      companyName: r.company_name ?? null,
      phoneNumber: r.phone_number ?? null,
      email: r.email ?? null,

      propertyAddress: (r.property_address ??
        r.property_address_address ??
        "") as string,
      propertyType: r.property_type ?? null,
      occupancyType: r.occupancy_type ?? null,
      units: typeof r.units === "number" ? r.units : null,

      refinanceType: r.refinance_type ?? null,
      propertyValueDisplay: String(r.property_value ?? ""),
      loanAmountRequestedDisplay: String(r.loan_amount_requested ?? ""),
      ltvDisplay: String(r.ltv ?? ""),
      lienPosition: r.lien_position ?? null,

      mortgageBalance1Display: String(r.mortgage_balance_1 ?? ""),
      monthlyPayment1Display: String(r.monthly_payment_1 ?? ""),
      interestRate1Display: String(r.interest_rate_1 ?? ""),
    };
  });
}
