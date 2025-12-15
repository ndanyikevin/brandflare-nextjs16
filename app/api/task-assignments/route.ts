// app/api/task-assignments/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

function serializePrisma(data: any): any {
  if (Array.isArray(data)) {
    return data.map(serializePrisma);
  }
  if (data && typeof data === 'object') {
    const serialized: any = { ...data };
    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Prisma.Decimal) {
        serialized[key] = value.toNumber();
      } else if (value && typeof value === 'object') {
        serialized[key] = serializePrisma(value);
      }
    }
    return serialized;
  }
  return data;
}

export async function POST(req: NextRequest) {
  try {
    const { employeeId, taskId, basePay, allowance, deduction } = await req.json();

    if (!employeeId || !taskId) {
      return NextResponse.json({ error: "Employee and Task are required" }, { status: 400 });
    }

    const assignment = await prisma.taskAssignment.create({
      data: {
        employeeId,
        taskId,
        basePay,
        allowance,
        deduction,
      },
    });

    // ✅ Serialize Decimal fields before returning
    const serializedAssignment = serializePrisma(assignment);
    
    return NextResponse.json(serializedAssignment);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create task assignment" }, { status: 500 });
  }
}
