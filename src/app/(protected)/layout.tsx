"use client";

import dynamic from "next/dynamic";
import RequireAuth from "@/components/require-auth";
const AuthProvider = dynamic(
  () => import("@/lib/auth-context").then((m) => m.AuthProvider),
  { ssr: false }
);
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <RequireAuth>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="min-w-0">
            <header className="flex h-14 shrink-0 items-center gap-2 px-4 sticky top-0 z-10 bg-background supports-[backdrop-filter]:bg-background/80 backdrop-blur">
              <SidebarTrigger className="-ml-1" />
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </RequireAuth>
    </AuthProvider>
  );
}
