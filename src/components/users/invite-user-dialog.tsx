"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { createInvitation } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";

export function InviteUserDialog() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "lender">("lender");
  const [loading, setLoading] = useState(false);

  async function onInvite() {
    if (!user) return;
    try {
      setLoading(true);
      await createInvitation(user, email, role);
      toast.success("Invitation sent");
      setOpen(false);
      setEmail("");
      setRole("lender");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to send invite";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Invite User</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Invite User</SheetTitle>
          <SheetDescription>
            Send an invitation to a user to join with a specific role.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              className="border rounded-md h-10 px-3"
              value={role}
              onChange={(e) => setRole(e.target.value as "admin" | "lender")}
            >
              <option value="lender">Lender</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <SheetFooter>
          <Button onClick={onInvite} disabled={loading || !email}>
            {loading ? "Sending..." : "Send Invite"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
