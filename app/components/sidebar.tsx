'use client'

import Link from "next/link";
import Menu from "../lib/navigation/menu";
import { usePathname } from "next/navigation";

export default function SidebarSection() {
  const menu = Menu()
  const pathname = usePathname()

  return (
    <ul className="menu w-56 h-full min-h-screen mt-5 px-5">
      {menu.map((item, index) => (
        <li key={index} className='mb-1 me-0'>
          <Link className={pathname === item.path ? 'text-blue-700 flex justify-end' : 'bg-base-100 flex justify-end'} href={item.path}>
          {item.name} {item.icon}</Link></li>
      ))}
    </ul>
  )
}