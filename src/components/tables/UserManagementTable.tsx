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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/loading-spinner";
import { useAuth } from "@/lib/auth-context";
import {
  listUsers,
  updateUserRole,
  deleteUser,
  activateUser,
  UserManagement,
} from "@/lib/api";
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-32">
            <Spinner variant="circle" className="text-primary" size={40} />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((userItem) => (
                <TableRow key={userItem.id}>
                  <TableCell className="font-medium">
                    {getFullName(userItem)}
                  </TableCell>
                  <TableCell>{userItem.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        userItem.role === "admin" ? "default" : "secondary"
                      }
                    >
                      {userItem.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={userItem.is_active ? "default" : "destructive"}
                    >
                      {userItem.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(userItem.created_at)}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
