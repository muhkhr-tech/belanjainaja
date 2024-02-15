import { db } from "@/lib/db"
import { Deposit } from "@/lib/schema"
import { SQL, eq } from "drizzle-orm"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date_param = searchParams.get('date')
  // const date = typeof date_param === 'string' || typeof date_param === 'number' ? new Date(date_param) : null;
  const date: string | SQL<unknown> | undefined = date_param ? new Date(date_param).toISOString() : undefined;

  const resp = await db.select().from(Deposit)

  // const resp = await db.select().from(Deposit).where(eq(new Date(Deposit.savedOn).setHours(0, 0, 0, 0), date.setHours(0, 0, 0, 0))))
  
  return new Response(JSON.stringify(resp))
}