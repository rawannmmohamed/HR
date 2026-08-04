import { Plus } from "lucide-react";
import { Button, getAuthUserDisplayName, getAuthUserInitial, WorkspaceHero, WorkspaceShell } from "@hr/shared";
import { DashboardNotice } from "../components/dashboard-notice";
import { EmployeeSummaryCards } from "../components/employee-summary-cards";
import { LeaveBalanceGrid } from "../components/leave-balance-grid";
import { PendingRequestsPanel } from "../components/pending-requests-panel";
import { UpcomingHolidaysPanel } from "../components/upcoming-holidays-panel";
import { WhosOffTodayPanel } from "../components/whos-off-today-panel";
import { useLogout } from "../../auth/hooks/use-logout";
import { useAuthStore } from "../../auth/store/auth-store";
import { employeeDashboardNavItems, employeeDashboardUser, employeeSummaryCards, leaveBalances, peopleOffToday } from "../constants";
import { useEmployeeDashboardQuery } from "../hooks/use-employee-dashboard-query";
import { mapLeaveBalance, mapPersonOffToday, mapSummaryCards } from "../utils/dashboard-api-mappers";
import { buildEmployeeDashboardSearchItems } from "../utils/dashboard-search";

export default function Dashboard() {
  const authUser = useAuthStore((state) => state.user);
  const logout = useLogout();
  const { data: dashboard, isError, isLoading } = useEmployeeDashboardQuery();
  const dashboardSummaryCards = dashboard ? mapSummaryCards(dashboard.summary) : employeeSummaryCards;
  const dashboardLeaveBalances = dashboard?.leaveBalances.map(mapLeaveBalance) ?? leaveBalances;
  const dashboardPeopleOffToday = dashboard?.peopleOffToday.map(mapPersonOffToday) ?? peopleOffToday;
  const pendingRequestsTotal = dashboard?.pendingRequestsTotal ?? 0;
  const employeeName = dashboard?.name ?? getAuthUserDisplayName(authUser, employeeDashboardUser.name);
  const userInitial = getAuthUserInitial(authUser, "R");
  const searchItems = buildEmployeeDashboardSearchItems({
    leaveBalances: dashboardLeaveBalances,
    peopleOffToday: dashboardPeopleOffToday,
    summaryCards: dashboardSummaryCards,
  });

  return (
    <WorkspaceShell
      activeItem="Dashboard"
      navItems={employeeDashboardNavItems}
      notificationCount={employeeDashboardUser.notificationCount}
      onLogout={logout}
      searchItems={searchItems}
      subtitle="People operations"
      title="HR System"
      userInitial={userInitial}
      userName={employeeName}
    >
      <WorkspaceHero
        action={
          <Button className="h-14 rounded-lg bg-[#7161ff] px-8 text-base font-semibold text-white hover:bg-[#8274ff]">
            <Plus size={20} aria-hidden="true" />
            Request PTO
          </Button>
        }
        dateLabel={employeeDashboardUser.dateLabel}
        title={`Good afternoon, ${employeeName}`}
      />

      {isLoading ? <DashboardNotice message="Loading dashboard data..." /> : null}
      {isError ? <DashboardNotice message="Backend unavailable. Showing saved dashboard sample data." tone="warning" /> : null}

      <EmployeeSummaryCards cards={dashboardSummaryCards} />
      <LeaveBalanceGrid balances={dashboardLeaveBalances} />

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <PendingRequestsPanel total={pendingRequestsTotal} />
        <WhosOffTodayPanel people={dashboardPeopleOffToday} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <UpcomingHolidaysPanel variant="time-off" />
        <UpcomingHolidaysPanel variant="holidays" />
      </div>
    </WorkspaceShell>
  );
}
