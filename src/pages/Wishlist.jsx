import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useCurrency } from '../context/CurrencyContext'

export default function Wishlist() {
  const [isMobile, setIsMobile] = useState(false)
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { formatPrice } = useCurrency()
  const [movedId, setMovedId] = useState(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleMoveToCart = (item) => {
    addToCart({ id: item.id, title: item.title, price: item.price, image: item.image, artisan: item.artisan || '' })
    setMovedId(item.id)
    setTimeout(() => {
      removeFromWishlist(item.id)
      setMovedId(null)
    }, 800)
  }

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '100px' : '104px', background: '#F5EFE0', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{ background: '#1C2B1D', padding: isMobile ? '40px 20px' : '48px 80px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '8px' }}>Your</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '32px' : '48px', fontWeight: 600, margin: 0 }}>Wishlist</h1>
      </section>

      <section style={{ padding: isMobile ? '24px 20px' : '48px 80px', maxWidth: '1000px', margin: '0 auto' }}>
        {wishlistItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" style={{ margin: '0 auto 16px', display: 'block', opacity: 0.3 }}>
              <path d="M12 21C12 21 3 14 3 8a5 5 0 019-3 5 5 0 019 3c0 6-9 13-9 13z" stroke="#1C2B1D" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '24px', marginBottom: '8px' }}>Your wishlist is empty</p>
            <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '24px' }}>Save pieces you love to come back to them later.</p>
            <Link to="/artisans" style={{ display: 'inline-block', background: '#1C2B1D', color: '#C9A84C', padding: '14px 32px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
              Explore Art
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <p style={{ color: '#6B7280', fontSize: '13px', margin: 0 }}>{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}</p>
              <button onClick={clearWishlist} style={{ background: 'none', border: 'none', color: '#6B1F2A', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>Clear all</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: isMobile ? '16px' : '28px' }}>
              {wishlistItems.map(item => (
                <div key={item.id} style={{ background: '#fff', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.1)' }}>
                  <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: isMobile ? '200px' : '280px', objectFit: 'cover', display: 'block' }} />
                  </Link>
                  <div style={{ padding: isMobile ? '12px' : '16px' }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '14px' : '17px', margin: '0 0 4px', lineHeight: 1.25 }}>{item.title}</h3>
                    {item.artisan && <p style={{ color: '#6B7280', fontSize: '11px', margin: '0 0 6px' }}>{item.artisan}</p>}
                    <p style={{ color: '#C9A84C', fontWeight: 700, fontSize: '15px', margin: '0 0 12px', fontFamily: 'DM Sans, sans-serif' }}>
                      {formatPrice(item.price)}
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleMoveToCart(item)}
                        style={{ flex: 1, padding: '10px', background: movedId === item.id ? '#2d4a2e' : '#1C2B1D', color: '#C9A84C', border: 'none', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
                      >
                        {movedId === item.id ? '✓ Added' : 'Move to Cart'}
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        style={{ padding: '10px 14px', background: 'none', border: '1px solid rgba(107,31,42,0.3)', color: '#6B1F2A', fontSize: '14px', cursor: 'pointer' }}
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
