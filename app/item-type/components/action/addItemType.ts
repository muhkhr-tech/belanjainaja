'use server'

import { db } from "@/lib/db";
import { ItemType } from "@/lib/schema";

export default async function AddItemTypeAction(name: any) {
    await db.insert(ItemType).values({
        name: name,
        isActive: true
    })
}