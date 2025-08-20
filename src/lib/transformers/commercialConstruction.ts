import type { CommercialConstructionApi } from "@/types/api";
import type { CommercialConstructionRow } from "@/types/applications";

export function transformCommercialConstruction(
  input:
    | CommercialConstructionApi[]
    | CommercialConstructionApi
    | null
    | undefined
): CommercialConstructionRow[] {
  const raw: CommercialConstructionApi[] = Array.isArray(input)
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
      units: typeof r.units === "number" ? r.units : null,

      typeOfConstruction: r.type_of_construction ?? null,
      purchasePriceOrPropertyValueDisplay: String(
        r.purchase_price_or_property_value ?? ""
      ),
      costOfConstructionDisplay: String(r.cost_of_construction ?? ""),
      constructionFinancedAmountDisplay: String(
        r.construction_financed_amount ?? ""
      ),
      afterRepairValueDisplay: String(r.after_repair_value ?? ""),
      ltcDisplay: String(r.ltc ?? ""),
      ltarvDisplay: String(r.ltarv ?? ""),
      estimatedCompletionTime: r.estimated_completion_time ?? null,
      permitStatus: r.permit_status ?? null,
      lienPosition: r.lien_position ?? null,
    };
  });
}
