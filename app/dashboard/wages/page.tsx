// app/dashboard/wages/page.tsx
import { fetchWeeksAndEmployees } from "./actions";
import WagesClient from "./wages-client";

export default async function WagesPage() {
  const { weekOptions, employees } = await fetchWeeksAndEmployees();

  return <WagesClient weekOptions={weekOptions} employees={employees} />;
}
