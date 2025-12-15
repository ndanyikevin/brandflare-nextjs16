"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown, Eye, Pencil, Trash2, Download } from "lucide-react";
import { useRouter } from "next/navigation";

type Client = {
  id: number;
  name: string;
  address: string
};

type InvoiceItem = {
  id: number;
  description: string;
  quantity: number;
  unitOfMeasurement: string;
  unitPrice: number;
  taxRate?: number;
  discountRate?: number;
};

type Invoice = {
  id: number;
  client: Client;
  items: InvoiceItem[];
  issueDate: string;
  dueDate: string;
  amountPaid: number;
  amountDue: number;
  status: string;
};

export default function InvoiceTable() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [openInvoiceId, setOpenInvoiceId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then(setInvoices);
  }, []);

  const formatMoney = (value: number) =>
    value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {invoices.map((inv) => {
            const invoiceNo = `INV-${new Date(inv.issueDate)
              .getFullYear()
              .toString()
              .slice(-2)}${inv.id.toString().padStart(4, "0")}`;

            return (
              <TableRow key={inv.id}>
                <TableCell className="font-semibold">
                  {invoiceNo}
                </TableCell>

                <TableCell>{inv.client.name}</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      inv.status === "paid"
                        ? "default"
                        : inv.status === "overdue"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {inv.status.replace("_", " ")}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setOpenInvoiceId(inv.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/dashboard/invoices/${inv.id}/edit`)
                        }
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() =>
                          router.push(`/dashboard/invoices/${inv.id}/delete`)
                        }
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                {/* INVOICE PREVIEW DIALOG */}
                <Dialog
                  open={openInvoiceId === inv.id}
                  onOpenChange={(open) =>
                    setOpenInvoiceId(open ? inv.id : null)
                  }
                >
                  <DialogContent className="max-w-4xl">
                    <DialogHeader className="space-y-6">
                       <DialogTitle>Invoice {invoiceNo}</DialogTitle>
                          {/* Top row: Logo + Client */}
                        <div className="flex justify-between items-start">
                          {/* Company info */}
                          <div className="flex items-start gap-4">
                            <Image
                              src="/Color.png"
                              alt="Company Logo"
                              width={80}
                              height={80}
                              className="object-contain"
                              priority
                            />

                            <div className="text-sm space-y-1">
                              <p className="font-semibold text-base">Brandflare Woodworks</p>
                              <p>256 Kiamumbi</p>
                              <p>Nairobi</p>
                            </div>
                          </div>

                          {/* Client info */}
                          <div className="text-sm text-right space-y-1">
                            <p className="font-semibold text-base">Bill To</p>
                            <p>{inv.client.name}</p>
                            <p>{inv.client.address}</p>
                          </div>
                        </div>

  {/* Invoice meta */}
                      <div className="flex justify-between items-center border-t pt-4">
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="font-medium">Invoice:</span> {invoiceNo}
                          </p>
                          <p>
                            <span className="font-medium">Issue Date:</span>{" "}
                            {new Date(inv.issueDate).toLocaleDateString()}
                          </p>
                          <p>
                            <span className="font-medium">Due Date:</span>{" "}
                            {new Date(inv.dueDate).toLocaleDateString()}
                          </p>
                        </div>

                        <Badge className="capitalize">
                          {inv.status.replace("_", " ")}
                        </Badge>
                      </div>  
                    </DialogHeader>

                    {/* Items Table */}
                    <div className="border rounded-xl overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Unit Price</TableHead>
                            <TableHead className="text-right">
                              Total
                            </TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {inv.items.map((item) => {
                            const base =
                              item.quantity * item.unitPrice;
                            const tax =
                              (base * (item.taxRate || 0)) / 100;
                            const discount =
                              (base * (item.discountRate || 0)) /
                              100;
                            const total = base + tax - discount;

                            return (
                              <TableRow key={item.id}>
                                <TableCell>
                                  {item.description}
                                </TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>
                                  {item.unitOfMeasurement}
                                </TableCell>
                                <TableCell>
                                  {formatMoney(item.unitPrice)}
                                </TableCell>
                                <TableCell>{item.taxRate ?? 0}</TableCell>
                                <TableCell>
                                  {item.discountRate ?? 0}
                                </TableCell>
                                <TableCell className="text-right">
                                  {formatMoney(total)}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end">
                      <div className="space-y-1 text-sm w-64">
                        <div className="flex justify-between">
                          <span>Amount Paid</span>
                          <span>{formatMoney(inv.amountPaid)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Amount Due</span>
                          <span>{formatMoney(inv.amountDue)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline" onClick={() =>
                          window.open(`/api/invoices/${inv.id}/pdf`, "_blank")
                        }>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
