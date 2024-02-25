import GetItemTypes from "../item-type/action/getItemType"

export default async function TypeItemsCarousel() {
  const data = await GetItemTypes()

  return (
    <div className="carousel carousel-center max-w-md p-2 rounded-md space-x-2 text-xs">
      {data.map((item: any, index: any) => (
        <div key={index} className="carousel-item bg-slate-200 rounded-md"><span className="rounded-box px-2">{item.name}</span></div>
      ))}
    </div>
  )
}