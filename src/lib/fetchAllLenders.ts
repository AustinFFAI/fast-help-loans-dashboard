import type { MatchingLendersResponse } from "../types/api";

type FetchOptions = {
  timeoutMs?: number;
};

/**
 * Fetches all lenders from the API.
 * Handles env validation, timeout, 404 -> empty array, and safe JSON parsing.
 */
export function createAllLendersFetcher(options: FetchOptions = {}) {
  const { timeoutMs = 15000 } = options;

  return async function fetchAllLenders(): Promise<MatchingLendersResponse> {
    const API_URL = process.env.API_URL;
    if (!API_URL) {
      throw new Error("API_URL environment variable is not set");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const url = `${API_URL}/lenders`;
      const res = await fetch(url, {
        headers: { "x-fillout-secret": process.env.X_FILLOUT_SECRET || "" },
        cache: "no-store",
        signal: controller.signal,
      });

      if (res.status === 404) return [];
      if (!res.ok) return [];

      try {
        const raw = await res.json();
        return Array.isArray(raw) ? raw : [];
      } catch {
        return [];
      }
    } catch (err: unknown) {
      if ((err as Error)?.name === "AbortError") {
        console.error("All lenders request timed out:", err);
        return [];
      }
      console.error("Error fetching all lenders:", err);
      return [];
    } finally {
      clearTimeout(timeout);
    }
  };
}

// Default instance for convenience
export const fetchAllLenders = createAllLendersFetcher();