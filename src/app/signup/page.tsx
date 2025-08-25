"use client";

import { SignupForm } from "@/components/signup-form";
import RedirectIfAuthed from "@/components/redirect-if-authed";
import AuthLayout from "@/components/layouts/auth-layout";

export default function Page() {
  return (
    <RedirectIfAuthed>
      <AuthLayout>
        <SignupForm />
      </AuthLayout>
    </RedirectIfAuthed>
  );
}
