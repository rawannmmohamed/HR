import { Activity } from "lucide-react";
import { Badge, Card, CardContent } from "@hr/shared";
import type { AttendanceReviewPanelProps } from "../types";

export function AttendanceReviewPanel({ rows }: AttendanceReviewPanelProps) {
  return (
    <Card className="min-h-60 rounded-[18px] border-border bg-card shadow-xl shadow-black/5 dark:border-white/10 dark:bg-[#141417] dark:shadow-black/20">
      <CardContent className="p-7">
        <div className="flex items-center gap-3">
          <Activity size={20} className="text-muted-foreground dark:text-[#9ca3af]" aria-hidden="true" />
          <h2 className="text-lg font-bold text-foreground dark:text-white">Attendance review</h2>
        </div>
        <div className="mt-6 grid gap-3">
          {rows.map((row) => (
            <div key={row.label} className="rounded-xl border border-border p-4 dark:border-white/10">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">{row.label}</p>
                <Badge variant={row.tone}>{row.value}</Badge>
              </div>
              <p className="mt-2 text-sm font-medium text-foreground dark:text-white">{row.note}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
