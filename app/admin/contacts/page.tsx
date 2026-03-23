'use client'

import { useEffect, useState } from 'react'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  created_at: string
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Contact | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/admin/contacts')
      const data = await res.json()
      setContacts(data.contacts || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase())
  )

  // Avatar color from name
  const avatarColor = (name: string) => {
    const colors = [
      ['#d4a017', '#a37a10'],
      ['#3b82f6', '#2563eb'],
      ['#10b981', '#059669'],
      ['#8b5cf6', '#7c3aed'],
      ['#f59e0b', '#d97706'],
      ['#ef4444', '#dc2626'],
    ]
    const idx = name.charCodeAt(0) % colors.length
    return colors[idx]
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ct-page { font-family: 'DM Sans', sans-serif; }

        /* ── HEADER ── */
        .ct-header { margin-bottom: 28px; }
        .ct-eyebrow {
          font-size: 11px; font-weight: 600; letter-spacing: 1.4px;
          text-transform: uppercase; color: #d4a017; margin-bottom: 5px;
        }
        .ct-title {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 26px; color: #1a1410; letter-spacing: -0.4px; line-height: 1.2;
        }
        .ct-subtitle { font-size: 13.5px; color: #8a8078; margin-top: 4px; }

        /* ── STATS ── */
        .ct-stats { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
        .stat-card {
          background: #fff; border: 1px solid rgba(0,0,0,0.07);
          border-radius: 14px; padding: 16px 22px;
          display: flex; align-items: center; gap: 14px;
          flex: 1; min-width: 130px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .stat-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: grid; place-items: center; flex-shrink: 0;
        }
        .stat-icon.amber { background: rgba(212,160,23,0.12); color: #d4a017; }
        .stat-icon.blue  { background: rgba(59,130,246,0.1);  color: #3b82f6; }
        .stat-icon.green { background: rgba(16,185,129,0.1);  color: #10b981; }
        .stat-val {
          font-family: 'Syne', sans-serif; font-size: 22px;
          font-weight: 700; color: #1a1410; line-height: 1;
        }
        .stat-label { font-size: 12px; color: #9a9288; margin-top: 3px; }

        /* ── TOOLBAR ── */
        .ct-toolbar {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 16px; flex-wrap: wrap;
        }
        .search-wrap { position: relative; flex: 1; min-width: 200px; max-width: 360px; }
        .search-icon {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%); color: #aaa49c; pointer-events: none;
        }
        .search-input {
          width: 100%; background: #fff;
          border: 1px solid rgba(0,0,0,0.1); border-radius: 10px;
          padding: 10px 14px 10px 40px; font-size: 13.5px;
          font-family: 'DM Sans', sans-serif; color: #1a1410; outline: none;
          transition: border-color 180ms, box-shadow 180ms;
        }
        .search-input::placeholder { color: #bab5ae; }
        .search-input:focus {
          border-color: rgba(212,160,23,0.45);
          box-shadow: 0 0 0 3px rgba(212,160,23,0.1);
        }
        .results-badge {
          font-size: 12px; color: #9a9288; white-space: nowrap;
          background: #fff; border: 1px solid rgba(0,0,0,0.08);
          border-radius: 8px; padding: 6px 12px;
        }

        /* ── TABLE CARD ── */
        .table-card {
          background: #fff; border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 2px 12px rgba(0,0,0,0.06); overflow: hidden;
        }
        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; font-size: 13.5px; min-width: 700px; }
        thead tr { background: #faf8f5; border-bottom: 1px solid rgba(0,0,0,0.07); }
        th {
          padding: 13px 16px; text-align: left;
          font-size: 11px; font-weight: 600; letter-spacing: 1px;
          text-transform: uppercase; color: #9a9288; white-space: nowrap;
        }
        tbody tr {
          border-bottom: 1px solid rgba(0,0,0,0.05);
          transition: background 140ms; cursor: pointer;
        }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: #fdfbf8; }
        td { padding: 13px 16px; color: #2a2420; vertical-align: middle; }

        /* Name cell */
        .name-cell { display: flex; align-items: center; gap: 10px; }
        .avatar {
          width: 34px; height: 34px; border-radius: 50%;
          display: grid; place-items: center;
          font-size: 13px; font-weight: 700; color: #fff;
          flex-shrink: 0; font-family: 'Syne', sans-serif;
        }
        .name-text { font-weight: 600; color: #1a1410; white-space: nowrap; }

        .email-text { color: #5a5550; font-size: 13px; }
        .phone-text { color: #7a7570; font-size: 13px; }
        .phone-none { color: #cac5be; font-size: 13px; }

        .subject-pill {
          display: inline-block;
          background: rgba(212,160,23,0.1);
          color: #a37a10; border-radius: 6px;
          padding: 3px 10px; font-size: 12px; font-weight: 600;
          white-space: nowrap; max-width: 160px;
          overflow: hidden; text-overflow: ellipsis;
        }

        .msg-preview {
          color: #7a7570; font-size: 13px;
          max-width: 200px; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }

        .date-text { color: #7a7570; font-size: 13px; white-space: nowrap; }
        .row-num { color: #cac5be; font-size: 12px; font-weight: 500; }

        .view-btn {
          display: inline-flex; align-items: center; gap: 5px;
          background: transparent; border: 1px solid rgba(0,0,0,0.1);
          border-radius: 7px; color: #4a4540; font-size: 12px;
          font-weight: 500; font-family: 'DM Sans', sans-serif;
          padding: 5px 11px; cursor: pointer;
          transition: background 150ms, border-color 150ms, color 150ms;
          white-space: nowrap;
        }
        .view-btn:hover {
          background: #1a1410; color: #f5f0e8; border-color: #1a1410;
        }

        .table-footer {
          padding: 12px 16px; border-top: 1px solid rgba(0,0,0,0.06);
          font-size: 12px; color: #aaa49c; background: #faf8f5;
        }

        /* ── DETAIL MODAL ── */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(5px);
          z-index: 800; display: flex;
          align-items: center; justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .modal-box {
          background: #fff; border-radius: 20px;
          width: 100%; max-width: 520px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.2);
          animation: slideUp 0.28s cubic-bezier(0.22,1,0.36,1);
          overflow: hidden;
        }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        .modal-head {
          background: #0d0d0d;
          padding: 22px 24px;
          display: flex; align-items: center; justify-content: space-between; gap: 14px;
        }
        .modal-head-left { display: flex; align-items: center; gap: 14px; }
        .modal-avatar {
          width: 46px; height: 46px; border-radius: 12px;
          display: grid; place-items: center;
          font-size: 18px; font-weight: 700; color: #fff;
          font-family: 'Syne', sans-serif; flex-shrink: 0;
        }
        .modal-name {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 17px; color: #f5f0e8;
        }
        .modal-email { font-size: 13px; color: #7a7570; margin-top: 2px; }
        .modal-close {
          width: 34px; height: 34px; border: none;
          background: rgba(255,255,255,0.08); border-radius: 8px;
          display: grid; place-items: center; cursor: pointer;
          color: #7a7570; transition: background 160ms, color 160ms;
          flex-shrink: 0;
        }
        .modal-close:hover { background: rgba(255,255,255,0.14); color: #f5f0e8; }

        .modal-body { padding: 24px; display: flex; flex-direction: column; gap: 18px; }

        .detail-row { display: flex; flex-direction: column; gap: 5px; }
        .detail-label {
          font-size: 10.5px; font-weight: 600; letter-spacing: 1.1px;
          text-transform: uppercase; color: #aaa49c;
        }
        .detail-val { font-size: 14px; color: #1a1410; font-weight: 500; line-height: 1.5; }
        .detail-val.message {
          background: #faf8f5; border: 1px solid rgba(0,0,0,0.07);
          border-radius: 10px; padding: 14px; font-weight: 400;
          color: #3a3430; line-height: 1.65; font-size: 13.5px;
          max-height: 180px; overflow-y: auto;
        }

        .modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

        .modal-actions {
          padding: 16px 24px; border-top: 1px solid rgba(0,0,0,0.07);
          display: flex; gap: 10px; background: #faf8f5;
        }
        .action-reply {
          flex: 1; display: flex; align-items: center; justify-content: center;
          gap: 8px; padding: 11px;
          background: #d4a017; color: #0d0d0d;
          border: none; border-radius: 10px;
          font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
          cursor: pointer; text-decoration: none;
          transition: background 160ms;
        }
        .action-reply:hover { background: #b88a12; }
        .action-close-btn {
          padding: 11px 20px;
          background: #fff; border: 1px solid rgba(0,0,0,0.12);
          border-radius: 10px; font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 600; color: #4a4540;
          cursor: pointer; transition: background 150ms;
        }
        .action-close-btn:hover { background: #f0ede9; }

        /* ── EMPTY / LOADING ── */
        .state-box {
          background: #fff; border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px; padding: 64px 24px; text-align: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
        .state-icon {
          width: 56px; height: 56px; border-radius: 16px;
          display: grid; place-items: center; margin: 0 auto 16px;
        }
        .state-icon.loading { background: rgba(212,160,23,0.1); color: #d4a017; }
        .state-icon.empty   { background: rgba(0,0,0,0.05); color: #aaa49c; }
        .state-title { font-family:'Syne',sans-serif; font-size:17px; font-weight:700; color:#1a1410; margin-bottom:6px; }
        .state-desc  { font-size:13.5px; color:#9a9288; }
        .loading-dots span {
          display: inline-block; width: 7px; height: 7px; border-radius: 50%;
          background: #d4a017; margin: 0 3px;
          animation: bounce 1.2s infinite ease-in-out;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
        .no-results { padding: 40px; text-align: center; color: #aaa49c; font-size: 14px; }

        @media (max-width: 600px) {
          .ct-title { font-size: 21px; }
          .ct-stats { gap: 8px; }
          .stat-card { padding: 13px 16px; }
          .modal-grid { grid-template-columns: 1fr; gap: 10px; }
          .results-badge { display: none; }
        }
      `}</style>

      <div className="ct-page">

        {/* ── DETAIL MODAL ── */}
        {selected && (
          <div className="modal-overlay" onClick={() => setSelected(null)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>

              {/* Modal Header */}
              <div className="modal-head">
                <div className="modal-head-left">
                  <div
                    className="modal-avatar"
                    style={{ background: `linear-gradient(135deg, ${avatarColor(selected.name)[0]}, ${avatarColor(selected.name)[1]})` }}
                  >
                    {selected.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="modal-name">{selected.name}</div>
                    <div className="modal-email">{selected.email}</div>
                  </div>
                </div>
                <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="modal-body">
                <div className="modal-grid">
                  <div className="detail-row">
                    <span className="detail-label">Phone</span>
                    <span className="detail-val">{selected.phone || '—'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Received</span>
                    <span className="detail-val">
                      {new Date(selected.created_at).toLocaleString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Subject</span>
                  <span className="detail-val">{selected.subject}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Message</span>
                  <div className="detail-val message">{selected.message}</div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-actions">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="action-reply"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Reply via Email
                </a>
                <button className="action-close-btn" onClick={() => setSelected(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* ── PAGE HEADER ── */}
        <div className="ct-header">
          <div className="ct-eyebrow">Support</div>
          <h1 className="ct-title">Contact Messages</h1>
          <p className="ct-subtitle">View and respond to customer enquiries</p>
        </div>

        {/* ── STATS ── */}
        {!loading && (
          <div className="ct-stats">
            <div className="stat-card">
              <div className="stat-icon amber">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div>
                <div className="stat-val">{contacts.length}</div>
                <div className="stat-label">Total Messages</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <div>
                <div className="stat-val">{filtered.length}</div>
                <div className="stat-label">{search ? 'Matching' : 'Showing All'}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div>
                <div className="stat-val">
                  {contacts.filter(c => {
                    const d = new Date(c.created_at)
                    const now = new Date()
                    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
                  }).length}
                </div>
                <div className="stat-label">This Month</div>
              </div>
            </div>
          </div>
        )}

        {/* ── LOADING ── */}
        {loading ? (
          <div className="state-box">
            <div className="state-icon loading">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              </svg>
            </div>
            <div className="state-title">Loading messages…</div>
            <div style={{ marginTop: 14 }} className="loading-dots">
              <span /><span /><span />
            </div>
          </div>

        ) : contacts.length === 0 ? (
          <div className="state-box">
            <div className="state-icon empty">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              </svg>
            </div>
            <div className="state-title">No messages yet</div>
            <div className="state-desc">When customers reach out, their messages will appear here.</div>
          </div>

        ) : (
          <>
            {/* ── TOOLBAR ── */}
            <div className="ct-toolbar">
              <div className="search-wrap">
                <span className="search-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </span>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search by name, email or subject…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <span className="results-badge">
                {filtered.length} of {contacts.length} messages
              </span>
            </div>

            {/* ── TABLE ── */}
            <div className="table-card">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th style={{ width: 80 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="no-results">
                          No messages match "<strong>{search}</strong>"
                        </td>
                      </tr>
                    ) : (
                      filtered.map((c, idx) => (
                        <tr key={c.id} onClick={() => setSelected(c)}>
                          <td><span className="row-num">{idx + 1}</span></td>
                          <td>
                            <div className="name-cell">
                              <div
                                className="avatar"
                                style={{ background: `linear-gradient(135deg, ${avatarColor(c.name)[0]}, ${avatarColor(c.name)[1]})` }}
                              >
                                {c.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="name-text">{c.name}</span>
                            </div>
                          </td>
                          <td><span className="email-text">{c.email}</span></td>
                          <td>
                            {c.phone
                              ? <span className="phone-text">{c.phone}</span>
                              : <span className="phone-none">—</span>
                            }
                          </td>
                          <td><span className="subject-pill">{c.subject}</span></td>
                          <td><span className="msg-preview">{c.message}</span></td>
                          <td>
                            <span className="date-text">
                              {new Date(c.created_at).toLocaleString('en-IN', {
                                day: 'numeric', month: 'short', year: 'numeric',
                                hour: '2-digit', minute: '2-digit',
                              })}
                            </span>
                          </td>
                          <td>
                            <button
                              className="view-btn"
                              onClick={(e) => { e.stopPropagation(); setSelected(c); }}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="table-footer">
                Showing {filtered.length} of {contacts.length} contact messages
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}