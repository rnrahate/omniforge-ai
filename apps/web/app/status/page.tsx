import Link from "next/link";
import { HealthStatus } from "@/features/health/components/health-status";

export default function StatusPage() {
  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <Link className="text-sm font-semibold text-indigo-700 underline underline-offset-4" href="/">
          Back to OmniForge AI
        </Link>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-slate-950">Service status</h1>
        <p className="mt-3 text-slate-600">The status below comes from the local FastAPI health endpoint.</p>
        <div className="mt-8"><HealthStatus /></div>
      </div>
    </main>
  );
}
