export type AdminDashboardResponse = {
  summary: {
    activeEmployees: number;
    leavePending: number;
    contractsExpiring: number;
  };
  leaveRequests: AdminLeaveRequestResponse[];
  attendanceSummary: AdminAttendanceSummaryResponse[];
  employees: AdminEmployeeRecordResponse[];
  contractAlerts: AdminContractAlertResponse[];
};

export type AdminLeaveRequestResponse = {
  id: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  requestedDays: number;
  balanceAfterApproval: number;
  status: string;
};

export type AdminAttendanceSummaryResponse = {
  label: string;
  value: number;
  note: string;
  tone: "default" | "success" | "warning" | "danger";
};

export type AdminEmployeeRecordResponse = {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  manager: string;
  status: string;
  leaveUsed: number;
  leaveTotal: number;
  contractEnds: string;
};

export type AdminContractAlertResponse = {
  employeeId: string;
  employeeName: string;
  role: string;
  contractEnds: string;
  status: string;
};
