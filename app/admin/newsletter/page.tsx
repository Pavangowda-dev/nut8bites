'use client'

import { useEffect, useState } from 'react'

interface Subscriber {
  id: string
  email: string
  created_at: string
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/admin/newsletter')
      const data = await res.json()
      setSubscribers(data.subscribers || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteSubscriber = async (id: string) => {
    setDeletingId(id)
    setConfirmId(null)
    try {
      const res = await fetch('/api/admin/newsletter/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (data.success) {
        setSubscribers((prev) => prev.filter((s) => s.id !== id))
        showToast('Subscriber removed successfully.')
      } else {
        showToast('Delete failed. Please try again.', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Something went wrong.', 'error')
    } finally {
      setDeletingId(null)
    }
  }

  const copyAllEmails = () => {
    const emails = subscribers.map((s) => s.email).join(', ')
    navigator.clipboard.writeText(emails)
    setCopied(true)
    showToast('All emails copied to clipboard!')
    setTimeout(() => setCopied(false), 2500)
  }

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .nl-page { font-family: 'DM Sans', sans-serif; }

        /* ── TOAST ── */
        .toast {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 18px;
          border-radius: 12px;
          font-size: 13.5px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          animation: toastIn 0.32s cubic-bezier(0.22,1,0.36,1);
          max-width: 320px;
        }
        .toast.success { background: #1a1a1a; color: #d4a017; border: 1px solid rgba(212,160,23,0.25); }
        .toast.error   { background: #1e0e0e; color: #e05c5c; border: 1px solid rgba(224,92,92,0.22); }
        @keyframes toastIn { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform: translateY(0); } }

        /* ── HEADER ── */
        .nl-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .nl-title-group {}
        .nl-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: #d4a017;
          margin-bottom: 5px;
        }
        .nl-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 26px;
          color: #1a1410;
          letter-spacing: -0.4px;
          line-height: 1.2;
        }
        .nl-subtitle {
          font-size: 13.5px;
          color: #8a8078;
          margin-top: 4px;
        }

        /* ── STATS ROW ── */
        .nl-stats {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .stat-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 14px;
          padding: 16px 22px;
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 1;
          min-width: 140px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .stat-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }
        .stat-icon.amber { background: rgba(212,160,23,0.12); color: #d4a017; }
        .stat-icon.blue  { background: rgba(59,130,246,0.1);  color: #3b82f6; }
        .stat-val {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #1a1410;
          line-height: 1;
        }
        .stat-label {
          font-size: 12px;
          color: #9a9288;
          margin-top: 3px;
          font-weight: 400;
        }

        /* ── TOOLBAR ── */
        .nl-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .search-wrap {
          position: relative;
          flex: 1;
          min-width: 200px;
          max-width: 340px;
        }
        .search-icon {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          color: #aaa49c;
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 10px;
          padding: 10px 14px 10px 40px;
          font-size: 13.5px;
          font-family: 'DM Sans', sans-serif;
          color: #1a1410;
          outline: none;
          transition: border-color 180ms, box-shadow 180ms;
        }
        .search-input::placeholder { color: #bab5ae; }
        .search-input:focus {
          border-color: rgba(212,160,23,0.45);
          box-shadow: 0 0 0 3px rgba(212,160,23,0.1);
        }

        .copy-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #1a1410;
          color: #f5f0e8;
          border: none;
          border-radius: 10px;
          padding: 10px 18px;
          font-size: 13.5px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: background 180ms, transform 130ms, box-shadow 180ms;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }
        .copy-btn:hover { background: #2e2820; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,0.16); }
        .copy-btn.copied { background: #1a6e3a; color: #a8f0c4; }

        /* ── TABLE CARD ── */
        .table-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          overflow: hidden;
        }
        .table-wrap { overflow-x: auto; }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13.5px;
          min-width: 480px;
        }
        thead tr {
          background: #faf8f5;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }
        th {
          padding: 13px 18px;
          text-align: left;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #9a9288;
          white-space: nowrap;
        }
        tbody tr {
          border-bottom: 1px solid rgba(0,0,0,0.05);
          transition: background 140ms;
        }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: #fdfbf8; }

        td { padding: 14px 18px; color: #2a2420; vertical-align: middle; }

        .email-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .email-avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4a017, #a37a10);
          display: grid;
          place-items: center;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          font-family: 'Syne', sans-serif;
        }
        .email-text { font-weight: 500; color: #1a1410; }

        .date-text { color: #7a7570; font-size: 13px; }

        /* row number */
        .row-num { color: #cac5be; font-size: 12px; font-weight: 500; }

        /* Delete */
        .del-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid rgba(224,92,92,0.22);
          border-radius: 7px;
          color: #e05c5c;
          font-size: 12.5px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          padding: 6px 12px;
          cursor: pointer;
          transition: background 160ms, border-color 160ms;
        }
        .del-btn:hover { background: rgba(224,92,92,0.08); border-color: rgba(224,92,92,0.4); }
        .del-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .del-spinner {
          width: 13px; height: 13px;
          border: 2px solid rgba(224,92,92,0.3);
          border-top-color: #e05c5c;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── CONFIRM MODAL ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(4px);
          z-index: 800;
          display: grid;
          place-items: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .modal-box {
          background: #fff;
          border-radius: 16px;
          padding: 28px 28px 24px;
          max-width: 380px;
          width: 100%;
          box-shadow: 0 24px 64px rgba(0,0,0,0.18);
          animation: slideUp 0.26s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .modal-icon {
          width: 46px; height: 46px;
          background: rgba(224,92,92,0.1);
          border-radius: 12px;
          display: grid;
          place-items: center;
          color: #e05c5c;
          margin-bottom: 16px;
        }
        .modal-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 17px;
          color: #1a1410;
          margin-bottom: 7px;
        }
        .modal-desc { font-size: 13.5px; color: #7a7570; line-height: 1.5; margin-bottom: 22px; }
        .modal-actions { display: flex; gap: 10px; }
        .modal-cancel {
          flex: 1;
          padding: 10px;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 9px;
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #4a4540;
          cursor: pointer;
          transition: background 150ms;
        }
        .modal-cancel:hover { background: #f5f2ee; }
        .modal-confirm {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 9px;
          background: #e05c5c;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          transition: background 150ms;
        }
        .modal-confirm:hover { background: #c94a4a; }

        /* ── EMPTY / LOADING ── */
        .state-box {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px;
          padding: 64px 24px;
          text-align: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
        .state-icon {
          width: 56px; height: 56px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          margin: 0 auto 16px;
        }
        .state-icon.loading { background: rgba(212,160,23,0.1); color: #d4a017; }
        .state-icon.empty   { background: rgba(0,0,0,0.05); color: #aaa49c; }
        .state-title { font-family:'Syne',sans-serif; font-size:17px; font-weight:700; color:#1a1410; margin-bottom:6px; }
        .state-desc  { font-size:13.5px; color:#9a9288; }
        .loading-dots span {
          display: inline-block;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #d4a017;
          margin: 0 3px;
          animation: bounce 1.2s infinite ease-in-out;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }

        .no-results { padding: 40px; text-align: center; color: #aaa49c; font-size: 14px; }

        .table-footer {
          padding: 12px 18px;
          border-top: 1px solid rgba(0,0,0,0.06);
          font-size: 12px;
          color: #aaa49c;
          background: #faf8f5;
        }

        @media (max-width: 600px) {
          .nl-title { font-size: 21px; }
          .nl-stats { gap: 8px; }
          .stat-card { padding: 13px 16px; }
          .copy-btn span { display: none; }
        }
      `}</style>

      <div className="nl-page">

        {/* ── TOAST ── */}
        {toast && (
          <div className={`toast ${toast.type}`}>
            {toast.type === 'success' ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            )}
            {toast.message}
          </div>
        )}

        {/* ── DELETE CONFIRM MODAL ── */}
        {confirmId && (
          <div className="modal-overlay" onClick={() => setConfirmId(null)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="modal-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              </div>
              <div className="modal-title">Remove Subscriber?</div>
              <div className="modal-desc">
                This will permanently delete{' '}
                <strong>{subscribers.find(s => s.id === confirmId)?.email}</strong>{' '}
                from your newsletter list. This action cannot be undone.
              </div>
              <div className="modal-actions">
                <button className="modal-cancel" onClick={() => setConfirmId(null)}>Cancel</button>
                <button className="modal-confirm" onClick={() => deleteSubscriber(confirmId)}>Yes, Remove</button>
              </div>
            </div>
          </div>
        )}

        {/* ── HEADER ── */}
        <div className="nl-header">
          <div className="nl-title-group">
            <div className="nl-eyebrow">Marketing</div>
            <h1 className="nl-title">Newsletter Subscribers</h1>
            <p className="nl-subtitle">Manage and export your email subscriber list</p>
          </div>
        </div>

        {/* ── STATS ── */}
        {!loading && (
          <div className="nl-stats">
            <div className="stat-card">
              <div className="stat-icon amber">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div>
                <div className="stat-val">{subscribers.length}</div>
                <div className="stat-label">Total Subscribers</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <div className="stat-val">{filtered.length}</div>
                <div className="stat-label">{search ? 'Matching Results' : 'Active Emails'}</div>
              </div>
            </div>
          </div>
        )}

        {/* ── LOADING STATE ── */}
        {loading ? (
          <div className="state-box">
            <div className="state-icon loading">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div className="state-title">Loading subscribers…</div>
            <div style={{ marginTop: 14 }} className="loading-dots">
              <span /><span /><span />
            </div>
          </div>

        ) : subscribers.length === 0 ? (
          <div className="state-box">
            <div className="state-icon empty">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div className="state-title">No subscribers yet</div>
            <div className="state-desc">Once people sign up for your newsletter, they'll appear here.</div>
          </div>

        ) : (
          <>
            {/* ── TOOLBAR ── */}
            <div className="nl-toolbar">
              <div className="search-wrap">
                <span className="search-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </span>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search by email…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <button
                onClick={copyAllEmails}
                className={`copy-btn${copied ? ' copied' : ''}`}
              >
                {copied ? (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    <span>Copy All Emails</span>
                  </>
                )}
              </button>
            </div>

            {/* ── TABLE ── */}
            <div className="table-card">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: 48 }}>#</th>
                      <th>Email Address</th>
                      <th>Subscribed At</th>
                      <th style={{ width: 100 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="no-results">
                          No subscribers match "<strong>{search}</strong>"
                        </td>
                      </tr>
                    ) : (
                      filtered.map((s, idx) => (
                        <tr key={s.id}>
                          <td><span className="row-num">{idx + 1}</span></td>
                          <td>
                            <div className="email-cell">
                              <div className="email-avatar">
                                {s.email.charAt(0).toUpperCase()}
                              </div>
                              <span className="email-text">{s.email}</span>
                            </div>
                          </td>
                          <td>
                            <span className="date-text">
                              {new Date(s.created_at).toLocaleString('en-IN', {
                                day: 'numeric', month: 'short', year: 'numeric',
                                hour: '2-digit', minute: '2-digit',
                              })}
                            </span>
                          </td>
                          <td>
                            <button
                              className="del-btn"
                              onClick={() => setConfirmId(s.id)}
                              disabled={deletingId === s.id}
                            >
                              {deletingId === s.id ? (
                                <span className="del-spinner" />
                              ) : (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                              )}
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="table-footer">
                Showing {filtered.length} of {subscribers.length} subscribers
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}