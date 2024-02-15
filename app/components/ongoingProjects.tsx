export default function OngoingProjectsSection() {
  return (
    <div className="mb-10 transition ease-in duration-300" id="ongoing">
      <h2 className="text-3xl text-slate-700 mb-5">Ongoing Projects</h2>
      <ul className="mb-5">
        <p>~ “Belanjain Aja”</p>
        <p className="mb-2 text-sm">
          Sebuah website yang berfungsi untuk mengatur belanja bulanan sesuai dengan budget yang ada.
        </p>
        <div className="mb-2 text-sm">
          <p className="text-slate-500">Latar Belakang :</p>
          <p>
            Berdasarkan pengalaman kami, kami merasa sulit mengatur pengeluaran bulanan karena seringnya membeli barang yang tidak sesuai dengan budget kami.
          </p>
        </div>
        <div className="text-sm">
          <p className="text-slate-500">Teknologi yang digunakan :</p>
          <ul className="ms-4 list-disc">
            <li>Next.js</li>
            <li>Tailwind CSS</li>
            <li>Postgres Serverless SQL</li>
            <li>Vercel</li>
          </ul>
        </div>
      </ul>
    </div>
  )
}