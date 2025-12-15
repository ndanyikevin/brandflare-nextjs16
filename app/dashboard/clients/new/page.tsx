import Form from "next/form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NewClientPage() {
  async function createClient(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    await prisma.client.create({
      data: {
        name,
        email,
        phone,
        address,
      },
    });

    revalidatePath("/dashboard/clients");
    redirect("/dashboard/clients");
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card rounded-lg shadow-sm border border-border">
      <h1 className="text-2xl font-bold mb-6">Create New Client</h1>

      <form action={createClient} className="space-y-6">
        {/* NAME */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-lg">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full border border-input bg-background text-foreground rounded-md p-2 shadow-xs"
          />
        </div>

        {/* EMAIL */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-lg">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border border-input bg-background text-foreground rounded-md p-2 shadow-xs"
          />
        </div>

        {/* PHONE */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-lg">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="w-full border border-input bg-background text-foreground rounded-md p-2 shadow-xs"
          />
        </div>

        {/* ADDRESS */}
        <div className="space-y-2">
          <label htmlFor="address" className="block text-lg">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={4}
            className="w-full border border-input bg-background text-foreground rounded-md p-2 shadow-xs"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:opacity-90 transition shadow-sm"
        >
          Create Client
        </button>
      </form>
    </div>
  );
}
