import { db } from "@/lib/db"
import { Item, ItemType } from "@/lib/schema"
import { eq, ilike } from "drizzle-orm"

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  let resp = null
  
  if (name) {
    resp = await db.select().from(Item).leftJoin(ItemType, eq(Item.typeId, ItemType.id)).where(ilike(Item.name, "%" + name + "%"))
  } else {
    resp = await db.select().from(Item).leftJoin(ItemType, eq(Item.typeId, ItemType.id))
  }

  return new Response(JSON.stringify(resp))
}