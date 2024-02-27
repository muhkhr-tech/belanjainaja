'use server'

import { db } from "@/lib/db"
import { Shopping } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

export async function GetShops() {
  const session:any = await getServerSession()
  const data = await db.select().from(Shopping).where(eq(Shopping.userEmail, session?.user?.email))
  console.log(await db.select().from(Shopping),'--------------')
  return data
}