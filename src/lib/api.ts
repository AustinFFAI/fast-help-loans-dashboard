"use client";

import type { User as FirebaseUser } from "firebase/auth";

export type BackendUser = {
  id: number;
  email: string;
  role: "admin" | "lender";
  lender_id: number | null;
};

export type LenderProfile = {
  id: number;
  lender_name: string | null;
  contact_email: string | null;
  lending_states: string[];
  property_types: string[];
  loan_min: number | null;
  loan_max: number | null;
  max_ltv: number | null;
  company_name: string | null;
  contact_name: string | null;
  contact_phone: string | null;
};

export type LenderProfileUpdate = {
  lender_name?: string;
  contact_email?: string;
  lending_states?: string[];
  property_types?: string[];
  loan_min?: number;
  loan_max?: number;
  max_ltv?: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function getIdToken(currentUser: FirebaseUser): Promise<string> {
  return currentUser.getIdToken();
}

export async function authorizedFetch(
  currentUser: FirebaseUser,
  path: string,
  init: RequestInit = {},
) {
  const token = await getIdToken(currentUser);
  const headers = new Headers(init.headers || {});
  headers.set("Authorization", `Bearer ${token}`);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });
}

export async function provisionUser(
  currentUser: FirebaseUser,
  body?: Partial<{
    given_name: string;
    family_name: string;
    lender_name: string;
    contact_name: string;
    contact_email: string;
  }>,
): Promise<BackendUser> {
  const res = await authorizedFetch(currentUser, "/auth/provision", {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const msg = await safeError(res);
    throw new Error(msg || `Provision failed: ${res.status}`);
  }
  return res.json();
}

export async function getMe(currentUser: FirebaseUser): Promise<BackendUser> {
  const res = await authorizedFetch(currentUser, "/auth/me");
  if (!res.ok) {
    const msg = await safeError(res);
    throw new Error(msg || `Get me failed: ${res.status}`);
  }
  return res.json();
}

export async function getLenderProfile(
  currentUser: FirebaseUser,
): Promise<LenderProfile> {
  const res = await authorizedFetch(currentUser, "/lenders/profile");
  if (!res.ok) {
    const msg = await safeError(res);
    throw new Error(msg || `Get lender profile failed: ${res.status}`);
  }
  return res.json();
}

export async function updateLenderProfile(
  currentUser: FirebaseUser,
  profileData: LenderProfileUpdate,
): Promise<{ message: string; lender: LenderProfile }> {
  const res = await authorizedFetch(currentUser, "/lenders/profile", {
    method: "PATCH",
    body: JSON.stringify(profileData),
  });
  if (!res.ok) {
    const msg = await safeError(res);
    throw new Error(msg || `Update lender profile failed: ${res.status}`);
  }
  return res.json();
}

async function safeError(res: Response): Promise<string | undefined> {
  try {
    const data = await res.json();
    return (data && (data.detail || data.error)) as string | undefined;
  } catch {
    try {
      return await res.text();
    } catch {
      return undefined;
    }
  }
}
