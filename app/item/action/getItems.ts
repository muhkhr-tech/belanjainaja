'use server'

import { db } from "@/lib/db";
import { Item, ItemType } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function GetItems() {
  const session:any = await getServerSession()
  const data = await db.select().from(Item)
    .where(eq(Item.userEmail, session?.user?.email)).leftJoin(ItemType, eq(Item.typeId, ItemType.id))
  return data
}