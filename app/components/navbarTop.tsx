'use client'

import { useState } from "react"
import DetailWallet from "./button/detailWallet"

interface IntfData {
  balance: number,
  income: number,
  expenditure: number,
  createdAt: Date,
  updatedAt: Date
}

export default function NavbarTopSection() {
  const [modal, setModal] = useState(false)
  const [data, setData] = useState<[IntfData]>([{
    balance: 0,
    income: 0,
    expenditure: 0,
    createdAt: new Date,
    updatedAt: new Date
  }])
  const [isLoadData, setLoadData] = useState(false)

  const handleChange = async () => {
    setModal(!modal)

    if (!modal) {
      setLoadData(true)

      try {
        const resp = await fetch("/api/wallet")
        setData(await resp.json())

      } catch (err) { console.log(err) }
      finally {
        setLoadData(false)
      }

    }
  }

  return (
    <div className="flex justify-end w-screen p-2">
      <DetailWallet/>
    </div>
  )
}