import { FileText, Layers3, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const previewJobs = [
  { title: "Product launch narrative", channel: "LinkedIn", state: "Draft ready", updated: "8m ago" },
  { title: "Founder perspective thread", channel: "X", state: "In review", updated: "32m ago" },
  { title: "October editorial brief", channel: "Blog", state: "Briefing", updated: "1h ago" },
];

export default function Home() {
  return (
    <main className="min-h-screen p-5 sm:p-8">
      <section className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-white"><Sparkles size={20} /></div>
            <div>
              <p className="font-semibold tracking-tight">OmniForge AI</p>
              <p className="text-sm text-slate-500">Content intelligence workspace</p>
            </div>
          </div>
          <Badge>UI preview</Badge>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <section>
            <p className="text-sm font-semibold text-indigo-600">WORKSPACE OVERVIEW</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              One source of truth for your brand voice.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Shape multi-platform content from approved brand context, with every draft and source document kept in its workspace.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Stat icon={<Layers3 size={18} />} label="Active drafts" value="12" />
              <Stat icon={<FileText size={18} />} label="Source documents" value="28" />
              <Stat icon={<Sparkles size={18} />} label="Voice signals" value="6" />
            </div>
          </section>

          <aside className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <Badge className="border-white bg-white">First milestone</Badge>
            <h2 className="mt-4 text-xl font-semibold text-slate-950">A real foundation, deliberately unfinished.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This view uses clearly labelled preview data while authenticated workspaces, document processing, and generation flows are connected.
            </p>
            <p className="mt-5 text-sm font-semibold text-indigo-700">API-ready architecture is documented in this repository.</p>
          </aside>
        </div>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold">Recent content work</h2>
              <p className="mt-1 text-sm text-slate-500">Preview fixtures — these jobs are not yet persisted.</p>
            </div>
          </div>
          <ul className="divide-y divide-slate-100" aria-label="Preview content jobs">
            {previewJobs.map((job) => (
              <li key={job.title} className="flex items-center justify-between gap-4 px-6 py-5">
                <div>
                  <p className="font-medium text-slate-900">{job.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{job.channel} · {job.updated}</p>
                </div>
                <Badge className="shrink-0 border-slate-200 bg-slate-50 text-slate-700">{job.state}</Badge>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-slate-500">{icon}<span className="text-sm">{label}</span></div>
      <p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}
