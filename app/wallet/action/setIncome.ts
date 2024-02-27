'use server'

import { db } from "@/lib/db";
import { BalanceChart, Deposit, Wallet } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function SetIncomeAction(inputData: any) {
  const session: any = await getServerSession()
  const wallet = await db.select().from(Wallet).where(eq(Wallet.userEmail, session?.user?.email))

  const data = inputData
  const savedOnDate = data.savedOn.split('-')
  const year = parseInt(savedOnDate[0])
  const month = parseInt(savedOnDate[1])

  if (wallet[0]) {
    await db.transaction(async (tx) => {
      try {
        await tx.insert(Deposit).values({
          savedOn: data.savedOn,
          amount: parseInt(data.amount),
          description: data.description,
          userEmail: session?.user?.email
        })

        await tx.update(Wallet).set({
          balance: wallet[0].balance + parseInt(data.amount),
          income: wallet[0].income + parseInt(data.amount),
        }).where(eq(Wallet.userEmail, session?.user?.email))

        const isBalanceChart = await tx.select().from(BalanceChart)
          .where(and(eq(BalanceChart.month, month), eq(BalanceChart.year, year), eq(BalanceChart.userEmail, session?.user?.email)))

        if (isBalanceChart.length > 0) {
          await tx.update(BalanceChart).set({
            balance: isBalanceChart[0].balance + parseInt(data.amount),
            income: isBalanceChart[0].income + parseInt(data.amount),
          }).where(and(eq(BalanceChart.month, month), eq(BalanceChart.year, year), eq(BalanceChart.userEmail, session?.user?.email)))
        }
        else {
          await tx.insert(BalanceChart).values({
            month: month,
            year: year,
            balance: parseInt(data.amount),
            income: parseInt(data.amount),
            expenditure: 0,
            userEmail: session?.user?.email
          })
        }
      } catch (err) {
        tx.rollback()
        console.log(err)
      }
    })

  } else {
    await db.transaction(async (tx) => {
      try {
        await tx.insert(Deposit).values({
          savedOn: data.savedOn,
          amount: parseInt(data.amount),
          description: data.description,
          userEmail: session?.user?.email
        })

        await tx.insert(Wallet).values({
          balance: parseInt(data.amount),
          income: parseInt(data.amount),
          expenditure: 0,
          userEmail: session?.user?.email
        })

        const isBalanceChart = await tx.select().from(BalanceChart)
          .where(and(eq(BalanceChart.month, month), eq(BalanceChart.year, year), eq(BalanceChart.userEmail, session?.user?.email)))

        if (isBalanceChart.length > 0) {
          await tx.update(BalanceChart).set({
            balance: isBalanceChart[0].balance + parseInt(data.amount),
            income: isBalanceChart[0].income + parseInt(data.amount),
          }).where(and(eq(BalanceChart.month, month), eq(BalanceChart.year, year), eq(BalanceChart.userEmail, session?.user?.email)))
        }
        else {
          await tx.insert(BalanceChart).values({
            month: month,
            year: year,
            balance: parseInt(data.amount),
            income: parseInt(data.amount),
            expenditure: 0,
            userEmail: session?.user?.email
          })
        }
      }
      catch (err) {
        tx.rollback()
      }
    })
  }
}