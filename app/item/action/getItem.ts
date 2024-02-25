'use server'

import { db } from "@/lib/db";
import { Item } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function GetItem(itemId: any) {
    const data = await db.select().from(Item).where(eq(Item.id, itemId));
    return data[0]
}