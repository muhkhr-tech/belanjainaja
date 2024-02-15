'use server'

import { db } from "@/lib/db";
import { ItemType } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function SetStatus(typeId: any, status: any) {
  await db.update(ItemType).set({
    isActive: status
  }).where(eq(ItemType.id, typeId))
}