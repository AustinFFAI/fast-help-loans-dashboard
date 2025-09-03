// Display row types for application tables
// Start with Residential Refinance (others will follow this pattern)

// Residential Refinance — curated fields to keep the table concise
export type ResidentialRefinanceRow = {
  // Meta
  id: string | number; // required
  submissionTime: string | null; // optional per updated model note

  // Client
  clientFullName: string; // derived from first_name + last_name
  phoneNumber: string | null;
  email: string | null;

  // Property
  propertyAddress: string; // combined address, city, state, zip
  propertyType: string | null;
  occupancyType: string | null;

  // Loan (display-ready values preformatted on the server)
  refinanceType: string | null;
  propertyValueDisplay: string; // formatted from property_value
  loanAmountRequestedDisplay: string; // formatted from loan_amount_requested
  ltvDisplay: string; // formatted percent
  lienPosition: string | null;
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

  // Project & loan (display-ready)
  typeOfConstruction: string | null;
  purchasePriceOrPropertyValueDisplay: string;
  costOfConstructionDisplay: string;
  constructionFinancedAmountDisplay: string;
  afterRepairValueDisplay: string;
  ltcDisplay: string; // percent
  ltarvDisplay: string; // percent
  estimatedCompletionTime: string | null;
  permitStatus: string | null;
  lienPosition: string | null;
};

// Commercial Refinance — curated fields
export type CommercialRefinanceRow = {
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
  occupancyType: string | null;
  units: number | null;

  // Loan (display-ready)
  refinanceType: string | null;
  propertyValueDisplay: string;
  loanAmountRequestedDisplay: string;
  ltvDisplay: string; // percent
  lienPosition: string | null;

  // Existing financing snapshot (display-ready)
  mortgageBalance1Display: string | null;
  monthlyPayment1Display: string | null;
  interestRate1Display: string | null; // percent
};

// Residential Acquisition — curated fields
export type ResidentialAcquisitionRow = {
  id: string | number; // required
  submissionTime: string | null;

  // Client
  clientFullName: string;
  phoneNumber: string | null;
  email: string | null;

  // Property
  propertyAddress: string;
  propertyType: string | null;
  occupancyType: string | null;

  // Financing (display-ready)
  purchasePriceDisplay: string;
  downPaymentDisplay: string;
  downPaymentPctDisplay: string; // percent
  loanAmountRequestedDisplay: string | null; // if applicable
  ltvDisplay: string | null; // percent
  lienPosition: string | null;

  // Status
  isUnderContract: string | null;
  closeOfEscrowDate: string | null;
};

// Residential Construction — curated fields
export type ResidentialConstructionRow = {
  id: string | number; // required
  submissionTime: string | null;

  // Client
  clientFullName: string;
  phoneNumber: string | null;
  email: string | null;

  // Property
  propertyAddress: string;
  propertyType: string | null;

  // Project & loan (display-ready)
  typeOfConstruction: string | null;
  purchasePriceOrPropertyValueDisplay: string;
  costOfConstructionDisplay: string;
  afterRepairValueDisplay: string;
  ltcDisplay: string; // percent
  ltarvDisplay: string; // percent
  estimatedCompletionTime: string | null;
  permitStatus: string | null;
  lienPosition: string | null;
};

// Matching Lender — display-ready row type for table
export type MatchingLenderRow = {
  id: number;
  lenderName: string;
  companyName: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  
  // Loan terms (display-ready)
  loanRangeDisplay: string; // "Loan Min - Loan Max" formatted
  maxLtvDisplay: string; // formatted percent
  ficoMinDisplay: string; // formatted number
  
  // Coverage
  lendingStates: string[]; // parsed from comma-separated string
  propertyTypes: string[]; // parsed from comma-separated string
  
  // Additional info
  notes: string;
};
