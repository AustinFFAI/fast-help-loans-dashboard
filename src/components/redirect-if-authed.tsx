"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectIfAuthed({
  children,
}: {
  children: React.ReactNode;
}) {
  const { backendUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && backendUser) {
      router.replace("/");
    }
  }, [loading, backendUser, router]);

  if (loading) {
    return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  }

  if (backendUser) {
    return null;
  }

  return <>{children}</>;
}
