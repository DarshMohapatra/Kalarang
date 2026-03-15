import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCurrency } from '../context/CurrencyContext'
import { supabase } from '../supabase'

const statusSteps = ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered']

export default function TrackOrder() {
  const [isMobile, setIsMobile] = useState(false)
  const { formatPrice } = useCurrency()
  const [searchParams] = useSearchParams()
  const [inputId, setInputId] = useState(searchParams.get('orderId') || '')
  const [order, setOrder] = useState(null)
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const id = searchParams.get('orderId')?.replace(/^#/, '')
    if (id) lookupOrder(id)
  }, [searchParams])

  const lookupOrder = async (id) => {
    setLoading(true)

    // Check localStorage first
    const localOrders = JSON.parse(localStorage.getItem('kalarang_orders') || '[]')
    const localFound = localOrders.find(o => o.id === id)

    // Try Supabase
    let supaFound = null
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_id', id)
        .single()

      if (!error && data) {
        supaFound = {
          id: data.order_id,
          date: data.created_at,
          items: data.items,
          total: data.total,
          shipping: data.shipping,
          address: data.address,
          status: data.status,
        }
      }
    } catch {}

    // Prefer Supabase, fallback to localStorage
    const found = supaFound || (localFound ? { id: localFound.id, date: localFound.date, items: localFound.items, total: localFound.total, shipping: localFound.shipping, address: localFound.address, status: localFound.status } : null)
    setOrder(found)
    setSearched(true)
    setLoading(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const cleaned = inputId.trim().replace(/^#/, '')
    if (cleaned) lookupOrder(cleaned)
  }

  const getStepIndex = (status) => {
    const idx = statusSteps.indexOf(status)
    return idx >= 0 ? idx : 0
  }

  const currentStep = order ? getStepIndex(order.status) : 0

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '0' : '104px', background: '#F5EFE0', minHeight: '100vh' }}>

      <section style={{ background: '#1C2B1D', padding: isMobile ? '40px 20px' : '48px 80px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '8px' }}>Order</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '32px' : '48px', fontWeight: 600, margin: 0 }}>Track Order</h1>
      </section>

      <section style={{ padding: isMobile ? '32px 20px' : '48px 80px', maxWidth: '700px', margin: '0 auto' }}>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
          <input
            type="text"
            value={inputId}
            onChange={e => setInputId(e.target.value)}
            placeholder="Enter your Order ID (e.g. KLR12345678)"
            style={{
              flex: 1, padding: '14px 16px', border: '1px solid rgba(201,168,76,0.3)',
              background: 'transparent', color: '#1C2B1D', fontSize: '14px',
              fontFamily: 'DM Sans, sans-serif', outline: 'none', boxSizing: 'border-box',
            }}
          />
          <button type="submit" disabled={loading} style={{
            padding: '14px 24px', background: '#1C2B1D', color: '#C9A84C',
            border: 'none', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, whiteSpace: 'nowrap',
            opacity: loading ? 0.7 : 1,
          }}>
            {loading ? '...' : 'Track'}
          </button>
        </form>

        {searched && !order && !loading && (
          <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fff', border: '1px solid rgba(201,168,76,0.15)' }}>
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" style={{ margin: '0 auto 12px', display: 'block', opacity: 0.3 }}>
              <circle cx="11" cy="11" r="8" stroke="#1C2B1D" strokeWidth="1.5" />
              <path d="M21 21l-4.35-4.35" stroke="#1C2B1D" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '20px', marginBottom: '8px' }}>Order not found</p>
            <p style={{ color: '#6B7280', fontSize: '13px', marginBottom: '16px' }}>Please check your Order ID and try again.</p>
            <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" style={{
              display: 'inline-block', background: '#1C2B1D', color: '#C9A84C',
              padding: '10px 20px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              textDecoration: 'none', fontFamily: 'DM Sans, sans-serif',
            }}>
              Contact Support
            </a>
          </div>
        )}

        {order && (
          <div>
            <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.15)', padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <p style={{ color: '#6B7280', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'DM Sans, sans-serif' }}>Order ID</p>
                  <p style={{ color: '#1C2B1D', fontSize: '18px', fontWeight: 700, margin: 0, fontFamily: 'DM Sans, sans-serif' }}>#{order.id}</p>
                </div>
                <div>
                  <p style={{ color: '#6B7280', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'DM Sans, sans-serif' }}>Placed On</p>
                  <p style={{ color: '#1C2B1D', fontSize: '14px', margin: 0 }}>{formatDate(order.date)}</p>
                </div>
                <div>
                  <p style={{ color: '#6B7280', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'DM Sans, sans-serif' }}>Total</p>
                  <p style={{ color: '#C9A84C', fontSize: '18px', fontWeight: 700, margin: 0, fontFamily: 'DM Sans, sans-serif' }}>{formatPrice(order.total)}</p>
                </div>
              </div>

              <div style={{ marginTop: '8px' }}>
                <p style={{ color: '#6B7280', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'DM Sans, sans-serif' }}>Order Status</p>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '14px', left: '14px', right: '14px', height: '2px', background: 'rgba(201,168,76,0.15)', zIndex: 0 }} />
                  <div style={{ position: 'absolute', top: '14px', left: '14px', height: '2px', background: '#C9A84C', zIndex: 1, width: `${(currentStep / (statusSteps.length - 1)) * (100 - (100 / statusSteps.length))}%`, transition: 'width 0.5s ease' }} />
                  {statusSteps.map((step, i) => (
                    <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, flex: 1 }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: i <= currentStep ? '#C9A84C' : '#F5EFE0',
                        border: i <= currentStep ? '2px solid #C9A84C' : '2px solid rgba(201,168,76,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px',
                      }}>
                        {i <= currentStep && (
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5" stroke="#1C2B1D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span style={{
                        fontSize: isMobile ? '9px' : '11px', textAlign: 'center',
                        color: i <= currentStep ? '#1C2B1D' : '#6B7280',
                        fontWeight: i === currentStep ? 700 : 400,
                        fontFamily: 'DM Sans, sans-serif', lineHeight: 1.2,
                      }}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.15)', padding: '20px', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '18px', marginBottom: '16px' }}>Items</h3>
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '12px', paddingBottom: '12px', borderBottom: idx < order.items.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none' }}>
                  <img src={item.image} alt={item.title} style={{ width: '56px', height: '70px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#1C2B1D', fontSize: '13px', fontWeight: 500, margin: '0 0 2px' }}>{item.title}</p>
                    {item.artisan && <p style={{ color: '#6B7280', fontSize: '11px', margin: '0 0 4px' }}>{item.artisan}</p>}
                    <p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>Qty: {item.quantity}</p>
                  </div>
                  <p style={{ color: '#C9A84C', fontSize: '14px', fontWeight: 600, margin: 0, fontFamily: 'DM Sans, sans-serif' }}>
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {order.address && (
              <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.15)', padding: '20px' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '18px', marginBottom: '12px' }}>Shipping Address</h3>
                <p style={{ color: '#1C2B1D', fontSize: '13px', lineHeight: 1.8, margin: 0 }}>
                  {order.address.name}<br />
                  {order.address.address}<br />
                  {order.address.city}, {order.address.state} — {order.address.pincode}<br />
                  Phone: {order.address.phone}<br />
                  Email: {order.address.email}
                </p>
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <p style={{ color: '#6B7280', fontSize: '13px', marginBottom: '12px' }}>Need help with your order?</p>
              <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" style={{
                display: 'inline-block', background: '#1C2B1D', color: '#C9A84C',
                padding: '12px 24px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                textDecoration: 'none', fontFamily: 'DM Sans, sans-serif',
              }}>
                WhatsApp Support
              </a>
            </div>
          </div>
        )}

        {!searched && !order && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" style={{ margin: '0 auto 16px', display: 'block', opacity: 0.2 }}>
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="#1C2B1D" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="#1C2B1D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '20px', marginBottom: '8px' }}>Enter your Order ID above</p>
            <p style={{ color: '#6B7280', fontSize: '13px' }}>You can find your Order ID in the confirmation email or on the order confirmation page.</p>
          </div>
        )}

        <div style={{ marginTop: '32px' }}>
          <Link to="/" style={{ color: '#C9A84C', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none', textTransform: 'uppercase' }}>← Back to Home</Link>
        </div>
      </section>
    </div>
  )
}
