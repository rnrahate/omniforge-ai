"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { getHealth, type HealthResponse } from "@/lib/api/client";
import { Badge } from "@/components/ui/badge";

type RequestState =
  | { kind: "loading" }
  | { kind: "available"; health: HealthResponse }
  | { kind: "unavailable" };

export function HealthStatus() {
  const [state, setState] = useState<RequestState>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;

    getHealth()
      .then((health) => {
        if (!cancelled) setState({ kind: "available", health });
      })
      .catch(() => {
        if (!cancelled) setState({ kind: "unavailable" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const label = state.kind === "loading"
    ? "Checking API"
    : state.kind === "available"
      ? `${state.health.service} is available`
      : "API unavailable";

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm" aria-live="polite">
      <Activity className="text-indigo-600" size={20} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="font-medium text-slate-900">Backend connection</p>
        <p className="text-sm text-slate-500">GET /api/health through the typed API client.</p>
      </div>
      <Badge className={state.kind === "unavailable" ? "border-rose-200 bg-rose-50 text-rose-700" : undefined}>
        {label}
      </Badge>
    </div>
  );
}
