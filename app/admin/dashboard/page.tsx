'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Order {
  id: string
  customer_name: string
  total: number
  created_at: string
  order_status?: string
}

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin')
    if (!isAdmin) {
      router.push('/admin/login')
      return
    }

    // Greeting based on time
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 17) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/admin/dashboard')
      const json = await res.json()
      setData(json)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const avatarColor = (name: string) => {
    const colors = [
      ['#d4a017', '#a37a10'],
      ['#3b82f6', '#2563eb'],
      ['#10b981', '#059669'],
      ['#8b5cf6', '#7c3aed'],
      ['#f59e0b', '#d97706'],
      ['#ef4444', '#dc2626'],
    ]
    const idx = (name?.charCodeAt(0) ?? 0) % colors.length
    return colors[idx]
  }

  const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
    pending:   { label: 'Pending',   color: '#b45309', bg: 'rgba(245,158,11,0.1)',  dot: '#f59e0b' },
    confirmed: { label: 'Confirmed', color: '#1d4ed8', bg: 'rgba(59,130,246,0.1)', dot: '#3b82f6' },
    shipped:   { label: 'Shipped',   color: '#065f46', bg: 'rgba(16,185,129,0.1)', dot: '#10b981' },
  }
  const getStatus = (s: string) =>
    statusConfig[s] ?? { label: s ?? 'Unknown', color: '#4a4540', bg: 'rgba(0,0,0,0.06)', dot: '#aaa49c' }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .db-page { font-family: 'DM Sans', sans-serif; }

        /* ── HEADER ── */
        .db-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 16px; margin-bottom: 28px; flex-wrap: wrap;
        }
        .db-eyebrow {
          font-size: 11px; font-weight: 600; letter-spacing: 1.4px;
          text-transform: uppercase; color: #d4a017; margin-bottom: 5px;
        }
        .db-title {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 26px; color: #1a1410; letter-spacing: -0.4px;
        }
        .db-subtitle { font-size: 13.5px; color: #8a8078; margin-top: 4px; }
        .db-date {
          font-size: 13px; color: #aaa49c; font-weight: 400;
          background: #fff; border: 1px solid rgba(0,0,0,0.08);
          border-radius: 9px; padding: 7px 14px; white-space: nowrap;
        }

        /* ── STAT CARDS ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 24px;
        }
        .stat-card {
          background: #fff; border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px; padding: 20px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
          position: relative; overflow: hidden;
          transition: box-shadow 200ms, transform 200ms;
        }
        .stat-card:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.09);
          transform: translateY(-2px);
        }
        .stat-card-glow {
          position: absolute; top: -30px; right: -30px;
          width: 100px; height: 100px; border-radius: 50%;
          pointer-events: none;
        }
        .stat-top {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 14px;
        }
        .stat-icon {
          width: 42px; height: 42px; border-radius: 11px;
          display: grid; place-items: center;
        }
        .stat-trend {
          font-size: 11px; font-weight: 600;
          border-radius: 6px; padding: 3px 8px;
        }
        .stat-trend.up   { color: #065f46; background: rgba(16,185,129,0.1); }
        .stat-trend.neutral { color: #4a4540; background: rgba(0,0,0,0.06); }
        .stat-val {
          font-family: 'Syne', sans-serif; font-size: 28px;
          font-weight: 800; color: #1a1410; line-height: 1;
          letter-spacing: -0.5px; margin-bottom: 5px;
        }
        .stat-label { font-size: 13px; color: #9a9288; font-weight: 400; }

        /* Divider line accent */
        .stat-card::after {
          content: ''; position: absolute;
          bottom: 0; left: 0; right: 0; height: 3px; border-radius: 0 0 16px 16px;
        }
        .stat-card.amber::after { background: linear-gradient(90deg, #d4a017, #f59e0b); }
        .stat-card.green::after { background: linear-gradient(90deg, #059669, #10b981); }
        .stat-card.blue::after  { background: linear-gradient(90deg, #2563eb, #3b82f6); }
        .stat-card.purple::after{ background: linear-gradient(90deg, #7c3aed, #8b5cf6); }

        /* ── MAIN GRID ── */
        .db-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 16px;
          align-items: start;
        }

        /* ── CARD BASE ── */
        .card {
          background: #fff; border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .card-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 20px 14px; border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .card-title {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 15px; color: #1a1410;
        }
        .card-link {
          font-size: 12.5px; color: #d4a017; font-weight: 600;
          text-decoration: none; display: flex; align-items: center; gap: 4px;
          transition: opacity 160ms;
        }
        .card-link:hover { opacity: 0.75; }

        /* ── RECENT ORDERS ── */
        .order-list { padding: 8px 0; }
        .order-row {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 20px; border-bottom: 1px solid rgba(0,0,0,0.04);
          transition: background 130ms; cursor: default;
        }
        .order-row:last-child { border-bottom: none; }
        .order-row:hover { background: #fdfbf8; }

        .o-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          display: grid; place-items: center;
          font-size: 13px; font-weight: 700; color: #fff;
          flex-shrink: 0; font-family: 'Syne', sans-serif;
        }
        .o-info { flex: 1; min-width: 0; }
        .o-name {
          font-weight: 600; font-size: 13.5px; color: #1a1410;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .o-date { font-size: 12px; color: #aaa49c; margin-top: 2px; }
        .o-right { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; flex-shrink: 0; }
        .o-total {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 14px; color: #d4a017;
        }
        .status-badge {
          display: inline-flex; align-items: center; gap: 5px;
          border-radius: 20px; padding: 3px 8px;
          font-size: 11px; font-weight: 600; white-space: nowrap;
        }
        .status-dot { width: 5px; height: 5px; border-radius: 50%; }

        .empty-state {
          padding: 40px 20px; text-align: center;
          color: #aaa49c; font-size: 13.5px;
        }
        .empty-icon {
          width: 48px; height: 48px; border-radius: 14px;
          background: rgba(0,0,0,0.04); display: grid;
          place-items: center; margin: 0 auto 12px; color: #cac5be;
        }

        /* ── QUICK LINKS CARD ── */
        .quick-links { padding: 8px 0; }
        .quick-link {
          display: flex; align-items: center; gap: 13px;
          padding: 12px 20px; border-bottom: 1px solid rgba(0,0,0,0.04);
          text-decoration: none; transition: background 130ms;
        }
        .quick-link:last-child { border-bottom: none; }
        .quick-link:hover { background: #fdfbf8; }
        .ql-icon {
          width: 36px; height: 36px; border-radius: 10px;
          display: grid; place-items: center; flex-shrink: 0;
        }
        .ql-label {
          font-size: 13.5px; font-weight: 600; color: #1a1410; flex: 1;
        }
        .ql-count {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 15px; color: #1a1410;
        }
        .ql-arrow { color: #cac5be; }

        /* ── ACTIVITY STRIP ── */
        .activity-card { margin-top: 16px; }
        .activity-list { padding: 4px 0; }
        .activity-row {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 20px; border-bottom: 1px solid rgba(0,0,0,0.04);
        }
        .activity-row:last-child { border-bottom: none; }
        .activity-dot-wrap {
          display: flex; flex-direction: column; align-items: center; padding-top: 4px;
        }
        .a-dot {
          width: 8px; height: 8px; border-radius: 50%;
          flex-shrink: 0;
        }
        .a-line {
          width: 1px; flex: 1; background: rgba(0,0,0,0.07); margin-top: 4px; min-height: 16px;
        }
        .a-text { font-size: 13px; color: #4a4540; line-height: 1.5; }
        .a-time { font-size: 11.5px; color: #aaa49c; margin-top: 2px; }

        /* ── LOADING ── */
        .loading-shell {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; min-height: 300px; gap: 16px;
        }
        .loading-logo {
          width: 52px; height: 52px; border-radius: 13px;
          background: linear-gradient(135deg, #d4a017, #a37a10);
          display: grid; place-items: center;
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: 22px; color: #0d0d0d;
          box-shadow: 0 8px 24px rgba(212,160,23,0.3);
        }
        .loading-text { font-size: 14px; color: #9a9288; }
        .loading-dots span {
          display: inline-block; width: 7px; height: 7px; border-radius: 50%;
          background: #d4a017; margin: 0 3px;
          animation: bounce 1.2s infinite ease-in-out;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .db-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 580px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .stat-val { font-size: 22px; }
          .db-date { display: none; }
          .db-title { font-size: 21px; }
        }
        @media (max-width: 380px) {
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="db-page">

        {/* ── LOADING ── */}
        {loading ? (
          <div className="loading-shell">
            <div className="loading-logo">N</div>
            <div className="loading-text">Loading dashboard…</div>
            <div className="loading-dots"><span /><span /><span /></div>
          </div>
        ) : (
          <>
            {/* ── HEADER ── */}
            <div className="db-header">
              <div>
                <div className="db-eyebrow">Overview</div>
                <h1 className="db-title">{greeting}, Admin 👋</h1>
                <p className="db-subtitle">Here's what's happening with your store today.</p>
              </div>
              <div className="db-date">
                {new Date().toLocaleDateString('en-IN', {
                  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                })}
              </div>
            </div>

            {/* ── STAT CARDS ── */}
            <div className="stats-grid">

              {/* Total Orders */}
              <div className="stat-card amber">
                <div className="stat-card-glow" style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.12), transparent)' }} />
                <div className="stat-top">
                  <div className="stat-icon" style={{ background: 'rgba(212,160,23,0.12)', color: '#d4a017' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                  </div>
                  <span className="stat-trend up">↑ Live</span>
                </div>
                <div className="stat-val">{data.totalOrders ?? 0}</div>
                <div className="stat-label">Total Orders</div>
              </div>

              {/* Revenue */}
              <div className="stat-card green">
                <div className="stat-card-glow" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1), transparent)' }} />
                <div className="stat-top">
                  <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <span className="stat-trend up">↑ Revenue</span>
                </div>
                <div className="stat-val" style={{ fontSize: data.totalRevenue > 99999 ? 22 : 28 }}>
                  ₹{(data.totalRevenue ?? 0).toLocaleString('en-IN')}
                </div>
                <div className="stat-label">Total Revenue</div>
              </div>

              {/* Contacts */}
              <div className="stat-card blue">
                <div className="stat-card-glow" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1), transparent)' }} />
                <div className="stat-top">
                  <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <span className="stat-trend neutral">Messages</span>
                </div>
                <div className="stat-val">{data.totalContacts ?? 0}</div>
                <div className="stat-label">Contact Messages</div>
              </div>

              {/* Subscribers */}
              <div className="stat-card purple">
                <div className="stat-card-glow" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1), transparent)' }} />
                <div className="stat-top">
                  <div className="stat-icon" style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <span className="stat-trend neutral">Newsletter</span>
                </div>
                <div className="stat-val">{data.totalSubscribers ?? 0}</div>
                <div className="stat-label">Subscribers</div>
              </div>

            </div>

            {/* ── MAIN GRID ── */}
            <div className="db-grid">

              {/* Recent Orders */}
              <div className="card">
                <div className="card-head">
                  <span className="card-title">Recent Orders</span>
                  <a href="/admin/orders" className="card-link">
                    View all
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </a>
                </div>

                {!data.recentOrders || data.recentOrders.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                      </svg>
                    </div>
                    No recent orders yet
                  </div>
                ) : (
                  <div className="order-list">
                    {data.recentOrders.map((o: Order) => {
                      const [c1, c2] = avatarColor(o.customer_name ?? 'A')
                      const st = getStatus(o.order_status ?? 'pending')
                      return (
                        <div className="order-row" key={o.id}>
                          <div
                            className="o-avatar"
                            style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
                          >
                            {(o.customer_name ?? 'A').charAt(0).toUpperCase()}
                          </div>
                          <div className="o-info">
                            <div className="o-name">{o.customer_name}</div>
                            <div className="o-date">
                              {new Date(o.created_at).toLocaleString('en-IN', {
                                day: 'numeric', month: 'short', year: 'numeric',
                                hour: '2-digit', minute: '2-digit',
                              })}
                            </div>
                          </div>
                          <div className="o-right">
                            <span className="o-total">₹{o.total.toLocaleString('en-IN')}</span>
                            <span
                              className="status-badge"
                              style={{ color: st.color, background: st.bg }}
                            >
                              <span className="status-dot" style={{ background: st.dot }} />
                              {st.label}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Quick Nav */}
                <div className="card">
                  <div className="card-head">
                    <span className="card-title">Quick Access</span>
                  </div>
                  <div className="quick-links">
                    <a href="/admin/orders" className="quick-link">
                      <div className="ql-icon" style={{ background: 'rgba(212,160,23,0.1)', color: '#d4a017' }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                          <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                        </svg>
                      </div>
                      <span className="ql-label">Orders</span>
                      <span className="ql-count">{data.totalOrders ?? 0}</span>
                      <span className="ql-arrow">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </span>
                    </a>
                    <a href="/admin/contacts" className="quick-link">
                      <div className="ql-icon" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </div>
                      <span className="ql-label">Contacts</span>
                      <span className="ql-count">{data.totalContacts ?? 0}</span>
                      <span className="ql-arrow">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </span>
                    </a>
                    <a href="/admin/newsletter" className="quick-link">
                      <div className="ql-icon" style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6' }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </div>
                      <span className="ql-label">Newsletter</span>
                      <span className="ql-count">{data.totalSubscribers ?? 0}</span>
                      <span className="ql-arrow">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </span>
                    </a>
                    <a href="/admin/analytics" className="quick-link">
                      <div className="ql-icon" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
                          <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
                        </svg>
                      </div>
                      <span className="ql-label">Analytics</span>
                      <span className="ql-count" style={{ fontSize: 12, color: '#aaa49c' }}>View</span>
                      <span className="ql-arrow">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>

                {/* Store Health */}
                <div className="card">
                  <div className="card-head">
                    <span className="card-title">Store Health</span>
                  </div>
                  <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      { label: 'Orders Fulfilled', val: data.totalOrders > 0 ? Math.round((data.recentOrders?.filter((o: Order) => o.order_status === 'shipped').length / data.totalOrders) * 100) : 0, color: '#10b981' },
                      { label: 'Avg. Order Value', val: null, text: data.totalOrders > 0 ? `₹${Math.round(data.totalRevenue / data.totalOrders).toLocaleString('en-IN')}` : '—', color: '#d4a017' },
                      { label: 'Newsletter Growth', val: null, text: `${data.totalSubscribers ?? 0} subscribers`, color: '#8b5cf6' },
                    ].map((item, i) => (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                          <span style={{ fontSize: 12.5, color: '#7a7570', fontWeight: 500 }}>{item.label}</span>
                          <span style={{ fontSize: 12.5, fontWeight: 700, color: item.color, fontFamily: 'Syne, sans-serif' }}>
                            {item.text ?? `${item.val}%`}
                          </span>
                        </div>
                        {item.val !== null && (
                          <div style={{ height: 5, background: 'rgba(0,0,0,0.06)', borderRadius: 10, overflow: 'hidden' }}>
                            <div style={{
                              height: '100%', width: `${item.val}%`,
                              background: item.color, borderRadius: 10,
                              transition: 'width 0.8s ease',
                            }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}