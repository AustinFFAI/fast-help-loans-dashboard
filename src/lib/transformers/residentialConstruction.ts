import type { ResidentialConstructionApi } from "@/types/api";
import type { ResidentialConstructionRow } from "@/types/applications";

export function transformResidentialConstruction(
  input:
    | ResidentialConstructionApi[]
    | ResidentialConstructionApi
    | null
    | undefined
): ResidentialConstructionRow[] {
  const raw: ResidentialConstructionApi[] = Array.isArray(input)
    ? (input as ResidentialConstructionApi[])
    : input
    ? [input as ResidentialConstructionApi]
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

      typeOfConstruction: r.type_of_construction ?? null,
      purchasePriceOrPropertyValueDisplay: String(
        r.purchase_price_or_property_value ?? ""
      ),
      costOfConstructionDisplay: String(r.cost_of_construction ?? ""),
      afterRepairValueDisplay: String(r.after_repair_value ?? ""),
      ltcDisplay: String(r.ltc ?? ""),
      ltarvDisplay: String(r.ltarv ?? ""),
      estimatedCompletionTime: r.estimated_completion_time ?? null,
      permitStatus: r.permit_status ?? null,
      lienPosition: r.lien_position ?? null,
    };
  });
}
