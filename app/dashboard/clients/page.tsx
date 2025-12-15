import prisma from "@/lib/prisma";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, Trash2, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    include: {
      invoices: { orderBy: { issueDate: "desc" }, take: 1 },
      payments: true
    }
  });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Clients</h1>
            <p className="text-sm ">Customers in the woodworks system</p>
          </div>
          <Button>+ New Client</Button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <Input placeholder="Search clients by name, email or phone..." className="max-w-sm" />
        </div>

        {/* Table */}
        <div className="rounded-2xl border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Latest Invoice</TableHead>
                <TableHead>Invoices</TableHead>
                <TableHead>Payments</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id} className="">

                  <TableCell>{client.id}</TableCell>
                  <TableCell className="font-semibold">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.address}</TableCell>

                  {/* Latest invoice preview */}
                  <TableCell>
                    {client.invoices[0]?.id 
                      ? <Badge variant="outline">{client.invoices[0].id}</Badge>
                      : <span className="text">None</span>}
                  </TableCell>

                  {/* Counts */}
                  <TableCell>{client.invoices.length}</TableCell>
                  <TableCell>{client.payments.length}</TableCell>

                  {/* Actions */}
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
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Footer Pagination Placeholder */}
          <div className="border-t p-4 flex justify-between items-center text-sm">
            <div className="text">Total clients: {clients.length}</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Prev</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
