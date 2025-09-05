import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProtectedNotFound() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-sans grid place-items-center">
      <div className="max-w-xl w-full text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">Not found</h1>
        <p className="text-muted-foreground">
          We couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button asChild>
            <Link href="/">Go to dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
