'use server'

import { db } from "@/lib/db";
import { Item } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function EditItemAction(data: any, itemId: any) {
    await db.update(Item).set({
        name: data.name,
        price: data.price,
        typeId: parseInt(data.typeId)
    }).where(eq(Item.id, itemId))
}