import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useCurrency } from '../context/CurrencyContext'
import { supabase } from '../supabase'

export default function Checkout() {
  const [isMobile, setIsMobile] = useState(false)
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user, isLoggedIn } = useAuth()
  const { formatPrice } = useCurrency()
  const navigate = useNavigate()

  const [step, setStep] = useState(1) // 1: address, 2: payment, 3: confirmation
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '', phone: '',
    address: '', city: '', state: '', pincode: '', paymentMethod: 'upi',
  })
  const [errors, setErrors] = useState({})
  const [orderId, setOrderId] = useState('')
  const [placing, setPlacing] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (user) {
      setForm(prev => ({ ...prev, name: prev.name || user.name || '', email: prev.email || user.email || '' }))
    }
  }, [user])

  useEffect(() => {
    if (!isLoggedIn) navigate('/login?redirect=/checkout')
  }, [isLoggedIn, navigate])

  useEffect(() => {
    if (cartItems.length === 0 && step !== 3) navigate('/cart')
  }, [cartItems, step, navigate])

  const shipping = cartTotal > 5000 ? 0 : 199
  const grandTotal = cartTotal + shipping

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const validateAddress = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    if (!form.phone.trim() || form.phone.length < 10) e.phone = 'Valid phone required'
    if (!form.address.trim()) e.address = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.state.trim()) e.state = 'Required'
    if (!form.pincode.trim() || form.pincode.length < 6) e.pincode = 'Valid pincode required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleAddressNext = () => {
    if (validateAddress()) setStep(2)
  }

  const handlePlaceOrder = async () => {
    setPlacing(true)
    const id = 'KLR' + Date.now().toString().slice(-8)
    const orderData = { id, userId: user?.id, userName: user?.name, userEmail: user?.email, items: cartItems, total: grandTotal, shipping, address: form, date: new Date().toISOString(), status: 'Confirmed' }

    // Always save to localStorage
    const localOrders = JSON.parse(localStorage.getItem('kalarang_orders') || '[]')
    localOrders.push(orderData)
    localStorage.setItem('kalarang_orders', JSON.stringify(localOrders))

    // Also try saving to Supabase
    try {
      await supabase.from('orders').insert({
        order_id: id,
        user_id: user?.id,
        user_name: user?.name,
        user_email: user?.email,
        items: cartItems,
        total: grandTotal,
        shipping,
        address: { name: form.name, email: form.email, phone: form.phone, address: form.address, city: form.city, state: form.state, pincode: form.pincode },
        payment_method: form.paymentMethod,
        status: 'Confirmed',
      })
    } catch {}

    setOrderId(id)
    clearCart()
    setStep(3)
    setPlacing(false)
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', border: '1px solid rgba(201,168,76,0.3)',
    background: 'transparent', color: '#1C2B1D', fontSize: '14px',
    fontFamily: 'DM Sans, sans-serif', outline: 'none', boxSizing: 'border-box',
  }

  const labelStyle = {
    display: 'block', color: '#1C2B1D', fontSize: '11px', letterSpacing: '0.15em',
    textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'DM Sans, sans-serif',
  }

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '0' : '104px', background: '#F5EFE0', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{ background: '#1C2B1D', padding: isMobile ? '32px 20px' : '40px 80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '28px' : '40px', fontWeight: 600, margin: 0 }}>
          {step === 3 ? 'Order Confirmed' : 'Checkout'}
        </h1>
        {step !== 3 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '20px' }}>
            {['Address', 'Payment'].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: step > i ? '#C9A84C' : 'transparent', border: step > i ? 'none' : '1px solid rgba(201,168,76,0.4)',
                  color: step > i ? '#1C2B1D' : 'rgba(245,239,224,0.5)', fontSize: '11px', fontWeight: 700,
                }}>{i + 1}</span>
                <span style={{ color: step > i ? '#C9A84C' : 'rgba(245,239,224,0.4)', fontSize: '12px', letterSpacing: '0.1em' }}>{s}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Confirmation */}
      {step === 3 && (
        <div style={{ textAlign: 'center', padding: isMobile ? '48px 20px' : '64px 80px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#1C2B1D', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '32px', fontWeight: 600, marginBottom: '12px' }}>Thank You!</h2>
          <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '8px' }}>Your order has been placed successfully.</p>
          <p style={{ color: '#C9A84C', fontSize: '16px', fontWeight: 700, fontFamily: 'DM Sans, sans-serif', marginBottom: '32px' }}>Order ID: {orderId}</p>
          <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.8, marginBottom: '32px' }}>
            You will receive a confirmation email at <strong>{form.email}</strong>. Your artwork will be carefully packed and shipped within 3-5 business days.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={`/track?orderId=${orderId}`} style={{ display: 'inline-block', background: '#1C2B1D', color: '#C9A84C', padding: '14px 32px', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
              Track Order
            </Link>
            <Link to="/" style={{ display: 'inline-block', border: '1px solid rgba(201,168,76,0.3)', color: '#1C2B1D', padding: '14px 32px', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      )}

      {/* Steps 1 & 2 */}
      {step !== 3 && (
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '24px' : '48px', padding: isMobile ? '24px 20px' : '48px 80px', maxWidth: '1000px', margin: '0 auto' }}>

          {/* Form */}
          <div style={{ flex: 1 }}>
            {step === 1 && (
              <>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '22px', marginBottom: '24px' }}>Shipping Address</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input value={form.name} onChange={e => set('name', e.target.value)} style={{ ...inputStyle, borderColor: errors.name ? '#6B1F2A' : 'rgba(201,168,76,0.3)' }} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input value={form.phone} onChange={e => set('phone', e.target.value)} type="tel" style={{ ...inputStyle, borderColor: errors.phone ? '#6B1F2A' : 'rgba(201,168,76,0.3)' }} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input value={form.email} onChange={e => set('email', e.target.value)} type="email" style={{ ...inputStyle, borderColor: errors.email ? '#6B1F2A' : 'rgba(201,168,76,0.3)' }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Address</label>
                    <textarea value={form.address} onChange={e => set('address', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical', borderColor: errors.address ? '#6B1F2A' : 'rgba(201,168,76,0.3)' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input value={form.city} onChange={e => set('city', e.target.value)} style={{ ...inputStyle, borderColor: errors.city ? '#6B1F2A' : 'rgba(201,168,76,0.3)' }} />
                    </div>
                    <div>
                      <label style={labelStyle}>State</label>
                      <input value={form.state} onChange={e => set('state', e.target.value)} style={{ ...inputStyle, borderColor: errors.state ? '#6B1F2A' : 'rgba(201,168,76,0.3)' }} />
                    </div>
                    <div>
                      <label style={labelStyle}>Pincode</label>
                      <input value={form.pincode} onChange={e => set('pincode', e.target.value)} style={{ ...inputStyle, borderColor: errors.pincode ? '#6B1F2A' : 'rgba(201,168,76,0.3)' }} />
                    </div>
                  </div>
                  <button onClick={handleAddressNext} style={{ width: '100%', padding: '16px', background: '#1C2B1D', color: '#C9A84C', border: 'none', fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', marginTop: '8px' }}>
                    Continue to Payment
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '22px', marginBottom: '24px' }}>Payment Method</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { value: 'upi', label: 'UPI (GPay / PhonePe / Paytm)', icon: '₹' },
                    { value: 'card', label: 'Credit / Debit Card', icon: '💳' },
                    { value: 'netbanking', label: 'Net Banking', icon: '🏦' },
                    { value: 'cod', label: 'Cash on Delivery', icon: '📦' },
                  ].map(pm => (
                    <label key={pm.value} style={{
                      display: 'flex', alignItems: 'center', gap: '14px', padding: '16px',
                      border: `1px solid ${form.paymentMethod === pm.value ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`,
                      background: form.paymentMethod === pm.value ? 'rgba(201,168,76,0.06)' : '#fff',
                      cursor: 'pointer',
                    }}>
                      <input type="radio" name="payment" value={pm.value} checked={form.paymentMethod === pm.value} onChange={e => set('paymentMethod', e.target.value)} style={{ accentColor: '#C9A84C' }} />
                      <span style={{ fontSize: '18px' }}>{pm.icon}</span>
                      <span style={{ color: '#1C2B1D', fontSize: '14px' }}>{pm.label}</span>
                    </label>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: '14px', border: '1px solid rgba(201,168,76,0.3)', background: 'none', color: '#1C2B1D', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                    Back
                  </button>
                  <button onClick={handlePlaceOrder} disabled={placing} style={{ flex: 2, padding: '16px', background: placing ? '#2d4a2e' : '#1C2B1D', color: '#C9A84C', border: 'none', fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', cursor: placing ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, opacity: placing ? 0.7 : 1 }}>
                    {placing ? 'Placing Order...' : `Place Order — ${formatPrice(grandTotal)}`}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Order Summary sidebar */}
          <div style={{ width: isMobile ? '100%' : '300px', flexShrink: 0 }}>
            <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.15)', padding: '20px', position: isMobile ? 'static' : 'sticky', top: '130px' }}>
              <h4 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '18px', marginBottom: '16px' }}>Order Summary</h4>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '10px', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                  <img src={item.image} alt={item.title} style={{ width: '48px', height: '60px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#1C2B1D', fontSize: '12px', margin: '0 0 2px', fontWeight: 500 }}>{item.title}</p>
                    <p style={{ color: '#6B7280', fontSize: '11px', margin: 0 }}>Qty: {item.quantity}</p>
                  </div>
                  <p style={{ color: '#C9A84C', fontSize: '13px', fontWeight: 600, margin: 0, fontFamily: 'DM Sans, sans-serif' }}>{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                <span style={{ color: '#6B7280', fontSize: '12px' }}>Shipping</span>
                <span style={{ color: '#1C2B1D', fontSize: '12px' }}>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(201,168,76,0.2)', marginTop: '12px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#1C2B1D', fontWeight: 600 }}>Total</span>
                <span style={{ color: '#C9A84C', fontWeight: 700, fontFamily: 'DM Sans, sans-serif' }}>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
