"use client";

import React, { useState, useEffect } from 'react'
import { ShoppingCart, Menu, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useCart } from '@/components/CartContext'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartItems } = useCart()
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollThreshold = 200 // Increased threshold for smoother transition
      const progress = Math.min(scrollY / scrollThreshold, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsVisible(true)
  }, [pathname])

  const handleLogin = () => {
    router.push('/login')
  }

  const isHomePage = pathname === '/'

  const headerStyle = {
    backgroundColor: `rgba(255, 255, 255, ${scrollProgress * 0.1})`,
    backgroundImage: `linear-gradient(to right, rgba(37, 99, 235, ${1 - scrollProgress}), rgba(30, 64, 175, ${1 - scrollProgress}))`,
    boxShadow: `0 4px 6px -1px rgba(0, 0, 0, ${scrollProgress * 0.1}), 0 2px 4px -1px rgba(0, 0, 0, ${scrollProgress * 0.06})`,
    borderBottom: `1px solid rgba(255, 255, 255, ${scrollProgress * 0.2})`,
  }

  const textStyle = {
    color: `rgb(${255 - scrollProgress * 255}, ${255 - scrollProgress * 215}, ${255 - scrollProgress * 175})`,
  }

  const hoverStyle = {
    '--hover-color-start': 'rgba(37, 99, 235, 1)',
    '--hover-color-end': 'rgba(30, 64, 175, 1)',
  } as React.CSSProperties

  return (
    <header 
      className={`sticky top-0 z-10 transition-all duration-500 ease-in-out backdrop-blur-md py-4 ${
        isHomePage
          ? `${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`
          : ''
      }`}
      style={{...headerStyle, ...hoverStyle}}
    >
      <div className="container mx-auto px-4 flex justify-between items-center" style={textStyle}>
        <div className="flex items-center space-x-4">
          <Menu className="h-6 w-6 cursor-pointer md:hidden hover:text-[--hover-color-start] transition-colors" />
          <Link href="/" className="text-2xl font-bold tracking-tight hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[--hover-color-start] to-[--hover-color-end] transition-colors">
            Replug
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          {['Home', 'Car Parts', 'Brands', 'Offers', 'Contact'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
              className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[--hover-color-start] to-[--hover-color-end] transition-colors text-sm uppercase tracking-wide relative group"
            >
              {item}
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-[--hover-color-start] to-[--hover-color-end] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLogin}
            className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[--hover-color-start] to-[--hover-color-end] transition-colors flex items-center space-x-1 group"
          >
            <User className="h-5 w-5 group-hover:animate-bounce" />
            <span className="text-sm">Login</span>
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative hover:text-[--hover-color-start] transition-colors group"
          >
            <ShoppingCart className="h-6 w-6 cursor-pointer group-hover:animate-wiggle" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-pulse">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
