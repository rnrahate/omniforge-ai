import Link from "next/link";
import { Boxes, Braces, HeartPulse } from "lucide-react";
import { Card } from "@/components/ui/card";
import { HealthStatus } from "@/features/health/components/health-status";

const foundationItems = [
  { icon: Boxes, title: "App Router foundation", description: "Routes, reusable UI primitives, feature modules, and typed utilities are ready to grow." },
  { icon: Braces, title: "Typed API boundary", description: "The browser calls the FastAPI service through NEXT_PUBLIC_API_BASE_URL, not hardcoded hosts." },
  { icon: HeartPulse, title: "Verified health path", description: "A live backend health check makes the first integration visible without a placeholder action." },
];

export default function Home() {
  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between border-b border-slate-200 pb-5">
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-950">OmniForge AI</p>
            <p className="text-sm text-slate-500">SaaS application foundation</p>
          </div>
          <Link className="text-sm font-semibold text-indigo-700 underline underline-offset-4" href="/status">
            Service status
          </Link>
        </header>

        <section className="grid gap-8 py-14 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="text-sm font-semibold tracking-wider text-indigo-600">FIRST MILESTONE</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              A clean platform foundation for OmniForge AI.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              This scaffold connects a typed Next.js frontend to FastAPI. AI, authentication, and database features are intentionally deferred.
            </p>
          </div>
          <HealthStatus />
        </section>

        <section aria-labelledby="foundation-heading">
          <h2 id="foundation-heading" className="text-xl font-semibold text-slate-950">Included now</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {foundationItems.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <Icon className="text-indigo-600" size={22} aria-hidden="true" />
                <h3 className="mt-4 font-semibold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
