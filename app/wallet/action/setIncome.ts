'use server'

import { db } from "@/lib/db";
import { BalanceChart, Deposit, Wallet } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

export default async function SetIncomeAction(inputData: any) {
  const data = inputData
  const savedOnDate = data.savedOn.split('-')
  const year = parseInt(savedOnDate[0])
  const month = parseInt(savedOnDate[1])
  
  await db.insert(Deposit).values({
    savedOn: data.savedOn,
    amount: data.amount,
    description: data.description
  })

  const wallet = await db.select().from(Wallet)

  await db.update(Wallet).set({
    balance: wallet[0].balance + parseInt(data.amount),
    income: wallet[0].income + parseInt(data.amount),
  })

  const isBalanceChart = await db.select().from(BalanceChart).where(and(eq(BalanceChart.month, month), eq(BalanceChart.month, month)))
  
  if (isBalanceChart.length > 0) {
    await db.update(BalanceChart).set({
      balance: isBalanceChart[0].balance + parseInt(data.amount),
      income: isBalanceChart[0].income + parseInt(data.amount),
    }).where(and(eq(BalanceChart.month, month), eq(BalanceChart.month, month)))
  }
  else {
    await db.insert(BalanceChart).values({
      month: month,
      year: year,
      balance: wallet[0].balance + parseInt(data.amount),
      income: wallet[0].income + parseInt(data.amount),
      expenditure: 0
    })
  }
}