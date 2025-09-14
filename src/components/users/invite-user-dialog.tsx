"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { createInvitation } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function InviteUserDialog() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "loan_officer">("loan_officer");
  const [loading, setLoading] = useState(false);

  async function onInvite() {
    if (!user) return;
    try {
      setLoading(true);
      await createInvitation(user, email, role);
      toast.success("Invitation sent");
      setOpen(false);
      setEmail("");
      setRole("loan_officer");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to send invite";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Invite User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
          <DialogDescription>
            Send an invitation to a user to join with a specific role.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
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
              onChange={(e) =>
                setRole(e.target.value as "admin" | "loan_officer")
              }
            >
              <option value="loan_officer">Loan Officer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onInvite} disabled={loading || !email}>
            {loading ? "Sending..." : "Send Invite"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
