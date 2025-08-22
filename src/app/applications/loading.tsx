import { Spinner } from "@/components/ui/loading-spinner";

export default function LoadingApplications() {
  return (
    <div
      className="min-h-screen p-8 pb-20 sm:p-20 font-sans grid place-items-center"
      aria-busy
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <Spinner variant="circle" className="text-primary" size={40} />
      </div>
    </div>
  );
}
