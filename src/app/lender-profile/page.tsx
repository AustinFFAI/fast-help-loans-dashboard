"use client";

import { LenderProfileForm } from "@/components/lender-profile-form";
import dynamic from "next/dynamic";

const AuthProvider = dynamic(
  () => import("@/lib/auth-context").then((m) => m.AuthProvider),
  { ssr: false }
);

export default function LenderProfilePage() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
