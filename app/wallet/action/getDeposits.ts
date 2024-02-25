'use server'

import { db } from "@/lib/db"
import { Deposit } from "@/lib/schema"

export async function GetDeposits() {
  const data = await db.select().from(Deposit)

  return data
}