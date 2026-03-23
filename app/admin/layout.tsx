'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const menu = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    name: 'Orders',
    href: '/admin/orders',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    name: 'Contacts',
    href: '/admin/contacts',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    name: 'Newsletter',
    href: '/admin/newsletter',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
]

export default function AdminLayout({ children }: any) {
  const router = useRouter()
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const logout = () => {
    localStorage.removeItem('admin')
    router.push('/admin/login')
  }

  // Hide layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --sidebar-collapsed: 72px;
          --sidebar-expanded: 240px;
          --bg-dark: #0d0d0d;
          --bg-card: #141414;
          --bg-hover: #1e1e1e;
          --accent: #d4a017;
          --accent-dim: #a37a10;
          --accent-glow: rgba(212,160,23,0.18);
          --text-primary: #f5f0e8;
          --text-muted: #7a7570;
          --border: rgba(255,255,255,0.06);
          --danger: #e05c5c;
          --transition: 260ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .admin-shell {
          display: flex;
          min-height: 100vh;
          background: #f7f4ef;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        /* ─── DESKTOP SIDEBAR ─── */
        .sidebar {
          position: relative;
          width: var(--sidebar-collapsed);
          background: var(--bg-dark);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: width var(--transition);
          border-right: 1px solid var(--border);
          will-change: width;
          flex-shrink: 0;
          z-index: 20;
        }

        .sidebar.expanded {
          width: var(--sidebar-expanded);
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 22px 16px 20px;
          border-bottom: 1px solid var(--border);
          min-height: 72px;
          overflow: hidden;
          white-space: nowrap;
        }
        .logo-mark {
          flex-shrink: 0;
          width: 40px; height: 40px;
          background: var(--accent);
          border-radius: 10px;
          display: grid;
          place-items: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: #0d0d0d;
          letter-spacing: -0.5px;
        }
        .logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: var(--text-primary);
          line-height: 1.2;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity var(--transition), transform var(--transition);
        }
        .logo-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 400;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1.2px;
          display: block;
        }
        .sidebar.expanded .logo-text {
          opacity: 1;
          transform: translateX(0);
        }

        /* NAV */
        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 16px 10px;
          overflow: hidden;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 11px 11px;
          border-radius: 10px;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          transition: background var(--transition), color var(--transition), box-shadow var(--transition);
          position: relative;
        }
        .nav-item:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }
        .nav-item.active {
          background: var(--accent-glow);
          color: var(--accent);
          box-shadow: inset 0 0 0 1px rgba(212,160,23,0.22);
        }
        .nav-icon {
          flex-shrink: 0;
          width: 20px; height: 20px;
          display: grid;
          place-items: center;
        }
        .nav-label {
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity var(--transition), transform var(--transition);
          font-family: 'DM Sans', sans-serif;
        }
        .sidebar.expanded .nav-label {
          opacity: 1;
          transform: translateX(0);
        }
        .active-dot {
          position: absolute;
          right: 10px;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0;
          transition: opacity var(--transition);
          flex-shrink: 0;
        }
        .nav-item.active .active-dot {
          opacity: 1;
        }

        /* LOGOUT */
        .sidebar-footer {
          padding: 12px 10px 20px;
          border-top: 1px solid var(--border);
          overflow: hidden;
        }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          padding: 11px 11px;
          border-radius: 10px;
          border: none;
          background: transparent;
          color: var(--danger);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          transition: background var(--transition);
          font-family: 'DM Sans', sans-serif;
        }
        .logout-btn:hover {
          background: rgba(224,92,92,0.12);
        }
        .logout-label {
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity var(--transition), transform var(--transition);
        }
        .sidebar.expanded .logout-label {
          opacity: 1;
          transform: translateX(0);
        }

        /* ─── MAIN CONTENT ─── */
        .main-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #f7f4ef;
        }

        .topbar {
          display: none; /* hidden on desktop */
        }

        .main-content {
          flex: 1;
          padding: 32px;
          background: #f7f4ef;
          position: relative;
          z-index: 10;
          width: 100%;
        }

        /* ─── MOBILE ─── */
        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }
          .topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            height: 60px;
            background: var(--bg-dark);
            position: sticky;
            top: 0;
            z-index: 200;
            border-bottom: 1px solid var(--border);
          }
          .topbar-logo {
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
          }
          .topbar-brand {
            font-family: 'Syne', sans-serif;
            font-weight: 700;
            font-size: 15px;
            color: var(--text-primary);
          }
          .hamburger {
            width: 40px; height: 40px;
            border: none;
            background: var(--bg-hover);
            border-radius: 8px;
            display: grid;
            place-items: center;
            cursor: pointer;
            color: var(--text-primary);
            transition: background 200ms;
          }
          .hamburger:hover { background: #2a2a2a; }

          .mobile-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(3px);
            z-index: 300;
            opacity: 0;
            pointer-events: none;
            transition: opacity 260ms ease;
          }
          .mobile-overlay.open {
            opacity: 1;
            pointer-events: all;
          }

          .mobile-drawer {
            position: fixed;
            top: 0; left: 0; bottom: 0;
            width: 280px;
            background: var(--bg-dark);
            z-index: 400;
            display: flex;
            flex-direction: column;
            transform: translateX(-100%);
            transition: transform 280ms cubic-bezier(0.4, 0, 0.2, 1);
            border-right: 1px solid var(--border);
          }
          .mobile-drawer.open {
            transform: translateX(0);
          }

          .drawer-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 20px;
            border-bottom: 1px solid var(--border);
          }
          .drawer-logo {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .drawer-close {
            width: 36px; height: 36px;
            border: none;
            background: var(--bg-hover);
            border-radius: 8px;
            display: grid;
            place-items: center;
            cursor: pointer;
            color: var(--text-muted);
            transition: color 180ms, background 180ms;
          }
          .drawer-close:hover { color: var(--text-primary); background: #2a2a2a; }

          .drawer-nav {
            flex: 1;
            padding: 16px 16px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            overflow-y: auto;
          }
          .drawer-nav .nav-item {
            padding: 12px 14px;
          }
          .drawer-nav .nav-label {
            opacity: 1 !important;
            transform: none !important;
          }
          .drawer-nav .active-dot { display: none; }

          .drawer-footer {
            padding: 12px 16px 28px;
            border-top: 1px solid var(--border);
          }
          .drawer-footer .logout-btn {
            padding: 12px 14px;
          }
          .drawer-footer .logout-label {
            opacity: 1 !important;
            transform: none !important;
          }

          .main-content {
            padding: 20px 16px;
          }
        }
      `}</style>

      <div className="admin-shell">

        {/* ─── DESKTOP SIDEBAR ─── */}
        <aside
          className={`sidebar ${expanded ? 'expanded' : ''}`}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
        >
          <div className="sidebar-header">
            <div className="logo-mark">N</div>
            <div className="logo-text">
              Nut8Bites
              <span className="logo-sub">Admin Panel</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            {menu.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item${isActive ? ' active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.name}</span>
                  <span className="active-dot" />
                </Link>
              )
            })}
          </nav>

          <div className="sidebar-footer">
            <button onClick={logout} className="logout-btn">
              <span className="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </span>
              <span className="logout-label">Logout</span>
            </button>
          </div>
        </aside>

        {/* ─── MAIN ─── */}
        <div className="main-wrapper">

          {/* MOBILE TOPBAR */}
          <header className="topbar">
            <div className="topbar-logo">
              <div className="logo-mark" style={{ width: 34, height: 34, fontSize: 15, borderRadius: 8 }}>N</div>
              <span className="topbar-brand">Nut8Bites</span>
            </div>
            <button
              className="hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </header>

          {/* MOBILE OVERLAY */}
          <div
            className={`mobile-overlay${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(false)}
          />

          {/* MOBILE DRAWER */}
          <nav className={`mobile-drawer${mobileOpen ? ' open' : ''}`}>
            <div className="drawer-header">
              <div className="drawer-logo">
                <div className="logo-mark">N</div>
                <div className="logo-text" style={{ opacity: 1, transform: 'none' }}>
                  Nut8Bites
                  <span className="logo-sub">Admin Panel</span>
                </div>
              </div>
              <button className="drawer-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="drawer-nav">
              {menu.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-item${isActive ? ' active' : ''}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.name}</span>
                  </Link>
                )
              })}
            </div>

            <div className="drawer-footer">
              <button onClick={logout} className="logout-btn">
                <span className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </span>
                <span className="logout-label">Logout</span>
              </button>
            </div>
          </nav>

          {/* PAGE CONTENT */}
          <main className="main-content">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}