import prisma from "@/lib/prisma";

// Types
export type TaskAssignmentWithTask = {
  id: number;
  employeeId: number;
  taskId: number;
  basePay: number;
  allowance: number;
  deduction: number;
  createdAt: Date;
  task: {
    id: number;
    title: string;
    weekId: number;
    cost: number;
    createdAt: Date;
  };
};

export type EmployeeWithTasks = {
  id: number;
  name: string;
  phone: string;
  nationalId: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: TaskAssignmentWithTask[];
};

export type WorkWeekOption = { id: number; label: string };

export async function fetchWeeksAndEmployees() {
  const [weeks, employees] = await Promise.all([
    prisma.workWeek.findMany({ orderBy: { id: "desc" } }),
    prisma.employee.findMany({
      include: {
        tasks: {
          include: {
            task: true,
          },
        },
      },
    }),
  ]);

  const employeesWithNumbers: EmployeeWithTasks[] = employees.map((emp) => ({
    ...emp,
    tasks: emp.tasks.map((t) => ({
      id: t.id,
      employeeId: t.employeeId,
      taskId: t.taskId,
      basePay: Number(t.basePay),
      allowance: Number(t.allowance),
      deduction: Number(t.deduction),
      createdAt: t.createdAt,
      task: {
        id: t.task.id,
        title: t.task.title,
        weekId: t.task.weekId,
        cost: Number(t.task.cost),
        createdAt: t.task.createdAt,
      },
    })),
  }));

  const weekOptions: WorkWeekOption[] = weeks.map((w) => ({
    id: w.id,
    label: `WEEK-${w.id}`,
  }));

  return { weekOptions, employees: employeesWithNumbers };
}
