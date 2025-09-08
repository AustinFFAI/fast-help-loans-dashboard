"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  const fetchUsers = async () => {
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
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const handleRoleUpdate = async (
    userId: number,
    newRole: "admin" | "lender",
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
    },
    {
      header: "Role",
      id: "role",
      cell: ({ row }) => (
        <Badge
          variant={row.original.role === "admin" ? "default" : "secondary"}
        >
          {row.original.role}
        </Badge>
      ),
    },
    {
      header: "Status",
      id: "status",
      cell: ({ row }) => (
        <Badge variant={row.original.is_active ? "default" : "destructive"}>
          {row.original.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Created",
      id: "created_at",
      cell: ({ row }) =>
        formatDate(row.original.created_at as unknown as string),
    },
    {
      id: "action",
      meta: { className: "text-right w-0" },
      cell: ({ row }) => {
        const userItem = row.original;
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
                    userItem.role === "admin" ? "lender" : "admin",
                  )
                }
                disabled={updating === userItem.id}
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
                  disabled={updating === userItem.id}
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
                  disabled={updating === userItem.id}
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
