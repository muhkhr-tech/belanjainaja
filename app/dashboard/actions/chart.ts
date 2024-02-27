'use server'

import { db } from "@/lib/db"
import { BalanceChart } from "@/lib/schema"
import { and, eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

export default async function WalletChart(year: any) {
  const session: any = await getServerSession()

  let data = null
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  if (year != null) {
    data = await db.select().from(BalanceChart).where(and(eq(BalanceChart.year, parseInt(year)), eq(BalanceChart.userEmail, session?.user?.email)))
  } else {
    data = await db.select().from(BalanceChart).where(and(eq(BalanceChart.year, currentYear), eq(BalanceChart.userEmail, session?.user?.email)))
  }

  return data
}