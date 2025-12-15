// app/api/invoices/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Decimal } from "@/app/generated/prisma/internal/prismaNamespace";

type InvoiceItemInput = {
  description: string;
  quantity: number;
  unitPrice: number;
  unitOfMeasurement: string;
};

type InvoiceCreateInput = {
  clientId: number;
  items: InvoiceItemInput[];
};

// Helper: recursively serialize Prisma objects
function serializePrisma(data: any): any {
  if (Array.isArray(data)) return data.map(serializePrisma);

  if (data && typeof data === "object") {
    const serialized: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Decimal) {
        serialized[key] = value.toNumber();
      } else if (value instanceof Date) {
        serialized[key] = value.toISOString();
      } else if (value && typeof value === "object") {
        serialized[key] = serializePrisma(value);
      } else {
        serialized[key] = value;
      }
    }
    return serialized;
  }

  return data;
}

// GET /api/invoices
export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        client: { select: { id: true, name: true } },
        items: true, // include invoice items
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(serializePrisma(invoices));
  } catch (err) {
    console.error("GET /api/invoices error", err);
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}

// POST /api/invoices
export async function POST(req: Request) {
  try {
    const body: InvoiceCreateInput = await req.json();
    const { clientId, items } = body;

    if (!clientId || !items || !items.length) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const invoice = await prisma.invoice.create({
      data: {
        clientId,
        issueDate: new Date(),
        dueDate: new Date(),
        items: {
          create: items.map((it) => ({
            description: it.description,
            quantity: it.quantity,
            unitPrice: it.unitPrice,
            unitOfMeasurement: it.unitOfMeasurement,
          })),
        },
      },
      include: {
        items: true, // include items in response
      },
    });

    return NextResponse.json(serializePrisma(invoice));
  } catch (err) {
    console.error("POST /api/invoices error", err);
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }
}