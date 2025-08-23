import { LoginForm } from "@/components/login-form";
import RedirectIfAuthed from "@/components/redirect-if-authed";
import AuthLayout from "@/components/layouts/auth-layout";

export default function LoginPage() {
  return (
    <RedirectIfAuthed>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </RedirectIfAuthed>
  );
}
