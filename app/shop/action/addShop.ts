'use server'

import { db } from "@/lib/db";
import { BalanceChart, Shopping, ShoppingItem, Wallet, Withdraw } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function AddShopAction(inputData: any, itemsChecked: any) {
  const session: any = await getServerSession()
  const wallet = await db.select().from(Wallet).where(eq(Wallet.userEmail, session?.user?.email))

  if (wallet[0] && itemsChecked.length > 0) {
    await db.transaction(async (tx) => {
      try {
        const shop = await tx.insert(Shopping).values({
          description: inputData.description,
          purchaseDate: inputData.purchaseDate,
          userEmail: session?.user?.email
        }).returning()

        let totalPrice: number = 0
        const purchaseDate = inputData.purchaseDate.split('-')
        const year = parseInt(purchaseDate[0])
        const month = parseInt(purchaseDate[1])

        console.log(itemsChecked, shop)

        itemsChecked.map(async (item: any) => {

          if (item.id !== 0) {

            totalPrice = totalPrice + (item.amount * item.price)

            await tx.insert(ShoppingItem).values({
              itemId: item.id,
              shoppingId: shop[0].id,
              amount: item.amount,
              price: item.price,
              unit: item.unit,
              totalPrice: item.amount * item.price
            })
          }
        })

        console.log(await tx.select().from(Shopping),'====')

        await tx.insert(Withdraw).values({
          pulledOn: shop[0].createdAt.toISOString(),
          amount: totalPrice,
          description: inputData.description,
          userEmail: session?.user?.email
        })

        await tx.update(Wallet).set({
          balance: wallet[0].balance - totalPrice,
          expenditure: wallet[0].expenditure + totalPrice,
        }).where(eq(Wallet.userEmail, session?.user?.email))

        const isBalanceChart = await tx.select().from(BalanceChart)
          .where(and(eq(BalanceChart.month, month), eq(BalanceChart.year, year), eq(BalanceChart.userEmail, session?.user?.email)))

        if (isBalanceChart.length > 0) {
          await tx.update(BalanceChart).set({
            balance: isBalanceChart[0].balance - totalPrice,
            expenditure: isBalanceChart[0].expenditure + totalPrice,
          }).where(and(eq(BalanceChart.month, month), eq(BalanceChart.year, year), eq(BalanceChart.userEmail, session?.user?.email)))
        }
        else {
          await tx.insert(BalanceChart).values({
            month: month,
            year: year,
            balance: totalPrice,
            income: 0,
            expenditure: totalPrice,
            userEmail: session?.user?.email
          })
        }

      } catch (err) {
        tx.rollback()
        console.log(err)
      }
    })
  }
}