'use server'

import { db } from "@/lib/db";
import { ItemType } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function GetItemTypes() {
  const session:any = await getServerSession()
  const data = await db.select().from(ItemType).where(eq(ItemType.userEmail, session?.user?.email))
  return data
}