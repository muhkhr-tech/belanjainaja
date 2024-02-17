import { db } from "@/lib/db"
import { Shopping } from "@/lib/schema"

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {

  const resp = await db.select().from(Shopping)

  return new Response(JSON.stringify(resp))
}