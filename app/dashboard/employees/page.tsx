import prisma from "@/lib/prisma";
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
import { ChevronDown, Eye, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default async function EmployeesPage() {
  const employees = await prisma.employee.findMany({
    include: {
      tasks: {
        include: {
          task: {
            include: {
              week: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Employees</h1>
            <p className="text-sm">Weekly task-based wage system</p>
          </div>
          <Button>+ New Employee</Button>
        </div>

        {/* Search input */}
        <Input
          placeholder="Search employees by name, phone or national ID..."
          className="max-w-sm"
        />

        {/* Employees Table */}
        <div className="rounded-2xl border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>National ID</TableHead>
                <TableHead>Tasks Assigned</TableHead>
                <TableHead>Latest Week</TableHead>
                <TableHead>Total Wage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {employees.map((emp) => {
                // Extract all weeks from assigned tasks
                const weeks = emp.tasks
                  .map((t) => t.task.week)
                  .filter(Boolean);

                // Sort weeks by endsOn desc
                const latestWeek = weeks.sort(
                  (a, b) =>
                    new Date(b.endsOn).getTime() -
                    new Date(a.endsOn).getTime()
                )[0];

                // Calculate total wage on the fly
                const totalWage = emp.tasks.reduce((sum, t) => {
                  const base = Number(t.basePay || 0);
                  const allowance = Number(t.allowance || 0);
                  const deduction = Number(t.deduction || 0);
                  return sum + (base + allowance - deduction);
                }, 0);

                return (
                  <TableRow key={emp.id}>
                    <TableCell>{emp.id}</TableCell>
                    <TableCell className="font-semibold">{emp.name}</TableCell>
                    <TableCell>{emp.phone}</TableCell>
                    <TableCell>{emp.nationalId}</TableCell>

                    {/* Task assignments count */}
                    <TableCell>{emp.tasks.length}</TableCell>

                    {/* Latest WorkWeek preview */}
                    <TableCell>
                      {latestWeek ? (
                        <Badge variant="outline">
                          {`WEEK - ${latestWeek.id}`}
                        </Badge>
                      ) : (
                        <span>No week yet</span>
                      )}
                    </TableCell>

                    {/* Calculated wage */}
                    <TableCell>
                      {totalWage.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>

                    {/* Actions dropdown */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ChevronDown className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* Footer pagination placeholder */}
          <div className="border-t p-4 flex justify-between items-center text-sm">
            <div>Total employees: {employees.length}</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Prev
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
