'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function FilterYear() {
  const searchParams = useSearchParams()
  const yearParam: any = searchParams.get('year')
  const [yearState, setYearState] = useState(yearParam)
  const router = useRouter()

  const startDate = 2020
  let endDate = new Date().getFullYear()

    let years: any = []

    for(endDate ; endDate>startDate ; endDate--) {
      years.push(endDate)
    }

    const handleOption = (e: any) => {
      setYearState(e.target.value)
      router.push(`/dashboard?year=${e.target.value}`)
    }
    
    return (
        <select name="" id="" onChange={handleOption} value={yearState} className="select select-sm select-bordered">
          {years.map((year: any, index: any) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </select>
    )
}