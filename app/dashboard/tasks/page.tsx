"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Pencil, Trash2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type TaskType = {
  id: number;
  title: string;
  cost: number;
  week: { id: number; startsOn: string; endsOn: string } | null;
  assignedEmployees: { id: number; employee: { id: number; name: string } }[];
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [openTaskId, setOpenTaskId] = useState<number | null>(null);

  // New Task Dialog
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [weekId, setWeekId] = useState("");
  const [cost, setCost] = useState("");

  const [weeks, setWeeks] = useState<{ id: number; startsOn: string; endsOn: string }[]>([]);

  // Fetch tasks
  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then(setTasks)
      .catch(console.error);
  }, []);

  // Fetch weeks for dropdown
  useEffect(() => {
    fetch("/api/weeks")
      .then((res) => res.json())
      .then((data) => {
        const sortedWeeks = data.sort(
          (a: any, b: any) => new Date(b.startsOn).getTime() - new Date(a.startsOn).getTime()
        );
        setWeeks(sortedWeeks);
      })
      .catch(console.error);
  }, []);

  const handleCreateTask = async () => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, weekId: Number(weekId), cost: Number(cost) }),
      });

      if (!res.ok) throw new Error("Failed to create task");

      const task = await res.json();
      setTasks((prev) => [...prev, task]);
      setNewTaskOpen(false);
      setTitle("");
      setWeekId("");
      setCost("");
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tasks</h1>

          <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
            <DialogTrigger asChild>
              <Button>+ New Task</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                <div>
                  <Label>Title</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div>
                  <Label>Week</Label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={weekId}
                    onChange={(e) => setWeekId(e.target.value)}
                  >
                    <option value="">Select Week</option>
                    {weeks.map((w) => (
                      <option key={w.id} value={w.id}>
                        {`Week ${w.id} (${new Date(w.startsOn).toLocaleDateString()} - ${new Date(
                          w.endsOn
                        ).toLocaleDateString()})`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Cost</Label>
                  <Input type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
                </div>
              </div>

              <DialogFooter className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setNewTaskOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTask}>Create Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Input placeholder="Search tasks..." className="max-w-sm" />

        {/* Tasks Table */}
        <div className="rounded-2xl border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Week</TableHead>
                <TableHead>Assigned Employees</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tasks.map((task) => {
                const week = task.week;
                const assignedCount = task.assignedEmployees?.length || 0;

                return (
                  <TableRow key={task.id}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell className="font-semibold">{task.title}</TableCell>
                    <TableCell>
                      {week ? (
                        <Badge variant="outline">
                          {`Week ${week.id} (${new Date(week.startsOn).toLocaleDateString()} - ${new Date(
                            week.endsOn
                          ).toLocaleDateString()})`}
                        </Badge>
                      ) : (
                        <span>No week assigned</span>
                      )}
                    </TableCell>
                    <TableCell>{assignedCount}</TableCell>
                    <TableCell>{task.cost.toLocaleString()}</TableCell>

                    <TableCell className="text-right flex justify-end gap-2">
                      {/* Dropdown menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ChevronDown className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setOpenTaskId(task.id)}>
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* Task View Dialog */}
                      {openTaskId === task.id && (
                        <Dialog
                          open
                          onOpenChange={(open) => !open && setOpenTaskId(null)}
                        >
                          <DialogContent className="max-w-lg rounded-2xl p-6 shadow-lg">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-bold">
                                Task Details
                              </DialogTitle>
                            </DialogHeader>

                            <div className="mt-4 space-y-4">
                              {/* Task Info */}
                              <div className="border-b pb-3">
                                <h2 className="text-lg font-semibold mb-2">Task Info</h2>
                                <p>
                                  <strong>Title:</strong> {task.title}
                                </p>
                                <p>
                                  <strong>Week:</strong>{" "}
                                  {week
                                    ? `Week ${week.id} (${new Date(week.startsOn).toLocaleDateString()} - ${new Date(
                                        week.endsOn
                                      ).toLocaleDateString()})`
                                    : "No week assigned"}
                                </p>
                                <p>
                                  <strong>Cost:</strong> {task.cost.toLocaleString()}
                                </p>
                              </div>

                              {/* Assigned Employees */}
                              <div>
                                <h2 className="text-lg font-semibold mb-2">Assigned Employees</h2>
                                {assignedCount > 0 ? (
                                  <ul className="list-disc list-inside space-y-1">
                                    {task.assignedEmployees.map((ae) => (
                                      <li key={ae.id}>{ae.employee.name}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p>No employees assigned</p>
                                )}
                              </div>
                            </div>

                            <DialogFooter className="mt-6 flex justify-end gap-2">
                              <Button
                                variant="outline"
                                onClick={() => setOpenTaskId(null)}
                              >
                                Close
                              </Button>
                              <Button onClick={() => { /* TODO: Download PDF */ }}>
                                Download PDF
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
