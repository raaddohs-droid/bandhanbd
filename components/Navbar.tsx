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
    const handleClick = (e: MouseEvent) => {
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

  const planColors: Record<string, {color: string; bg: string}> = {
    prottasha: { color: '#6b7280', bg: '#f3f4f6' },
    biswas:    { color: '#2563eb', bg: '#eff6ff' },
    shopno:    { color: '#7c3aed', bg: '#f5f3ff' },
    proyash:   { color: '#d97706', bg: '#fffbeb' },
  }
  const plan = planColors[user?.package] || planColors.prottasha
  const completion = user?.profile_completion || 30

  return (
    <>
      {/* ── MAIN NAVBAR ── */}
      <nav style={{ background: 'white', borderBottom: '1px solid #f3f4f6', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '58px' }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px', fontWeight: 700, background: 'linear-gradient(135deg, #e11d48, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Biye Kori
            </span>
          </Link>

          {/* Center nav — logged in */}
          {user ? (
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {[
                { href: '/profiles', label: 'Profiles' },
                { href: '/interests', label: 'Interests' },
                { href: '/dashboard', label: 'Dashboard' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{
                  padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: isActive(href) ? 600 : 400,
                  color: isActive(href) ? '#e11d48' : '#4b5563', textDecoration: 'none',
                  background: isActive(href) ? '#fff1f2' : 'transparent',
                  borderBottom: isActive(href) ? '2px solid #e11d48' : '2px solid transparent',
                  transition: 'all 0.15s'
                }}>
                  {label}
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '4px' }}>
              {[
                { href: '/profiles', label: 'Browse' },
                { href: '/pricing', label: 'Pricing' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', color: '#4b5563', textDecoration: 'none' }}>
                  {label}
                </Link>
              ))}
            </div>
          )}

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {user ? (
              <>
                {user.package === 'prottasha' && (
                  <Link href="/pricing" style={{ padding: '7px 16px', background: 'linear-gradient(135deg, #e11d48, #9333ea)', color: 'white', borderRadius: '20px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    Upgrade Plan
                  </Link>
                )}

                <div style={{ position: 'relative' }} ref={menuRef}>
                  <button onClick={() => setShowMenu(!showMenu)} style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 10px 5px 5px',
                    borderRadius: '40px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer'
                  }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg, #e11d48, #9333ea)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {user.photo_url
                        ? <img src={user.photo_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span style={{ color: 'white', fontSize: '13px', fontWeight: 700 }}>{user.full_name?.charAt(0)}</span>
                      }
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#1f2937', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.full_name?.split(' ')[0]}
                    </span>
                    <svg style={{ width: '14px', height: '14px', color: '#9ca3af', transition: 'transform 0.2s', transform: showMenu ? 'rotate(180deg)' : 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showMenu && (
                    <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: '270px', background: 'white', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 8px 24px rgba(0,0,0,0.10)', zIndex: 100, overflow: 'hidden' }}>

                      {/* Profile header */}
                      <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
                          <div style={{ width: '46px', height: '46px', borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg, #e11d48, #9333ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {user.photo_url
                              ? <img src={user.photo_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              : <span style={{ color: 'white', fontSize: '18px', fontWeight: 700 }}>{user.full_name?.charAt(0)}</span>
                            }
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.full_name}</p>
                            <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>{user.phone}</p>
                          </div>
                        </div>

                        {/* Profile completion bar */}
                        <div style={{ marginBottom: '10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '11px', color: '#6b7280' }}>Profile completion</span>
                            <span style={{ fontSize: '11px', fontWeight: 600, color: completion >= 70 ? '#16a34a' : '#e11d48' }}>{completion}%</span>
                          </div>
                          <div style={{ height: '5px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${completion}%`, background: completion >= 70 ? '#16a34a' : 'linear-gradient(90deg, #e11d48, #9333ea)', borderRadius: '4px', transition: 'width 0.5s' }} />
                          </div>
                        </div>

                        {/* Plan badge */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: plan.bg, borderRadius: '8px' }}>
                          <div>
                            <p style={{ margin: 0, fontSize: '10px', color: '#9ca3af' }}>Current plan</p>
                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: plan.color, textTransform: 'capitalize' }}>{user.package || 'Prottasha'}</p>
                          </div>
                          {user.package === 'prottasha' && (
                            <Link href="/pricing" onClick={() => setShowMenu(false)} style={{ padding: '5px 12px', background: 'linear-gradient(135deg, #e11d48, #9333ea)', color: 'white', borderRadius: '6px', fontSize: '11px', fontWeight: 600, textDecoration: 'none' }}>
                              Upgrade
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Menu links */}
                      <div style={{ padding: '6px 0' }}>
                        {[
                          { href: '/dashboard', label: 'Dashboard', icon: '📊' },
                          { href: '/interests', label: 'My Interests', icon: '💌' },
                          { href: '/pricing', label: 'Upgrade Plan', icon: '⭐' },
                        ].map(({ href, label, icon }) => (
                          <Link key={href} href={href} onClick={() => setShowMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 16px', fontSize: '13px', color: '#374151', textDecoration: 'none' }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                          >
                            <span>{icon}</span>{label}
                          </Link>
                        ))}
                      </div>

                      <div style={{ borderTop: '1px solid #f3f4f6', padding: '6px 0' }}>
                        <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 16px', fontSize: '13px', color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#fef2f2')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <span>🚪</span>Logout
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

      {/* ── SUB-NAVBAR (logged in only) ── */}
      {user && (
        <div style={{ background: 'white', borderBottom: '1px solid #f3f4f6', position: 'sticky', top: '58px', zIndex: 40 }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '0', overflowX: 'auto' }}>
            {[
              { href: '/dashboard', label: 'My Dashboard' },
              { href: '/profiles', label: 'Browse Profiles' },
              { href: '/interests', label: 'Interests' },
              { href: '/pricing', label: 'Upgrade Plan' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{
                padding: '10px 16px', fontSize: '12px', fontWeight: isActive(href) ? 600 : 400,
                color: isActive(href) ? '#e11d48' : '#6b7280', textDecoration: 'none',
                borderBottom: isActive(href) ? '2px solid #e11d48' : '2px solid transparent',
                whiteSpace: 'nowrap', transition: 'all 0.15s'
              }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
