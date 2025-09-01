"use client";

import { SignupForm } from "@/components/signup-form";
import RedirectIfAuthed from "@/components/redirect-if-authed";
import AuthLayout from "@/components/layouts/auth-layout";
import dynamic from "next/dynamic";

const AuthProvider = dynamic(
  () => import("@/lib/auth-context").then((m) => m.AuthProvider),
  { ssr: false }
);

export default function Page() {
  return (
    <AuthProvider>
      <RedirectIfAuthed>
        <AuthLayout>
          <SignupForm />
        </AuthLayout>
      </RedirectIfAuthed>
    </AuthProvider>
  );
}
