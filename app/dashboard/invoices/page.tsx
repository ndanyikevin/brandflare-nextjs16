import InvoiceTable from "./InvoiceTable";
import InvoiceForm from "./InvoiceForm";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";


export default async function InvoicesPage() {
  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-24">
      <h1 className="text-2xl font-bold">Invoices</h1>

      {/* Add Invoice Button */}
      <div className="flex justify-end">
      
          <Link href="/dashboard/invoices/new">
            <Button>
              Add Invoice <UserPlus className="size-4" />
            </Button>
          </Link>
            
          
      </div>

      <InvoiceTable />
    </div>
  );
}
