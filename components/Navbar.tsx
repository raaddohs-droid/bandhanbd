'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
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
              Browse Profiles
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="/login"
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/register"
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all shadow-md"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}