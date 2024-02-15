'use server'

import { db } from "@/lib/db";
import { Item } from "@/lib/schema";
import { redirect } from "next/navigation";

export default async function AddItemAction(data: any) {
    await db.insert(Item).values({
        name: data.name,
        price: data.price,
        typeId: parseInt(data.typeId)
    })
}