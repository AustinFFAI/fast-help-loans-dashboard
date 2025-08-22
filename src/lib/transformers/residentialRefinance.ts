import type { ResidentialRefinanceApi } from "@/types/api";
import type { ResidentialRefinanceRow } from "@/types/applications";

export function transformResidentialRefinance(
  input: ResidentialRefinanceApi[] | ResidentialRefinanceApi | null | undefined
): ResidentialRefinanceRow[] {
  const raw: ResidentialRefinanceApi[] = Array.isArray(input)
    ? (input as ResidentialRefinanceApi[])
    : input
    ? [input as ResidentialRefinanceApi]
    : [];

  return raw.map((r) => {
    const first = r.client_first_name ?? r.first_name ?? "";
    const last = r.client_last_name ?? r.last_name ?? "";
    const clientFullName = [first, last].filter(Boolean).join(" ");

    return {
      id: r.id,
      submissionTime: r.submission_time ?? null,

      clientFullName,
      phoneNumber: r.phone_number ?? null,
      email: r.email ?? null,

      propertyAddress: r.property_address ?? "",
      propertyType: r.property_type ?? null,
      occupancyType: r.occupancy_type ?? null,

      refinanceType: r.refinance_type ?? null,
      propertyValueDisplay: String(r.property_value ?? ""),
      loanAmountRequestedDisplay: String(r.loan_amount_requested ?? ""),
      ltvDisplay: String(r.ltv ?? ""),
      lienPosition: r.lien_position ?? null,
    };
  });
}
