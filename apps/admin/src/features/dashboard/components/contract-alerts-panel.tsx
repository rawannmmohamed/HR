import { FileWarning } from "lucide-react";
import { Badge, Button, Card, CardContent } from "@hr/shared";
import type { ContractAlertsPanelProps } from "../types";

export function ContractAlertsPanel({ employees }: ContractAlertsPanelProps) {
  const employeesInReview = employees.filter((employee) => employee.status === "Contract review");

  return (
    <Card className="rounded-[18px] border-border bg-card shadow-xl shadow-black/5 dark:border-white/10 dark:bg-[#141417] dark:shadow-black/20">
      <CardContent className="p-7">
        <div className="flex items-center gap-3">
          <FileWarning size={20} className="text-muted-foreground dark:text-[#9ca3af]" aria-hidden="true" />
          <h2 className="text-lg font-bold text-foreground dark:text-white">Contract alerts</h2>
        </div>

        <div className="mt-6 space-y-3">
          {employeesInReview.map((employee) => (
            <div key={employee.id} className="rounded-xl border border-border bg-rose-50 p-4 dark:border-white/10 dark:bg-rose-950/20">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground dark:text-white">{employee.name}</p>
                  <p className="text-sm text-muted-foreground">{employee.role}</p>
                </div>
                <Badge variant="danger">Due soon</Badge>
              </div>
              <p className="mt-3 text-sm">Contract ends on {employee.contractEnds}</p>
              <Button className="mt-4 w-full" variant="outline">
                Review contract
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
