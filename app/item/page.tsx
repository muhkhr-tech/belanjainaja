import GetItemTypes from "../item-type/action/getItemType";
import GetItems from "./action/getItems";
import AddItem from "./addItem";
import EditItem from "./editItem";

export default async function ItemPage() {
  const rows = await GetItems()

  const itemTypes = await GetItemTypes()

  return (
    <>
      <div className="block sm:hidden">
        {rows.map((row: any, index: number) => (
          <div key={index} className="mb-1 border-b-2">
            <h4 className="font-semibold text-xs">{index+1}. {row.ba_items.name}</h4>
            <p className="text-xs">Rp{row.ba_items.price}</p>
          </div>))}
      </div>
      <div className="hidden sm:block">
        <AddItem itemTypes={itemTypes} />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 w-3">No.</th>
                <th scope="col" className="px-6 py-3">Nama Barang</th>
                <th scope="col" className="px-6 py-3">Jenis Barang</th>
                <th scope="col" className="px-6 py-3">Harga Barang (Rp)</th>
                <th scope="col" className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row: any, index: number) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{row.ba_items.name}</td>
                  <td className="px-6 py-4">{row.ba_item_types.name}</td>
                  <td className="px-6 py-4">{row.ba_items.price}</td>
                  <td>
                    <EditItem itemId={row.ba_items.id} itemTypes={itemTypes} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}