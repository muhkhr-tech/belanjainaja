'use client'

import Link from "next/link";
import Menu from "../lib/navigation/menu";
import { usePathname } from "next/navigation";
import AuthButton from "./button/authButton";
import Profile from "./profile";
import { signOut } from "next-auth/react";

export default function SidebarSection() {
  const menu = Menu()
  const pathname = usePathname()

  return (
    <ul className="menu w-56 h-full min-h-screen px-5">
      <div className="me-4"><Profile/></div>
      {menu.map((item, index) => (
        <li key={index} className='mb-1 me-0'>
          <Link className={pathname === item.path ? 'text-blue-700 flex justify-end' : 'bg-base-100 flex justify-end'} href={item.path}>
          {item.name} {item.icon}</Link></li>
      ))}
      <AuthButton/>
    </ul>
  )
}