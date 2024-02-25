'use client'

import { useState } from "react"
import { GetShopItems } from "./action/getShopItems"

export default function DetailShop({ item }: any) {
  const [modal, setModal] = useState(false)
  const [items, setItems] = useState([])
  const [isLoadData, setLoadData] = useState(false)

  const handleChange = async () => {
    setModal(!modal)

    if (!modal) {
      setLoadData(true)
      try {
        const data:any = await GetShopItems(item.id)
        setItems(data)
      } catch (err) { console.log(err) }
      finally {
        setLoadData(false)
      }
    }
  }

  const convertPurchasedDate = (date: string) => {
    const purchaseDate = new Date(date)
    return purchaseDate
  }

  return (
    <div>
      <button className="flex sm:hidden text-xs text-info w-full justify-center" onClick={handleChange}>
        Detail
      </button>

      <button className="hidden sm:flex btn btn-sm  text-white btn-info" onClick={handleChange}>
        Detail
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box w-screen h-screen max-h-full rounded-none sm:w-2/5 sm:h-4/5 sm:max-w-full sm:rounded-xl">
          <form method="dialog">
            <button onClick={handleChange} className="btn btn-sm btn-circle absolute right-5 top-5">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-5 border-b-2 pb-2">Struk Belanja</h3>
          <div className="mb-2">
            <div className="text-xs font-semibold">Tanggal Beli</div>
            <p className="text-xs text-slate-500 italic">
              {new Intl.DateTimeFormat('id', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format(convertPurchasedDate(item.purchaseDate))}
            </p>
          </div>

          <div className="mb-2">
            <div className="text-xs font-semibold">Keterangan</div>
            <p className="text-xs">{item.description}</p>
          </div>

          <div className="relative overflow-x-auto">
            {isLoadData ? <span className="loading"></span>
              : <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className=" py-0 w-0">#</th>
                    <th scope="col" className="px-3 py-0">Nama Barang</th>
                    <th scope="col" className="px-1 py-0">Harga</th>
                    <th scope="col" className="w-4">Jumlah</th>
                    <th scope="col" className="px-1 py-0 w-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row: any, index: any) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="">{index + 1}</td>
                      <td className="px-3">{row.ba_items.name}</td>
                      <td className="px-1">{row.ba_shopping_items.price}/{row.ba_shopping_items.unit}</td>
                      <td className="px-1">{row.ba_shopping_items.amount}</td>
                      <td className="px-1">{row.ba_shopping_items.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>}
          </div>
        </div>
      </div>
    </div>
  )
}