"use client";

import { useState } from "react";

export default function InvoiceItemsInput() {
  const [items, setItems] = useState([
    { id: 0 },
  ]);

  function addItem() {
    setItems((prev) => [...prev, { id: prev.length }]);
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="grid grid-cols-5 gap-4 border p-3 rounded-md"
        >
          <input
            type="text"
            name={`items[${index}][description]`}
            placeholder="Description"
            className="border border-input rounded-md p-2"
          />
          <input
            type="text"
            name={`items[${index}][unitOfMeasurement]`}
            placeholder="unit of measurement"
            className="border border-input rounded-md p-2"
          />

          <input
            type="number"
            name={`items[${index}][quantity]`}
            placeholder="Qty"
            className="border border-input rounded-md p-2"
          />

          <input
            type="number"
            name={`items[${index}][unitPrice]`}
            placeholder="Unit Price"
            className="border border-input rounded-md p-2"
          />

          {/* <input
            type="number"
            name={`items[${index}][tax]`}
            placeholder="Tax %"
            className="border border-input rounded-md p-2"
          />

          <input
            type="number"
            name={`items[${index}][discount]`}
            placeholder="Discount %"
            className="border border-input rounded-md p-2"
          /> */}
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="px-4 py-2 border rounded-md bg-secondary text-secondary-foreground hover:opacity-80"
      >
        + Add Another Item
      </button>
    </div>
  );
}
