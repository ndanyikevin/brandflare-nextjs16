// "use server";
// import prisma from "@/lib/prisma";

// export async function createInvoiceAction(
//   formData: FormData,
//   items: {
//     description: string;
//     quantity: number;
//     unitPrice: number;
//     unitOfMeasurement: string;
//   }[]
// ) {
//   const clientId = Number(formData.get("clientId"));

//   const issueDateStr = formData.get("issueDate") as string;
//   const dueDateStr = formData.get("dueDate") as string;

//   // Validate dates
//   if (!issueDateStr || !dueDateStr) {
//     throw new Error("Issue date and Due date are required");
//   }

//   const issueDate = new Date(issueDateStr);
//   const dueDate = new Date(dueDateStr);

//   if (isNaN(issueDate.getTime()) || isNaN(dueDate.getTime())) {
//     throw new Error("Invalid date format");
//   }

//   await prisma.invoice.create({
//     data: {
//       clientId,
//       issueDate,
//       dueDate,
//       items: {
//         create: items,
//       },
//     },
//   });
// }

// export async function deleteInvoiceAction(invoiceId: number) {
//   // Delete the invoice and its related items & payments
//   await prisma.invoice.delete({
//     where: { id: invoiceId },
//   });
// }
