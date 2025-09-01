"use client";

import { LoginForm } from "@/components/login-form";
import RedirectIfAuthed from "@/components/redirect-if-authed";
import AuthLayout from "@/components/layouts/auth-layout";
import dynamic from "next/dynamic";

const AuthProvider = dynamic(
  () => import("@/lib/auth-context").then((m) => m.AuthProvider),
  { ssr: false }
);

export default function LoginPage() {
  return (
    <AuthProvider>
      <RedirectIfAuthed>
        <AuthLayout>
          <LoginForm />
        </AuthLayout>
      </RedirectIfAuthed>
    </AuthProvider>
  );
}
