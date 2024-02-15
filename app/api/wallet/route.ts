import { db } from "@/lib/db"
import { Wallet } from "@/lib/schema"

export async function GET() {
  
const resp = await db.select().from(Wallet)

  return new Response(JSON.stringify(resp))
}