'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('biyekori_user')
      if (stored) setUser(JSON.parse(stored))
    } catch(e) {}
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowMenu(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('biyekori_user')
    setUser(null)
    setShowMenu(false)
    window.location.href = '/'
  }

  const isActive = (path: string) => pathname === path

  const planColors: Record<string, string> = {
    prottasha: '#6b7280',
    biswas: '#3b82f6',
    shopno: '#8b5cf6',
    proyash: '#f59e0b',
  }
  const planColor = planColors[user?.package] || '#6b7280'

  return (
    <nav style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 50, fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '22px', fontWeight: 700, background: 'linear-gradient(135deg, #e11d48, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Biye Kori
          </span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/profiles" style={{ fontSize: '14px', textDecoration: 'none', fontWeight: isActive('/profiles') ? 700 : 400, color: isActive('/profiles') ? '#e11d48' : '#4b5563' }}>
            Profiles
          </Link>
          {user && (
            <>
              <Link href="/interests" style={{ fontSize: '14px', textDecoration: 'none', fontWeight: isActive('/interests') ? 700 : 400, color: isActive('/interests') ? '#e11d48' : '#4b5563', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Interests
              </Link>
              <Link href="/dashboard" style={{ fontSize: '14px', textDecoration: 'none', fontWeight: isActive('/dashboard') ? 700 : 400, color: isActive('/dashboard') ? '#e11d48' : '#4b5563' }}>
                Dashboard
              </Link>
            </>
          )}
          <Link href="/pricing" style={{ fontSize: '14px', textDecoration: 'none', color: '#4b5563' }}>
            Pricing
          </Link>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user ? (
            <>
              {/* Upgrade CTA for free users */}
              {user.package === 'prottasha' && (
                <Link href="/pricing" style={{ padding: '7px 16px', background: 'linear-gradient(135deg, #e11d48, #9333ea)', color: 'white', borderRadius: '20px', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}>
                  ⭐ Upgrade
                </Link>
              )}

              {/* User avatar + dropdown */}
              <div style={{ position: 'relative' }} ref={menuRef}>
                <button onClick={() => setShowMenu(!showMenu)} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '6px 10px', borderRadius: '12px', border: 'none',
                  background: showMenu ? '#f9fafb' : 'transparent', cursor: 'pointer'
                }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg, #e11d48, #9333ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {user.photo_url
                      ? <img src={user.photo_url} alt={user.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span style={{ color: 'white', fontSize: '14px', fontWeight: 700 }}>{user.full_name?.charAt(0) || 'U'}</span>
                    }
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#1f2937', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.full_name?.split(' ')[0]}
                    </p>
                    <p style={{ margin: 0, fontSize: '10px', fontWeight: 600, color: planColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {user.package || 'prottasha'}
                    </p>
                  </div>
                  <svg style={{ width: '14px', height: '14px', color: '#9ca3af', transition: 'transform 0.2s', transform: showMenu ? 'rotate(180deg)' : 'rotate(0deg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {showMenu && (
                  <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '8px', width: '260px', background: 'white', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #f3f4f6', overflow: 'hidden', zIndex: 100 }}>

                    {/* User info header */}
                    <div style={{ padding: '16px', background: 'linear-gradient(135deg, #fff5f7, #faf5ff)', borderBottom: '1px solid #f3f4f6' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg, #e11d48, #9333ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {user.photo_url
                            ? <img src={user.photo_url} alt={user.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : <span style={{ color: 'white', fontSize: '18px', fontWeight: 700 }}>{user.full_name?.charAt(0)}</span>
                          }
                        </div>
                        <div>
                          <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#1f2937' }}>{user.full_name}</p>
                          <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{user.phone || user.email}</p>
                        </div>
                      </div>
                      {/* Plan badge */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '8px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
                        <div>
                          <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>Current Plan</p>
                          <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: planColor, textTransform: 'capitalize' }}>{user.package || 'Prottasha'}</p>
                        </div>
                        {user.package === 'prottasha' && (
                          <Link href="/pricing" onClick={() => setShowMenu(false)} style={{ padding: '5px 12px', background: 'linear-gradient(135deg, #e11d48, #9333ea)', color: 'white', borderRadius: '8px', fontSize: '11px', fontWeight: 700, textDecoration: 'none' }}>
                            Upgrade →
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Menu items */}
                    <div style={{ padding: '8px 0' }}>
                      {[
                        { href: '/dashboard', icon: '📊', label: 'Dashboard' },
                        { href: '/interests', icon: '💌', label: 'My Interests' },
                        { href: '/profile/me', icon: '👤', label: 'My Profile' },
                        { href: '/pricing', icon: '⭐', label: 'Upgrade Plan' },
                      ].map(({ href, icon, label }) => (
                        <Link key={href} href={href} onClick={() => setShowMenu(false)} style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '10px 16px', textDecoration: 'none', color: '#374151', fontSize: '13px', fontWeight: 500,
                          transition: 'background 0.15s'
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <span style={{ fontSize: '16px' }}>{icon}</span>
                          {label}
                        </Link>
                      ))}
                    </div>

                    {/* Logout */}
                    <div style={{ padding: '8px 0', borderTop: '1px solid #f3f4f6' }}>
                      <button onClick={handleLogout} style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 16px', background: 'transparent', border: 'none',
                        color: '#ef4444', fontSize: '13px', fontWeight: 500, cursor: 'pointer', textAlign: 'left'
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#fef2f2')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span style={{ fontSize: '16px' }}>🚪</span>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link href="/login" style={{ padding: '8px 18px', fontSize: '13px', fontWeight: 600, color: '#4b5563', textDecoration: 'none', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                Login
              </Link>
              <Link href="/register" style={{ padding: '8px 18px', fontSize: '13px', fontWeight: 600, color: 'white', textDecoration: 'none', borderRadius: '8px', background: 'linear-gradient(135deg, #e11d48, #9333ea)' }}>
                Register Free
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
