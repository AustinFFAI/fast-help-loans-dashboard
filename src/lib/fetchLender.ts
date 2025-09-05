import type { MatchingLenderApi } from "../types/api";

type FetchOptions = {
  timeoutMs?: number;
};

/**
 * Factory that returns a function to fetch a single lender record by id.
 * Handles env validation, timeout, 404 -> null, and safe JSON parsing.
 */
export function createLenderFetcher(options: FetchOptions = {}) {
  const { timeoutMs = 15000 } = options;

  return async function fetchLender(
    id: string | number
  ): Promise<MatchingLenderApi | null> {
    const API_URL = process.env.API_URL;
    if (!API_URL) {
      throw new Error("API_URL environment variable is not set");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const url = `${API_URL}/lenders/${id}`;
      const res = await fetch(url, {
        headers: { "x-fillout-secret": process.env.X_FILLOUT_SECRET || "" },
        cache: "no-store",
        signal: controller.signal,
      });

      if (res.status === 404) return null;
      if (!res.ok) return null;

      try {
        const raw = await res.json();
        return (
          (Array.isArray(raw) ? (raw as MatchingLenderApi[])[0] : (raw as MatchingLenderApi)) ??
          null
        );
      } catch {
        return null;
      }
    } catch (err: unknown) {
      if ((err as Error)?.name === "AbortError") {
        throw new Error("Request timed out while fetching lender");
      }
      throw new Error((err as Error)?.message || "Unexpected fetch error");
    } finally {
      clearTimeout(timeout);
    }
  };
}

// Default instance for convenience
export const fetchLender = createLenderFetcher();