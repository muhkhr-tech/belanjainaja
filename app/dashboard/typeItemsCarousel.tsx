export default async function TypeItemsCarousel() {
  const resp = await fetch(`${process.env.BASE_URL}/api/item-type`)
  const data = await resp.json()

  return (
    <div className="carousel carousel-center max-w-md p-2 rounded-md space-x-2 text-xs">
      {data.map((item: any, index: any) => (
        <div key={index} className="carousel-item bg-slate-200 rounded-md"><span className="rounded-box px-2">{item.name}</span></div>
      ))}
    </div>
  )
}