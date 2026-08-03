using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HR.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialHrData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "Id", "Code", "CreatedAtUtc", "Name", "UpdatedAtUtc" },
                values: new object[,]
                {
                    { new Guid("10000000-0000-0000-0000-000000000001"), "HR", new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), "HR", null },
                    { new Guid("10000000-0000-0000-0000-000000000002"), "PRODUCT", new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), "Product", null },
                    { new Guid("10000000-0000-0000-0000-000000000003"), "SALES", new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), "Sales", null },
                    { new Guid("10000000-0000-0000-0000-000000000004"), "DELIVERY", new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), "Delivery", null }
                });

            migrationBuilder.InsertData(
                table: "LeaveTypes",
                columns: new[] { "Id", "AnnualAllowanceDays", "Code", "CreatedAtUtc", "IsPaid", "Name", "RequiresApproval", "UpdatedAtUtc" },
                values: new object[,]
                {
                    { new Guid("30000000-0000-0000-0000-000000000001"), 21m, "ANNUAL", new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), true, "Annual Leave", true, null },
                    { new Guid("30000000-0000-0000-0000-000000000002"), 10m, "SICK", new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), true, "Sick Leave", true, null },
                    { new Guid("30000000-0000-0000-0000-000000000003"), 5m, "CASUAL", new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), true, "Casual Leave", true, null },
                    { new Guid("30000000-0000-0000-0000-000000000004"), 3m, "COMPASSIONATE", new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), true, "Compassionate Leave", true, null },
                    { new Guid("30000000-0000-0000-0000-000000000005"), 3m, "EMERGENCY", new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), true, "Emergency Leave", true, null },
                    { new Guid("30000000-0000-0000-0000-000000000006"), 5m, "MARRIAGE", new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), true, "Marriage Leave", true, null }
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "CreatedAtUtc", "DepartmentId", "Email", "EmployeeNumber", "FirstName", "HireDate", "JobTitle", "LastName", "Location", "ManagerId", "Status", "UpdatedAtUtc" },
                values: new object[,]
                {
                    { new Guid("20000000-0000-0000-0000-000000000001"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("10000000-0000-0000-0000-000000000002"), "rawan.elkhodary@hrsystem.local", "EMP-1001", "Rawan", new DateOnly(2024, 1, 15), "Product Designer", "ElKhodary", "Cairo", null, "Active", null },
                    { new Guid("20000000-0000-0000-0000-000000000002"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("10000000-0000-0000-0000-000000000001"), "rana.youssef@hrsystem.local", "EMP-1010", "Rana", new DateOnly(2022, 3, 1), "HR Manager", "Youssef", "Cairo", null, "Active", null },
                    { new Guid("20000000-0000-0000-0000-000000000003"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("10000000-0000-0000-0000-000000000002"), "karim.adel@hrsystem.local", "EMP-1020", "Karim", new DateOnly(2021, 11, 7), "Product Manager", "Adel", "Cairo", null, "Active", null },
                    { new Guid("20000000-0000-0000-0000-000000000004"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("10000000-0000-0000-0000-000000000003"), "lina.maher@hrsystem.local", "EMP-1030", "Lina", new DateOnly(2021, 6, 14), "Sales Manager", "Maher", "Dubai", null, "Active", null },
                    { new Guid("20000000-0000-0000-0000-000000000005"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("10000000-0000-0000-0000-000000000001"), "nour.hassan@hrsystem.local", "EMP-1042", "Nour", new DateOnly(2023, 2, 5), "People Operations Lead", "Hassan", "Cairo", new Guid("20000000-0000-0000-0000-000000000002"), "Active", null },
                    { new Guid("20000000-0000-0000-0000-000000000006"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("10000000-0000-0000-0000-000000000002"), "omar.nabil@hrsystem.local", "EMP-1087", "Omar", new DateOnly(2024, 4, 8), "Frontend Engineer", "Nabil", "Alexandria", new Guid("20000000-0000-0000-0000-000000000003"), "Active", null },
                    { new Guid("20000000-0000-0000-0000-000000000007"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("10000000-0000-0000-0000-000000000003"), "mariam.samir@hrsystem.local", "EMP-1120", "Mariam", new DateOnly(2023, 8, 14), "Account Executive", "Samir", "Dubai", new Guid("20000000-0000-0000-0000-000000000004"), "ContractReview", null },
                    { new Guid("20000000-0000-0000-0000-000000000008"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("10000000-0000-0000-0000-000000000004"), "youssef.galal@hrsystem.local", "EMP-1184", "Youssef", new DateOnly(2026, 4, 1), "QA Analyst", "Galal", "Remote", new Guid("20000000-0000-0000-0000-000000000003"), "Probation", null },
                    { new Guid("20000000-0000-0000-0000-000000000009"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("10000000-0000-0000-0000-000000000002"), "ahmed.mohamed@hrsystem.local", "EMP-1190", "Ahmed", new DateOnly(2024, 9, 9), "Backend Engineer", "Mohamed", "Cairo", new Guid("20000000-0000-0000-0000-000000000003"), "Active", null }
                });

            migrationBuilder.InsertData(
                table: "LeaveBalances",
                columns: new[] { "Id", "CreatedAtUtc", "EmployeeId", "EntitledDays", "LeaveTypeId", "PendingDays", "UpdatedAtUtc", "UsedDays", "Year" },
                values: new object[,]
                {
                    { new Guid("40000000-0000-0000-0000-000000000001"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000001"), 8.5m, new Guid("30000000-0000-0000-0000-000000000001"), 0m, null, 0m, 2026 },
                    { new Guid("40000000-0000-0000-0000-000000000002"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000001"), 3m, new Guid("30000000-0000-0000-0000-000000000002"), 0m, null, 1m, 2026 },
                    { new Guid("40000000-0000-0000-0000-000000000003"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000001"), 5m, new Guid("30000000-0000-0000-0000-000000000003"), 0m, null, 0m, 2026 },
                    { new Guid("40000000-0000-0000-0000-000000000004"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000001"), 3m, new Guid("30000000-0000-0000-0000-000000000004"), 0m, null, 0m, 2026 },
                    { new Guid("40000000-0000-0000-0000-000000000005"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000001"), 3m, new Guid("30000000-0000-0000-0000-000000000005"), 0m, null, 0m, 2026 },
                    { new Guid("40000000-0000-0000-0000-000000000006"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000001"), 5m, new Guid("30000000-0000-0000-0000-000000000006"), 0m, null, 0m, 2026 }
                });

            migrationBuilder.InsertData(
                table: "AttendanceRecords",
                columns: new[] { "Id", "CheckInTime", "CheckOutTime", "CreatedAtUtc", "EmployeeId", "Notes", "Status", "UpdatedAtUtc", "WorkDate" },
                values: new object[,]
                {
                    { new Guid("60000000-0000-0000-0000-000000000001"), new TimeOnly(8, 57, 0), new TimeOnly(17, 8, 0), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000005"), null, "Present", null, new DateOnly(2026, 7, 28) },
                    { new Guid("60000000-0000-0000-0000-000000000002"), new TimeOnly(9, 24, 0), new TimeOnly(17, 3, 0), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000006"), "Needs HR review", "Late", null, new DateOnly(2026, 7, 28) },
                    { new Guid("60000000-0000-0000-0000-000000000003"), new TimeOnly(9, 5, 0), null, new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000007"), "Auto reminder queued", "MissingCheckout", null, new DateOnly(2026, 7, 28) },
                    { new Guid("60000000-0000-0000-0000-000000000004"), new TimeOnly(9, 0, 0), new TimeOnly(17, 0, 0), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000008"), "Remote today", "Remote", null, new DateOnly(2026, 7, 28) },
                    { new Guid("60000000-0000-0000-0000-000000000005"), null, null, new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000009"), "Time off, back Aug 31, 2026", "Absent", null, new DateOnly(2026, 7, 28) }
                });

            migrationBuilder.InsertData(
                table: "Contracts",
                columns: new[] { "Id", "CreatedAtUtc", "EmployeeId", "EndDate", "Notes", "ReviewedAtUtc", "StartDate", "Status", "Type", "UpdatedAtUtc" },
                values: new object[,]
                {
                    { new Guid("70000000-0000-0000-0000-000000000001"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000005"), new DateOnly(2027, 5, 31), null, null, new DateOnly(2025, 5, 31), "Active", "FullTime", null },
                    { new Guid("70000000-0000-0000-0000-000000000002"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000006"), new DateOnly(2026, 11, 18), null, null, new DateOnly(2025, 11, 18), "Active", "FullTime", null },
                    { new Guid("70000000-0000-0000-0000-000000000003"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000007"), new DateOnly(2026, 8, 14), "Contract ends soon", null, new DateOnly(2025, 8, 14), "ReviewRequired", "FullTime", null },
                    { new Guid("70000000-0000-0000-0000-000000000004"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000008"), new DateOnly(2027, 1, 10), null, null, new DateOnly(2026, 1, 10), "Active", "FullTime", null }
                });

            migrationBuilder.InsertData(
                table: "LeaveBalances",
                columns: new[] { "Id", "CreatedAtUtc", "EmployeeId", "EntitledDays", "LeaveTypeId", "PendingDays", "UpdatedAtUtc", "UsedDays", "Year" },
                values: new object[,]
                {
                    { new Guid("40000000-0000-0000-0000-000000000007"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000005"), 21m, new Guid("30000000-0000-0000-0000-000000000001"), 0m, null, 8m, 2026 },
                    { new Guid("40000000-0000-0000-0000-000000000008"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000006"), 21m, new Guid("30000000-0000-0000-0000-000000000001"), 4m, null, 14m, 2026 },
                    { new Guid("40000000-0000-0000-0000-000000000009"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000007"), 21m, new Guid("30000000-0000-0000-0000-000000000001"), 0m, null, 17m, 2026 },
                    { new Guid("40000000-0000-0000-0000-000000000010"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000008"), 15m, new Guid("30000000-0000-0000-0000-000000000001"), 0m, null, 3m, 2026 }
                });

            migrationBuilder.InsertData(
                table: "LeaveRequests",
                columns: new[] { "Id", "CreatedAtUtc", "EmployeeId", "EndDate", "LeaveTypeId", "Reason", "RequestedAtUtc", "RequestedDays", "ReviewNotes", "ReviewedAtUtc", "ReviewedByEmployeeId", "StartDate", "Status", "UpdatedAtUtc" },
                values: new object[,]
                {
                    { new Guid("50000000-0000-0000-0000-000000000001"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000006"), new DateOnly(2026, 8, 7), new Guid("30000000-0000-0000-0000-000000000001"), "Annual leave", new DateTime(2026, 7, 28, 8, 30, 0, 0, DateTimeKind.Utc), 4m, null, null, null, new DateOnly(2026, 8, 4), "Pending", null },
                    { new Guid("50000000-0000-0000-0000-000000000002"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000007"), new DateOnly(2026, 7, 30), new Guid("30000000-0000-0000-0000-000000000005"), "Emergency leave", new DateTime(2026, 7, 28, 9, 15, 0, 0, DateTimeKind.Utc), 1m, null, null, null, new DateOnly(2026, 7, 30), "Pending", null },
                    { new Guid("50000000-0000-0000-0000-000000000003"), new DateTime(2026, 7, 28, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000008"), new DateOnly(2026, 7, 28), new Guid("30000000-0000-0000-0000-000000000002"), "Sick leave", new DateTime(2026, 7, 27, 7, 0, 0, 0, DateTimeKind.Utc), 1m, null, new DateTime(2026, 7, 27, 11, 45, 0, 0, DateTimeKind.Utc), new Guid("20000000-0000-0000-0000-000000000005"), new DateOnly(2026, 7, 28), "Approved", null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AttendanceRecords",
                keyColumn: "Id",
                keyValue: new Guid("60000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "AttendanceRecords",
                keyColumn: "Id",
                keyValue: new Guid("60000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "AttendanceRecords",
                keyColumn: "Id",
                keyValue: new Guid("60000000-0000-0000-0000-000000000003"));

            migrationBuilder.DeleteData(
                table: "AttendanceRecords",
                keyColumn: "Id",
                keyValue: new Guid("60000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                table: "AttendanceRecords",
                keyColumn: "Id",
                keyValue: new Guid("60000000-0000-0000-0000-000000000005"));

            migrationBuilder.DeleteData(
                table: "Contracts",
                keyColumn: "Id",
                keyValue: new Guid("70000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "Contracts",
                keyColumn: "Id",
                keyValue: new Guid("70000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "Contracts",
                keyColumn: "Id",
                keyValue: new Guid("70000000-0000-0000-0000-000000000003"));

            migrationBuilder.DeleteData(
                table: "Contracts",
                keyColumn: "Id",
                keyValue: new Guid("70000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                table: "LeaveBalances",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "LeaveBalances",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "LeaveBalances",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000003"));

            migrationBuilder.DeleteData(
                table: "LeaveBalances",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                table: "LeaveBalances",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000005"));

            migrationBuilder.DeleteData(
                table: "LeaveBalances",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000006"));

            migrationBuilder.DeleteData(
                table: "LeaveBalances",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000007"));

            migrationBuilder.DeleteData(
                table: "LeaveBalances",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000008"));

            migrationBuilder.DeleteData(
                table: "LeaveBalances",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000009"));

            migrationBuilder.DeleteData(
                table: "LeaveBalances",
                keyColumn: "Id",
                keyValue: new Guid("40000000-0000-0000-0000-000000000010"));

            migrationBuilder.DeleteData(
                table: "LeaveRequests",
                keyColumn: "Id",
                keyValue: new Guid("50000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "LeaveRequests",
                keyColumn: "Id",
                keyValue: new Guid("50000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "LeaveRequests",
                keyColumn: "Id",
                keyValue: new Guid("50000000-0000-0000-0000-000000000003"));

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000005"));

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000006"));

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000007"));

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000008"));

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000009"));

            migrationBuilder.DeleteData(
                table: "LeaveTypes",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "LeaveTypes",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "LeaveTypes",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000003"));

            migrationBuilder.DeleteData(
                table: "LeaveTypes",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                table: "LeaveTypes",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000005"));

            migrationBuilder.DeleteData(
                table: "LeaveTypes",
                keyColumn: "Id",
                keyValue: new Guid("30000000-0000-0000-0000-000000000006"));

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("10000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000003"));

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: new Guid("20000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("10000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("10000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: new Guid("10000000-0000-0000-0000-000000000003"));
        }
    }
}
