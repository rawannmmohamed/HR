import { Card, CardContent, cn } from "@hr/shared";
import type { AdminSummaryCardsProps } from "../types";

const toneClassNames = {
  violet: "bg-primary/10 text-primary dark:bg-[#251d4d] dark:text-[#7868ff]",
  amber: "bg-amber-100 text-amber-700 dark:bg-[#302413] dark:text-[#f7ad2b]",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-[#0c2a1a] dark:text-[#18d270]",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300",
};

export function AdminSummaryCards({ cards, values }: AdminSummaryCardsProps) {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.id} className="rounded-[18px] border-border bg-card shadow-xl shadow-black/5 dark:border-white/10 dark:bg-[#141417] dark:shadow-black/20">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", toneClassNames[card.tone])}>
                <Icon size={22} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground dark:text-[#9ca3af]">{card.label}</p>
                <p className="mt-1 text-3xl font-bold text-foreground dark:text-white">{values[card.id]}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
