'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavbarProps {
  lang: 'en' | 'bn'
  setLang: (lang: 'en' | 'bn') => void
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Biye Kori
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`${
                isActive('/') 
                  ? 'text-pink-600 font-semibold' 
                  : 'text-gray-700 hover:text-pink-600'
              } transition-colors`}
            >
              Home
            </Link>
            <Link 
              href="/profiles" 
              className={`${
                isActive('/profiles') 
                  ? 'text-pink-600 font-semibold' 
                  : 'text-gray-700 hover:text-pink-600'
              } transition-colors`}
            >
              Profiles
            </Link>
            <Link 
              href="/about" 
              className={`${
                isActive('/about') 
                  ? 'text-pink-600 font-semibold' 
                  : 'text-gray-700 hover:text-pink-600'
              } transition-colors`}
            >
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="px-3 py-1 rounded-md bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
            >
              {lang === 'en' ? 'বাংলা' : 'English'}
            </button>
            <Link
              href="/login"
              className="px-4 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}