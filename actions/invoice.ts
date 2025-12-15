"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createInvoiceAction(data: {
  clientId: number;
  invoiceNumber: string;
  items: {
    unitOfMeasurement: string;
    description: string;
    quantity: number;
    price: number;
    tax: number;
    discount: number;
  }[];
}) {
  const now = new Date();
  const due = new Date();
  due.setDate(now.getDate() + 30); // 30 days later

  await prisma.invoice.create({
    data: {
      clientId: data.clientId,
      issueDate: now,
      dueDate: due,
      items: {
        create: data.items.map(item => ({
          description: item.description,
          unitOfMeasurement: item.unitOfMeasurement,
          quantity: item.quantity,
          unitPrice: item.price,
          tax: item.tax,
          discount: item.discount,
          total: item.quantity * item.price * (1 + item.tax / 100 - item.discount / 100),

        })),
      },
    },
  });

  revalidatePath("/dashboard/invoices");
}
