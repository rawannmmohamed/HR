import { ArrowRight, Clock3 } from "lucide-react";
import { Card, CardContent } from "@hr/shared";
import type { PendingRequestsPanelProps } from "../types";

export function PendingRequestsPanel({ total }: PendingRequestsPanelProps) {
  return (
    <Card className="min-h-52 rounded-[18px] border-border bg-card shadow-xl shadow-black/5 dark:border-white/10 dark:bg-[#141417] dark:shadow-black/20">
      <CardContent className="flex h-full flex-col p-7">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock3 size={20} className="text-muted-foreground dark:text-[#9ca3af]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-foreground dark:text-white">Pending requests</h2>
          </div>
          <button className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground dark:text-[#9ca3af]" type="button">
            All requests
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center text-center text-lg text-muted-foreground dark:text-[#9ca3af]">
          {total === 0 ? "No pending requests - you're all caught up." : `${total} pending request${total > 1 ? "s" : ""}`}
        </div>
      </CardContent>
    </Card>
  );
}
