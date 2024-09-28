'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  admin?: boolean
}

export default function Navbar({ admin = true }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/catalog', label: 'Catalog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="z-50 bg-primary backdrop-blur-sm p-4 fixed top-0 left-0 w-full text-primary-foreground shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">Velocity</span>
              <span className="text-2xl font-bold text-red-500">APEX</span>
            </Link>
          </div>
          <div className=" flex items-center md:space-x-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} passHref legacyBehavior>
                <Button variant="ghost" className="text-white text-sm hover:bg-primary-dark hover:text-white">
                  {item.label}
                </Button>
              </Link>
            ))}
            {admin && (
              <Link href="/admin-dashboard" passHref legacyBehavior>
                <Button size='sm' variant="destructive" className="text-sm">
                  Admin Panel
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}