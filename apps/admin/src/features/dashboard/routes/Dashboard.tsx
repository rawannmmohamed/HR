import { Plus } from "lucide-react";
import { Button, WorkspaceHero, WorkspaceShell } from "@hr/shared";
import { AdminSummaryCards } from "../components/admin-summary-cards";
import { AttendanceReviewPanel } from "../components/attendance-review-panel";
import { ContractAlertsPanel } from "../components/contract-alerts-panel";
import { DashboardNotice } from "../components/dashboard-notice";
import { EmployeeRecordsPanel } from "../components/employee-records-panel";
import { LeaveApprovalsPanel } from "../components/leave-approvals-panel";
import { adminDashboardNavItems, adminDashboardUser, adminSummaryCards } from "../constants";
import { attendanceRows, employees, leaveRequests } from "../data/dashboard-data";
import { useAdminDashboardQuery } from "../hooks/use-admin-dashboard-query";
import type { AdminSummaryCardId } from "../types";
import { mapContractAlert, mapEmployeeRecord, mapLeaveRequest } from "../utils/dashboard-api-mappers";
import { buildAdminDashboardSearchItems } from "../utils/dashboard-search";

export default function Dashboard() {
  const { data: dashboard, isError, isLoading } = useAdminDashboardQuery();
  const dashboardEmployees = dashboard?.employees.map(mapEmployeeRecord) ?? employees;
  const dashboardLeaveRequests = dashboard?.leaveRequests.map(mapLeaveRequest) ?? leaveRequests;
  const dashboardAttendanceRows = dashboard?.attendanceSummary ?? attendanceRows;
  const dashboardContractAlerts = dashboard?.contractAlerts.map(mapContractAlert) ?? employees.filter((employee) => employee.status === "Contract review");
  const pendingLeaveRequests = dashboard?.summary.leavePending ?? dashboardLeaveRequests.filter((request) => request.status === "Pending").length;
  const expiringContracts = dashboard?.summary.contractsExpiring ?? dashboardContractAlerts.length;
  const summaryValues: Record<AdminSummaryCardId, string> = {
    activeEmployees: String(dashboard?.summary.activeEmployees ?? dashboardEmployees.length),
    leavePending: String(pendingLeaveRequests),
    contractsExpiring: String(expiringContracts),
  };
  const searchItems = buildAdminDashboardSearchItems({
    attendanceRows: dashboardAttendanceRows,
    employees: dashboardEmployees,
    leaveRequests: dashboardLeaveRequests,
    summaryValues,
  });

  return (
    <WorkspaceShell
      activeItem="Dashboard"
      navItems={adminDashboardNavItems}
      notificationCount={adminDashboardUser.notificationCount}
      searchItems={searchItems}
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

      {isLoading ? <DashboardNotice message="Loading dashboard data..." /> : null}
      {isError ? <DashboardNotice message="Backend unavailable. Showing saved dashboard sample data." tone="warning" /> : null}

      <AdminSummaryCards cards={adminSummaryCards} values={summaryValues} />

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <LeaveApprovalsPanel requests={dashboardLeaveRequests} />
        <AttendanceReviewPanel rows={dashboardAttendanceRows} />
      </div>

      <div className="grid min-w-0 gap-6 2xl:grid-cols-[minmax(0,1fr)_minmax(300px,360px)]">
        <EmployeeRecordsPanel employees={dashboardEmployees} />
        <ContractAlertsPanel employees={dashboardContractAlerts} />
      </div>
    </WorkspaceShell>
  );
}
