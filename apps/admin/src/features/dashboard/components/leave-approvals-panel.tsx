import { ArrowRight, Check, Clock3, X } from "lucide-react";
import { Badge, Button, Card, CardContent } from "@hr/shared";
import type { LeaveApprovalsPanelProps } from "../types";
import { statusVariant } from "../utils/status-variant";

export function LeaveApprovalsPanel({ requests }: LeaveApprovalsPanelProps) {
  return (
    <Card className="min-h-60 rounded-[18px] border-border bg-card shadow-xl shadow-black/5 dark:border-white/10 dark:bg-[#141417] dark:shadow-black/20">
      <CardContent className="p-7">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock3 size={20} className="text-muted-foreground dark:text-[#9ca3af]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-foreground dark:text-white">Leave approvals</h2>
          </div>
          <button className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground dark:text-[#9ca3af]" type="button">
            All requests
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {requests.map((request) => (
            <div key={request.id} className="grid gap-3 rounded-xl border border-border bg-background/70 p-4 md:grid-cols-[1fr_auto] md:items-center dark:border-white/10 dark:bg-white/[0.03]">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-foreground dark:text-white">{request.employee}</p>
                  <Badge variant={statusVariant(request.status)}>{request.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {request.type} - {request.dates} - {request.days} day{request.days > 1 ? "s" : ""}
                </p>
                <p className="mt-2 text-sm">Balance after approval: {request.balanceAfter} days</p>
              </div>
              <div className="flex gap-2">
                <Button aria-label={`Approve ${request.employee} leave request`} size="icon" disabled={request.status !== "Pending"}>
                  <Check size={16} aria-hidden="true" />
                </Button>
                <Button aria-label={`Reject ${request.employee} leave request`} variant="outline" size="icon" disabled={request.status !== "Pending"}>
                  <X size={16} aria-hidden="true" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
