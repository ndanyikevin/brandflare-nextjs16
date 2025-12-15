"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function WageForm({ employees, onSubmit }: { employees: any[]; onSubmit: any }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    await onSubmit(formData);

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Employee Dropdown */}
      <select
        name="employeeId"
        className="w-full border p-2 rounded-md"
        required
      >
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.firstName} {emp.lastName}
          </option>
        ))}
      </select>

      {/* Hours */}
      <Input name="hours" type="number" placeholder="Hours Worked" required />

      {/* Rate */}
      <Input name="rate" type="number" placeholder="Rate (KES)" required />

      {/* Week Ending */}
      <Input name="weekEnding" type="date" required />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Save Wage"}
      </Button>
    </form>
  );
}
