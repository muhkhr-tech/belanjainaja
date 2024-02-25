'use server'

import { db } from "@/lib/db"
import { Shopping } from "@/lib/schema"

export async function GetShops() {
  const data = await db.select().from(Shopping)
  return data
}