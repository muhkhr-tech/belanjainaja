'use client'

import { useEffect, useState } from "react"

interface IntfData {
  balance: number,
  income: number,
  expenditure: number,
  createdAt: Date,
  updatedAt: Date
}

export default function DetailWallet() {
  const [modal, setModal] = useState(false)
  const [data, setData] = useState<[IntfData]>([{
    balance: 0,
    income: 0,
    expenditure: 0,
    createdAt: new Date,
    updatedAt: new Date
  }])
  useEffect(() => {
    const updateData = async () => {
      const resp = await fetch("/api/wallet")
      setData(await resp.json())
    }

    updateData()
  }, [])

  const handleChange = async () => {
    setModal(!modal)
  }

  return (
    <div className="flex justify-end w-screen p-2">
      <button className="btn btn-sm rounded-full shadow-md text-white text-xs font-semibold bg-green-300" onClick={handleChange}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
        </svg> Rp{data[0]?.balance}
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box w-screen h-screen max-w-full max-h-full rounded-none">
          <form method="dialog">
            <button onClick={handleChange} className="btn btn-sm btn-circle absolute right-5 top-5">✕</button>
          </form>
          <h3 className="flex items-center font-semibold text-sm mb-5 border-b-2 pb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 me-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
            </svg> Detail Isi Dompet</h3>
          <div>
            <div>
              <div className="mb-3 text-sm">
                <p>Saldo</p>
                <p className="text-xs font-semibold">Rp{data[0]?.balance}</p>
              </div>
              <div className="mb-3 text-sm">
                <p>Pengeluaran</p>
                <p className="text-xs font-semibold">Rp{data[0]?.expenditure}</p>
              </div>
              <div className="mb-3 text-sm">
                <p>Pemasukan</p>
                <p className="text-xs font-semibold">Rp{data[0]?.income}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}