import { Plus } from "lucide-react";
import { Button, WorkspaceHero, WorkspaceShell } from "@hr/shared";
import { EmployeeSummaryCards } from "../components/employee-summary-cards";
import { LeaveBalanceGrid } from "../components/leave-balance-grid";
import { PendingRequestsPanel } from "../components/pending-requests-panel";
import { UpcomingHolidaysPanel } from "../components/upcoming-holidays-panel";
import { WhosOffTodayPanel } from "../components/whos-off-today-panel";
import { employeeDashboardNavItems, employeeDashboardUser, employeeSummaryCards, leaveBalances, peopleOffToday } from "../constants";

export function DashboardRoute() {
  return (
    <WorkspaceShell
      activeItem="Dashboard"
      navItems={employeeDashboardNavItems}
      notificationCount={employeeDashboardUser.notificationCount}
      subtitle="People operations"
      title="HR System"
      userInitial="R"
      userName={employeeDashboardUser.name}
    >
      <WorkspaceHero
        action={
          <Button className="h-14 rounded-lg bg-[#7161ff] px-8 text-base font-semibold text-white hover:bg-[#8274ff]">
            <Plus size={20} aria-hidden="true" />
            Request PTO
          </Button>
        }
        dateLabel={employeeDashboardUser.dateLabel}
        title={`Good afternoon, ${employeeDashboardUser.name}`}
      />
      <EmployeeSummaryCards cards={employeeSummaryCards} />
      <LeaveBalanceGrid balances={leaveBalances} />

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <PendingRequestsPanel total={0} />
        <WhosOffTodayPanel people={peopleOffToday} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <UpcomingHolidaysPanel variant="time-off" />
        <UpcomingHolidaysPanel variant="holidays" />
      </div>
    </WorkspaceShell>
  );
}
