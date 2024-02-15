'use client'

import { useRouter } from "next/navigation"
import SetStatus from "../action/setStatus"
import { useState } from "react"

export default function ActivateButton({ typeId, status }: any) {
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  const handleToggle = async (e: any) => {

    setLoading(true)

    try {
      await SetStatus(typeId, !status)
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
      router.refresh()
    }
  }
  
  return (
    <>
    {isLoading ? <span className="loading"></span>
     : <input type="checkbox" className="toggle toggle-success" checked={status} onChange={handleToggle} />}
    </>
  )
}