import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TaskAssignmentForm from "./task-assignment-form";

// Convert Prisma Decimal to number for client
function serializeTask(task: any) {
  return {
    ...task,
    cost: Number(task.cost),
  };
}

export default async function TasksPage() {
  // Fetch tasks and employees
  const [tasks, employees] = await Promise.all([
    prisma.task.findMany({
      include: {
        week: true,
        assignedEmployees: { include: { employee: true } },
      },
      orderBy: { id: "desc" },
    }),
    prisma.employee.findMany(),
  ]);

  // Convert Decimal → number
  const allTasks = tasks.map(serializeTask);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-sm text-gray-600">All tasks and their assignments</p>
        </div>

        {/* Dialog for creating new Task Assignment */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>+ New Task Assignment</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Task Assignment</DialogTitle>
            </DialogHeader>

            <TaskAssignmentForm employees={employees} tasks={allTasks} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Tasks Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Week</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Assigned Employees</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{`WEEK-${task.week.id}`}</Badge>
                </TableCell>
                <TableCell>{task.cost.toFixed(2)}</TableCell>
                <TableCell>
                  {task.assignedEmployees.length > 0
                    ? task.assignedEmployees.map((ta: { employee: { name: any; }; }) => ta.employee.name).join(", ")
                    : "No assignments"}
                </TableCell>
              </TableRow>
            ))}

            {allTasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center p-4 text-gray-500">
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
