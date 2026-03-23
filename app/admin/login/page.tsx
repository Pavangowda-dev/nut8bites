'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // ✅ Auto redirect if already logged in
    const isAdmin = localStorage.getItem('admin')
    if (isAdmin) {
      router.replace('/admin/dashboard')
    }
  }, [])

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (data.success) {
        // ✅ Save session
        localStorage.setItem('admin', 'true')
        // optional: save timestamp
        localStorage.setItem('admin_login_time', Date.now().toString())
        router.replace('/admin/dashboard')
      } else {
        setError('Invalid email or password. Please try again.')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0d0d0d;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 24px 16px;
        }

        /* Ambient background blobs */
        .login-page::before {
          content: '';
          position: absolute;
          top: -180px;
          right: -120px;
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(212,160,23,0.13) 0%, transparent 70%);
          pointer-events: none;
        }
        .login-page::after {
          content: '';
          position: absolute;
          bottom: -200px;
          left: -100px;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(212,160,23,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Grid texture overlay */
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .login-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          background: #141414;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 44px 40px 40px;
          box-shadow:
            0 0 0 1px rgba(212,160,23,0.06),
            0 32px 64px rgba(0,0,0,0.5),
            0 0 80px rgba(212,160,23,0.04);
          opacity: 0;
          transform: translateY(18px);
          animation: cardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
        }

        @keyframes cardIn {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Header */
        .login-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .login-logo-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #d4a017 0%, #a37a10 100%);
          border-radius: 14px;
          margin-bottom: 20px;
          box-shadow: 0 8px 24px rgba(212,160,23,0.3);
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 24px;
          color: #0d0d0d;
        }
        .login-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 22px;
          color: #f5f0e8;
          margin-bottom: 6px;
          letter-spacing: -0.3px;
        }
        .login-subtitle {
          font-size: 13.5px;
          color: #5a5550;
          font-weight: 400;
          letter-spacing: 0.1px;
        }

        /* Divider */
        .login-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 28px;
        }

        /* Form */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .field-label {
          font-size: 12px;
          font-weight: 600;
          color: #7a7570;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .field-wrap {
          position: relative;
        }
        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #4a4540;
          pointer-events: none;
          display: grid;
          place-items: center;
          transition: color 200ms;
        }
        .field-input {
          width: 100%;
          background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 13px 14px 13px 44px;
          color: #f5f0e8;
          font-size: 14.5px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          outline: none;
          transition: border-color 200ms, box-shadow 200ms;
          -webkit-appearance: none;
        }
        .field-input::placeholder {
          color: #3a3530;
        }
        .field-input:focus {
          border-color: rgba(212,160,23,0.5);
          box-shadow: 0 0 0 3px rgba(212,160,23,0.1);
        }
        .field-input:focus + .field-focus-icon,
        .field-wrap:focus-within .field-icon {
          color: #d4a017;
        }

        /* Password toggle */
        .toggle-pw {
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #4a4540;
          padding: 4px;
          display: grid;
          place-items: center;
          border-radius: 5px;
          transition: color 180ms, background 180ms;
        }
        .toggle-pw:hover {
          color: #a37a10;
          background: rgba(212,160,23,0.08);
        }
        .pw-input {
          padding-right: 44px;
        }

        /* Error */
        .error-box {
          display: flex;
          align-items: center;
          gap: 9px;
          background: rgba(224,92,92,0.1);
          border: 1px solid rgba(224,92,92,0.2);
          border-radius: 9px;
          padding: 11px 14px;
          color: #e05c5c;
          font-size: 13px;
          font-weight: 500;
          animation: shake 0.38s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90%  { transform: translateX(-2px); }
          20%, 80%  { transform: translateX(3px); }
          30%, 50%, 70% { transform: translateX(-3px); }
          40%, 60%  { transform: translateX(3px); }
        }

        /* Submit button */
        .login-btn {
          width: 100%;
          padding: 14px;
          margin-top: 4px;
          background: linear-gradient(135deg, #d4a017 0%, #b88a12 100%);
          color: #0d0d0d;
          border: none;
          border-radius: 10px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.2px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 200ms, transform 150ms, box-shadow 200ms;
          box-shadow: 0 4px 20px rgba(212,160,23,0.28);
          position: relative;
          overflow: hidden;
        }
        .login-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(255,255,255,0.12), transparent);
          border-radius: inherit;
        }
        .login-btn:hover:not(:disabled) {
          box-shadow: 0 6px 28px rgba(212,160,23,0.38);
          transform: translateY(-1px);
        }
        .login-btn:active:not(:disabled) {
          transform: translateY(0px);
        }
        .login-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* Spinner */
        .spinner {
          width: 17px;
          height: 17px;
          border: 2.5px solid rgba(13,13,13,0.3);
          border-top-color: #0d0d0d;
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Footer */
        .login-footer {
          text-align: center;
          margin-top: 28px;
          font-size: 12px;
          color: #3a3530;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 32px 24px 28px;
            border-radius: 16px;
          }
          .login-title { font-size: 20px; }
        }
      `}</style>

      <div className="login-page">
        <div className="grid-overlay" />

        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="login-logo-wrap">N</div>
            <h1 className="login-title">Nut8Bites Admin</h1>
            <p className="login-subtitle">Sign in to manage your store</p>
          </div>

          <div className="login-divider" />

          {/* Form — logic unchanged */}
          <form onSubmit={handleLogin} className="login-form">

            {/* Email */}
            <div className="field-group">
              <label className="field-label">Email Address</label>
              <div className="field-wrap">
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="admin@nut8bites.com"
                  required
                  className="field-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                  className="field-input pw-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="error-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? (
                <>
                  <span className="spinner" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="login-footer">Nut8Bites · Admin Portal · Restricted Access</p>
        </div>
      </div>
    </>
  )
}