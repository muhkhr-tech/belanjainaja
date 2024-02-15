import { db } from "@/lib/db"
import { ItemType } from "@/lib/schema"

export async function GET(request: Request) {

    const resp = await db.select().from(ItemType)
    
    return new Response(JSON.stringify(resp))
}