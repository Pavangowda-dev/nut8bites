'use client'

import { useEffect, useState } from 'react'

interface OrderItem {
  product_name: string
  pack_size?: string
  quantity: number
  price: number
}

interface Order {
  id: string
  customer_name: string
  phone: string
  total: number
  order_status: string
  created_at: string
  address1: string
  address2?: string
  city: string
  state: string
  pincode: string
  items: OrderItem[]
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  pending:   { label: 'Pending',   color: '#b45309', bg: 'rgba(245,158,11,0.1)',  dot: '#f59e0b' },
  confirmed: { label: 'Confirmed', color: '#1d4ed8', bg: 'rgba(59,130,246,0.1)', dot: '#3b82f6' },
  shipped:   { label: 'Shipped',   color: '#065f46', bg: 'rgba(16,185,129,0.1)', dot: '#10b981' },
}

const getStatus = (s: string) =>
  STATUS_CONFIG[s] ?? { label: s, color: '#4a4540', bg: 'rgba(0,0,0,0.06)', dot: '#aaa49c' }

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [shippingId, setShippingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => { fetchOrders() }, [])
  useEffect(() => { applyFilters() }, [search, statusFilter, orders])

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders')
      const data = await res.json()
      setOrders(data.orders || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let temp = [...orders]
    if (search) {
      temp = temp.filter((o) =>
        o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        o.phone.includes(search) ||
        o.id.includes(search)
      )
    }
    if (statusFilter !== 'all') {
      temp = temp.filter((o) => o.order_status === statusFilter)
    }
    setFilteredOrders(temp)
  }

  const markShipped = async (id: string) => {
    setShippingId(id)
    try {
      const res = await fetch('/api/admin/update-order-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'shipped' }),
      })
      const data = await res.json()
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => o.id === id ? { ...o, order_status: 'shipped' } : o)
        )
        if (selectedOrder?.id === id) {
          setSelectedOrder((prev) => prev ? { ...prev, order_status: 'shipped' } : null)
        }
        showToast('Order marked as shipped!')
      } else {
        showToast('Failed to update status.', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Something went wrong.', 'error')
    } finally {
      setShippingId(null)
    }
  }

  // Stats
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
  const pendingCount = orders.filter(o => o.order_status === 'pending').length
  const shippedCount = orders.filter(o => o.order_status === 'shipped').length

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ord-page { font-family: 'DM Sans', sans-serif; }

        /* ── TOAST ── */
        .toast {
          position: fixed; bottom: 28px; right: 28px; z-index: 9999;
          display: flex; align-items: center; gap: 10px;
          padding: 13px 18px; border-radius: 12px;
          font-size: 13.5px; font-weight: 500; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          animation: toastIn 0.32s cubic-bezier(0.22,1,0.36,1);
          max-width: 320px;
        }
        .toast.success { background: #1a1a1a; color: #d4a017; border: 1px solid rgba(212,160,23,0.25); }
        .toast.error   { background: #1e0e0e; color: #e05c5c; border: 1px solid rgba(224,92,92,0.22); }
        @keyframes toastIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

        /* ── HEADER ── */
        .ord-header { margin-bottom: 28px; }
        .ord-eyebrow {
          font-size: 11px; font-weight: 600; letter-spacing: 1.4px;
          text-transform: uppercase; color: #d4a017; margin-bottom: 5px;
        }
        .ord-title {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 26px; color: #1a1410; letter-spacing: -0.4px;
        }
        .ord-subtitle { font-size: 13.5px; color: #8a8078; margin-top: 4px; }

        /* ── STATS ── */
        .ord-stats { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
        .stat-card {
          background: #fff; border: 1px solid rgba(0,0,0,0.07);
          border-radius: 14px; padding: 16px 20px;
          display: flex; align-items: center; gap: 14px;
          flex: 1; min-width: 130px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .stat-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: grid; place-items: center; flex-shrink: 0;
        }
        .stat-icon.amber  { background: rgba(212,160,23,0.12); color: #d4a017; }
        .stat-icon.orange { background: rgba(245,158,11,0.12); color: #f59e0b; }
        .stat-icon.green  { background: rgba(16,185,129,0.1);  color: #10b981; }
        .stat-icon.blue   { background: rgba(59,130,246,0.1);  color: #3b82f6; }
        .stat-val {
          font-family: 'Syne', sans-serif; font-size: 20px;
          font-weight: 700; color: #1a1410; line-height: 1;
        }
        .stat-label { font-size: 12px; color: #9a9288; margin-top: 3px; }

        /* ── TOOLBAR ── */
        .ord-toolbar {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 16px; flex-wrap: wrap;
        }
        .search-wrap { position: relative; flex: 1; min-width: 200px; max-width: 340px; }
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
        .filter-select {
          background: #fff; border: 1px solid rgba(0,0,0,0.1);
          border-radius: 10px; padding: 10px 14px;
          font-size: 13.5px; font-family: 'DM Sans', sans-serif;
          color: #1a1410; outline: none; cursor: pointer;
          transition: border-color 180ms;
          min-width: 140px;
        }
        .filter-select:focus { border-color: rgba(212,160,23,0.45); }
        .results-badge {
          font-size: 12px; color: #9a9288;
          background: #fff; border: 1px solid rgba(0,0,0,0.08);
          border-radius: 8px; padding: 6px 12px; white-space: nowrap;
          margin-left: auto;
        }

        /* ── TABLE ── */
        .table-card {
          background: #fff; border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 2px 12px rgba(0,0,0,0.06); overflow: hidden;
        }
        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; font-size: 13.5px; min-width: 780px; }
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

        .row-num { color: #cac5be; font-size: 12px; }
        .order-id {
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          color: #7a7570; background: #f5f2ee;
          border-radius: 5px; padding: 3px 8px;
          font-weight: 500; letter-spacing: 0.3px;
        }

        /* Name cell */
        .name-cell { display: flex; align-items: center; gap: 10px; }
        .avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #d4a017, #a37a10);
          display: grid; place-items: center;
          font-size: 12px; font-weight: 700; color: #fff;
          flex-shrink: 0; font-family: 'Syne', sans-serif;
        }
        .name-text { font-weight: 600; color: #1a1410; white-space: nowrap; }

        .phone-text { color: #5a5550; font-size: 13px; }
        .total-text {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 14px; color: #d4a017;
        }
        .date-text { color: #7a7570; font-size: 13px; white-space: nowrap; }

        /* Status badge */
        .status-badge {
          display: inline-flex; align-items: center; gap: 6px;
          border-radius: 20px; padding: 4px 10px;
          font-size: 12px; font-weight: 600; white-space: nowrap;
        }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

        /* Action buttons */
        .action-cell { display: flex; align-items: center; gap: 7px; }
        .btn-view {
          display: inline-flex; align-items: center; gap: 5px;
          background: transparent; border: 1px solid rgba(0,0,0,0.1);
          border-radius: 7px; color: #4a4540; font-size: 12px;
          font-weight: 500; font-family: 'DM Sans', sans-serif;
          padding: 5px 10px; cursor: pointer;
          transition: background 150ms, border-color 150ms, color 150ms;
          white-space: nowrap;
        }
        .btn-view:hover { background: #1a1410; color: #f5f0e8; border-color: #1a1410; }

        .btn-ship {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25);
          border-radius: 7px; color: #065f46; font-size: 12px;
          font-weight: 600; font-family: 'DM Sans', sans-serif;
          padding: 5px 10px; cursor: pointer;
          transition: background 150ms, border-color 150ms;
          white-space: nowrap;
        }
        .btn-ship:hover { background: rgba(16,185,129,0.18); border-color: rgba(16,185,129,0.4); }
        .btn-ship:disabled { opacity: 0.5; cursor: not-allowed; }

        .ship-spinner {
          width: 12px; height: 12px;
          border: 2px solid rgba(6,95,70,0.25);
          border-top-color: #065f46;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .table-footer {
          padding: 12px 16px; border-top: 1px solid rgba(0,0,0,0.06);
          font-size: 12px; color: #aaa49c; background: #faf8f5;
        }

        /* ── ORDER DETAIL MODAL ── */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.45); backdrop-filter: blur(5px);
          z-index: 800; display: flex; align-items: center; justify-content: center;
          padding: 20px; animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .modal-box {
          background: #fff; border-radius: 20px;
          width: 100%; max-width: 580px; max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 32px 80px rgba(0,0,0,0.22);
          animation: slideUp 0.28s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        /* Modal head */
        .modal-head {
          background: #0d0d0d; padding: 22px 24px;
          display: flex; align-items: flex-start; justify-content: space-between; gap: 14px;
          position: sticky; top: 0; z-index: 10;
        }
        .modal-head-left { display: flex; align-items: center; gap: 14px; }
        .modal-avatar {
          width: 46px; height: 46px; border-radius: 12px;
          background: linear-gradient(135deg, #d4a017, #a37a10);
          display: grid; place-items: center;
          font-size: 18px; font-weight: 700; color: #fff;
          font-family: 'Syne', sans-serif; flex-shrink: 0;
        }
        .modal-name {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 17px; color: #f5f0e8;
        }
        .modal-meta { font-size: 13px; color: #5a5550; margin-top: 3px; }
        .modal-close {
          width: 34px; height: 34px; border: none;
          background: rgba(255,255,255,0.08); border-radius: 8px;
          display: grid; place-items: center; cursor: pointer;
          color: #7a7570; flex-shrink: 0;
          transition: background 160ms, color 160ms;
        }
        .modal-close:hover { background: rgba(255,255,255,0.14); color: #f5f0e8; }

        /* Modal body */
        .modal-body { padding: 24px; display: flex; flex-direction: column; gap: 22px; }

        .modal-section-title {
          font-size: 10.5px; font-weight: 600; letter-spacing: 1.1px;
          text-transform: uppercase; color: #aaa49c; margin-bottom: 10px;
        }

        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .info-item { display: flex; flex-direction: column; gap: 4px; }
        .info-label { font-size: 11px; font-weight: 600; color: #aaa49c; text-transform: uppercase; letter-spacing: 0.8px; }
        .info-val { font-size: 14px; color: #1a1410; font-weight: 500; }

        .address-box {
          background: #faf8f5; border: 1px solid rgba(0,0,0,0.07);
          border-radius: 10px; padding: 14px;
          font-size: 13.5px; color: #3a3430; line-height: 1.7;
        }

        /* Items list */
        .items-list { display: flex; flex-direction: column; gap: 8px; }
        .item-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; background: #faf8f5;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 10px; padding: 12px 14px;
        }
        .item-left { display: flex; align-items: center; gap: 12px; }
        .item-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #d4a017; flex-shrink: 0;
        }
        .item-name { font-weight: 600; font-size: 13.5px; color: #1a1410; }
        .item-sub { font-size: 12px; color: #9a9288; margin-top: 2px; }
        .item-price {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: 14px; color: #d4a017; white-space: nowrap;
        }

        .total-row {
          display: flex; align-items: center; justify-content: space-between;
          background: #0d0d0d; border-radius: 10px; padding: 14px 16px;
        }
        .total-label { font-size: 14px; font-weight: 600; color: #7a7570; }
        .total-val {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: 20px; color: #d4a017;
        }

        /* Modal footer */
        .modal-footer {
          padding: 16px 24px; border-top: 1px solid rgba(0,0,0,0.07);
          display: flex; gap: 10px; background: #faf8f5;
          position: sticky; bottom: 0;
        }
        .modal-ship-btn {
          flex: 1; display: flex; align-items: center; justify-content: center;
          gap: 8px; padding: 12px;
          background: #10b981; color: #fff; border: none; border-radius: 10px;
          font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
          cursor: pointer; transition: background 160ms;
        }
        .modal-ship-btn:hover { background: #059669; }
        .modal-ship-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .modal-shipped-badge {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 12px; background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.25); border-radius: 10px;
          font-size: 14px; font-weight: 600; color: #065f46;
        }
        .modal-close-btn {
          padding: 12px 20px;
          background: #fff; border: 1px solid rgba(0,0,0,0.12);
          border-radius: 10px; font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 600; color: #4a4540;
          cursor: pointer; transition: background 150ms;
        }
        .modal-close-btn:hover { background: #f0ede9; }

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
          .ord-title { font-size: 21px; }
          .info-grid { grid-template-columns: 1fr; gap: 10px; }
          .results-badge { display: none; }
          .ord-stats { gap: 8px; }
          .stat-card { padding: 13px 14px; }
          .stat-val { font-size: 18px; }
        }
      `}</style>

      <div className="ord-page">

        {/* ── TOAST ── */}
        {toast && (
          <div className={`toast ${toast.type}`}>
            {toast.type === 'success'
              ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            }
            {toast.message}
          </div>
        )}

        {/* ── ORDER DETAIL MODAL ── */}
        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>

              {/* Head */}
              <div className="modal-head">
                <div className="modal-head-left">
                  <div className="modal-avatar">
                    {selectedOrder.customer_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="modal-name">{selectedOrder.customer_name}</div>
                    <div className="modal-meta">
                      {selectedOrder.phone} &nbsp;·&nbsp;
                      <span style={{
                        color: getStatus(selectedOrder.order_status).dot,
                        fontWeight: 600, textTransform: 'capitalize'
                      }}>
                        {getStatus(selectedOrder.order_status).label}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="modal-close" onClick={() => setSelectedOrder(null)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              <div className="modal-body">

                {/* Order Info */}
                <div>
                  <div className="modal-section-title">Order Info</div>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Order ID</span>
                      <span className="info-val" style={{ fontFamily: 'monospace', fontSize: 12, color: '#7a7570' }}>
                        {selectedOrder.id}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Date</span>
                      <span className="info-val">
                        {new Date(selectedOrder.created_at).toLocaleString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <div className="modal-section-title">Delivery Address</div>
                  <div className="address-box">
                    {selectedOrder.address1}<br />
                    {selectedOrder.address2 && <>{selectedOrder.address2}<br /></>}
                    {selectedOrder.city}, {selectedOrder.state} — {selectedOrder.pincode}
                  </div>
                </div>

                {/* Items */}
                <div>
                  <div className="modal-section-title">Items Ordered</div>
                  <div className="items-list">
                    {selectedOrder.items.map((item, i) => (
                      <div className="item-row" key={i}>
                        <div className="item-left">
                          <div className="item-dot" />
                          <div>
                            <div className="item-name">{item.product_name}</div>
                            <div className="item-sub">
                              {item.pack_size && <>{item.pack_size} &nbsp;·&nbsp;</>}
                              Qty: {item.quantity}
                            </div>
                          </div>
                        </div>
                        <div className="item-price">₹{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="total-row">
                  <span className="total-label">Order Total</span>
                  <span className="total-val">₹{selectedOrder.total}</span>
                </div>

              </div>

              {/* Footer */}
              <div className="modal-footer">
                {selectedOrder.order_status !== 'shipped' ? (
                  <button
                    className="modal-ship-btn"
                    onClick={() => markShipped(selectedOrder.id)}
                    disabled={shippingId === selectedOrder.id}
                  >
                    {shippingId === selectedOrder.id ? (
                      <><span className="ship-spinner" /> Updating…</>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                          <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                        </svg>
                        Mark as Shipped
                      </>
                    )}
                  </button>
                ) : (
                  <div className="modal-shipped-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Shipped
                  </div>
                )}
                <button className="modal-close-btn" onClick={() => setSelectedOrder(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* ── PAGE HEADER ── */}
        <div className="ord-header">
          <div className="ord-eyebrow">Fulfilment</div>
          <h1 className="ord-title">Orders</h1>
          <p className="ord-subtitle">Track, manage and fulfil customer orders</p>
        </div>

        {/* ── STATS ── */}
        {!loading && (
          <div className="ord-stats">
            <div className="stat-card">
              <div className="stat-icon amber">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <div>
                <div className="stat-val">{orders.length}</div>
                <div className="stat-label">Total Orders</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <div className="stat-val">{pendingCount}</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <div>
                <div className="stat-val">{shippedCount}</div>
                <div className="stat-label">Shipped</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div>
                <div className="stat-val">₹{totalRevenue.toLocaleString('en-IN')}</div>
                <div className="stat-label">Total Revenue</div>
              </div>
            </div>
          </div>
        )}

        {/* ── LOADING ── */}
        {loading ? (
          <div className="state-box">
            <div className="state-icon loading">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
              </svg>
            </div>
            <div className="state-title">Loading orders…</div>
            <div style={{ marginTop: 14 }} className="loading-dots">
              <span /><span /><span />
            </div>
          </div>

        ) : orders.length === 0 ? (
          <div className="state-box">
            <div className="state-icon empty">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
              </svg>
            </div>
            <div className="state-title">No orders yet</div>
            <div className="state-desc">When customers place orders, they'll appear here.</div>
          </div>

        ) : (
          <>
            {/* ── TOOLBAR ── */}
            <div className="ord-toolbar">
              <div className="search-wrap">
                <span className="search-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </span>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search by name, phone, order ID…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
              </select>

              <span className="results-badge">
                {filteredOrders.length} of {orders.length} orders
              </span>
            </div>

            {/* ── TABLE ── */}
            <div className="table-card">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}>#</th>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Phone</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="no-results">
                          No orders match "<strong>{search || statusFilter}</strong>"
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((o, idx) => {
                        const st = getStatus(o.order_status)
                        return (
                          <tr key={o.id} onClick={() => setSelectedOrder(o)}>
                            <td><span className="row-num">{idx + 1}</span></td>
                            <td><span className="order-id">{o.id.slice(0, 8)}…</span></td>
                            <td>
                              <div className="name-cell">
                                <div className="avatar">{o.customer_name.charAt(0).toUpperCase()}</div>
                                <span className="name-text">{o.customer_name}</span>
                              </div>
                            </td>
                            <td><span className="phone-text">{o.phone}</span></td>
                            <td><span className="total-text">₹{o.total.toLocaleString('en-IN')}</span></td>
                            <td>
                              <span
                                className="status-badge"
                                style={{ color: st.color, background: st.bg }}
                              >
                                <span className="status-dot" style={{ background: st.dot }} />
                                {st.label}
                              </span>
                            </td>
                            <td>
                              <span className="date-text">
                                {new Date(o.created_at).toLocaleString('en-IN', {
                                  day: 'numeric', month: 'short', year: 'numeric',
                                  hour: '2-digit', minute: '2-digit',
                                })}
                              </span>
                            </td>
                            <td>
                              <div className="action-cell" onClick={(e) => e.stopPropagation()}>
                                <button
                                  className="btn-view"
                                  onClick={() => setSelectedOrder(o)}
                                >
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                  </svg>
                                  View
                                </button>

                                {o.order_status !== 'shipped' && (
                                  <button
                                    className="btn-ship"
                                    onClick={() => markShipped(o.id)}
                                    disabled={shippingId === o.id}
                                  >
                                    {shippingId === o.id ? (
                                      <span className="ship-spinner" />
                                    ) : (
                                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="1" y="3" width="15" height="13" rx="1"/>
                                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                                        <circle cx="5.5" cy="18.5" r="2.5"/>
                                        <circle cx="18.5" cy="18.5" r="2.5"/>
                                      </svg>
                                    )}
                                    Ship
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <div className="table-footer">
                Showing {filteredOrders.length} of {orders.length} orders
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}