"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { signInWithEmail } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sendingReset, setSendingReset] = useState(false);

  async function handleEmailLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signInWithEmail(email, password);
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setSubmitting(false);
    }
  }

  // async function handleGoogleLogin() {
  //   setError(null);
  //   setSubmitting(true);
  //   try {
  //     await signInWithGoogle();
  //     router.push("/");
  //   } catch (err: unknown) {
  //     setError(
  //       err instanceof Error ? err.message : "Failed to sign in with Google",
  //     );
  //   } finally {
  //     setSubmitting(false);
  //   }
  // }

  async function handleForgotPassword(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError("Enter your email above to reset your password");
      return;
    }
    try {
      setSendingReset(true);
      const { sendPasswordResetEmail } = await import("firebase/auth");
      const { auth } = await import("@/lib/firebase");
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset email",
      );
    } finally {
      setSendingReset(false);
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleEmailLogin}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
              onClick={handleForgotPassword}
            >
              {sendingReset ? "Sending..." : "Forgot your password?"}
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={submitting}>
          Login
        </Button>
        {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div> */}
        {/* {       <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={submitting}
        >
          Login with Google
        </Button>} */}
      </div>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
