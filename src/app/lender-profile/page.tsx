import { LenderProfileForm } from "@/components/lender-profile-form";

export default function LenderProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Complete Your Lender Profile</h1>
          <p className="text-muted-foreground mt-2">
            Please provide your lender information to complete your account
            setup
          </p>
        </div>
        <LenderProfileForm />
      </div>
    </div>
  );
}
