import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import HoverActions from '../components/product/HoverActions'
import { useCurrency } from '../context/CurrencyContext'

const studioWorks = [
  { id: '2', title: 'Forest Dreams', artForm: 'Acrylic', price: 12000, medium: 'Acrylic on canvas', dimensions: '40cm x 50cm', style: 'Abstract', image: 'https://placehold.co/600x700/C9A84C/1C2B1D?text=Acrylic', featured: true, statement: 'An exploration of the forests I grew up near — layers of green memory.' },
  { id: '8', title: 'Abstract India', artForm: 'Acrylic', price: 9500, medium: 'Acrylic on canvas', dimensions: '36cm x 48cm', style: 'Abstract', image: 'https://placehold.co/600x700/1C2B1D/C9A84C?text=Abstract', featured: false, statement: 'Abstracted impressions of India — chaos, colour, calm.' },
  { id: '10', title: 'Monsoon Geometry', artForm: 'Acrylic', price: 15000, medium: 'Acrylic on canvas', dimensions: '50cm x 60cm', style: 'Geometric', image: 'https://placehold.co/600x700/6B1F2A/F5EFE0?text=Geometric', featured: true, statement: 'The geometry hidden inside a monsoon downpour.' },
  { id: '11', title: 'Temple Shadows', artForm: 'Acrylic', price: 8500, medium: 'Acrylic on board', dimensions: '30cm x 40cm', style: 'Landscape', image: 'https://placehold.co/600x700/1C2B1D/F5EFE0?text=Landscape', featured: false, statement: 'Morning light falling across ancient stone — a study in shadow.' },
  { id: '12', title: 'Saffron Study', artForm: 'Acrylic', price: 6500, medium: 'Acrylic on paper', dimensions: '24cm x 32cm', style: 'Abstract', image: 'https://placehold.co/600x700/C9A84C/6B1F2A?text=Saffron', featured: false, statement: 'A single colour pushed to its limits — warmth distilled.' },
  { id: '13', title: 'Night Market', artForm: 'Acrylic', price: 18000, medium: 'Acrylic on canvas', dimensions: '60cm x 80cm', style: 'Figurative', image: 'https://placehold.co/600x700/6B1F2A/C9A84C?text=Figurative', featured: true, statement: 'Bodies and lights moving through a crowded lane at dusk.' },
  { id: '14', title: 'Coastal Reverie', artForm: 'Acrylic', price: 11000, medium: 'Acrylic on canvas', dimensions: '45cm x 55cm', style: 'Landscape', image: 'https://placehold.co/600x700/1C2B1D/C9A84C?text=Coastal', featured: false, statement: 'The Odisha coast remembered through palette knife strokes.' },
  { id: '15', title: 'Golden Hour', artForm: 'Acrylic', price: 7500, medium: 'Acrylic on board', dimensions: '28cm x 36cm', style: 'Abstract', image: 'https://placehold.co/600x700/C9A84C/F5EFE0?text=Golden', featured: false, statement: 'That fleeting moment when everything turns amber.' },
  { id: '16', title: 'Urban Pulse', artForm: 'Acrylic', price: 14000, medium: 'Acrylic on canvas', dimensions: '48cm x 64cm', style: 'Figurative', image: 'https://placehold.co/600x700/6B1F2A/F5EFE0?text=Urban', featured: true, statement: 'City rhythms translated into colour and form.' },
]

const styles = ['All', 'Abstract', 'Geometric', 'Landscape', 'Figurative']
const sizes = ['All', 'Small (under 30cm)', 'Medium (30-50cm)', 'Large (50cm+)']
const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low']
const waUrl = 'https://wa.me/919999999999'

const sizeMap = {
  'small': 'Small (under 30cm)',
  'medium': 'Medium (30-50cm)',
  'large': 'Large (50cm+)',
}

const priceToSort = {
  'under-8k': { sort: 'Default', filter: p => p < 8000 },
  '8k-15k':   { sort: 'Default', filter: p => p >= 8000 && p <= 15000 },
  'above-15k':{ sort: 'Default', filter: p => p > 15000 },
}

export default function StudioCollection() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isMobile, setIsMobile] = useState(false)
  const { formatPrice } = useCurrency()

  const paramStyle = searchParams.get('style')
  const paramSize = searchParams.get('size')
  const paramPrice = searchParams.get('price')

  const [activeStyle, setActiveStyle] = useState(paramStyle || 'All')
  const [activeSize, setActiveSize] = useState(sizeMap[paramSize] || 'All')
  const [activeSort, setActiveSort] = useState('Default')
  const [priceFilter, setPriceFilter] = useState(paramPrice || null)

  // Sync state when URL params change (e.g. navigating from dropdown)
  useEffect(() => {
    setActiveStyle(paramStyle || 'All')
    setActiveSize(sizeMap[paramSize] || 'All')
    setPriceFilter(paramPrice || null)
  }, [paramStyle, paramSize, paramPrice])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const filtered = studioWorks
    .filter(w => activeStyle === 'All' || w.style === activeStyle)
    .filter(w => {
      if (activeSize === 'All') return true
      const dim = parseInt(w.dimensions.split('x')[0].trim())
      if (activeSize === 'Small (under 30cm)') return dim < 30
      if (activeSize === 'Medium (30-50cm)') return dim >= 30 && dim <= 50
      if (activeSize === 'Large (50cm+)') return dim > 50
      return true
    })
    .filter(w => {
      if (!priceFilter || !priceToSort[priceFilter]) return true
      return priceToSort[priceFilter].filter(w.price)
    })
    .sort((a, b) => {
      if (activeSort === 'Price: Low to High') return a.price - b.price
      if (activeSort === 'Price: High to Low') return b.price - a.price
      return 0
    })

  const chipStyle = (active) => ({
    padding: '6px 16px',
    borderRadius: '20px',
    border: `1px solid ${active ? '#1C2B1D' : 'rgba(28,43,29,0.2)'}`,
    background: active ? '#1C2B1D' : 'transparent',
    color: active ? '#C9A84C' : '#6B7280',
    fontSize: '11px',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontFamily: 'DM Sans, sans-serif',
  })

  const btnStyle = {
    display: 'inline-block',
    background: '#25D366',
    color: '#fff',
    padding: '14px 32px',
    fontSize: '12px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontFamily: 'DM Sans, sans-serif',
  }

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '0' : '104px', background: '#1C2B1D', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1C2B1D 60%, #2d4a2e)', padding: isMobile ? '48px 20px' : '64px 80px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>Wing A</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '36px' : '56px', fontWeight: 600, margin: '0 0 16px', lineHeight: 1.1 }}>
          Studio Collection
        </h1>
        <p style={{ color: 'rgba(245,239,224,0.6)', fontSize: '14px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
          Original acrylic paintings from the studio. Each piece is one of a kind, signed, and ships with a Certificate of Authenticity.
        </p>
      </section>

      {/* Founder note */}
      <section style={{ background: '#fff', padding: isMobile ? '32px 20px' : '40px 80px', display: 'flex', alignItems: 'center', gap: '24px', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
        <img src="https://placehold.co/64x64/1C2B1D/C9A84C?text=K" alt="Founder" style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #C9A84C', flexShrink: 0 }} />
        <div>
          <p style={{ color: '#1C2B1D', fontSize: '14px', lineHeight: 1.7, margin: '0 0 6px', fontStyle: 'italic' }}>
            Every painting begins as a question — about colour, memory, or the landscapes I carry inside me. Each piece is finished only when it surprises me.
          </p>
          <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
            The Founder, Kalarang Studio
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: isMobile ? '20px' : '24px 80px', background: '#F5EFE0', borderBottom: '1px solid rgba(201,168,76,0.15)', position: 'sticky', top: isMobile ? '0' : '104px', zIndex: 30 }}>
        <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', scrollbarWidth: 'none', flexWrap: isMobile ? 'nowrap' : 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            {styles.map(s => (
              <button key={s} onClick={() => { setActiveStyle(s); const p = new URLSearchParams(searchParams); if (s === 'All') p.delete('style'); else p.set('style', s); setSearchParams(p) }} style={chipStyle(activeStyle === s)}>{s}</button>
            ))}
          </div>
          {!isMobile && <div style={{ width: '1px', height: '24px', background: 'rgba(201,168,76,0.3)', flexShrink: 0 }} />}
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            {sizes.map(s => {
              const key = Object.entries(sizeMap).find(([, v]) => v === s)?.[0]
              return (
                <button key={s} onClick={() => { setActiveSize(s); const p = new URLSearchParams(searchParams); if (s === 'All') p.delete('size'); else p.set('size', key || ''); setSearchParams(p) }} style={chipStyle(activeSize === s)}>{s}</button>
              )
            })}
          </div>
          {(activeStyle !== 'All' || activeSize !== 'All' || priceFilter) && (
            <>
              {!isMobile && <div style={{ width: '1px', height: '24px', background: 'rgba(201,168,76,0.3)', flexShrink: 0 }} />}
              <button onClick={() => { setActiveStyle('All'); setActiveSize('All'); setPriceFilter(null); setActiveSort('Default'); setSearchParams({}) }} style={{ background: 'none', border: 'none', color: '#C9A84C', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline', whiteSpace: 'nowrap', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.05em', flexShrink: 0 }}>
                Clear filters
              </button>
            </>
          )}
          {!isMobile && (
            <select value={activeSort} onChange={e => setActiveSort(e.target.value)} style={{ marginLeft: 'auto', padding: '6px 12px', border: '1px solid rgba(28,43,29,0.2)', background: 'transparent', color: '#1C2B1D', fontSize: '11px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
              {sortOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          )}
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: isMobile ? '24px 20px' : '48px 80px', background: '#F5EFE0' }}>
        <p style={{ color: '#6B7280', fontSize: '12px', marginBottom: '24px' }}>{filtered.length} works</p>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '24px' }}>No works match these filters</p>
            <button onClick={() => { setActiveStyle('All'); setActiveSize('All'); setPriceFilter(null); setSearchParams({}) }} style={{ marginTop: '16px', color: '#C9A84C', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>Clear filters</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: isMobile ? '16px' : '32px' }}>
            {filtered.map(work => (
              <Link key={work.id} to={`/product/${work.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', overflow: 'hidden', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
                  onMouseEnter={e => { if (!isMobile) { e.currentTarget.style.boxShadow = '0 8px 32px rgba(28,43,29,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; const o = e.currentTarget.querySelector('[data-hover-actions]'); if (o) o.style.opacity = '1' } }}
                  onMouseLeave={e => { if (!isMobile) { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; const o = e.currentTarget.querySelector('[data-hover-actions]'); if (o) o.style.opacity = '0' } }}
                >
                  {/* Image container */}
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img src={work.image} alt={work.title} style={{ width: '100%', height: isMobile ? '200px' : '360px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                      onMouseEnter={e => { if (!isMobile) e.currentTarget.style.transform = 'scale(1.05)' }}
                      onMouseLeave={e => { if (!isMobile) e.currentTarget.style.transform = 'scale(1)' }}
                    />

                    {/* Founder photo overlay — top-left */}
                    <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 6 }}>
                      <img src="https://placehold.co/40x40/1C2B1D/C9A84C?text=K" alt="Founder" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #C9A84C', objectFit: 'cover' }} />
                      {!isMobile && <span style={{ background: 'rgba(28,43,29,0.85)', color: '#F5EFE0', fontSize: '10px', letterSpacing: '0.1em', padding: '3px 8px', fontFamily: 'DM Sans, sans-serif' }}>Studio</span>}
                    </div>

                    {/* Featured badge — top-right */}
                    {work.featured && (
                      <span style={{ position: 'absolute', top: '12px', right: '12px', background: '#C9A84C', color: '#1C2B1D', fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 10px', zIndex: 6 }}>Featured</span>
                    )}

                    {/* COA badge — bottom-right */}
                    <span style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(28,43,29,0.85)', color: '#C9A84C', fontSize: '9px', letterSpacing: '0.15em', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 6 }}>
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" fill="#C9A84C"/></svg>
                      COA
                    </span>

                    {/* Hover action buttons */}
                    <HoverActions isMobile={isMobile} product={work} />
                  </div>

                  {/* Card info */}
                  <div style={{ padding: isMobile ? '12px 10px' : '16px 18px' }}>
                    <p style={{ color: '#6B7280', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 6px' }}>{work.style} · {work.medium}</p>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '16px' : '22px', margin: '0 0 6px', lineHeight: 1.2 }}>{work.title}</h3>
                    {!isMobile && (
                      <p style={{ color: '#6B7280', fontSize: '12px', margin: '0 0 10px', lineHeight: 1.6, fontStyle: 'italic' }}>
                        "{work.statement}"
                      </p>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '10px', marginTop: isMobile ? '6px' : '0' }}>
                      <p style={{ color: '#6B7280', fontSize: '11px', margin: 0 }}>{work.dimensions}</p>
                      <p style={{ color: '#C9A84C', fontWeight: 700, fontSize: isMobile ? '14px' : '16px', margin: 0, whiteSpace: 'nowrap', fontFamily: 'DM Sans, sans-serif' }}>
                        {formatPrice(work.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Commission CTA */}
      <section style={{ background: '#1C2B1D', padding: isMobile ? '48px 20px' : '64px 80px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>Commission</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '28px' : '40px', fontWeight: 600, marginBottom: '16px' }}>
          Want something made just for you?
        </h2>
        <p style={{ color: 'rgba(245,239,224,0.5)', fontSize: '14px', maxWidth: '440px', margin: '0 auto 32px', lineHeight: 1.8 }}>
          Commission a custom painting for your home, office, or as a gift. Reach out to discuss size, palette, and concept.
        </p>
        <a href={waUrl} target="_blank" rel="noreferrer" style={btnStyle}>
          WhatsApp to Commission
        </a>
      </section>

    </div>
  )
}