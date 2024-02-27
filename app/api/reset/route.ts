'use server'

import { db } from "@/lib/db";
import { BalanceChart, Deposit, Shopping, ShoppingItem, Wallet, Withdraw } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  await db.delete(ShoppingItem)
  await db.delete(Shopping)
  await db.delete(Wallet)
  await db.delete(ShoppingItem)
  // await db.update(Wallet).set({
  //   expenditure: 0,
  //   balance: 3000000
  // }).where(eq(Wallet.id, 31))
  await db.delete(Deposit)
  await db.delete(Withdraw)
  await db.delete(BalanceChart)
  await db.delete(ShoppingItem)
  // await db.update(BalanceChart).set({
  //   expenditure: 0,
  //   balance: 3000000
  // }).where(eq(BalanceChart.id, 8))

  return Response.json({ 'mesage': 'ok' })
}