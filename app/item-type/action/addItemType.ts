'use server'

import { db } from "@/lib/db";
import { ItemType } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function AddItemTypeAction(name: any) {
  const session: any = await getServerSession()

  const data = await db.select().from(ItemType).where(and(eq(ItemType.name, name), eq(ItemType.userEmail, session?.user?.email)))

  if (data.length > 0) {
    return false
  } else {
    await db.insert(ItemType).values({
      name: name,
      isActive: true,
      userEmail: session?.user?.email
    })
  }
}