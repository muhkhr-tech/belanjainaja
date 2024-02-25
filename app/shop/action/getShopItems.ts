'use server'

import { db } from "@/lib/db"
import { Item, ShoppingItem } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function GetShopItems(shoppingId: number) {

  const data = await db.select().from(ShoppingItem)
    .where(eq(ShoppingItem.shoppingId, shoppingId))
    .leftJoin(Item, eq(ShoppingItem.itemId, Item.id))

  return data
}