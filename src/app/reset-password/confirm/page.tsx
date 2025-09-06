"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { validatePassword, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ResetPasswordConfirmPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const { confirmPasswordReset } = useAuth();

  const oobCode = useMemo(() => sp.get("oobCode") || "", [sp]);
  const mode = sp.get("mode");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function verify() {
      if (!oobCode || mode !== "resetPassword") {
        setError("Invalid or expired reset link.");
        return;
      }
      try {
        await verifyPasswordResetCode(auth, oobCode);
      } catch {
        setError("Invalid or expired reset link.");
      }
    }
    verify();
  }, [oobCode, mode]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!oobCode) return;
    setError(null);
    setSubmitting(true);
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const status = await validatePassword(auth, password);
      if (!status.isValid) {
        const unmet: string[] = [];
        if (status.meetsMinPasswordLength === false)
          unmet.push("minimum length");
        if (status.meetsMaxPasswordLength === false)
          unmet.push("maximum length");
        if (status.containsLowercaseLetter === false)
          unmet.push("lowercase letter");
        if (status.containsUppercaseLetter === false)
          unmet.push("uppercase letter");
        if (status.containsNumericCharacter === false) unmet.push("number");
        if (status.containsNonAlphanumericCharacter === false)
          unmet.push("symbol");
        const msg = unmet.length
          ? `Password does not meet requirements: ${unmet.join(", ")}.`
          : "Password does not meet the project's password policy.";
        throw new Error(msg);
      }
      await confirmPasswordReset(oobCode, password);
      setDone(true);
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="text-2xl font-bold mb-6">Set a new password</h1>
      {done ? (
        <p className="text-sm">Password updated. Redirecting to login…</p>
      ) : (
        <form className="grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={submitting || !oobCode}>
            {submitting ? "Updating..." : "Update password"}
          </Button>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </form>
      )}
    </div>
  );
}
