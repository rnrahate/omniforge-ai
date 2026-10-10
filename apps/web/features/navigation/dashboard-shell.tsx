"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  FolderKanban,
  LayoutDashboard,
  Menu,
  Palette,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/home", label: "Home", icon: LayoutDashboard },
  { href: "/studio", label: "Create Studio", icon: WandSparkles },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/brand-kit", label: "Brand Kit", icon: Palette },
  { href: "/calendar", label: "Content Calendar", icon: CalendarDays },
  { href: "/insights", label: "Insights", icon: BarChart3 },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = (mobile = false) => (
    <nav aria-label="Product navigation" className="space-y-1">
      {navigation.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={() => mobile && setIsOpen(false)}
            className={cn(
              "group flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition",
              isActive
                ? "bg-violet-500/15 text-white ring-1 ring-inset ring-violet-400/25"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-100",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon size={18} aria-hidden="true" className={isActive ? "text-cyan-300" : "text-slate-500 group-hover:text-slate-300"} />
            {label}
            {isActive && <ChevronRight size={15} aria-hidden="true" className="ml-auto text-cyan-300" />}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-[100dvh] bg-[#070a12] text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-white/7 bg-[#0a0e19] p-4 md:flex md:flex-col">
        <Brand />
        <div className="mt-9">{navItems()}</div>
        <div className="mt-auto rounded-2xl border border-cyan-300/10 bg-gradient-to-br from-cyan-300/8 to-violet-500/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">Prototype mode</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">Generation actions use local mock data only.</p>
        </div>
      </aside>

      <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between border-b border-white/7 bg-[#070a12]/90 px-4 backdrop-blur md:ml-64 md:px-8">
        <div className="md:hidden"><Brand compact /></div>
        <p className="hidden text-sm text-slate-400 sm:block">Creative operations, composed.</p>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden text-right sm:block"><p className="text-sm font-medium text-slate-200">Avery Morgan</p><p className="text-xs text-slate-500">Northstar Studio</p></div>
          <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-violet-500 text-xs font-bold text-slate-950">AM</div>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-100 md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {isOpen && (
        <div id="mobile-navigation" className="fixed inset-x-0 top-16 z-30 border-b border-white/10 bg-[#0a0e19] p-4 shadow-2xl md:hidden">
          {navItems(true)}
        </div>
      )}

      <main className="md:ml-64">{children}</main>
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/home" className="flex min-h-11 items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-violet-400 to-cyan-300 text-slate-950"><Sparkles size={18} aria-hidden="true" /></span>
      {!compact && <span className="font-semibold tracking-tight text-white">OmniForge<span className="text-cyan-300">.ai</span></span>}
    </Link>
  );
}
