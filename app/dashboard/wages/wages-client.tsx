"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WorkWeekOption, EmployeeWithTasks } from "./actions";

export default function WagesClient({
  weekOptions,
  employees,
}: {
  weekOptions: WorkWeekOption[];
  employees: EmployeeWithTasks[];
}) {
  const [selectedWeek, setSelectedWeek] = useState<number>(weekOptions[0]?.id || 0);

  const employeesForWeek = employees.map((emp) => {
    const weekTasks = emp.tasks.filter((t) => t.task.weekId === selectedWeek);
    const totalBase = weekTasks.reduce((acc, t) => acc + t.basePay, 0);
    const totalAllowance = weekTasks.reduce((acc, t) => acc + t.allowance, 0);
    const totalDeduction = weekTasks.reduce((acc, t) => acc + t.deduction, 0);
    const net = totalBase + totalAllowance - totalDeduction;

    return { ...emp, weekTasks, totalBase, totalAllowance, totalDeduction, net };
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Weekly Wages</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">Select Week:</label>
        <select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(Number(e.target.value))}
          className="border rounded p-1"
        >
          {weekOptions.map((w) => (
            <option key={w.id} value={w.id}>
              {w.label}
            </option>
          ))}
        </select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left">Employee</th>
              <th className="p-3 border-b text-left">Tasks Completed</th>
              <th className="p-3 border-b text-left">Base Pay</th>
              <th className="p-3 border-b text-left">Allowance</th>
              <th className="p-3 border-b text-left">Deduction</th>
              <th className="p-3 border-b text-left">Net Pay</th>
            </tr>
          </thead>
          <tbody>
            {employeesForWeek.map((emp) => (
              <tr key={emp.id} className="">
                <td className="p-3 border-b">{emp.name}</td>
                <td className="p-3 border-b">{emp.weekTasks.length}</td>
                <td className="p-3 border-b">{emp.totalBase.toFixed(2)}</td>
                <td className="p-3 border-b">{emp.totalAllowance.toFixed(2)}</td>
                <td className="p-3 border-b">{emp.totalDeduction.toFixed(2)}</td>
                <td className="p-3 border-b font-semibold">{emp.net.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
