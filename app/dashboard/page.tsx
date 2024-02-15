import FilterYear from "../components/dashboard/filterYear"
import BalanceChart from "./balanceChart"
import TypeItemsCarousel from "./typeItemsCarousel"

export default async function DashoardPage() {
  const currentDate = new Date()

  const resp = await fetch(`${process.env.BASE_URL}/api/wallet`, { cache: 'no-store' })
  const wallet = await resp.json()

  const resp_deposit = await fetch(`${process.env.BASE_URL}/api/deposit?date=${currentDate}`, { cache: 'no-store' })
  const deposit = await resp_deposit.json()

  const resp_withdraw = await fetch(`${process.env.BASE_URL}/api/withdraw?date=${currentDate}`, { cache: 'no-store' })
  const withdraw = await resp_withdraw.json()

  const status = () => {
    if (wallet[0].balance >= 500000) {
      return {
        level: 3,
        message: 'Belanjain Aja',
        color: 'text-green-700',
        bgColor: 'bg-green-200',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
      }
    } else if (wallet[0].balance < 500000 && wallet[0].balance > 100000) {
      return {
        level: 2,
        message: 'Iritin Aja',
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-200',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
      }
    } else {
      return {
        level: 1,
        message: 'Diemin Aja',
        color: 'text-red-700',
        bgColor: 'bg-red-200',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

      }
    }
  }

  return (
    <div>
      <div className="hidden mb-2 sm:grid grid-cols-1 sm:grid-cols-4">
        <FilterYear/>
      </div>
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="hidden sm:block col-span-3">
        <BalanceChart />
      </div>
      <div className="col-span-1">
        <div className="flex sm:hidden card card-compact bg-base-100 shadow-sm border mb-2">
          <TypeItemsCarousel />
        </div>
        <div className={`${status().bgColor} card card-compact shadow-sm mb-2`}>
          <div className="card-body">
            <h2 className="card-title">Status</h2>
            <p className={`${status().color} inline-flex items-center gap-1`}>{status().icon}
              {status().message}</p>
          </div>
        </div>
        <div className="hidden sm:block card card-compact bg-base-100 shadow-sm border border-slate-50 mb-2">
          <div className="card-body">
            <h2 className="card-title">Transaksi</h2>
            <p className="font-semibold text-slate-500">Pemasukan</p>
            <p className="">Rp{wallet[0].income}</p>
            <hr />
            <p className="font-semibold text-slate-500">Pengeluaran</p>
            <p className="">Rp{wallet[0].expenditure}</p>
            <hr />
            <p className="font-semibold text-slate-500">Saldo</p>
            <p className="text-warning">Rp{wallet[0].balance}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}