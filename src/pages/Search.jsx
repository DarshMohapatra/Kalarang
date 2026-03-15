import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCurrency } from '../context/CurrencyContext'
import { allProducts } from './ProductPage'
import HoverActions from '../components/product/HoverActions'

export default function Search() {
  const [isMobile, setIsMobile] = useState(false)
  const [searchParams] = useSearchParams()
  const { formatPrice } = useCurrency()
  const query = searchParams.get('q') || ''

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const q = query.toLowerCase()
  const results = q
    ? allProducts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.artisan.toLowerCase().includes(q) ||
        p.artForm.toLowerCase().includes(q) ||
        (p.medium && p.medium.toLowerCase().includes(q)) ||
        (p.state && p.state.toLowerCase().includes(q)) ||
        (p.village && p.village.toLowerCase().includes(q))
      )
    : []

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '0' : '104px', background: '#F5EFE0', minHeight: '100vh' }}>

      <section style={{ background: '#1C2B1D', padding: isMobile ? '40px 20px' : '48px 80px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '8px' }}>Results for</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '32px' : '48px', fontWeight: 600, margin: 0 }}>
          "{query}"
        </h1>
      </section>

      <section style={{ padding: isMobile ? '24px 20px' : '48px 80px', maxWidth: '1200px', margin: '0 auto' }}>

        {!q ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" style={{ margin: '0 auto 16px', display: 'block', opacity: 0.2 }}>
              <circle cx="11" cy="11" r="8" stroke="#1C2B1D" strokeWidth="1.5" />
              <path d="M21 21l-4.35-4.35" stroke="#1C2B1D" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '24px', marginBottom: '8px' }}>Enter a search term</p>
            <p style={{ color: '#6B7280', fontSize: '13px' }}>Try searching for "Patachitra", "Madhubani", "acrylic", or an artisan name.</p>
          </div>
        ) : results.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" style={{ margin: '0 auto 16px', display: 'block', opacity: 0.2 }}>
              <circle cx="11" cy="11" r="8" stroke="#1C2B1D" strokeWidth="1.5" />
              <path d="M21 21l-4.35-4.35" stroke="#1C2B1D" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '24px', marginBottom: '8px' }}>No results found</p>
            <p style={{ color: '#6B7280', fontSize: '13px', marginBottom: '24px' }}>Try a different search term or browse our collections.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/artisans" style={{ display: 'inline-block', background: '#1C2B1D', color: '#C9A84C', padding: '12px 24px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
                Artisan Gallery
              </Link>
              <Link to="/studio" style={{ display: 'inline-block', border: '1px solid rgba(201,168,76,0.3)', color: '#1C2B1D', padding: '12px 24px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
                Studio Collection
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p style={{ color: '#6B7280', fontSize: '12px', marginBottom: '24px' }}>{results.length} result{results.length !== 1 ? 's' : ''}</p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: isMobile ? '16px' : '32px' }}>
              {results.map(product => (
                <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <div
                    style={{ background: '#fff', overflow: 'hidden', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
                    onMouseEnter={e => { if (!isMobile) { e.currentTarget.style.boxShadow = '0 8px 32px rgba(28,43,29,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; const o = e.currentTarget.querySelector('[data-hover-actions]'); if (o) o.style.opacity = '1' } }}
                    onMouseLeave={e => { if (!isMobile) { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; const o = e.currentTarget.querySelector('[data-hover-actions]'); if (o) o.style.opacity = '0' } }}
                  >
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={product.image} alt={product.title}
                        style={{ width: '100%', height: isMobile ? '200px' : '360px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                        onMouseEnter={e => { if (!isMobile) e.currentTarget.style.transform = 'scale(1.05)' }}
                        onMouseLeave={e => { if (!isMobile) e.currentTarget.style.transform = 'scale(1)' }}
                      />
                      <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(28,43,29,0.85)', color: '#C9A84C', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 10px', fontFamily: 'DM Sans, sans-serif', zIndex: 6 }}>
                        Wing {product.wing}
                      </span>
                      {product.wing === 'B' && (
                        <span style={{ position: 'absolute', bottom: '10px', left: '10px', background: '#1C2B1D', color: '#C9A84C', fontSize: '9px', letterSpacing: '0.1em', padding: '4px 10px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, zIndex: 6 }}>
                          60% → Artisan
                        </span>
                      )}
                      <HoverActions isMobile={isMobile} product={product} />
                    </div>
                    <div style={{ padding: isMobile ? '12px 10px' : '16px 18px' }}>
                      <p style={{ color: '#C9A84C', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>{product.artForm}</p>
                      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '15px' : '20px', margin: '0 0 6px', lineHeight: 1.2 }}>{product.title}</h3>
                      <p style={{ color: '#6B7280', fontSize: '12px', margin: '0 0 8px' }}>{product.artisan}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '8px', marginTop: '4px' }}>
                        <p style={{ color: '#6B7280', fontSize: '11px', margin: 0 }}>{product.dimensions}</p>
                        <p style={{ color: '#C9A84C', fontWeight: 700, fontSize: isMobile ? '14px' : '16px', margin: 0, whiteSpace: 'nowrap', fontFamily: 'DM Sans, sans-serif' }}>
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
