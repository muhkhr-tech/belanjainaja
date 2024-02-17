import { db } from "@/lib/db"
import { Withdraw } from "@/lib/schema"

export const dynamic = 'force-dynamic'

export async function GET() {

  const resp = await db.select().from(Withdraw)

  return new Response(JSON.stringify(resp))
}