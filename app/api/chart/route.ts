import { db } from "@/lib/db"
import { BalanceChart } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const yearParam: any = searchParams.get('year')
  const year = new Date().getFullYear()
  let resp = null
  
  if (yearParam != 'null') {
    resp = await db.select().from(BalanceChart).where(eq(BalanceChart.year, parseInt(yearParam)))
  } else {
    resp = await db.select().from(BalanceChart).where(eq(BalanceChart.year, year))
  }

  return new Response(JSON.stringify(resp))
}