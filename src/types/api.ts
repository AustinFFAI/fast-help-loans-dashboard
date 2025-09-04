// Backend API response types (raw records as returned by the API)
// These mirror fields listed in MODELS.md. Dates are serialized strings.
// Some numeric fields may arrive as numbers or strings depending on backend formatting.

export type ISODateString = string; // e.g., "2025-08-20" or ISO datetime string

// To be resilient to backend formatting, allow number | string for numeric-like values
type NumLike = number | string | null;

// Commercial Acquisition
export type CommercialAcquisitionApi = {
  id: number;
  submission_time?: ISODateString;
  created_at: ISODateString;
  updated_at: ISODateString;

  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;

  loan_amount_requested?: NumLike;
  ltv?: NumLike;
  lien_position?: string;
  is_under_contract?: string;
  close_of_escrow_date?: ISODateString;

  property_address?: string;
  property_address_address?: string;
  property_address_city?: string;
  property_address_state?: string;
  property_address_zip_code?: string;
  property_type?: string;
  property_description?: string;
  year_built?: number | null;
  units?: number | null;
  occupied?: number | null;
  vacant?: number | null;
  occupancy_rate?: NumLike;
  occupancy_type?: string;
  purchase_price_or_property_value?: NumLike;
  down_payment?: NumLike;

  are_you_currently_collecting_lease_revenue?: string;
  annual_lease_rent_revenue?: NumLike;
  projected_annual_lease_rent_revenue?: NumLike;
  annual_property_tax?: NumLike;
  annual_property_insurance?: NumLike;

  company_name?: string;
  client_first_name?: string;
  client_last_name?: string;
  percent_of_company_owned?: NumLike;
  credit_scores?: number | null;
  client_address?: string;
  client_address_address?: string;
  client_address_city?: string;
  client_address_state?: string;
  client_address_zip_code?: string;
  residence_status?: string;
  client_employment_status?: string;
  monthly_employment_income?: NumLike;
  monthly_income?: NumLike;
  other_properties_owned?: number | null;
  client_net_worth?: NumLike;
  explain_your_exit_strategy?: string;
  comments?: string;
  property_under_contract?: string;
};

// Commercial Construction
export type CommercialConstructionApi = {
  id: number;
  submission_time?: ISODateString;
  created_at: ISODateString;
  updated_at: ISODateString;

  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  loan_type?: string;
  purchase_or_refinance?: string;
  date_purchased?: ISODateString;
  total_mortgage_balance?: NumLike;
  is_under_contract?: string;
  close_of_escrow_date?: ISODateString;
  loan_amount_requested?: NumLike;
  use_of_proceeds?: string;
  lien_position?: string;

  property_address?: string;
  property_address_address?: string;
  property_address_city?: string;
  property_address_state?: string;
  property_address_zip_code?: string;
  property_type?: string;
  type_of_construction?: string;
  property_description?: string;
  year_built?: number | null;
  units?: number | null;
  occupied?: number | null;
  vacant?: number | null;
  occupancy_rate?: NumLike;
  occupancy_type?: string;
  purchase_price_or_property_value?: NumLike;
  down_payment_or_loan_balance?: NumLike;
  annual_property_tax?: NumLike;
  annual_property_insurance?: NumLike;
  cost_of_construction?: NumLike;
  construction_financed_amount?: NumLike;
  cash_already_invested?: NumLike;
  after_repair_value?: NumLike;
  ltarv?: NumLike;
  ltc?: NumLike;
  ltc_purchase?: NumLike;
  ltc_refinance?: NumLike;
  estimated_completion_time?: string;
  permit_status?: string;

  company_name?: string;
  client_first_name?: string;
  client_last_name?: string;
  percent_of_company_owned?: NumLike;
  credit_score?: number | null;
  client_address?: string;
  client_address_address?: string;
  client_address_city?: string;
  client_address_state?: string;
  client_address_zip_code?: string;
  renting_or_owning?: string;
  client_employment_status?: string;
  monthly_employment_income?: NumLike;
  monthly_income?: NumLike;
  other_properties_owned?: number | null;
  client_net_worth?: NumLike;
  construction_experience?: string;
  explain_your_exit_strategy?: string;
  comments?: string;
};

// Commercial Refinance
export type CommercialRefinanceApi = {
  id: number;
  submission_time?: ISODateString;
  created_at: ISODateString;
  updated_at: ISODateString;

  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  loan_amount_requested?: NumLike;
  ltv?: NumLike;
  lien_position?: string;
  refinance_type?: string;
  occupancy_type?: string;
  use_of_proceeds?: string;

  property_address?: string;
  property_address_address?: string;
  property_address_city?: string;
  property_address_state?: string;
  property_address_zip_code?: string;
  property_type?: string;
  property_description?: string;
  occupied?: number | null;
  units?: number | null;
  vacant?: number | null;
  occupancy_rate?: NumLike;
  date_purchased?: ISODateString;
  purchase_price?: NumLike;
  year_built?: number | null;
  date_last_rehabbed_renovated?: ISODateString;
  property_value?: NumLike;
  are_you_currently_collecting_lease_revenue?: string;
  annual_lease_rent_revenue?: NumLike;
  projected_annual_lease_rent_revenue?: NumLike;
  mortgage_balance_1?: NumLike;
  monthly_payment_1?: NumLike;
  interest_rate_1?: NumLike;
  mortgage_balance_2?: NumLike;
  monthly_payment_2?: NumLike;
  interest_rate_2?: NumLike;
  thirty_day_late_payments_all_mortgages?: number | null;
  annual_property_tax?: NumLike;
  annual_property_insurance?: NumLike;

  company_name?: string;
  client_last_name?: string;
  client_first_name?: string;
  percent_of_company_owned?: NumLike;
  credit_scores?: number | null;
  client_address?: string;
  client_address_address?: string;
  client_address_city?: string;
  client_address_state?: string;
  client_address_zip_code?: string;
  renting_or_owning?: string;
  client_employment_status?: string;
  monthly_employment_income?: NumLike;
  monthly_income?: NumLike;
  other_properties_owned?: number | null;
  client_net_worth?: NumLike;
  explain_your_exit_strategy?: string;
  comments?: string;
};

// Residential Acquisition
export type ResidentialAcquisitionApi = {
  id: number;
  submission_time?: ISODateString;
  created_at: ISODateString;
  updated_at: ISODateString;

  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  loan_amount_requested?: NumLike;
  ltv?: NumLike;
  lien_position?: string;
  is_under_contract?: string;
  close_of_escrow_date?: ISODateString;

  property_address?: string;
  property_address_address?: string;
  property_address_city?: string;
  property_address_state?: string;
  property_address_zip_code?: string;
  property_type?: string;
  property_description?: string;
  year_built?: number | null;
  units?: number | null;
  occupied?: number | null;
  vacant?: number | null;
  occupancy_rate?: NumLike;
  occupancy_type?: string;
  purchase_price?: NumLike;
  down_payment?: NumLike;
  are_you_currently_collecting_lease_revenue?: string;
  annual_lease_rent_revenue?: NumLike;
  projected_annual_lease_rent_revenue?: NumLike;
  annual_property_tax?: NumLike;
  annual_property_insurance?: NumLike;

  company_name?: string;
  client_first_name?: string;
  client_last_name?: string;
  percent_of_company_owned?: NumLike;
  credit_scores?: number | null;
  client_address?: string;
  client_address_address?: string;
  client_address_city?: string;
  client_address_state?: string;
  client_address_zip_code?: string;
  residence_status?: string;
  client_employment_status?: string;
  monthly_employment_income?: NumLike;
  monthly_income?: NumLike;
  other_properties_owned?: number | null;
  client_net_worth?: NumLike;
  explain_your_exit_strategy?: string;
  comments?: string;
  property_under_contract?: string;
};

// Residential Construction
export type ResidentialConstructionApi = {
  id: number;
  submission_time?: ISODateString;
  created_at: ISODateString;
  updated_at: ISODateString;

  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  loan_type?: string;
  purchase_or_refinance?: string;
  date_purchased?: ISODateString;
  total_mortgage_balance?: NumLike;
  is_under_contract?: string;
  close_of_escrow_date?: ISODateString;
  loan_amount_requested?: NumLike;
  use_of_proceeds?: string;
  lien_position?: string;

  property_address?: string;
  property_address_address?: string;
  property_address_city?: string;
  property_address_state?: string;
  property_address_zip_code?: string;
  property_type?: string;
  type_of_construction?: string;
  property_description?: string;
  year_built?: number | null;
  units?: number | null;
  occupied?: number | null;
  vacant?: number | null;
  occupancy_rate?: NumLike;
  occupancy_type?: string;
  purchase_price_or_property_value?: NumLike;
  down_payment_or_loan_balance?: NumLike;
  annual_property_tax?: NumLike;
  annual_property_insurance?: NumLike;
  cost_of_construction?: NumLike;
  construction_financed_amount?: NumLike;
  cash_already_invested?: NumLike;
  after_repair_value?: NumLike;
  ltarv?: NumLike;
  ltc?: NumLike;
  ltc_purchase?: NumLike;
  ltc_refinance?: NumLike;
  estimated_completion_time?: string;
  permit_status?: string;

  company_name?: string;
  client_first_name?: string;
  client_last_name?: string;
  percent_of_company_owned?: NumLike;
  credit_score?: number | null;
  client_address?: string;
  client_address_address?: string;
  client_address_city?: string;
  client_address_state?: string;
  client_address_zip_code?: string;
  residence_status?: string;
  client_employment_status?: string;
  monthly_employment_income?: NumLike;
  monthly_income?: NumLike;
  other_properties_owned?: number | null;
  client_net_worth?: NumLike;
  construction_experience?: string;
  explain_your_exit_strategy?: string;
  comments?: string;
};

// Residential Refinance
export type ResidentialRefinanceApi = {
  id: number;
  submission_time?: ISODateString;
  created_at: ISODateString;
  updated_at: ISODateString;

  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  loan_amount_requested?: NumLike;
  ltv?: NumLike;
  lien_position?: string;
  refinance_type?: string;
  occupancy_type?: string;
  use_of_proceeds?: string;

  property_address?: string;
  property_address_address?: string;
  property_address_city?: string;
  property_address_state?: string;
  property_address_zip_code?: string;
  property_type?: string;
  property_description?: string;
  occupied?: number | null;
  units?: number | null;
  vacant?: number | null;
  occupancy_rate?: NumLike;
  date_purchased?: ISODateString;
  purchase_price?: NumLike;
  year_built?: number | null;
  date_last_rehabbed_renovated?: ISODateString;
  property_value?: NumLike;
  are_you_currently_collecting_lease_revenue?: string;
  annual_lease_rent_revenue?: NumLike;
  projected_annual_lease_rent_revenue?: NumLike;
  mortgage_balance_1?: NumLike;
  monthly_payment_1?: NumLike;
  interest_rate_1?: NumLike;
  mortgage_balance_2?: NumLike;
  monthly_payment_2?: NumLike;
  interest_rate_2?: NumLike;
  thirty_day_late_payments_all_mortgages?: number | null;
  annual_property_tax?: NumLike;
  annual_property_income?: NumLike;

  company_name?: string;
  client_first_name?: string;
  client_last_name?: string;
  percent_of_company_owned?: NumLike;
  credit_scores?: number | null;
  client_address?: string;
  client_address_address?: string;
  client_address_city?: string;
  client_address_state?: string;
  client_address_zip_code?: string;
  renting_or_owning?: string;
  client_employment_status?: string;
  monthly_employment_income?: NumLike;
  monthly_income?: NumLike;
  other_properties_owned?: number | null;
  client_net_worth?: NumLike;
  explain_your_exit_strategy?: string;
  comments?: string;
};

// Matching Lender (based on backend Lender model)
export type MatchingLenderApi = {
  id: number;
  spreadsheet_id?: string;
  
  lender_name?: string;
  loan_min?: NumLike;
  loan_max?: NumLike;
  fico_min?: number;
  lending_states?: string; // Text field storing comma-separated states
  property_types?: string; // Text field storing comma-separated property types
  max_ltv?: NumLike;
  
  company_name?: string;
  contact_name?: string;
  contact_phone?: string;
  contact_phone_notes?: string;
  contact_email?: string;
  contact_email_notes?: string;
  notes?: string;
  
  created_at: ISODateString;
  updated_at: ISODateString;
};

// Endpoint-specific response aliases (arrays by default)
export type CommercialAcquisitionResponse = CommercialAcquisitionApi[];
export type CommercialConstructionResponse = CommercialConstructionApi[];
export type CommercialRefinanceResponse = CommercialRefinanceApi[];
export type ResidentialAcquisitionResponse = ResidentialAcquisitionApi[];
export type ResidentialConstructionResponse = ResidentialConstructionApi[];
export type ResidentialRefinanceResponse = ResidentialRefinanceApi[];
export type MatchingLendersResponse = MatchingLenderApi[];
