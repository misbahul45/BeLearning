'use client'
import { SIDE_LIST } from '@/constants/layout'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { signoutAction } from '@/actions/auth.actions'

const SidenavHome = () => {
  const pathName = usePathname()

  const handleLogout = async (e:React.FormEvent) => {
        e.preventDefault()
        await signoutAction()
  }

  return (
    <aside className="h-full w-64 hidden md:flex flex-col justify-between inset-y-0 z-50 bg-white border-r shadow-md overflow-y-auto py-6">
      {/* Logo Section */}
      <div className="text-center">
        <Image src="/images/logo.png" alt="logo" width={100} height={100} className="mx-auto mb-4" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-3">
        {SIDE_LIST.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              pathName === item.path
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-transparent text-gray-600 hover:bg-blue-100 hover:text-blue-500'
            }`}
          >
            <item.icon className="text-lg" />
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <form onSubmit={handleLogout} className="px-4 mt-6">
        <Button type="submit" className="w-full group">
         <LogOut className="size-4 group-hover:translate-x-0.5 transition-all duration-300" />
          <span className="mr-2">
            Logout
          </span>
        </Button>
      </form>
    </aside>
  )
}

export default SidenavHome
