"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getMe, updateMe } from "@/lib/api";
import RequireAuth from "@/components/require-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AccountPage() {
  const { user: firebaseUser } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!firebaseUser) return;
    getMe(firebaseUser)
      .then((data) => {
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
      })
      .catch((err) => toast.error(String(err?.message || err)));
  }, [firebaseUser]);

  async function onSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!firebaseUser) return;
    try {
      setSaving(true);
      await updateMe(firebaseUser, {
        first_name: firstName,
        last_name: lastName,
      });
      toast.success("Profile updated");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  async function onChangePassword(e: React.FormEvent) {
    e.preventDefault();
    // Delegate to Firebase's built-in flows: send password reset email
    // Users authenticated with Google SSO won't have a password to change here.
    if (!firebaseUser?.email) return;
    try {
      const { sendPasswordResetEmail } = await import("firebase/auth");
      const { auth } = await import("@/lib/firebase");
      await sendPasswordResetEmail(auth, firebaseUser.email);
      toast.success("Password reset email sent");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(message);
    }
  }

  return (
    <RequireAuth>
      <div className="max-w-3xl w-full mx-auto p-4 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSaveProfile} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onChangePassword} className="grid gap-4">
              <p className="text-sm text-muted-foreground">
                You can request a password reset email to change your password.
              </p>
              <Button type="submit">Send password reset email</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </RequireAuth>
  );
}
