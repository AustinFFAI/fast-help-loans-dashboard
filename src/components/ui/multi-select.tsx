"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  className?: string;
  allLabel?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Search...",
  className,
  allLabel = "All",
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const allValues = useMemo(() => options.map((o) => o.value), [options]);
  const allSelected = value.length > 0 && value.length === allValues.length;

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q),
    );
  }, [options, query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggle(valueToToggle: string) {
    if (value.includes(valueToToggle)) {
      onChange(value.filter((v) => v !== valueToToggle));
    } else {
      onChange([...value, valueToToggle]);
    }
  }

  function toggleAll() {
    if (allSelected) {
      onChange([]);
    } else {
      onChange(allValues);
    }
  }

  const selectedLabels = useMemo(() => {
    if (value.length === 0) return "Select...";
    if (allSelected) return `${allLabel} selected`;
    const map = new Map(options.map((o) => [o.value, o.label] as const));
    const labels = value.slice(0, 3).map((v) => map.get(v) ?? v);
    const remaining = value.length - labels.length;
    return remaining > 0
      ? `${labels.join(", ")} +${remaining}`
      : labels.join(", ");
  }, [value, options, allSelected, allLabel]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-left text-sm shadow-xs",
          "transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        )}
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className={cn(
            "truncate",
            value.length === 0 && "text-muted-foreground",
          )}
        >
          {selectedLabels}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-1 w-full rounded-md border border-input bg-popover text-popover-foreground shadow-md"
          role="listbox"
        >
          <div className="p-2 border-b border-border">
            <input
              className={cn(
                "flex h-8 w-full rounded-md border border-input bg-transparent px-2 text-sm outline-none",
                "focus-visible:border-ring",
              )}
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>

          <ul className="max-h-60 overflow-auto py-1 text-sm">
            <li>
              <label className="flex cursor-pointer items-center gap-2 px-2 py-1.5 hover:bg-accent">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="rounded border-gray-300"
                />
                <span>{allLabel}</span>
              </label>
            </li>
            {filtered.map((opt) => (
              <li key={opt.value}>
                <label className="flex cursor-pointer items-center gap-2 px-2 py-1.5 hover:bg-accent">
                  <input
                    type="checkbox"
                    checked={value.includes(opt.value)}
                    onChange={() => toggle(opt.value)}
                    className="rounded border-gray-300"
                  />
                  <span>{opt.label}</span>
                </label>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-2 py-2 text-muted-foreground">No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
