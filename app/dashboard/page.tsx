
// import AppAreaChart from "@/components/AppAreaChart";
// import AppBarChart from "@/components/AppBarChart";
// import AppPieChart from "@/components/AppPieChart";
// import CardList from "@/components/CardList";
// import TodoList from "@/components/TodoList";
// import { getServerSession } from "@/lib/get-session";
// import { redirect } from "next/navigation";


// const Homepage = async () => {
//   const session = await getServerSession();
//   const user = session?.user;

//   if (user?.role !== "ADMIN") redirect('/');
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
//       <div className=" p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
//         <AppBarChart />
//       </div>
//       <div className=" p-4 rounded-lg">
//         <CardList title="Latest Clients" />
//       </div>
//       <div className=" p-4 rounded-lg">
//         <AppPieChart />
//       </div>
//       <div className=" p-4 rounded-lg"><TodoList/></div>
//       <div className=" p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
//         <AppAreaChart />
//       </div>
//       <div className=" p-4 rounded-lg">
//         <CardList title="Popular Content" />
//       </div>
//     </div>
//   );
// };

// export default Homepage;

import InvoiceTable from "./invoices/InvoiceTable";
import InvoiceForm from "./invoices/InvoiceForm";
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
