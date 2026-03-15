import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase'

export default function Orders() {
  const [isMobile, setIsMobile] = useState(false)
  const { user, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!isLoggedIn) { navigate('/login?redirect=/orders'); return }
    fetchOrders()
  }, [isLoggedIn, user, navigate])

  const fetchOrders = async () => {
    setLoading(true)

    // Get orders from localStorage
    const localOrders = JSON.parse(localStorage.getItem('kalarang_orders') || '[]')
      .filter(o => o.userId === user?.id)
      .map(o => ({ id: o.id, date: o.date, items: o.items, total: o.total, shipping: o.shipping, address: o.address, status: o.status, paymentMethod: o.address?.paymentMethod }))

    // Try Supabase too
    let supaOrders = []
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (!error && data && data.length > 0) {
        supaOrders = data.map(o => ({
          id: o.order_id,
          date: o.created_at,
          items: o.items,
          total: o.total,
          shipping: o.shipping,
          address: o.address,
          status: o.status,
          paymentMethod: o.payment_method,
        }))
      }
    } catch {}

    // Merge: use Supabase orders if available, otherwise localStorage, deduplicate by id
    const allOrders = supaOrders.length > 0 ? supaOrders : localOrders
    const seen = new Set()
    const unique = allOrders.filter(o => { if (seen.has(o.id)) return false; seen.add(o.id); return true })
    setOrders(unique.sort((a, b) => new Date(b.date) - new Date(a.date)))
    setLoading(false)
  }

  const statusColor = (status) => {
    switch (status) {
      case 'Confirmed': return '#C9A84C'
      case 'Shipped': return '#2d6a4f'
      case 'Delivered': return '#1C2B1D'
      case 'Cancelled': return '#6B1F2A'
      default: return '#6B7280'
    }
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '0' : '104px', background: '#F5EFE0', minHeight: '100vh' }}>

      <section style={{ background: '#1C2B1D', padding: isMobile ? '40px 20px' : '48px 80px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '8px' }}>Your</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '32px' : '48px', fontWeight: 600, margin: 0 }}>Orders</h1>
      </section>

      <section style={{ padding: isMobile ? '24px 20px' : '48px 80px', maxWidth: '900px', margin: '0 auto' }}>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: '#6B7280', fontSize: '14px' }}>Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" style={{ margin: '0 auto 16px', display: 'block', opacity: 0.3 }}>
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#1C2B1D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#1C2B1D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '24px', marginBottom: '8px' }}>No orders yet</p>
            <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '24px' }}>Start exploring our collection and place your first order.</p>
            <Link to="/artisans" style={{ display: 'inline-block', background: '#1C2B1D', color: '#C9A84C', padding: '14px 32px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
              Explore Art
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.map(order => (
              <div key={order.id} style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden' }}>
                <div
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  style={{
                    display: 'flex', flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    justifyContent: 'space-between', padding: '16px 20px',
                    cursor: 'pointer', gap: isMobile ? '8px' : '0',
                    borderBottom: expandedOrder === order.id ? '1px solid rgba(201,168,76,0.12)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', color: '#1C2B1D', fontSize: '15px', fontWeight: 600 }}>#{order.id}</span>
                    <span style={{ color: '#6B7280', fontSize: '13px' }}>{formatDate(order.date)}</span>
                    <span style={{
                      padding: '3px 12px', fontSize: '10px', fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: statusColor(order.status), border: `1px solid ${statusColor(order.status)}`,
                      fontFamily: 'DM Sans, sans-serif',
                    }}>
                      {order.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ color: '#C9A84C', fontWeight: 700, fontSize: '16px', fontFamily: 'DM Sans, sans-serif' }}>
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ transform: expandedOrder === order.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                      <path d="M6 9l6 6 6-6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div style={{ padding: '16px 20px' }}>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '12px', paddingBottom: '12px', borderBottom: idx < order.items.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none' }}>
                        <img src={item.image} alt={item.title} style={{ width: '56px', height: '70px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ color: '#1C2B1D', fontSize: '13px', fontWeight: 500, margin: '0 0 2px' }}>{item.title}</p>
                          {item.artisan && <p style={{ color: '#6B7280', fontSize: '11px', margin: '0 0 4px' }}>{item.artisan}</p>}
                          <p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                        <p style={{ color: '#C9A84C', fontSize: '14px', fontWeight: 600, margin: 0, fontFamily: 'DM Sans, sans-serif' }}>
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}

                    <div style={{ borderTop: '1px solid rgba(201,168,76,0.12)', paddingTop: '12px', marginTop: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ color: '#6B7280', fontSize: '12px' }}>Shipping</span>
                        <span style={{ color: '#1C2B1D', fontSize: '12px' }}>{order.shipping === 0 ? 'Free' : `₹${order.shipping}`}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#1C2B1D', fontSize: '14px', fontWeight: 600 }}>Total</span>
                        <span style={{ color: '#C9A84C', fontSize: '16px', fontWeight: 700, fontFamily: 'DM Sans, sans-serif' }}>₹{order.total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {order.address && (
                      <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(201,168,76,0.12)' }}>
                        <p style={{ color: '#6B7280', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'DM Sans, sans-serif' }}>Shipping Address</p>
                        <p style={{ color: '#1C2B1D', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                          {order.address.name}<br />
                          {order.address.address}<br />
                          {order.address.city}, {order.address.state} — {order.address.pincode}<br />
                          {order.address.phone}
                        </p>
                      </div>
                    )}

                    {(order.paymentMethod || order.address?.paymentMethod) && (
                      <div style={{ marginTop: '12px' }}>
                        <p style={{ color: '#6B7280', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'DM Sans, sans-serif' }}>Payment</p>
                        <p style={{ color: '#1C2B1D', fontSize: '13px', margin: 0, textTransform: 'uppercase' }}>{order.paymentMethod || order.address?.paymentMethod}</p>
                      </div>
                    )}

                    <Link to={`/track?orderId=${order.id}`} style={{
                      display: 'inline-block', marginTop: '16px', background: '#1C2B1D', color: '#C9A84C',
                      padding: '10px 20px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                      textDecoration: 'none', fontFamily: 'DM Sans, sans-serif',
                    }}>
                      Track Order
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
