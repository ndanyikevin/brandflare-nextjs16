"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../../../components/ui/dialog";

import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";

export type Employee = { id: number; name: string };
export type Task = { id: number; title: string; cost: number };

export default function TaskAssignmentDialog({
  employees,
  tasks,
}: {
  employees: Employee[];
  tasks: Task[];
}) {
  const [open, setOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [basePay, setBasePay] = useState<number>(0);
  const [allowance, setAllowance] = useState<number>(0);
  const [deduction, setDeduction] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeId || !taskId) return alert("Select employee and task");

    setLoading(true);

    try {
      const res = await fetch("/api/task-assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId,
          taskId,
          basePay,
          allowance,
          deduction,
        }),
      });

      if (!res.ok) throw new Error("Failed to create task assignment");

      alert("Task assignment created successfully!");

      // Close dialog
      setOpen(false);

      // Reset form
      setEmployeeId(null);
      setTaskId(null);
      setBasePay(0);
      setAllowance(0);
      setDeduction(0);

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ New Task Assignment</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        <form onSubmit={handleSubmit}>

          <div className="grid gap-4 py-4">
            {/* Employee */}
            <div className="grid gap-2">
              <Label>Employee</Label>
              <Select
                value={employeeId !== null ? employeeId.toString() : ""}
                onValueChange={(v) => setEmployeeId(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((e) => (
                    <SelectItem key={e.id} value={e.id.toString()}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Task */}
            <div className="grid gap-2">
              <Label>Task</Label>
              <Select
                value={taskId !== null ? taskId.toString() : ""}
                onValueChange={(v) => setTaskId(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent>
                  {tasks.map((t) => (
                    <SelectItem key={t.id} value={t.id.toString()}>
                      {t.title} — KES {t.cost.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Base Pay */}
            <div className="grid gap-2">
              <Label>Base Pay</Label>
              <Input
                type="number"
                value={basePay}
                onChange={(e) => setBasePay(Number(e.target.value))}
              />
            </div>

            {/* Allowance */}
            <div className="grid gap-2">
              <Label>Allowance</Label>
              <Input
                type="number"
                value={allowance}
                onChange={(e) => setAllowance(Number(e.target.value))}
              />
            </div>

            {/* Deduction */}
            <div className="grid gap-2">
              <Label>Deduction</Label>
              <Input
                type="number"
                value={deduction}
                onChange={(e) => setDeduction(Number(e.target.value))}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Assignment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
