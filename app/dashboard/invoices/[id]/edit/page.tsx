"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

type Client = { id: number; name: string };
type InvoiceItemInput = {
  description: string;
  quantity: number;
  unitPrice: number;
  unitOfMeasurement: string;
};

type ExistingInvoice = {
  id: number;
  clientId: number;
  items: InvoiceItemInput[];
};

export default function InvoiceForm({
  clients,
  existingInvoice,
}: {
  clients: Client[];
  existingInvoice?: ExistingInvoice;
}) {
  if (!clients || clients.length === 0) return <p>Loading clients...</p>;

  const [clientId, setClientId] = useState<number>(
    existingInvoice?.clientId || clients[0].id
  );
  const [items, setItems] = useState<InvoiceItemInput[]>(
    existingInvoice?.items.length
      ? existingInvoice.items
      : [{ description: "", quantity: 1, unitPrice: 0, unitOfMeasurement: "" }]
  );
  const [loading, setLoading] = useState(false);

  const addItem = () =>
    setItems([
      ...items,
      // { description: "", quantity: 1, unitPrice: 0, unitOfMeasurement: "" },
    ]);

  const removeItem = (index: number) =>
    setItems(items.filter((_, i) => i !== index));

  const updateItem = (index: number, key: keyof InvoiceItemInput, value: any) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [key]:
                key === "description" || key === "unitOfMeasurement"
                  ? String(value)
                  : Number(value),
            }
          : item
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = existingInvoice
      ? `/api/invoices/${existingInvoice.id}`
      : "/api/invoices";
    const method = existingInvoice ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId, items }),
    });

    setLoading(false);

    if (!res.ok) return alert("Failed to save invoice");

    window.location.href = "/dashboard/invoices";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="client">Client</Label>
        <select
          id="client"
          value={clientId}
          onChange={(e) => setClientId(Number(e.target.value))}
          className="w-full border rounded p-2"
        >
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Invoice Items</Label>
        {items.map((item, idx) => (
          <div key={idx} className="grid grid-cols-5 gap-2 items-center">
            <div>
              <Label>Description</Label>
              <Input
                placeholder="Work done / Product"
                value={item.description}
                onChange={(e) => updateItem(idx, "description", e.target.value)}
              />
            </div>
            <div>
              <Label>Qty</Label>
              <Input
                type="number"
                placeholder="1"
                value={item.quantity}
                onChange={(e) =>
                  updateItem(idx, "quantity", Number(e.target.value))
                }
              />
            </div>
            <div>
              <Label>Unit Price</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={item.unitPrice}
                onChange={(e) =>
                  updateItem(idx, "unitPrice", Number(e.target.value))
                }
              />
            </div>
            <div>
              <Label>Unit</Label>
              <Input
                placeholder="kg, pcs, m²"
                value={item.unitOfMeasurement}
                onChange={(e) =>
                  updateItem(idx, "unitOfMeasurement", e.target.value)
                }
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              className="text-red-500"
              onClick={() => removeItem(idx)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addItem}>
          Add Item
        </Button>
      </div>

      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {existingInvoice ? "Update Invoice" : "Create Invoice"}
      </Button>
    </form>
  );
}
