import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useCurrency } from '../context/CurrencyContext'

export default function Cart() {
  const [isMobile, setIsMobile] = useState(false)
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const { isLoggedIn } = useAuth()
  const { formatPrice } = useCurrency()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const shipping = cartTotal > 5000 ? 0 : 199
  const grandTotal = cartTotal + shipping

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '0' : '104px', background: '#F5EFE0', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{ background: '#1C2B1D', padding: isMobile ? '40px 20px' : '48px 80px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '8px' }}>Your</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '32px' : '48px', fontWeight: 600, margin: 0 }}>Cart</h1>
      </section>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" style={{ margin: '0 auto 16px', display: 'block', opacity: 0.3 }}>
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#1C2B1D" strokeWidth="1.5" />
            <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="#1C2B1D" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '24px', marginBottom: '8px' }}>Your cart is empty</p>
          <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '24px' }}>Start adding some beautiful art to your cart.</p>
          <Link to="/artisans" style={{ display: 'inline-block', background: '#1C2B1D', color: '#C9A84C', padding: '14px 32px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
            Explore Art
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '0' : '48px', padding: isMobile ? '24px 20px' : '48px 80px', maxWidth: '1100px', margin: '0 auto' }}>

          {/* Items list */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <p style={{ color: '#6B7280', fontSize: '13px', margin: 0 }}>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
              <button onClick={clearCart} style={{ background: 'none', border: 'none', color: '#6B1F2A', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>Clear cart</button>
            </div>

            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: isMobile ? '12px' : '20px', padding: '20px 0', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.title} style={{ width: isMobile ? '80px' : '120px', height: isMobile ? '100px' : '150px', objectFit: 'cover', display: 'block', flexShrink: 0 }} />
                </Link>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '15px' : '18px', margin: '0 0 4px', lineHeight: 1.25 }}>{item.title}</h3>
                  </Link>
                  {item.artisan && <p style={{ color: '#6B7280', fontSize: '12px', margin: '0 0 8px' }}>{item.artisan}</p>}
                  <p style={{ color: '#C9A84C', fontWeight: 700, fontSize: '16px', margin: '0 0 12px', fontFamily: 'DM Sans, sans-serif' }}>
                    {formatPrice(item.price)}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                    {/* Quantity controls */}
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(201,168,76,0.3)' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#1C2B1D' }}>−</button>
                      <span style={{ width: '32px', textAlign: 'center', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', color: '#1C2B1D' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#1C2B1D' }}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#6B1F2A', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'DM Sans, sans-serif' }}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div style={{ width: isMobile ? '100%' : '340px', flexShrink: 0, marginTop: isMobile ? '24px' : '0' }}>
            <div style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.15)', padding: '24px', position: isMobile ? 'static' : 'sticky', top: '130px' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '20px', fontWeight: 600, margin: '0 0 20px' }}>Order Summary</h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: '#6B7280', fontSize: '13px' }}>Subtotal</span>
                <span style={{ color: '#1C2B1D', fontSize: '13px', fontWeight: 600 }}>{formatPrice(cartTotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: '#6B7280', fontSize: '13px' }}>Shipping</span>
                <span style={{ color: shipping === 0 ? '#2d4a2e' : '#1C2B1D', fontSize: '13px', fontWeight: 600 }}>
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p style={{ color: '#C9A84C', fontSize: '11px', margin: '0 0 12px', fontStyle: 'italic' }}>Free shipping on orders above {formatPrice(5000)}</p>
              )}
              <div style={{ borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <span style={{ color: '#1C2B1D', fontSize: '16px', fontWeight: 600 }}>Total</span>
                <span style={{ color: '#C9A84C', fontSize: '20px', fontWeight: 700, fontFamily: 'DM Sans, sans-serif' }}>{formatPrice(grandTotal)}</span>
              </div>

              <Link to={isLoggedIn ? '/checkout' : '/login?redirect=/checkout'} style={{
                display: 'block', textAlign: 'center', background: '#1C2B1D', color: '#C9A84C',
                padding: '16px', fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase',
                textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, marginBottom: '12px',
              }}>
                {isLoggedIn ? 'Proceed to Checkout' : 'Login to Checkout'}
              </Link>

              <Link to="/artisans" style={{
                display: 'block', textAlign: 'center', border: '1px solid rgba(201,168,76,0.3)',
                color: '#1C2B1D', padding: '14px', fontSize: '11px', letterSpacing: '0.2em',
                textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif',
              }}>
                Continue Shopping
              </Link>

              {/* Trust badges */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: '16px' }}>
                {['Secure', 'COA', 'Insured'].map(b => (
                  <span key={b} style={{ color: '#6B7280', fontSize: '10px', letterSpacing: '0.1em', fontFamily: 'DM Sans, sans-serif' }}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
