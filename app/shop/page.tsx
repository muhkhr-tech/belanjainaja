import AddShop from "./addShop"
import DetailShop from "./detailShop"

export default async function ShopPage() {
  const resp_shop = await fetch(`${process.env.BASE_URL}/api/shopping`, { cache: "no-store" })
  const rows = await resp_shop.json()

  const resp_item = await fetch(`${process.env.BASE_URL}/api/item`, { cache: "no-store" })
  const items = await resp_item.json()

  const convertPurchasedDate = (date: string) => {
    const purchaseDate = new Date(date)
    return purchaseDate
  }

  return (
    <div>
      <div className="block sm:hidden">
        <AddShop items={items} />
        {rows.map((row: any, index: number) => (
          <div key={index} className="flex justify-between items-center py-1 border-b-2 my-1">
            <div className="px-1">
              <div className="text-xs font-semibold">{index + 1}.
                {new Intl.DateTimeFormat('id', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format(convertPurchasedDate(row.purchaseDate))}</div>
              <div className="text-xs">{row.description}</div>
            </div>
            <DetailShop item={row}/>
          </div>
        ))}
      </div>
      <div className="hidden sm:block">
        <AddShop items={items} />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 w-3">No.</th>
                <th scope="col" className="px-6 py-3">Tanggal Beli</th>
                <th scope="col" className="px-6 py-3">Keterangan</th>
                <th scope="col" className="px-6 py-3">Dibuat</th>
                <th scope="col" className="px-6 py-3">Detail</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row: any, index: number) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{new Intl.DateTimeFormat('id', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }).format(convertPurchasedDate(row.purchaseDate))}</td>
                  <td className="px-6 py-4">{row.description}</td>
                  <td className="px-6 py-4">{new Intl.DateTimeFormat('id', {
                    weekday: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }).format(convertPurchasedDate(row.createdAt))}</td>
                  <td><DetailShop item={row}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}