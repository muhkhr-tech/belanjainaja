'use server'

import { db } from "@/lib/db";
import { ItemType } from "@/lib/schema";

export default async function GetItemTypes() {
    const resp = await db.select().from(ItemType)

    return resp
}