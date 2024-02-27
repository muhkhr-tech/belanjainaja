'use server'

import { db } from "@/lib/db"
import { Withdraw } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

export async function GetWithdraws() {
  const session = await getServerSession()
  const data = await db.select().from(Withdraw).where(eq(Withdraw.userEmail, JSON.stringify(session?.user?.email)))

  return data
}