import { ArrowRight, UsersRound } from "lucide-react";
import { Card, CardContent } from "@hr/shared";
import type { WhosOffTodayPanelProps } from "../types";

export function WhosOffTodayPanel({ people }: WhosOffTodayPanelProps) {
  return (
    <Card className="min-h-52 rounded-[18px] border-border bg-card shadow-xl shadow-black/5 dark:border-white/10 dark:bg-[#141417] dark:shadow-black/20">
      <CardContent className="p-7">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <UsersRound size={20} className="text-muted-foreground dark:text-[#9ca3af]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-foreground dark:text-white">Who's off today</h2>
          </div>
          <button className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground dark:text-[#9ca3af]" type="button">
            View all
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-7 space-y-4">
          {people.map((person) => (
            <div key={person.name} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8c0a3] text-xs font-bold text-[#3a2a18]">{person.initials}</div>
                <p className="font-semibold text-foreground dark:text-white">{person.name}</p>
              </div>
              <p className="text-sm text-muted-foreground dark:text-[#9ca3af]">{person.returnDate}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
