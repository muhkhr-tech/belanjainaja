'use server'

import { db } from "@/lib/db"
import { Withdraw } from "@/lib/schema"

export async function GetWithdraws() {
  const data = await db.select().from(Withdraw)

  return data
}