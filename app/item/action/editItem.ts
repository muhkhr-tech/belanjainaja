'use server'

import { db } from "@/lib/db";
import { Item } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function EditItemAction(data: any, itemId: any) {
  const session:any = await getServerSession()
  await db.update(Item).set({
    name: data.name,
    price: data.price,
    typeId: parseInt(data.typeId),
    userEmail: session?.user?.email
  }).where(eq(Item.id, itemId))
}