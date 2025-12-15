"use client";

import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Delete, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Client = { id: number; name: string };
type Invoice = { id: number; client: Client; items: any[]; invoiceNumber: string };

export default function InvoiceTable() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/invoices").then((res) => res.json()).then(setInvoices);
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice #</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell>
              INV-{new Date().getFullYear().toString().slice(-2)}
              {inv.id.toString().padStart(4, "0")}
            </TableCell>

            <TableCell>{inv.client.name}</TableCell>

            <TableCell className="flex gap-2">
              <Button
                 variant="ghost"
                onClick={() => router.push(`/dashboard/invoices/${inv.id}/edit`)}
              >
                <Pencil className="size-4" />
              </Button>

              <Button
                variant="ghost"
                className="text-red-500"
                onClick={() => router.push(`/dashboard/invoices/${inv.id}/delete`)}
              >
            
                <Trash2 className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
