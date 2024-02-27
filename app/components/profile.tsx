'use client'

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
  const { data: session } = useSession()

  return (
    <>
      <div className="flex justify-end me-0 mt-2 sm:mt-5 mb-5 sm:mb-10">
        <Image
          src={session?.user?.image ?? ""}
          width={50}
          height={40}
          className="rounded-full block"
          alt="Picture of the author"
        />
      </div>
      {/* <div className="flex justify-end mb-4 ms-auto text-xs text-slate-700">{session?.user?.name}</div> */}
    </>
  )
}