'use server'

import { db } from "@/lib/db"
import { Wallet } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

export async function GetWallet() {
  const session: any = await getServerSession()
  const data = await db.select().from(Wallet).where(eq(Wallet.userEmail, session?.user?.email))
  
  return data
}