import SetIncome from "./setIncome"

export default async function WalletPage() {
  const resp = await fetch(`${process.env.BASE_URL}/api/deposit`, { cache: 'no-store' })
  const rows = await resp.json()

  const convertPurchasedDate = (date: string) => {
    const purchaseDate = new Date(date)
    return purchaseDate
  }

  return (
    <div>
      <div className="block sm:hidden">
        <SetIncome />
        {rows.map((row: any, index: number) => (
          <div key={index} className="mb-1 border-b-2">
            <h4 className="font-semibold text-xs">{index + 1}. {row.description}</h4>
            <p className="text-xs">{new Intl.DateTimeFormat('id', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }).format(convertPurchasedDate(row.savedOn))}</p>
            <p className="text-xs">Rp{row.amount}</p>
          </div>))}
      </div>
      <div className="hidden sm:block">
        <SetIncome />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 w-3">No.</th>
                <th scope="col" className="px-6 py-3">Tanggal Pemasukan</th>
                <th scope="col" className="px-6 py-3">Jumlah</th>
                <th scope="col" className="px-6 py-3">Keterangan</th>
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
                  }).format(convertPurchasedDate(row.savedOn))}</td>
                  <td className="px-6 py-4">{row.amount}</td>
                  <td className="px-6 py-4">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}