"use client";

import { Button } from "@/components/ui/button";

type ErrorProps = {
  reset: () => void;
};

export default function ApplicationsError({ reset }: ErrorProps) {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-sans grid place-items-center">
      <div className="max-w-xl w-full text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Something went wrong
        </h1>
        <p className="text-muted-foreground">
          We couldn&apos;t load the applications. You can try again.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </div>
    </div>
  );
}
