"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/tables/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Spinner } from "@/components/ui/loading-spinner";
import { useAuth } from "@/lib/auth-context";
import { Invitation, listInvitations, resendInvitation } from "@/lib/api";
import { toast } from "sonner";

export function InvitationsTable() {
  const { user } = useAuth();
  const [invites, setInvites] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [resendingId, setResendingId] = useState<number | null>(null);

  const fetchInvites = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await listInvitations(user);
      setInvites(data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load invitations");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchInvites();
  }, [fetchInvites]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const columns: ColumnDef<Invitation>[] = useMemo(
    () => [
      { header: "Email", accessorKey: "email", id: "email" },
      {
        header: "Invited By",
        id: "invited_by",
        cell: ({ row }) => {
          const inviter = row.original.invited_by;
          if (!inviter) return "—";
          const name = [inviter.first_name, inviter.last_name]
            .filter(Boolean)
            .join(" ");
          const displayName = name || inviter.email || "—";
          if (inviter.email && name) {
            return (
              <span className="flex flex-col">
                <span>{name} </span>
                <span className="text-muted-foreground">({inviter.email})</span>
              </span>
            );
          }
          return displayName;
        },
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
        cell: ({ row }) => (
          <Badge variant={row.original.accepted ? "success" : "secondary"}>
            {row.original.accepted ? "Accepted" : "Pending"}
          </Badge>
        ),
      },
      {
        header: "Expires",
        id: "expires_at",
        meta: { className: "hidden md:table-cell" },
        cell: ({ row }) => formatDate(row.original.expires_at),
      },
      {
        id: "action",
        meta: { className: "text-right w-0" },
        cell: ({ row }) => (
          <Button
            variant="outline"
            size="sm"
            disabled={
              row.original.accepted || resendingId === row.original.id || !user
            }
            onClick={async () => {
              if (!user) return;
              try {
                setResendingId(row.original.id);
                await resendInvitation(user, row.original.id);
                toast.success("Invitation re-sent");
              } catch (e) {
                const msg = e instanceof Error ? e.message : "Failed to resend";
                toast.error(msg);
              } finally {
                setResendingId(null);
              }
            }}
          >
            {resendingId === row.original.id ? (
              <Spinner variant="circle" className="text-primary" size={20} />
            ) : (
              "Resend"
            )}
          </Button>
        ),
      },
    ],
    [resendingId, user],
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spinner variant="circle" className="text-primary" size={40} />
      </div>
    );
  }

  return <DataTable columns={columns} data={invites} />;
}
