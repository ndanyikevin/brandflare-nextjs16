// app/api/weeks/route.ts
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const weeks = await prisma.workWeek.findMany({
      orderBy: { startsOn: "desc" }, // latest first
    });
    return new Response(JSON.stringify(weeks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch weeks" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
