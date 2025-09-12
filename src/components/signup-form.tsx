"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { signUpWithEmail } = useAuth();
  const router = useRouter();
  const search = useSearchParams();
  const invite = search.get("invite");
  const emailFromQuery = search.get("email") || "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(emailFromQuery);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validatePasswordMatch = (pwd: string, confirmPwd: string) => {
    if (confirmPwd && pwd !== confirmPwd) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError(null);
    }
  };

  async function handleEmailSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPasswordError(null);
    // Validate password confirmation before submission
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setSubmitting(true);
    try {
      await signUpWithEmail(
        email,
        password,
        firstName,
        lastName,
        invite || undefined,
      );
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
    } finally {
      setSubmitting(false);
    }
  }

  // async function handleGoogleSignup() {
  //   setError(null);
  //   setSubmitting(true);
  //   try {
  //     await signInWithGoogle();
  //     router.push("/lender-profile");
  //   } catch (err: unknown) {
  //     setError(
  //       err instanceof Error ? err.message : "Failed to sign in with Google",
  //     );
  //   } finally {
  //     setSubmitting(false);
  //   }
  // }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleEmailSignup}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details to sign up
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-3">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            disabled={!!invite}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => {
              const newPassword = e.target.value;
              setPassword(newPassword);
              validatePasswordMatch(newPassword, confirmPassword);
            }}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
          </div>
          <Input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => {
              const newConfirmPassword = e.target.value;
              setConfirmPassword(newConfirmPassword);
              validatePasswordMatch(password, newConfirmPassword);
            }}
            aria-describedby={passwordError ? "password-error" : undefined}
            aria-invalid={!!passwordError}
          />
          {passwordError && (
            <p
              id="password-error"
              className="text-sm text-red-600"
              role="alert"
            >
              {passwordError}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={
            submitting ||
            !!passwordError ||
            (password !== confirmPassword && confirmPassword !== "")
          }
        >
          Sign up
        </Button>
        {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignup}
          disabled={submitting}
        >
          Continue with Google
        </Button> */}
      </div>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  );
}
