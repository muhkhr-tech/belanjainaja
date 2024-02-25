'use server'

import { db } from "@/lib/db"
import { BalanceChart } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { NextRequest } from "next/server"

export async function Chart(request: NextRequest) {
  const { searchParams } : any = request.nextUrl.searchParams
  const yearParam: any = searchParams.get('year')
  const year = new Date().getFullYear()
  let data = null
  
  if (yearParam != 'null') {
    data = await db.select().from(BalanceChart).where(eq(BalanceChart.year, parseInt(yearParam)))
  } else {
    data = await db.select().from(BalanceChart).where(eq(BalanceChart.year, year))
  }

  return data
}