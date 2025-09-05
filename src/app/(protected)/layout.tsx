"use client";

import { AppSidebar } from "@/components/app-sidebar";
import RequireAuth from "@/components/require-auth";
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
    <RequireAuth>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="min-w-0">
          <header
            key="header"
            className="flex h-14 shrink-0 items-center gap-2 px-4 sticky top-0 z-10 bg-background supports-[backdrop-filter]:bg-background/80 backdrop-blur"
          >
            <SidebarTrigger className="-ml-1" />
          </header>
          <div key="content">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </RequireAuth>
  );
}
