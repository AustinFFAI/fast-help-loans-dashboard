import type { CommercialAcquisitionApi } from "@/types/api";
import type { CommercialAcquisitionRow } from "@/types/applications";

export function transformCommercialAcquisition(
  input:
    | CommercialAcquisitionApi[]
    | CommercialAcquisitionApi
    | null
    | undefined
): CommercialAcquisitionRow[] {
  const raw: CommercialAcquisitionApi[] = Array.isArray(input)
    ? input
    : input
    ? [input]
    : [];

  return raw.map((r) => {
    const first = r.client_first_name ?? r.first_name ?? "";
    const last = r.client_last_name ?? r.last_name ?? "";

    const submission = r.submission_time ?? null;
    const company = r.company_name ?? null;
    const phone = r.phone_number ?? null;
    const email = r.email ?? null;
    const ptype = r.property_type ?? null;
    const lien = r.lien_position ?? null;
    const underContract =
      r.is_under_contract ?? r.property_under_contract ?? null;
    const coe = r.close_of_escrow_date ?? null;

    return {
      id: r.id,
      submissionTime: submission,

      clientFullName: [first, last].filter(Boolean).join(" "),
      companyName: company,
      phoneNumber: phone,
      email: email,

      propertyAddress: r.property_address ?? "",
      propertyType: ptype,
      units: typeof r.units === "number" ? r.units : null,

      // Pass through API strings as-is (no formatting)
      purchasePriceOrPropertyValueDisplay: String(
        r.purchase_price_or_property_value ?? ""
      ),
      downPaymentDisplay: String(r.down_payment ?? ""),
      downPaymentPctDisplay: String(r.percent_of_company_owned ?? ""),
      loanAmountRequestedDisplay: String(r.loan_amount_requested ?? ""),
      ltvDisplay: String(r.ltv ?? ""),
      lienPosition: lien,

      occupancyRateDisplay: String(r.occupancy_rate ?? ""),
      annualLeaseRentRevenueDisplay: String(r.annual_lease_rent_revenue ?? ""),
      projectedAnnualLeaseRentRevenueDisplay: String(
        r.projected_annual_lease_rent_revenue ?? ""
      ),

      isUnderContract: underContract,
      closeOfEscrowDate: coe,
    };
  });
}
