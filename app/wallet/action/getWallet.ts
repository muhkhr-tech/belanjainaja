'use server'

import { db } from "@/lib/db"
import { Wallet } from "@/lib/schema"

export async function GetWallet() {
  const data = await db.select().from(Wallet)

  return data
}