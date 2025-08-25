import type { ReactNode } from "react";

export default function ApplicationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full font-sans min-w-0">
      <div className="px-4 py-6 sm:px-6 md:px-8 min-w-0">
        <div className="mx-auto w-full max-w-7xl min-w-0">{children}</div>
      </div>
    </div>
  );
}
