import { Card, CardContent } from "@hr/shared";

type DashboardNoticeProps = {
  message: string;
  tone?: "default" | "warning";
};

export function DashboardNotice({ message, tone = "default" }: DashboardNoticeProps) {
  return (
    <Card className="rounded-lg border-border bg-card dark:border-white/10 dark:bg-[#141417]">
      <CardContent className={tone === "warning" ? "p-4 text-sm font-medium text-amber-600 dark:text-amber-300" : "p-4 text-sm font-medium text-muted-foreground"}>
        {message}
      </CardContent>
    </Card>
  );
}
