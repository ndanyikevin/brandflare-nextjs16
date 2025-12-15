// import { PrismaClient, Prisma, PaymentMethod } from "../app/generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
// import "dotenv/config";

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL!,
// });

// const prisma = new PrismaClient({
//   adapter,
// });

// // -------------------------------------------------------------
// // CLIENTS
// // -------------------------------------------------------------
// const clientData: Prisma.ClientCreateInput[] = [
//   {
//     name: "Alpha Construction",
//     email: "alpha@example.com",
//     phone: "0700000001",
//     nationalId: "12345678",
//     address: "Nairobi, Kenya",
//   },
//   {
//     name: "Beta Supplies Ltd",
//     email: "beta@example.com",
//     phone: "0700000002",
//     nationalId: "23456789",
//     address: "Mombasa, Kenya",
//   },
//   {
//     name: "Gamma Traders",
//     email: "gamma@example.com",
//     phone: "0700000003",
//     nationalId: "34567890",
//     address: "Kisumu, Kenya",
//   },
//   {
//     name: "Delta Engineering",
//     email: "delta@example.com",
//     phone: "0700000004",
//     nationalId: "45678901",
//     address: "Nakuru, Kenya",
//   },
//   {
//     name: "Epsilon Logistics",
//     email: "epsilon@example.com",
//     phone: "0700000005",
//     nationalId: "56789012",
//     address: "Eldoret, Kenya",
//   },
// ];

// // -------------------------------------------------------------
// // EMPLOYEES
// // -------------------------------------------------------------
// const employeeData: Prisma.EmployeeCreateInput[] = [
//   {
//     name: "John Doe",
//     phone: "0711000001",
//     nationalId: "80000001",
//   },
//   {
//     name: "Mary Ann",
//     phone: "0711000002",
//     nationalId: "80000002",
//   },
//   {
//     name: "Peter Mwangi",
//     phone: "0711000003",
//     nationalId: "80000003",
//   },
//   {
//     name: "Sarah K.",
//     phone: "0711000004",
//     nationalId: "80000004",
//   },
//   {
//     name: "Brian Kim",
//     phone: "0711000005",
//     nationalId: "80000005",
//   },
// ];

// // -------------------------------------------------------------
// // WORK WEEKS
// // -------------------------------------------------------------
// const workWeekData: Prisma.WorkWeekCreateInput[] = [
//   { startsOn: new Date("2025-02-01"), endsOn: new Date("2025-02-07") },
//   { startsOn: new Date("2025-02-08"), endsOn: new Date("2025-02-14") },
//   { startsOn: new Date("2025-02-15"), endsOn: new Date("2025-02-21") },
//   { startsOn: new Date("2025-02-22"), endsOn: new Date("2025-02-28") },
//   { startsOn: new Date("2025-03-01"), endsOn: new Date("2025-03-07") },
// ];

// // -------------------------------------------------------------
// // TASKS
// // (weekId will be assigned after inserting workWeeks)
// // -------------------------------------------------------------
// const taskSeedTemplates = [
//   { title: "Site Survey", cost: new Prisma.Decimal(5000) },
//   { title: "Material Delivery", cost: new Prisma.Decimal(12000) },
//   { title: "Welding Work", cost: new Prisma.Decimal(8000) },
//   { title: "Painting Job", cost: new Prisma.Decimal(6500) },
//   { title: "Final Inspection", cost: new Prisma.Decimal(3000) },
// ];

// // -------------------------------------------------------------
// // ASSIGNMENTS
// // (employeeId + taskId inserted later)
// // -------------------------------------------------------------
// const assignmentTemplates = [
//   { basePay: new Prisma.Decimal(3000), allowance: new Prisma.Decimal(500), deduction: new Prisma.Decimal(0) },
//   { basePay: new Prisma.Decimal(3500), allowance: new Prisma.Decimal(300), deduction: new Prisma.Decimal(100) },
//   { basePay: new Prisma.Decimal(4000), allowance: new Prisma.Decimal(700), deduction: new Prisma.Decimal(0) },
//   { basePay: new Prisma.Decimal(2800), allowance: new Prisma.Decimal(200), deduction: new Prisma.Decimal(50) },
//   { basePay: new Prisma.Decimal(5000), allowance: new Prisma.Decimal(800), deduction: new Prisma.Decimal(0) },
// ];

// // -------------------------------------------------------------
// // QUOTATIONS
// // (clientId assigned later)
// // -------------------------------------------------------------
// const quotationTemplates = [
//   { quotationNumber: "QT-1001", issueDate: new Date(), expiryDate: new Date("2025-03-05") },
//   { quotationNumber: "QT-1002", issueDate: new Date(), expiryDate: new Date("2025-03-06") },
//   { quotationNumber: "QT-1003", issueDate: new Date(), expiryDate: new Date("2025-03-07") },
//   { quotationNumber: "QT-1004", issueDate: new Date(), expiryDate: new Date("2025-03-08") },
//   { quotationNumber: "QT-1005", issueDate: new Date(), expiryDate: new Date("2025-03-09") },
// ];

// // -------------------------------------------------------------
// // QUOTATION ITEMS
// // -------------------------------------------------------------
// const quotationItemTemplates = [
//   { description: "Steel rods", quantity: 10, unitOfMeasurement: "pcs", unitPrice: new Prisma.Decimal(350), taxRate: new Prisma.Decimal(16), discountRate: new Prisma.Decimal(0) },
//   { description: "Cement bags", quantity: 5, unitOfMeasurement: "bags", unitPrice: new Prisma.Decimal(650), taxRate: new Prisma.Decimal(16), discountRate: new Prisma.Decimal(0) },
//   { description: "Sand delivery", quantity: 2, unitOfMeasurement: "tons", unitPrice: new Prisma.Decimal(2000), taxRate: new Prisma.Decimal(0), discountRate: new Prisma.Decimal(5) },
//   { description: "Labour cost", quantity: 1, unitOfMeasurement: "job", unitPrice: new Prisma.Decimal(5000), taxRate: new Prisma.Decimal(0), discountRate: new Prisma.Decimal(0) },
//   { description: "Paint (20L)", quantity: 1, unitOfMeasurement: "can", unitPrice: new Prisma.Decimal(2400), taxRate: new Prisma.Decimal(16), discountRate: new Prisma.Decimal(0) },
// ];

// // -------------------------------------------------------------
// // INVOICES
// // -------------------------------------------------------------
// const invoiceTemplates = [
//   { invoiceNumber: "INV-2001", issueDate: new Date(), dueDate: new Date("2025-03-05") },
//   { invoiceNumber: "INV-2002", issueDate: new Date(), dueDate: new Date("2025-03-06") },
//   { invoiceNumber: "INV-2003", issueDate: new Date(), dueDate: new Date("2025-03-07") },
//   { invoiceNumber: "INV-2004", issueDate: new Date(), dueDate: new Date("2025-03-08") },
//   { invoiceNumber: "INV-2005", issueDate: new Date(), dueDate: new Date("2025-03-09") },
// ];

// // -------------------------------------------------------------
// // INVOICE ITEMS
// // -------------------------------------------------------------
// const invoiceItemTemplates = [
//   { description: "Steel rods", quantity: 10, unitOfMeasurement: "pcs", unitPrice: new Prisma.Decimal(350), taxRate: new Prisma.Decimal(16), discountRate: new Prisma.Decimal(0) },
//   { description: "Cement bags", quantity: 5, unitOfMeasurement: "bags", unitPrice: new Prisma.Decimal(650), taxRate: new Prisma.Decimal(16), discountRate: new Prisma.Decimal(0) },
//   { description: "Sand delivery", quantity: 2, unitOfMeasurement: "tons", unitPrice: new Prisma.Decimal(2000), taxRate: new Prisma.Decimal(0), discountRate: new Prisma.Decimal(5) },
//   { description: "Painting labour", quantity: 1, unitOfMeasurement: "job", unitPrice: new Prisma.Decimal(4500), taxRate: new Prisma.Decimal(0), discountRate: new Prisma.Decimal(10) },
//   { description: "Inspection", quantity: 1, unitOfMeasurement: "job", unitPrice: new Prisma.Decimal(2000), taxRate: new Prisma.Decimal(0), discountRate: new Prisma.Decimal(0) },
// ];

// // -------------------------------------------------------------
// // INVOICE PAYMENTS
// // -------------------------------------------------------------
// const paymentTemplates = [
//   { amount: new Prisma.Decimal(3000), method: PaymentMethod.mpesa},
//   { amount: new Prisma.Decimal(5000), method: PaymentMethod.cash },
//   { amount: new Prisma.Decimal(2500), method: PaymentMethod.bank_transfer },
//   { amount: new Prisma.Decimal(4000), method: PaymentMethod.mpesa },
//   { amount: new Prisma.Decimal(6000), method: PaymentMethod.card },
// ];

// // -------------------------------------------------------------
// // MAIN SEED LOGIC
// // -------------------------------------------------------------
// export async function main() {
//   console.log("🌳 Seeding Mahogany Data...");

//   // 1. Clients
//   const clients = [];
//   for (const c of clientData) {
//     const newClient = await prisma.client.create({ data: c });
//     clients.push(newClient);
//   }

//   // 2. Employees
//   const employees = [];
//   for (const e of employeeData) {
//     const newEmp = await prisma.employee.create({ data: e });
//     employees.push(newEmp);
//   }

//   // 3. WorkWeeks
//   const weeks = [];
//   for (const w of workWeekData) {
//     const newWeek = await prisma.workWeek.create({ data: w });
//     weeks.push(newWeek);
//   }

//   // 4. Tasks (attach to workWeeks)
//   const tasks = [];
//   for (let i = 0; i < 5; i++) {
//     const newTask = await prisma.task.create({
//       data: {
//         ...taskSeedTemplates[i],
//         week: { connect: { id: weeks[i].id } },
//       },
//     });
//     tasks.push(newTask);
//   }

//   // 5. TaskAssignments
//   for (let i = 0; i < 5; i++) {
//     await prisma.taskAssignment.create({
//       data: {
//         ...assignmentTemplates[i],
//         task: { connect: { id: tasks[i].id } },
//         employee: { connect: { id: employees[i].id } },
//       },
//     });
//   }

//   // 6. Quotations
//   const quotations = [];
//   for (let i = 0; i < 5; i++) {
//     const newQuotation = await prisma.quotation.create({
//       data: {
//         ...quotationTemplates[i],
//         client: { connect: { id: clients[i].id } },
//       },
//     });
//     quotations.push(newQuotation);
//   }

//   // 7. QuotationItems
//   for (let i = 0; i < 5; i++) {
//     await prisma.quotationItem.create({
//       data: {
//         ...quotationItemTemplates[i],
//         quotation: { connect: { id: quotations[i].id } },
//       },
//     });
//   }

//   // 8. Invoices
//   const invoices = [];
//   for (let i = 0; i < 5; i++) {
//     const newInvoice = await prisma.invoice.create({
//       data: {
//         ...invoiceTemplates[i],
//         client: { connect: { id: clients[i].id } },
//         amountPaid: new Prisma.Decimal(0),
//         amountDue: new Prisma.Decimal(0),
//         status: "draft",
//       },
//     });
//     invoices.push(newInvoice);
//   }

//   // 9. InvoiceItems
//   for (let i = 0; i < 5; i++) {
//     await prisma.invoiceItem.create({
//       data: {
//         ...invoiceItemTemplates[i],
//         invoice: { connect: { id: invoices[i].id } },
//       },
//     });
//   }

//   // 10. Invoice Payments
//   for (let i = 0; i < 5; i++) {
//     await prisma.invoicePayment.create({
//       data: {
//         ...paymentTemplates[i],
//         method: PaymentMethod[paymentTemplates[i].method],
//         client: { connect: { id: clients[i].id } },
//         invoice: { connect: { id: invoices[i].id } },
//       },
//     });
//   }

//   console.log("🌳 Mahogany seeds planted.");
// }

// main().catch((e) => {
//   console.error(e);
//   process.exit(1);
// });
