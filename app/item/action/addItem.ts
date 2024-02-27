'use server'

import { db } from "@/lib/db";
import { Item } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function AddItemAction(data: any) {
  const session: any = await getServerSession()
  const items = await db.select().from(Item).where(and(eq(Item.name, data.name), eq(Item.userEmail, session?.user?.email)))

  if (items.length > 0) {
    return false
  } else {
    await db.insert(Item).values({
      name: data.name,
      price: data.price,
      typeId: parseInt(data.typeId),
      userEmail: session?.user?.email
    })
  }
}