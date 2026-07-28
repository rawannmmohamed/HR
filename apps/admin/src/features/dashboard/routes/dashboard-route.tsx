import { Plus } from "lucide-react";
import { Button, WorkspaceHero, WorkspaceShell } from "@hr/shared";
import { AdminSummaryCards } from "../components/admin-summary-cards";
import { AttendanceReviewPanel } from "../components/attendance-review-panel";
import { ContractAlertsPanel } from "../components/contract-alerts-panel";
import { EmployeeRecordsPanel } from "../components/employee-records-panel";
import { LeaveApprovalsPanel } from "../components/leave-approvals-panel";
import { adminDashboardNavItems, adminDashboardUser, adminSummaryCards } from "../constants";
import { attendanceRows, employees, leaveRequests } from "../data/dashboard-data";
import type { AdminSummaryCardId } from "../types";

export function DashboardRoute() {
  const pendingLeaveRequests = leaveRequests.filter((request) => request.status === "Pending").length;
  const attendanceExceptions = attendanceRows.filter((row) => row.tone === "warning" || row.tone === "danger").length;
  const expiringContracts = employees.filter((employee) => employee.status === "Contract review").length;
  const summaryValues: Record<AdminSummaryCardId, string> = {
    activeEmployees: String(employees.length),
    leavePending: String(pendingLeaveRequests),
    attendanceExceptions: String(attendanceExceptions),
    contractsExpiring: String(expiringContracts),
  };

  return (
    <WorkspaceShell
      activeItem="Dashboard"
      navItems={adminDashboardNavItems}
      notificationCount={adminDashboardUser.notificationCount}
      subtitle="People operations"
      title="HR System"
      userInitial="H"
      userName={adminDashboardUser.name}
    >
      <WorkspaceHero
        action={
          <Button className="h-14 rounded-lg bg-[#7161ff] px-8 text-base font-semibold text-white hover:bg-[#8274ff]">
            <Plus size={20} aria-hidden="true" />
            Add employee
          </Button>
        }
        dateLabel={adminDashboardUser.dateLabel}
        title="People operations workspace"
      />

      <AdminSummaryCards cards={adminSummaryCards} values={summaryValues} />

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <LeaveApprovalsPanel requests={leaveRequests} />
        <AttendanceReviewPanel rows={attendanceRows} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <EmployeeRecordsPanel employees={employees} />
        <ContractAlertsPanel employees={employees} />
      </div>
    </WorkspaceShell>
  );
}
