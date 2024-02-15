'use server'

import { db } from "@/lib/db";
import { BalanceChart, Shopping, ShoppingItem, Wallet, Withdraw } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

export default async function AddShopAction(inputData: any, itemsChecked: any) {
  try {
    const shop = await db.insert(Shopping).values({
      description: inputData.description,
      purchaseDate: inputData.purchaseDate
    }).returning()

    let totalPrice: number = 0
    const purchaseDate = inputData.purchaseDate.split('-')
    const year = parseInt(purchaseDate[0])
    const month = parseInt(purchaseDate[1])

    itemsChecked.map(async (item: any) => {
      
      if (item.id !== 0) {

        totalPrice = totalPrice + (item.amount * item.price)

        await db.insert(ShoppingItem).values({
          itemId: item.id,
          shoppingId: shop[0].id,
          amount: item.amount,
          price: item.price,
          unit: item.unit,
          totalPrice: item.amount * item.price
        })
      }
    })

    await db.insert(Withdraw).values({
      pulledOn: shop[0].createdAt.toISOString(),
      amount: totalPrice,
      description: inputData.description
    })
  
    const wallet = await db.select().from(Wallet)
    
    await db.update(Wallet).set({
      balance: wallet[0].balance - totalPrice,
      expenditure: wallet[0].expenditure + totalPrice,
    })

  const isBalanceChart = await db.select().from(BalanceChart).where(and(eq(BalanceChart.month, month), eq(BalanceChart.month, month)))
  
  if (isBalanceChart.length > 0) {
    await db.update(BalanceChart).set({
      balance: isBalanceChart[0].balance - totalPrice,
      expenditure: isBalanceChart[0].expenditure + totalPrice,
    }).where(and(eq(BalanceChart.month, month), eq(BalanceChart.month, month)))
  }
  else {
    await db.insert(BalanceChart).values({
      month: month,
      year: year,
      balance: wallet[0].balance - totalPrice,
      income: 0,
      expenditure: wallet[0].expenditure + totalPrice
    })
  }

  } catch (err) {
    console.log(err)
  }
}