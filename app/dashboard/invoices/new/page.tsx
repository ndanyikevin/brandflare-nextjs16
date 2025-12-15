"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewInvoicePage() {
  const router = useRouter();

  const [clients, setClients] = useState<any[]>([]);
  const [clientId, setClientId] = useState<string>("");

  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [items, setItems] = useState([
    { description: "", quantity: 1, unitPrice: 0, unitOfMeasurement: "" },
  ]);

  // -------------------------------
  // Fetch clients on mount
  // -------------------------------
  useEffect(() => {
    async function loadClients() {
      const res = await fetch("/api/clients");
      const data = await res.json();
      setClients(data);
    }
    loadClients();
  }, []);

  function addItem() {
    setItems([
      ...items,
      { description: "", quantity: 1, unitPrice: 0, unitOfMeasurement: "" },
    ]);
  }

  function removeItem(idx: number) {
    setItems(items.filter((_, i) => i !== idx));
  }

  async function onSubmit(e: any) {
    e.preventDefault();

    const subtotal = items.reduce(
      (sum, i) => sum + i.quantity * i.unitPrice,
      0
    )
    const tax = subtotal * 0.1;
    const discount = subtotal * 0.05;
    const total = subtotal + tax - discount;
    

    const res = await fetch("/api/invoices", {
      method: "POST",
      body: JSON.stringify({
        clientId: Number(clientId),
        issueDate,
        dueDate,
      }),
    });

    if (res.ok) {
      router.push("/dashboard/invoices");
      router.refresh();
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">Create Invoice</h1>

      <form action={onSubmit} className="space-y-6">
        {/* CLIENT SELECT */}
        <div>
          <label className="text-sm font-medium">Client</label>
          <Select value={clientId} onValueChange={setClientId}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select a client" />
            </SelectTrigger>

            <SelectContent>
              {clients.map((c) => (
                <SelectItem value={String(c.id)} key={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {clients.length === 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              No clients found. Add clients first.
            </p>
          )}
        </div>

        {/* DATES */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Issue Date</label>
            <Input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
            />
          </div>

          <div>
            <label>Due Date</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        {/* ITEMS */}
        <div className="space-y-4">
          <h2 className="font-medium">Items</h2>

          {items.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-5 gap-2 items-end border p-3 rounded"
            >
              <Input
                placeholder="Description"
                value={item.description}
                onChange={(e) => {
                  const copy = [...items];
                  copy[idx].description = e.target.value;
                  setItems(copy);
                }}
              />

              <Input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => {
                  const copy = [...items];
                  copy[idx].quantity = Number(e.target.value);
                  setItems(copy);
                }}
              />

              <Input
                type="number"
                placeholder="Price"
                value={item.unitPrice}
                onChange={(e) => {
                  const copy = [...items];
                  copy[idx].unitPrice = Number(e.target.value);
                  setItems(copy);
                }}
              />

              <Input
                placeholder="Unit"
                value={item.unitOfMeasurement}
                onChange={(e) => {
                  const copy = [...items];
                  copy[idx].unitOfMeasurement = e.target.value;
                  setItems(copy);
                }}
              />

              <Button
                type="button"
                variant="ghost"
                onClick={() => removeItem(idx)}
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          ))}

          <Button type="button" variant="secondary" onClick={addItem}>
            <Plus className="w-4 h-4 mr-2" /> Add Item
          </Button>
        </div>

        {/* SUBMIT */}
        <Button type="submit" className="w-full">
          Save Invoice
        </Button>
      </form>
    </div>
  );
}
