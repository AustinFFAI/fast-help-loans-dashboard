import type { ResidentialAcquisitionApi } from "@/types/api";
import type { ResidentialAcquisitionRow } from "@/types/applications";

export function transformResidentialAcquisition(
  input:
    | ResidentialAcquisitionApi[]
    | ResidentialAcquisitionApi
    | null
    | undefined
): ResidentialAcquisitionRow[] {
  const raw: ResidentialAcquisitionApi[] = Array.isArray(input)
    ? (input as ResidentialAcquisitionApi[])
    : input
    ? [input as ResidentialAcquisitionApi]
    : [];

  return raw.map((r) => {
    const first = r.client_first_name ?? r.first_name ?? "";
    const last = r.client_last_name ?? r.last_name ?? "";

    const clientFullName = [first, last].filter(Boolean).join(" ");
    const propertyAddress = r.property_address ?? "";

    const isUnderContract =
      r.is_under_contract ?? r.property_under_contract ?? null;
    const closeOfEscrowDate = r.close_of_escrow_date ?? null;

    return {
      id: r.id,
      submissionTime: r.submission_time ?? null,

      clientFullName,
      phoneNumber: r.phone_number ?? null,
      email: r.email ?? null,

      propertyAddress,
      propertyType: r.property_type ?? null,
      occupancyType: r.occupancy_type ?? null,

      // Pass-through display strings (no formatting here)
      purchasePriceDisplay: String(r.purchase_price ?? ""),
      downPaymentDisplay: String(r.down_payment ?? ""),
      downPaymentPctDisplay: String(r.percent_of_company_owned ?? ""),
      loanAmountRequestedDisplay:
        r.loan_amount_requested != null
          ? String(r.loan_amount_requested)
          : null,
      ltvDisplay: r.ltv != null ? String(r.ltv) : null,
      lienPosition: r.lien_position ?? null,

      isUnderContract,
      closeOfEscrowDate,
    };
  });
}
