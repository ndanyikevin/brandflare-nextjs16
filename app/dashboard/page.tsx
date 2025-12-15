
import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/TodoList";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";


const Homepage = async () => {
  const session = await getServerSession();
  const user = session?.user;

  if (user?.role !== "ADMIN") redirect('/');
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className=" p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart />
      </div>
      <div className=" p-4 rounded-lg">
        <CardList title="Latest Clients" />
      </div>
      <div className=" p-4 rounded-lg">
        <AppPieChart />
      </div>
      <div className=" p-4 rounded-lg"><TodoList/></div>
      <div className=" p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className=" p-4 rounded-lg">
        <CardList title="Popular Content" />
      </div>
    </div>
  );
};

export default Homepage;