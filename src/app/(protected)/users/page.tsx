"use client";

import { useAuth } from "@/lib/auth-context";
import { UserManagementTable } from "@/components/tables/UserManagementTable";
import { InvitationsTable } from "@/components/tables/InvitationsTable";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Users } from "lucide-react";
import { InviteUserDialog } from "@/components/users/invite-user-dialog";

export default function UsersPage() {
  const { backendUser } = useAuth();

  if (!backendUser || backendUser.role !== "admin") {
    return (
      <div className="container mx-auto py-6">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            You don&apos;t have permission to access this page. Admin access
            required.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Admin Access
          </Badge>
          <InviteUserDialog />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          {/* Simple tabs using buttons to avoid adding new UI primitives */}
          <button
            className="px-3 py-1 rounded-md border data-[active=true]:bg-primary data-[active=true]:text-background"
            data-active={true}
            onClick={(e) => {
              const container =
                (e.currentTarget.closest("main") as HTMLElement) ||
                document.body;
              container
                .querySelectorAll("[data-users-tab]")
                .forEach((el) => el.setAttribute("hidden", "hidden"));
              container
                .querySelector("[data-users-tab=users]")
                ?.removeAttribute("hidden");
              container
                .querySelectorAll("button[data-active]")
                .forEach((btn) => btn.setAttribute("data-active", "false"));
              e.currentTarget.setAttribute("data-active", "true");
            }}
          >
            Users
          </button>
          <button
            className="px-3 py-1 rounded-md border data-[active=true]:bg-primary data-[active=true]:text-background"
            data-active={false}
            onClick={(e) => {
              const container =
                (e.currentTarget.closest("main") as HTMLElement) ||
                document.body;
              container
                .querySelectorAll("[data-users-tab]")
                .forEach((el) => el.setAttribute("hidden", "hidden"));
              container
                .querySelector("[data-users-tab=invites]")
                ?.removeAttribute("hidden");
              container
                .querySelectorAll("button[data-active]")
                .forEach((btn) => btn.setAttribute("data-active", "false"));
              e.currentTarget.setAttribute("data-active", "true");
            }}
          >
            Invites
          </button>
        </div>
        <div data-users-tab="users">
          <UserManagementTable />
        </div>
        <div data-users-tab="invites" hidden>
          <InvitationsTable />
        </div>
      </div>
    </main>
  );
}
