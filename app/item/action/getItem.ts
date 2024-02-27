'use server'

import { db } from "@/lib/db";
import { Item } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function GetItem(itemId: any) {
  const session:any = await getServerSession()
  const data = await db.select().from(Item).where(and(eq(Item.id, itemId), eq(Item.userEmail, session?.user?.email)));
  return data[0]
}