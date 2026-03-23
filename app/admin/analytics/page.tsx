'use client'

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from 'recharts'

const RANGE_OPTIONS = [
  { value: '7',   label: 'Last 7 Days' },
  { value: '30',  label: 'Last 30 Days' },
  { value: 'all', label: 'All Time' },
]

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#0d0d0d', border: '1px solid rgba(212,160,23,0.25)',
      borderRadius: 10, padding: '10px 14px',
      fontFamily: 'DM Sans, sans-serif', boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    }}>
      <div style={{ fontSize: 11, color: '#7a7570', marginBottom: 6, letterSpacing: '0.5px' }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
          <span style={{ fontSize: 13, color: '#f5f0e8', fontWeight: 600 }}>
            {p.dataKey === 'revenue' ? `₹${Number(p.value).toLocaleString('en-IN')}` : p.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [range, setRange] = useState('7')
  const [loading, setLoading] = useState(true)
  const [chartType, setChartType] = useState<'area' | 'bar'>('area')

  useEffect(() => {
    fetchAnalytics()
  }, [range])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/analytics?range=${range}`)
      const json = await res.json()
      setData(json)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const rangeLabel = RANGE_OPTIONS.find(r => r.value === range)?.label ?? ''

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .an-page { font-family: 'DM Sans', sans-serif; }

        /* ── HEADER ── */
        .an-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 16px; margin-bottom: 28px; flex-wrap: wrap;
        }
        .an-eyebrow {
          font-size: 11px; font-weight: 600; letter-spacing: 1.4px;
          text-transform: uppercase; color: #d4a017; margin-bottom: 5px;
        }
        .an-title {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 26px; color: #1a1410; letter-spacing: -0.4px;
        }
        .an-subtitle { font-size: 13.5px; color: #8a8078; margin-top: 4px; }

        /* ── RANGE SELECTOR ── */
        .range-tabs {
          display: flex; gap: 6px;
          background: #fff; border: 1px solid rgba(0,0,0,0.09);
          border-radius: 11px; padding: 5px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .range-tab {
          padding: 7px 16px; border-radius: 8px; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 180ms; color: #7a7570; background: transparent;
          white-space: nowrap;
        }
        .range-tab.active {
          background: #1a1410; color: #f5f0e8; font-weight: 600;
        }
        .range-tab:hover:not(.active) { background: #f5f2ee; color: #2a2420; }

        /* ── STAT CARDS ── */
        .stats-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 14px; margin-bottom: 20px;
        }
        .stat-card {
          background: #fff; border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px; padding: 20px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
          position: relative; overflow: hidden;
          transition: box-shadow 200ms, transform 200ms;
        }
        .stat-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.09); transform: translateY(-2px); }
        .stat-glow {
          position: absolute; top: -30px; right: -30px;
          width: 100px; height: 100px; border-radius: 50%; pointer-events: none;
        }
        .stat-top {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 14px;
        }
        .stat-icon {
          width: 42px; height: 42px; border-radius: 11px;
          display: grid; place-items: center; flex-shrink: 0;
        }
        .stat-change {
          font-size: 11px; font-weight: 600;
          border-radius: 6px; padding: 3px 8px;
        }
        .stat-val {
          font-family: 'Syne', sans-serif; font-size: 26px;
          font-weight: 800; color: #1a1410; line-height: 1;
          letter-spacing: -0.5px; margin-bottom: 5px;
        }
        .stat-label { font-size: 13px; color: #9a9288; }
        .stat-card::after {
          content: ''; position: absolute;
          bottom: 0; left: 0; right: 0; height: 3px; border-radius: 0 0 16px 16px;
        }
        .stat-card.amber::after { background: linear-gradient(90deg,#d4a017,#f59e0b); }
        .stat-card.green::after { background: linear-gradient(90deg,#059669,#10b981); }
        .stat-card.blue::after  { background: linear-gradient(90deg,#2563eb,#3b82f6); }

        /* ── CHART CARD ── */
        .chart-card {
          background: #fff; border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          overflow: hidden; margin-bottom: 20px;
        }
        .chart-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 22px 14px; border-bottom: 1px solid rgba(0,0,0,0.06);
          flex-wrap: wrap; gap: 10px;
        }
        .chart-title {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 15px; color: #1a1410;
        }
        .chart-meta { font-size: 12px; color: #aaa49c; margin-top: 2px; }

        .chart-type-toggle {
          display: flex; gap: 5px;
          background: #f5f2ee; border-radius: 8px; padding: 4px;
        }
        .ct-btn {
          padding: 6px 12px; border: none; border-radius: 6px;
          font-size: 12px; font-weight: 500; cursor: pointer;
          font-family: 'DM Sans', sans-serif; color: #7a7570;
          background: transparent; transition: all 160ms;
          display: flex; align-items: center; gap: 5px;
        }
        .ct-btn.active { background: #fff; color: #1a1410; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .ct-btn:hover:not(.active) { color: #2a2420; }

        .chart-body { padding: 20px 8px 12px; }

        /* ── BOTTOM GRID ── */
        .bottom-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .mini-card {
          background: #fff; border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow: hidden;
        }
        .mini-head {
          padding: 16px 20px 12px; border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .mini-title {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 14px; color: #1a1410;
        }
        .mini-body { padding: 14px 20px; display: flex; flex-direction: column; gap: 12px; }

        /* KPI rows */
        .kpi-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .kpi-left { display: flex; align-items: center; gap: 10px; }
        .kpi-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .kpi-label { font-size: 13px; color: #4a4540; font-weight: 500; }
        .kpi-val {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 14px; color: #1a1410;
        }
        .kpi-bar-wrap {
          height: 4px; background: rgba(0,0,0,0.06);
          border-radius: 10px; overflow: hidden; margin-top: 4px;
        }
        .kpi-bar { height: 100%; border-radius: 10px; transition: width 0.8s ease; }

        /* Summary table */
        .summary-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .summary-table th {
          text-align: left; padding: 0 0 10px;
          font-size: 10.5px; font-weight: 600; letter-spacing: 0.9px;
          text-transform: uppercase; color: #aaa49c; border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .summary-table td {
          padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,0.04);
          color: #2a2420;
        }
        .summary-table tr:last-child td { border-bottom: none; }
        .summary-val { font-weight: 600; color: #d4a017; font-family: 'Syne', sans-serif; }

        /* ── LOADING ── */
        .loading-shell {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; min-height: 340px; gap: 16px;
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

        /* ── EMPTY CHART ── */
        .chart-empty {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; height: 280px; gap: 10px; color: #aaa49c;
        }
        .chart-empty-icon {
          width: 48px; height: 48px; border-radius: 14px;
          background: rgba(0,0,0,0.04); display: grid;
          place-items: center; color: #cac5be;
        }
        .chart-empty-text { font-size: 14px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .bottom-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 700px) {
          .stats-grid { grid-template-columns: 1fr; gap: 10px; }
          .an-title { font-size: 21px; }
          .range-tabs { flex-wrap: wrap; }
        }
        @media (max-width: 500px) {
          .stats-grid { grid-template-columns: repeat(2,1fr); }
          .stat-val { font-size: 20px; }
        }
      `}</style>

      <div className="an-page">

        {/* ── LOADING ── */}
        {loading ? (
          <div className="loading-shell">
            <div className="loading-logo">N</div>
            <div className="loading-text">Loading analytics…</div>
            <div className="loading-dots"><span /><span /><span /></div>
          </div>
        ) : (
          <>
            {/* ── HEADER ── */}
            <div className="an-header">
              <div>
                <div className="an-eyebrow">Insights</div>
                <h1 className="an-title">Analytics</h1>
                <p className="an-subtitle">Store performance for {rangeLabel.toLowerCase()}</p>
              </div>

              {/* Range tabs */}
              <div className="range-tabs">
                {RANGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={`range-tab${range === opt.value ? ' active' : ''}`}
                    onClick={() => setRange(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── STAT CARDS ── */}
            <div className="stats-grid">

              {/* Revenue */}
              <div className="stat-card amber">
                <div className="stat-glow" style={{ background: 'radial-gradient(circle,rgba(212,160,23,0.12),transparent)' }} />
                <div className="stat-top">
                  <div className="stat-icon" style={{ background: 'rgba(212,160,23,0.12)', color: '#d4a017' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <span className="stat-change" style={{ background: 'rgba(16,185,129,0.1)', color: '#065f46' }}>Revenue</span>
                </div>
                <div className="stat-val">₹{Number(data.totalRevenue ?? 0).toLocaleString('en-IN')}</div>
                <div className="stat-label">Total Revenue</div>
              </div>

              {/* Orders */}
              <div className="stat-card green">
                <div className="stat-glow" style={{ background: 'radial-gradient(circle,rgba(16,185,129,0.1),transparent)' }} />
                <div className="stat-top">
                  <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                  </div>
                  <span className="stat-change" style={{ background: 'rgba(16,185,129,0.1)', color: '#065f46' }}>Orders</span>
                </div>
                <div className="stat-val">{data.totalOrders ?? 0}</div>
                <div className="stat-label">Total Orders</div>
              </div>

              {/* Avg Order */}
              <div className="stat-card blue">
                <div className="stat-glow" style={{ background: 'radial-gradient(circle,rgba(59,130,246,0.1),transparent)' }} />
                <div className="stat-top">
                  <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                    </svg>
                  </div>
                  <span className="stat-change" style={{ background: 'rgba(59,130,246,0.1)', color: '#1d4ed8' }}>Avg</span>
                </div>
                <div className="stat-val" style={{ fontSize: 22 }}>
                  ₹{Number(data.avgOrderValue ?? 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </div>
                <div className="stat-label">Avg. Order Value</div>
              </div>

            </div>

            {/* ── REVENUE CHART ── */}
            <div className="chart-card">
              <div className="chart-head">
                <div>
                  <div className="chart-title">Revenue Trend</div>
                  <div className="chart-meta">{rangeLabel} · daily breakdown</div>
                </div>
                <div className="chart-type-toggle">
                  <button
                    className={`ct-btn${chartType === 'area' ? ' active' : ''}`}
                    onClick={() => setChartType('area')}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                    </svg>
                    Area
                  </button>
                  <button
                    className={`ct-btn${chartType === 'bar' ? ' active' : ''}`}
                    onClick={() => setChartType('bar')}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
                      <line x1="6" y1="20" x2="6" y2="14"/>
                    </svg>
                    Bar
                  </button>
                </div>
              </div>

              <div className="chart-body">
                {(!data.chartData || data.chartData.length === 0) ? (
                  <div className="chart-empty">
                    <div className="chart-empty-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
                        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
                      </svg>
                    </div>
                    <div className="chart-empty-text">No data available for this period</div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    {chartType === 'area' ? (
                      <AreaChart data={data.chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d4a017" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#d4a017" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 11, fill: '#aaa49c', fontFamily: 'DM Sans' }}
                          axisLine={false} tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: '#aaa49c', fontFamily: 'DM Sans' }}
                          axisLine={false} tickLine={false}
                          tickFormatter={(v) => `₹${v}`}
                          width={56}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone" dataKey="revenue"
                          stroke="#d4a017" strokeWidth={2.5}
                          fill="url(#revenueGrad)" dot={false}
                          activeDot={{ r: 5, fill: '#d4a017', stroke: '#fff', strokeWidth: 2 }}
                        />
                      </AreaChart>
                    ) : (
                      <BarChart data={data.chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#d4a017" stopOpacity={1} />
                            <stop offset="100%" stopColor="#a37a10" stopOpacity={1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 11, fill: '#aaa49c', fontFamily: 'DM Sans' }}
                          axisLine={false} tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: '#aaa49c', fontFamily: 'DM Sans' }}
                          axisLine={false} tickLine={false}
                          tickFormatter={(v) => `₹${v}`}
                          width={56}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="revenue" fill="url(#barGrad)" radius={[5, 5, 0, 0]} maxBarSize={40} />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* ── BOTTOM GRID ── */}
            <div className="bottom-grid">

              {/* Performance KPIs */}
              <div className="mini-card">
                <div className="mini-head">
                  <div className="mini-title">Performance Breakdown</div>
                </div>
                <div className="mini-body">
                  {[
                    {
                      label: 'Revenue',
                      val: `₹${Number(data.totalRevenue ?? 0).toLocaleString('en-IN')}`,
                      pct: 100,
                      color: '#d4a017',
                    },
                    {
                      label: 'Orders Placed',
                      val: data.totalOrders ?? 0,
                      pct: Math.min(100, ((data.totalOrders ?? 0) / Math.max(data.totalOrders ?? 1, 1)) * 100),
                      color: '#10b981',
                    },
                    {
                      label: 'Avg Order Value',
                      val: `₹${Number(data.avgOrderValue ?? 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
                      pct: Math.min(100, ((data.avgOrderValue ?? 0) / 2000) * 100),
                      color: '#3b82f6',
                    },
                  ].map((k, i) => (
                    <div key={i}>
                      <div className="kpi-row">
                        <div className="kpi-left">
                          <div className="kpi-dot" style={{ background: k.color }} />
                          <span className="kpi-label">{k.label}</span>
                        </div>
                        <span className="kpi-val">{k.val}</span>
                      </div>
                      <div className="kpi-bar-wrap">
                        <div className="kpi-bar" style={{ width: `${k.pct}%`, background: k.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Period Summary */}
              <div className="mini-card">
                <div className="mini-head">
                  <div className="mini-title">Period Summary</div>
                </div>
                <div style={{ padding: '14px 20px' }}>
                  <table className="summary-table">
                    <thead>
                      <tr>
                        <th>Metric</th>
                        <th style={{ textAlign: 'right' }}>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Period</td>
                        <td style={{ textAlign: 'right', fontWeight: 600, color: '#1a1410' }}>{rangeLabel}</td>
                      </tr>
                      <tr>
                        <td>Total Revenue</td>
                        <td style={{ textAlign: 'right' }} className="summary-val">
                          ₹{Number(data.totalRevenue ?? 0).toLocaleString('en-IN')}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Orders</td>
                        <td style={{ textAlign: 'right', fontWeight: 700, color: '#1a1410', fontFamily: 'Syne, sans-serif' }}>
                          {data.totalOrders ?? 0}
                        </td>
                      </tr>
                      <tr>
                        <td>Avg. Order Value</td>
                        <td style={{ textAlign: 'right' }} className="summary-val">
                          ₹{Number(data.avgOrderValue ?? 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                      <tr>
                        <td>Data Points</td>
                        <td style={{ textAlign: 'right', fontWeight: 600, color: '#7a7570' }}>
                          {data.chartData?.length ?? 0} days
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </>
  )
}