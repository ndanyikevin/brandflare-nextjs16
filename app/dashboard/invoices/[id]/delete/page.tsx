
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

// Type for invoice
type Client = { id: number; name: string };
type Invoice = { id: number; client: Client };

export default async function DeleteInvoicePage(props: {
    params: Promise<{ id: string }>;
}) {
    const params = await props.params;
    const id = parseInt(params.id);

    if (isNaN(id)) {
        throw new Error("Invalid invoice ID");
    }

    // Server Action for deleting invoice
    async function deleteInvoice() {
        "use server";

        const invoice = await prisma.invoice.findUnique({
            where: { id },
        });

        if (!invoice) {
            throw new Error("Invoice not found");
        }

        // Delete invoice (cascade handles related items/payments)
        await prisma.invoice.delete({ where: { id } });

        // Optional: revalidate invoices page if using ISR or caching
        revalidatePath("/dashboard/invoices");
        redirect("/dashboard/invoices");
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold">Delete Invoice</h1>
            <p>
                Are you sure you want to delete invoice{" "}
                <strong>
                    INV-{new Date().getFullYear().toString().slice(-2)}
                    {id.toString().padStart(4, "0")}
                </strong>{" "}
                ?
            </p>

            <div className="flex gap-2">
                <Link href="/dashboard/invoices">
                    <Button variant="outline">Cancel</Button>
                </Link>
                <form action={deleteInvoice}>
                    <Button type="submit" className="bg-red-500 text-white">
                        Delete
                    </Button>
                </form>
            </div>
        </div>
    );
}
