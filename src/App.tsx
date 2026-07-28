import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock3,
  FileWarning,
  LayoutDashboard,
  ListFilter,
  Search,
  ShieldCheck,
  UserPlus,
  UsersRound,
  X,
} from "lucide-react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Progress } from "./components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { cn } from "./lib/utils";

type EmployeeStatus = "Active" | "Probation" | "Contract review";
type LeaveStatus = "Pending" | "Approved" | "Rejected";

type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  manager: string;
  status: EmployeeStatus;
  leaveUsed: number;
  leaveTotal: number;
  contractEnds: string;
};

type LeaveRequest = {
  id: string;
  employee: string;
  type: string;
  dates: string;
  days: number;
  balanceAfter: number;
  status: LeaveStatus;
};

const employees: Employee[] = [
  {
    id: "EMP-1042",
    name: "Nour Hassan",
    role: "People Operations Lead",
    department: "HR",
    location: "Cairo",
    manager: "Rana Youssef",
    status: "Active",
    leaveUsed: 8,
    leaveTotal: 21,
    contractEnds: "2027-05-31",
  },
  {
    id: "EMP-1087",
    name: "Omar Nabil",
    role: "Frontend Engineer",
    department: "Product",
    location: "Alexandria",
    manager: "Karim Adel",
    status: "Active",
    leaveUsed: 14,
    leaveTotal: 21,
    contractEnds: "2026-11-18",
  },
  {
    id: "EMP-1120",
    name: "Mariam Samir",
    role: "Account Executive",
    department: "Sales",
    location: "Dubai",
    manager: "Lina Maher",
    status: "Contract review",
    leaveUsed: 17,
    leaveTotal: 21,
    contractEnds: "2026-08-14",
  },
  {
    id: "EMP-1184",
    name: "Youssef Galal",
    role: "QA Analyst",
    department: "Delivery",
    location: "Remote",
    manager: "Karim Adel",
    status: "Probation",
    leaveUsed: 3,
    leaveTotal: 15,
    contractEnds: "2027-01-10",
  },
];

const leaveRequests: LeaveRequest[] = [
  {
    id: "LR-2301",
    employee: "Omar Nabil",
    type: "Annual leave",
    dates: "Aug 4 - Aug 7",
    days: 4,
    balanceAfter: 3,
    status: "Pending",
  },
  {
    id: "LR-2302",
    employee: "Mariam Samir",
    type: "Emergency leave",
    dates: "Jul 30",
    days: 1,
    balanceAfter: 3,
    status: "Pending",
  },
  {
    id: "LR-2303",
    employee: "Youssef Galal",
    type: "Sick leave",
    dates: "Jul 28",
    days: 1,
    balanceAfter: 11,
    status: "Approved",
  },
];

const attendanceRows = [
  { label: "Present today", value: 42, note: "92% of active staff", tone: "success" },
  { label: "Late check-ins", value: 3, note: "Needs HR review", tone: "warning" },
  { label: "Remote today", value: 11, note: "Across 4 departments", tone: "default" },
  { label: "Missing checkout", value: 2, note: "Auto reminder queued", tone: "danger" },
];

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Employees", icon: UsersRound },
  { label: "Attendance", icon: Clock3 },
  { label: "Leave", icon: CalendarCheck },
  { label: "Contracts", icon: FileWarning },
];

function statusVariant(status: EmployeeStatus | LeaveStatus) {
  if (status === "Active" || status === "Approved") return "success";
  if (status === "Pending" || status === "Probation") return "warning";
  if (status === "Rejected" || status === "Contract review") return "danger";
  return "default";
}

function App() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [query, setQuery] = useState("");

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) =>
      [employee.name, employee.role, employee.department, employee.location, employee.id]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }, [query]);

  const totalLeaveRemaining = employees.reduce((total, employee) => total + employee.leaveTotal - employee.leaveUsed, 0);
  const expiringContracts = employees.filter((employee) => employee.status === "Contract review").length;

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-lg border border-border bg-card px-4 py-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BriefcaseBusiness size={22} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">BitBang HR</p>
              <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">People operations workspace</h1>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-0 sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                aria-label="Search employees"
                className="pl-9"
                placeholder="Search employee info"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <Button>
              <UserPlus size={16} aria-hidden="true" />
              Add employee
            </Button>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[236px_1fr]">
          <aside className="rounded-lg border border-border bg-card p-3 shadow-sm lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
            <nav aria-label="Main navigation" className="flex gap-2 overflow-auto lg:flex-col">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.label;

                return (
                  <button
                    key={item.label}
                    className={cn(
                      "flex h-10 shrink-0 items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition-colors",
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                    type="button"
                    onClick={() => setActiveNav(item.label)}
                  >
                    <Icon size={17} aria-hidden="true" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-5 hidden rounded-md bg-secondary p-4 lg:block">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <ShieldCheck size={17} aria-hidden="true" />
                HR Admin view
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Leave approvals, balances, attendance exceptions, and contract alerts are grouped for daily HR work.
              </p>
            </div>
          </aside>

          <section className="flex min-w-0 flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="Active employees" value="48" detail="+4 this quarter" icon={UsersRound} />
              <MetricCard label="Leave pending" value="2" detail="Awaiting HR approval" icon={CalendarCheck} />
              <MetricCard label="Leave balance" value={`${totalLeaveRemaining}d`} detail="Available across team" icon={Clock3} />
              <MetricCard label="Contracts expiring" value={String(expiringContracts)} detail="Next 45 days" icon={FileWarning} />
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
              <Card>
                <CardHeader className="flex-row items-center justify-between gap-3">
                  <div>
                    <CardTitle>Leave approval queue</CardTitle>
                    <CardDescription>Employee requests HR can approve while tracking remaining balance.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <ListFilter size={15} aria-hidden="true" />
                    Filter
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaveRequests.map((request) => (
                      <div
                        key={request.id}
                        className="grid gap-3 rounded-md border border-border bg-background/70 p-4 md:grid-cols-[1fr_auto] md:items-center"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold">{request.employee}</p>
                            <Badge variant={statusVariant(request.status)}>{request.status}</Badge>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {request.type} · {request.dates} · {request.days} day{request.days > 1 ? "s" : ""}
                          </p>
                          <p className="mt-2 text-sm">Balance after approval: {request.balanceAfter} days</p>
                        </div>
                        <div className="flex gap-2">
                          <Button aria-label={`Approve ${request.employee} leave request`} size="icon" disabled={request.status !== "Pending"}>
                            <Check size={16} aria-hidden="true" />
                          </Button>
                          <Button
                            aria-label={`Reject ${request.employee} leave request`}
                            variant="outline"
                            size="icon"
                            disabled={request.status !== "Pending"}
                          >
                            <X size={16} aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Attendance summary</CardTitle>
                  <CardDescription>Today’s attendance signals for HR review.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  {attendanceRows.map((row) => (
                    <div key={row.label} className="rounded-md border border-border p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm text-muted-foreground">{row.label}</p>
                        <Badge variant={row.tone as "success" | "warning" | "danger" | "default"}>{row.value}</Badge>
                      </div>
                      <p className="mt-2 text-sm font-medium">{row.note}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
              <Card>
                <CardHeader className="flex-row items-center justify-between gap-3">
                  <div>
                    <CardTitle>Employee information</CardTitle>
                    <CardDescription>Core employee records, department, manager, leave usage, and contract dates.</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    Export
                    <ChevronDown size={15} aria-hidden="true" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
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
                      {filteredEmployees.map((employee) => {
                        const leaveRemaining = employee.leaveTotal - employee.leaveUsed;
                        const leavePercent = (employee.leaveUsed / employee.leaveTotal) * 100;

                        return (
                          <TableRow key={employee.id}>
                            <TableCell>
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {employee.id} · {employee.role}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>{employee.department}</div>
                              <div className="text-xs text-muted-foreground">
                                {employee.location} · {employee.manager}
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
                            <TableCell>{employee.contractEnds}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contract expiry</CardTitle>
                  <CardDescription>Documents that need attention before renewal windows close.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {employees
                    .filter((employee) => employee.status === "Contract review")
                    .map((employee) => (
                      <div key={employee.id} className="rounded-md border border-border bg-rose-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold">{employee.name}</p>
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
                  <div className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
                    Future API fields: contract file, renewal owner, notice period, signed date, and document status.
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-4 p-5">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
          <Icon size={20} aria-hidden="true" />
        </div>
      </CardContent>
    </Card>
  );
}

export default App;
