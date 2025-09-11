"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/loading-spinner";
import { useAuth } from "@/lib/auth-context";
import {
  listUsers,
  updateUserRole,
  deleteUser,
  activateUser,
  UserManagement,
} from "@/lib/api";
import { DataTable } from "@/components/tables/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

export function UserManagementTable() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserManagement[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  const fetchUsers = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const userList = await listUsers(user);
      setUsers(userList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUsers();
  }, [user, fetchUsers]);

  const handleRoleUpdate = async (
    userId: number,
    newRole: "admin" | "loan_officer",
  ) => {
    if (!user) return;

    try {
      setUpdating(userId);
      await updateUserRole(user, userId, newRole);
      toast.success("User role updated successfully");
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Failed to update user role:", error);
      toast.error("Failed to update user role");
    } finally {
      setUpdating(null);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!user) return;

    if (!confirm("Are you sure you want to deactivate this user?")) {
      return;
    }

    try {
      setUpdating(userId);
      await deleteUser(user, userId);
      toast.success("User deactivated successfully");
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to deactivate user");
    } finally {
      setUpdating(null);
    }
  };

  const handleActivateUser = async (userId: number) => {
    if (!user) return;

    try {
      setUpdating(userId);
      await activateUser(user, userId);
      toast.success("User activated successfully");
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Failed to activate user:", error);
      toast.error("Failed to activate user");
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFullName = (user: UserManagement) => {
    const firstName = user.first_name || "";
    const lastName = user.last_name || "";
    return `${firstName} ${lastName}`.trim() || "N/A";
  };

  const columns: ColumnDef<UserManagement>[] = [
    {
      header: "Name",
      accessorFn: (row) => getFullName(row),
      id: "name",
      cell: ({ row }) => (
        <span className="font-medium">{getFullName(row.original)}</span>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
      id: "email",
      meta: { className: "hidden md:table-cell" },
    },
    {
      header: "Role",
      id: "role",
      cell: ({ row }) => (
        <Badge
          variant={row.original.role === "admin" ? "default" : "secondary"}
        >
          {row.original.role.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: "Status",
      id: "status",
      meta: { className: "hidden sm:table-cell" },
      cell: ({ row }) => (
        <Badge variant={row.original.is_active ? "success" : "destructive"}>
          {row.original.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Created",
      id: "created_at",
      meta: { className: "hidden lg:table-cell" },
      cell: ({ row }) =>
        formatDate(row.original.created_at as unknown as string),
    },
    {
      id: "action",
      meta: { className: "text-right w-0" },
      cell: ({ row }) => {
        const userItem = row.original;
        const isSelf =
          !!user?.email &&
          !!userItem.email &&
          user.email.toLowerCase() === userItem.email.toLowerCase();
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  handleRoleUpdate(
                    userItem.id,
                    userItem.role === "admin" ? "loan_officer" : "admin",
                  )
                }
                disabled={updating === userItem.id || isSelf}
              >
                {updating === userItem.id ? (
                  <Spinner
                    variant="circle"
                    className="text-primary"
                    size={40}
                  />
                ) : (
                  "Toggle Role"
                )}
              </DropdownMenuItem>
              {userItem.is_active ? (
                <DropdownMenuItem
                  onClick={() => handleDeleteUser(userItem.id)}
                  disabled={updating === userItem.id || isSelf}
                  className="text-destructive"
                >
                  {updating === userItem.id ? (
                    <Spinner
                      variant="circle"
                      className="text-primary"
                      size={40}
                    />
                  ) : (
                    "Deactivate"
                  )}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => handleActivateUser(userItem.id)}
                  disabled={updating === userItem.id || isSelf}
                >
                  {updating === userItem.id ? (
                    <Spinner
                      variant="circle"
                      className="text-primary"
                      size={40}
                    />
                  ) : (
                    "Activate"
                  )}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spinner variant="circle" className="text-primary" size={40} />
      </div>
    );
  }

  return <DataTable columns={columns} data={users} />;
}
