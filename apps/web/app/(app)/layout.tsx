import { DashboardShell } from "@/features/navigation/dashboard-shell";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DashboardShell>{children}</DashboardShell>;
}
