import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const tasks = await prisma.task.findMany({
    include: {
      week: true,
      assignedEmployees: {
        include: { employee: true },
      },
    },
  });

  return NextResponse.json(tasks);
}


export async function POST(req: Request) {
  try {
    const { title, weekId, cost } = await req.json();

    if (!title || !weekId || cost === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: {
        title,
        weekId,
        cost: Number(cost),
      },
    });

    return NextResponse.json(task);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
