import { Card, CardContent, Progress, cn } from "@hr/shared";
import type { LeaveBalanceGridProps } from "../types";

export function LeaveBalanceGrid({ balances }: LeaveBalanceGridProps) {
  return (
    <section>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground dark:text-[#8d92a3]">Leave Balances</h2>
      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        {balances.map((balance) => (
          <Card key={balance.label} className="rounded-[18px] border-border bg-card shadow-xl shadow-black/5 dark:border-white/10 dark:bg-[#141417] dark:shadow-black/20">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className={cn("h-3 w-3 shrink-0 rounded-full ring-2 ring-border dark:ring-white/30", balance.accentClassName)} />
                  <p className="truncate text-lg font-bold text-foreground dark:text-white">{balance.label}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-muted-foreground dark:text-[#9ca3af]">
                  {balance.policyCap ? <span className="rounded bg-muted px-2 py-1 text-xs uppercase tracking-wide dark:bg-white/7">{balance.policyCap}</span> : null}
                  <span>{balance.usage}</span>
                </div>
              </div>

              <div className="mt-5 flex items-end gap-2">
                <p className="text-4xl font-bold leading-none text-foreground dark:text-white">{balance.value}</p>
                <p className="text-base text-muted-foreground dark:text-[#9ca3af]">{balance.details}</p>
              </div>
              <Progress className="mt-5 bg-muted dark:bg-white/8" value={balance.progress} />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
