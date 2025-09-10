"use client";

import { useAuth } from "@/lib/auth-context";
import { UserManagementTable } from "@/components/tables/UserManagementTable";
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
            You don't have permission to access this page. Admin access
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

      <UserManagementTable />
    </main>
  );
}
