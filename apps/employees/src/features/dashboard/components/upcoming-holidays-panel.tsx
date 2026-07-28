import { CalendarCheck, PartyPopper, Plus, Sparkles } from "lucide-react";
import { Button, Card, CardContent } from "@hr/shared";

type UpcomingHolidaysPanelProps = {
  variant: "time-off" | "holidays";
};

export function UpcomingHolidaysPanel({ variant }: UpcomingHolidaysPanelProps) {
  const isTimeOff = variant === "time-off";
  const Icon = isTimeOff ? CalendarCheck : PartyPopper;

  return (
    <Card className="min-h-80 rounded-[18px] border-border bg-card shadow-xl shadow-black/5 dark:border-white/10 dark:bg-[#141417] dark:shadow-black/20">
      <CardContent className="flex h-full flex-col p-7">
        <div className="flex items-center gap-3">
          <Icon size={20} className="text-muted-foreground dark:text-[#9ca3af]" aria-hidden="true" />
          <h2 className="text-lg font-bold text-foreground dark:text-white">{isTimeOff ? "Your next time off" : "Upcoming holidays"}</h2>
        </div>

        <div className="flex flex-1 items-center justify-center text-center">
          {isTimeOff ? (
            <div>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-[#241f55] dark:text-[#7667ff]">
                <Sparkles size={26} aria-hidden="true" />
              </div>
              <p className="mt-5 text-lg font-bold text-foreground dark:text-white">No time off planned</p>
              <p className="mt-1 text-muted-foreground dark:text-[#9ca3af]">Treat yourself to a break.</p>
              <Button className="mt-5 rounded-lg border border-border bg-transparent px-5 text-foreground hover:bg-muted dark:border-white/10 dark:text-white dark:hover:bg-white/5" variant="outline">
                <Plus size={18} aria-hidden="true" />
                Plan time off
              </Button>
            </div>
          ) : (
            <p className="text-lg text-muted-foreground dark:text-[#9ca3af]">No holidays coming up.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
