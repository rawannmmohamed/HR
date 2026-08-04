import { Outlet } from "react-router";
import { ThemeToggle, WorkspaceBrandMark } from "@hr/shared";

export default function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10 text-foreground dark:bg-[#09090b] dark:text-white">
      <div className="relative grid w-full max-w-[1040px] overflow-hidden rounded-lg border border-border bg-card shadow-xl dark:border-white/10 dark:bg-[#111114] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="absolute right-4 top-4 z-10">
          <ThemeToggle />
        </div>
        <section className="hidden border-r border-border bg-muted/50 p-10 dark:border-white/10 dark:bg-white/[0.03] lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <WorkspaceBrandMark />
            <div>
              <p className="text-lg font-semibold">HR System</p>
              <p className="text-sm text-muted-foreground dark:text-[#9ca3af]">People operations</p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="max-w-sm text-3xl font-semibold leading-tight">A focused workspace for HR operations.</p>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground dark:text-[#a7adbd]">
              Keep leave approvals, employee records, attendance, and contracts in one secure place.
            </p>
          </div>
        </section>
        <Outlet />
      </div>
    </main>
  );
}
