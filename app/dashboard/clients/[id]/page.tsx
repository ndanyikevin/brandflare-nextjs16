import { PrismaClient, Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrismaPg } from "@prisma/adapter-pg";



export default async function EditClientPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id: parseInt(id) },
    include: {
      invoices: {
        include: {
          items: true,
          payments: true,
        },
      },
    },
  });

  if (!client) {
    notFound();
  }

  const clientInput: Prisma.ClientUpdateInput = {
    name: client.name,
    email: client.email,
    phone: client.phone,
    address: client.address,
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 min-h-screen">
      
      {/* Edit Form */}
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Edit Client</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={async (formData) => {
            "use server";
            await prisma.client.update({
              where: { id: client.id },
              data: {
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                phone: formData.get("phone") as string,
                address: formData.get("address") as string,
              },
            });
          }} className="space-y-4">

            <Input name="name" defaultValue={clientInput.name as string} placeholder="Client name" required />
            <Input name="email" defaultValue={clientInput.email as string} placeholder="Email" />
            <Input name="phone" defaultValue={clientInput.phone as string} placeholder="Phone" />
            <Input name="address" defaultValue={clientInput.address as string} placeholder="Address" />

            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Client Invoices</CardTitle>
          <Input placeholder="Search invoices..." className="max-w-sm" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                
                <TableHead>Tax</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Week Ending</TableHead>
               
              </TableRow>
            </TableHeader>
            <TableBody>
              {client.invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.amountDue.toString()}</TableCell>
                  <TableCell>{invoice.amountPaid.toString()}</TableCell>
                  
                  

                  <TableCell className="capitalize">
                    {invoice.payments[0]?.method || "-"}
                  </TableCell>

                  <TableCell>
                    {invoice.payments.reduce((sum, p) => sum + Number(p.amount), 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
