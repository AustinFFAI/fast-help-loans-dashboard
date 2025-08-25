"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLenderProfile, updateLenderProfile } from "@/lib/api";
import { MultiSelect } from "@/components/ui/multi-select";
import PROPERTY_TYPES from "@/constants/propertyTypes";
import US_STATES from "@/constants/states";

export function LenderProfileForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    lender_name: "",
    contact_email: "",
    lending_states: [] as string[],
    property_types: [] as string[],
    loan_min: "",
    loan_max: "",
    max_ltv: "",
    company_name: "",
    contact_name: "",
    contact_phone: "",
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const profile = await getLenderProfile(user);
      setFormData({
        lender_name: profile.lender_name || "",
        contact_email: profile.contact_email || "",
        lending_states: profile.lending_states || [],
        property_types: profile.property_types || [],
        loan_min: profile.loan_min?.toString() || "",
        loan_max: profile.loan_max?.toString() || "",
        max_ltv: profile.max_ltv?.toString() || "",
        company_name: profile.company_name || "",
        contact_name: profile.contact_name || "",
        contact_phone: profile.contact_phone || "",
      });
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setError(null);

    try {
      await updateLenderProfile(user, {
        lender_name: formData.lender_name,
        contact_email: formData.contact_email,
        lending_states: formData.lending_states,
        property_types: formData.property_types,
        loan_min: formData.loan_min ? parseFloat(formData.loan_min) : undefined,
        loan_max: formData.loan_max ? parseFloat(formData.loan_max) : undefined,
        max_ltv: formData.max_ltv ? parseFloat(formData.max_ltv) : undefined,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold mb-2">Profile Saved Successfully!</h2>
        <p className="text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="company_name">Company Name *</Label>
          <Input
            id="company_name"
            value={formData.company_name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, company_name: e.target.value }))
            }
            required
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="lender_name">Lender Name *</Label>
          <Input
            id="lender_name"
            value={formData.lender_name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lender_name: e.target.value }))
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="contact_name">Contact Name *</Label>
          <Input
            id="contact_name"
            value={formData.contact_name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, contact_name: e.target.value }))
            }
            required
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="contact_email">Contact Email *</Label>
          <Input
            id="contact_email"
            type="email"
            value={formData.contact_email}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contact_email: e.target.value,
              }))
            }
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="contact_phone">Contact Phone</Label>
        <Input
          id="contact_phone"
          type="tel"
          value={formData.contact_phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, contact_phone: e.target.value }))
          }
          placeholder="(555) 123-4567"
        />
      </div>

      <div className="space-y-3">
        <Label>Lending States *</Label>
        <MultiSelect
          options={US_STATES.map((state) => ({ value: state, label: state }))}
          value={formData.lending_states}
          onChange={(vals) =>
            setFormData((prev) => ({ ...prev, lending_states: vals }))
          }
          allLabel="All States"
        />
      </div>

      <div className="space-y-3">
        <Label>Property Types *</Label>
        <MultiSelect
          options={PROPERTY_TYPES.map((t) => ({ value: t, label: t }))}
          value={formData.property_types}
          onChange={(vals) =>
            setFormData((prev) => ({ ...prev, property_types: vals }))
          }
          allLabel="All Types"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <Label htmlFor="loan_min">Minimum Loan Amount</Label>
          <Input
            id="loan_min"
            type="number"
            value={formData.loan_min}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, loan_min: e.target.value }))
            }
            placeholder="100000"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="loan_max">Maximum Loan Amount</Label>
          <Input
            id="loan_max"
            type="number"
            value={formData.loan_max}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, loan_max: e.target.value }))
            }
            placeholder="5000000"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="max_ltv">Maximum LTV (%)</Label>
          <Input
            id="max_ltv"
            type="number"
            value={formData.max_ltv}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, max_ltv: e.target.value }))
            }
            placeholder="80"
            min="0"
            max="100"
          />
        </div>
      </div>

      {error && <div className="text-red-600 text-sm text-center">{error}</div>}

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/")}
        >
          Skip for Now
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </form>
  );
}
