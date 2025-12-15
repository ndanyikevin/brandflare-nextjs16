"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Invoice } from "@/app/generated/prisma/client";

type Client = { id: number; name: string };
type InvoiceItemInput = {
  description: string;
  quantity: number;
  unitPrice: number;
  unitOfMeasurement: string;
};

export default function InvoiceForm({ clients, existingInvoice }: { clients: Client[]; existingInvoice?: Invoice }) {
  const [clientId, setClientId] = useState(clients[0]?.id || 0);
  const [items, setItems] = useState<InvoiceItemInput[]>([
    { description: "", quantity: 1, unitPrice: 0, unitOfMeasurement: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const addItem = () =>
    setItems([
      ...items,
      { description: "", quantity: 1, unitPrice: 0, unitOfMeasurement: "" },
    ]);

  const removeItem = (index: number) =>
    setItems(items.filter((_, i) => i !== index));

  const updateItem = (
    index: number,
    key: keyof InvoiceItemInput,
    value: string | number,
  ) => {
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
          : item,
      ),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId, items }),
    });

    if (res.ok) window.location.reload();
    else alert("Failed to create invoice");

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* CLIENT */}
      <div className="space-y-2">
        <Label htmlFor="client">Select Client</Label>
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

      {/* ITEMS */}
      <div className="space-y-3">
        <Label className="text-lg font-medium">Invoice Items</Label>

        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-xl bg-muted/30 space-y-3"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Description</Label>
                <Input
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(idx, "description", e.target.value)
                  }
                />
              </div>

              <div className="space-y-1">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  placeholder="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(idx, "quantity", Number(e.target.value))
                  }
                />
              </div>

              <div className="space-y-1">
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

              <div className="space-y-1">
                <Label>Unit of Measurement</Label>
                <Input
                  placeholder="e.g. pcs, kg, hr"
                  value={item.unitOfMeasurement}
                  onChange={(e) =>
                    updateItem(idx, "unitOfMeasurement", e.target.value)
                  }
                />
              </div>
            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={() => removeItem(idx)}
              className="w-full"
            >
              Remove Item
            </Button>
          </div>
        ))}

        <Button type="button" onClick={addItem} variant="secondary">
          + Add Another Item
        </Button>
      </div>

      {/* SUBMIT */}
      <Button type="submit" disabled={loading} className="w-full">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Invoice
      </Button>
    </form>
  );
}
