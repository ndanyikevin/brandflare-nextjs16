import superjson from "superjson";
import TaskAssignmentDialog from "../task-assignment-form";
import prisma from "@/lib/prisma";

export default async function TasksPage() {
  const employees = await prisma.employee.findMany();
  const tasks = await prisma.task.findMany();

  // ✅ Correct superjson usage
  const serialized = superjson.serialize({
    employees,
    tasks,
  });

  // ✅ Deserialize immediately for plain objects
  const data = superjson.deserialize(serialized) as {
    employees: { id: number; name: string }[];
    tasks: { id: number; title: string; cost: number }[];
  };

  return (
    <div className="p-6">
      <TaskAssignmentDialog
        employees={data.employees}
        tasks={data.tasks}
      />
    </div>
  );
}
