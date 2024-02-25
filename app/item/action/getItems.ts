'use server'

import { db } from "@/lib/db";
import { Item, ItemType } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function GetItems() {
    const data = await db.select().from(Item).leftJoin(ItemType, eq(Item.typeId, ItemType.id))
    return data
}