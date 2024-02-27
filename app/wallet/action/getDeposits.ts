'use server'

import { db } from "@/lib/db"
import { Deposit } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

export async function GetDeposits() {
  const session:any = await getServerSession()
  const data = await db.select().from(Deposit).where(eq(Deposit.userEmail, session?.user?.email))

  return data
}