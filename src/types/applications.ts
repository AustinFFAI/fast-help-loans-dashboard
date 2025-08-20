// Display row types for application tables
// Start with Residential Refinance (others will follow this pattern)

// Residential Refinance — curated fields to keep the table concise
export type ResidentialRefinanceRow = {
  // Meta
  id: string | number; // required
  submission_time: string | null; // optional per updated model note

  // Client
  client_full_name: string; // derived from first_name + last_name
  phone_number: string | null;
  email: string | null;

  // Property
  property_address: string; // combined address, city, state, zip
  property_type: string | null;
  occupancy_type: string | null;

  // Loan (display-ready values preformatted on the server)
  refinance_type: string | null;
  property_value_display: string; // formatted from property_value
  loan_amount_requested_display: string; // formatted from loan_amount_requested
  ltv_display: string; // formatted percent
  lien_position: string | null;
};

// Commercial Acquisition — curated fields
export type CommercialAcquisitionRow = {
  id: string | number; // required
  submissionTime: string | null;

  // Client
  clientFullName: string;
  companyName: string | null;
  phoneNumber: string | null;
  email: string | null;

  // Property
  propertyAddress: string;
  propertyType: string | null;
  units: number | null;

  // Loan & economics (display-ready)
  purchasePriceOrPropertyValueDisplay: string;
  downPaymentDisplay: string;
  downPaymentPctDisplay: string; // percent
  loanAmountRequestedDisplay: string;
  ltvDisplay: string; // percent
  lienPosition: string | null;

  // Operations
  occupancyRateDisplay: string; // percent
  annualLeaseRentRevenueDisplay: string;
  projectedAnnualLeaseRentRevenueDisplay: string;

  // Status & key dates
  isUnderContract: string | null;
  closeOfEscrowDate: string | null;
};

// Commercial Construction — curated fields
export type CommercialConstructionRow = {
  id: string | number; // required
  submission_time: string | null;

  // Client
  client_full_name: string;
  company_name: string | null;
  phone_number: string | null;
  email: string | null;

  // Property
  property_address: string;
  property_type: string | null;
  units: number | null;

  // Project & loan (display-ready)
  type_of_construction: string | null;
  purchase_price_or_property_value_display: string;
  cost_of_construction_display: string;
  construction_financed_amount_display: string;
  after_repair_value_display: string;
  ltc_display: string; // percent
  ltarv_display: string; // percent
  estimated_completion_time: string | null;
  permit_status: string | null;
  lien_position: string | null;
};

// Commercial Refinance — curated fields
export type CommercialRefinanceRow = {
  id: string | number; // required
  submission_time: string | null;

  // Client
  client_full_name: string;
  company_name: string | null;
  phone_number: string | null;
  email: string | null;

  // Property
  property_address: string;
  property_type: string | null;
  occupancy_type: string | null;
  units: number | null;

  // Loan (display-ready)
  refinance_type: string | null;
  property_value_display: string;
  loan_amount_requested_display: string;
  ltv_display: string; // percent
  lien_position: string | null;

  // Existing financing snapshot (display-ready)
  mortgage_balance_1_display: string | null;
  monthly_payment_1_display: string | null;
  interest_rate_1_display: string | null; // percent
};

// Residential Acquisition — curated fields
export type ResidentialAcquisitionRow = {
  id: string | number; // required
  submission_time: string | null;

  // Client
  client_full_name: string;
  phone_number: string | null;
  email: string | null;

  // Property
  property_address: string;
  property_type: string | null;
  occupancy_type: string | null;

  // Financing (display-ready)
  purchase_price_display: string;
  down_payment_display: string;
  down_payment_pct_display: string; // percent
  loan_amount_requested_display: string | null; // if applicable
  ltv_display: string | null; // percent
  lien_position: string | null;

  // Status
  is_under_contract: string | null;
  close_of_escrow_date: string | null;
};

// Residential Construction — curated fields
export type ResidentialConstructionRow = {
  id: string | number; // required
  submission_time: string | null;

  // Client
  client_full_name: string;
  phone_number: string | null;
  email: string | null;

  // Property
  property_address: string;
  property_type: string | null;

  // Project & loan (display-ready)
  type_of_construction: string | null;
  purchase_price_or_property_value_display: string;
  cost_of_construction_display: string;
  after_repair_value_display: string;
  ltc_display: string; // percent
  ltarv_display: string; // percent
  estimated_completion_time: string | null;
  permit_status: string | null;
  lien_position: string | null;
};
