import { ArrowRight } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@hr/shared";
import type { EmployeeRecordsPanelProps } from "../types";
import { statusVariant } from "../utils/status-variant";

export function EmployeeRecordsPanel({ employees }: EmployeeRecordsPanelProps) {
  return (
    <Card className="min-w-0 overflow-hidden rounded-[18px] border-border bg-card shadow-xl shadow-black/5 dark:border-white/10 dark:bg-[#141417] dark:shadow-black/20">
      <CardContent className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-foreground dark:text-white">Employee records</h2>
          <Button className="shrink-0" variant="ghost" size="sm">
            View directory
            <ArrowRight size={15} aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-5 -mx-5 sm:-mx-7">
          <Table className="min-w-[820px]">
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Leave</TableHead>
                <TableHead>Contract expiry</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => {
                const leaveRemaining = employee.leaveTotal - employee.leaveUsed;
                const leavePercent = (employee.leaveUsed / employee.leaveTotal) * 100;

                return (
                  <TableRow key={employee.id}>
                    <TableCell className="min-w-[210px]">
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {employee.id} - {employee.role}
                      </div>
                    </TableCell>
                    <TableCell className="min-w-[180px]">
                      <div>{employee.department}</div>
                      <div className="text-xs text-muted-foreground">
                        {employee.location} - {employee.manager}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(employee.status)}>{employee.status}</Badge>
                    </TableCell>
                    <TableCell className="min-w-36">
                      <div className="mb-2 flex justify-between gap-3 text-xs">
                        <span>{leaveRemaining} days left</span>
                        <span className="text-muted-foreground">
                          {employee.leaveUsed}/{employee.leaveTotal}
                        </span>
                      </div>
                      <Progress value={leavePercent} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{employee.contractEnds}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
