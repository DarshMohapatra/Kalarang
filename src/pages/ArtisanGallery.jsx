import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ArtisanCard from '../components/artisan/ArtisanCard'
import HoverActions from '../components/product/HoverActions'
import { useCurrency } from '../context/CurrencyContext'

const artisans = [
  { id: '1', name: 'Mamata Mahapatra', nameDevanagari: 'ममता महापात्र', artForm: 'Patachitra', state: 'Odisha', village: 'Raghurajpur', image: 'https://placehold.co/120x120/1C2B1D/C9A84C?text=M' },
  { id: '2', name: 'Sunita Devi', nameDevanagari: 'सुनीता देवी', artForm: 'Madhubani', state: 'Bihar', village: 'Madhubani', image: 'https://placehold.co/120x120/6B1F2A/F5EFE0?text=S' },
  { id: '3', name: 'Raju Gond', nameDevanagari: 'राजू गोंड', artForm: 'Gond Art', state: 'Madhya Pradesh', village: 'Patangarh', image: 'https://placehold.co/120x120/C9A84C/1C2B1D?text=R' },
  { id: '4', name: 'Priya Warli', nameDevanagari: 'प्रिया वारली', artForm: 'Warli', state: 'Maharashtra', village: 'Dahanu', image: 'https://placehold.co/120x120/1C2B1D/F5EFE0?text=P' },
  { id: '5', name: 'Anand Kumar', nameDevanagari: 'आनंद कुमार', artForm: 'Kalamkari', state: 'Andhra Pradesh', village: 'Srikalahasti', image: 'https://placehold.co/120x120/6B1F2A/C9A84C?text=A' },
]

const artisanWorks = [
  { id: '1', title: 'Goddess Durga — Patachitra', artisanId: '1', artForm: 'Patachitra', price: 4500, medium: 'Natural colours on cloth', dimensions: '24cm x 36cm', image: 'https://placehold.co/600x700/1C2B1D/C9A84C?text=Patachitra', stock: 3 },
  { id: '3', title: 'Tree of Life — Madhubani', artisanId: '2', artForm: 'Madhubani', price: 3200, medium: 'Natural pigments on handmade paper', dimensions: '30cm x 40cm', image: 'https://placehold.co/600x700/6B1F2A/F5EFE0?text=Madhubani', stock: 5 },
  { id: '4', title: 'Dancing Ganesha', artisanId: '3', artForm: 'Gond Art', price: 2800, medium: 'Acrylic on canvas', dimensions: '20cm x 24cm', image: 'https://placehold.co/600x700/1C2B1D/C9A84C?text=Gond+Art', stock: 4 },
  { id: '5', title: 'Village Life', artisanId: '4', artForm: 'Warli', price: 1900, medium: 'White pigment on mud-coated cloth', dimensions: '18cm x 24cm', image: 'https://placehold.co/600x700/6B1F2A/C9A84C?text=Warli', stock: 6 },
  { id: '6', title: 'Radha Krishna', artisanId: '2', artForm: 'Madhubani', price: 3500, medium: 'Natural pigments on handmade paper', dimensions: '28cm x 36cm', image: 'https://placehold.co/600x700/1C2B1D/C9A84C?text=Madhubani', stock: 2 },
  { id: '7', title: 'Golden Fish', artisanId: '1', artForm: 'Patachitra', price: 4200, medium: 'Natural colours on cloth', dimensions: '22cm x 30cm', image: 'https://placehold.co/600x700/6B1F2A/C9A84C?text=Patachitra', stock: 3 },
  { id: '9', title: 'Tribal Sun', artisanId: '3', artForm: 'Gond Art', price: 2200, medium: 'Acrylic on canvas', dimensions: '16cm x 16cm', image: 'https://placehold.co/600x700/6B1F2A/C9A84C?text=Gond+Art', stock: 5 },
  { id: '17', title: 'Harvest Dance', artisanId: '4', artForm: 'Warli', price: 2400, medium: 'White pigment on mud-coated cloth', dimensions: '24cm x 30cm', image: 'https://placehold.co/600x700/1C2B1D/F5EFE0?text=Warli', stock: 4 },
  { id: '18', title: 'Peacock Garden — Kalamkari', artisanId: '5', artForm: 'Kalamkari', price: 3800, medium: 'Natural dyes on cotton', dimensions: '30cm x 42cm', image: 'https://placehold.co/600x700/6B1F2A/F5EFE0?text=Kalamkari', stock: 3 },
  { id: '19', title: 'Jagannath Trinity', artisanId: '1', artForm: 'Patachitra', price: 5200, medium: 'Natural colours on cloth', dimensions: '28cm x 40cm', image: 'https://placehold.co/600x700/1C2B1D/C9A84C?text=Patachitra', stock: 2 },
  { id: '20', title: 'Forest Spirits', artisanId: '3', artForm: 'Gond Art', price: 3100, medium: 'Acrylic on canvas', dimensions: '24cm x 30cm', image: 'https://placehold.co/600x700/C9A84C/1C2B1D?text=Gond+Art', stock: 3 },
  { id: '21', title: 'Temple Procession — Kalamkari', artisanId: '5', artForm: 'Kalamkari', price: 4600, medium: 'Natural dyes on cotton', dimensions: '36cm x 48cm', image: 'https://placehold.co/600x700/1C2B1D/F5EFE0?text=Kalamkari', stock: 2 },
]

const artForms = ['All', 'Patachitra', 'Madhubani', 'Gond Art', 'Warli', 'Kalamkari']
const stateList = ['All', 'Odisha', 'Bihar', 'Madhya Pradesh', 'Maharashtra', 'Andhra Pradesh']
const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low']

const artFormParamMap = { patachitra: 'Patachitra', madhubani: 'Madhubani', gond: 'Gond Art', warli: 'Warli', kalamkari: 'Kalamkari' }
const stateParamMap = { odisha: 'Odisha', bihar: 'Bihar', mp: 'Madhya Pradesh', maharashtra: 'Maharashtra', ap: 'Andhra Pradesh' }
const priceRanges = {
  'under-2k': p => p < 2000,
  '2k-4k': p => p >= 2000 && p <= 4000,
  'above-4k': p => p > 4000,
}

export default function ArtisanGallery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isMobile, setIsMobile] = useState(false)
  const { formatPrice } = useCurrency()
  const paramTab = searchParams.get('tab')
  const [tab, setTab] = useState(paramTab === 'artisans' ? 'artisans' : 'works')

  useEffect(() => {
    if (paramTab === 'artisans') setTab('artisans')
    else if (!paramTab) setTab('works')
  }, [paramTab])

  const paramArt = searchParams.get('art')
  const paramState = searchParams.get('state')
  const paramPrice = searchParams.get('price')

  const [activeArt, setActiveArt] = useState(artFormParamMap[paramArt] || 'All')
  const [activeState, setActiveState] = useState(stateParamMap[paramState] || 'All')
  const [activeSort, setActiveSort] = useState('Default')
  const [priceFilter, setPriceFilter] = useState(paramPrice || null)

  useEffect(() => {
    setActiveArt(artFormParamMap[paramArt] || 'All')
    setActiveState(stateParamMap[paramState] || 'All')
    setPriceFilter(paramPrice || null)
  }, [paramArt, paramState, paramPrice])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const getArtisan = (id) => artisans.find(a => a.id === id)

  const filtered = artisanWorks
    .filter(w => activeArt === 'All' || w.artForm === activeArt)
    .filter(w => {
      if (activeState === 'All') return true
      const artisan = getArtisan(w.artisanId)
      return artisan && artisan.state === activeState
    })
    .filter(w => {
      if (!priceFilter || !priceRanges[priceFilter]) return true
      return priceRanges[priceFilter](w.price)
    })
    .sort((a, b) => {
      if (activeSort === 'Price: Low to High') return a.price - b.price
      if (activeSort === 'Price: High to Low') return b.price - a.price
      return 0
    })

  const hasFilters = activeArt !== 'All' || activeState !== 'All' || priceFilter

  const chipStyle = (active) => ({
    padding: '5px 14px',
    borderRadius: '20px',
    border: `1px solid ${active ? '#1C2B1D' : 'rgba(28,43,29,0.2)'}`,
    background: active ? '#1C2B1D' : 'transparent',
    color: active ? '#C9A84C' : '#6B7280',
    fontSize: '10px',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontFamily: 'DM Sans, sans-serif',
  })

  const tabBtnStyle = (active) => ({
    padding: '8px 24px',
    background: active ? '#1C2B1D' : 'transparent',
    color: active ? '#C9A84C' : '#6B7280',
    border: `1px solid ${active ? '#1C2B1D' : 'rgba(28,43,29,0.2)'}`,
    fontSize: '11px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: 500,
    transition: 'all 0.2s ease',
  })

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '100px' : '104px', background: '#1C2B1D', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #F5EFE0 60%, #ede5cc)', padding: isMobile ? '48px 20px' : '56px 80px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(28,43,29,0.5)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>Wing B</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '36px' : '56px', fontWeight: 600, margin: '0 0 16px', lineHeight: 1.1 }}>
          Artisan Gallery
        </h1>
        <p style={{ color: 'rgba(28,43,29,0.6)', fontSize: '14px', maxWidth: '520px', margin: '0 auto 28px', lineHeight: 1.8 }}>
          Traditional Indian art — directly from the hands that made it. Every purchase sends 60% of the sale to the artisan.
        </p>
        {/* Tab toggle */}
        <div style={{ display: 'inline-flex', gap: '0' }}>
          <button onClick={() => setTab('works')} style={tabBtnStyle(tab === 'works')}>Artworks</button>
          <button onClick={() => setTab('artisans')} style={tabBtnStyle(tab === 'artisans')}>Meet the Artisans</button>
        </div>
      </section>

      {tab === 'works' ? (
        <>
          {/* Filters */}
          <section style={{ padding: isMobile ? '14px 20px' : '14px 80px', background: '#F5EFE0', borderBottom: '1px solid rgba(201,168,76,0.15)', position: 'sticky', top: isMobile ? '0' : '104px', zIndex: 30 }}>
            {/* Row 1: chips */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', alignItems: 'center', justifyContent: 'center' }}>
              {artForms.map(a => (
                <button key={a} onClick={() => { setActiveArt(a); const p = new URLSearchParams(searchParams); if (a === 'All') p.delete('art'); else { const key = Object.entries(artFormParamMap).find(([, v]) => v === a)?.[0]; p.set('art', key || '') } setSearchParams(p) }} style={chipStyle(activeArt === a)}>{a}</button>
              ))}
              <div style={{ width: '1px', height: '20px', background: 'rgba(201,168,76,0.3)', flexShrink: 0 }} />
              {stateList.map(s => (
                <button key={s} onClick={() => { setActiveState(s); const p = new URLSearchParams(searchParams); if (s === 'All') p.delete('state'); else { const key = Object.entries(stateParamMap).find(([, v]) => v === s)?.[0]; p.set('state', key || '') } setSearchParams(p) }} style={chipStyle(activeState === s)}>{s}</button>
              ))}
            </div>
            {/* Row 2: clear + sort */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              {hasFilters ? (
                <button onClick={() => { setActiveArt('All'); setActiveState('All'); setPriceFilter(null); setActiveSort('Default'); setSearchParams({}) }} style={{ background: 'none', border: 'none', color: '#C9A84C', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'DM Sans, sans-serif', padding: 0 }}>
                  Clear filters
                </button>
              ) : <span />}
              <select value={activeSort} onChange={e => setActiveSort(e.target.value)} style={{ padding: '5px 10px', border: '1px solid rgba(28,43,29,0.2)', background: 'transparent', color: '#1C2B1D', fontSize: '11px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                {sortOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </section>

          {/* Product Grid */}
          <section style={{ padding: isMobile ? '24px 20px' : '48px 80px', background: '#F5EFE0' }}>
            <p style={{ color: '#6B7280', fontSize: '12px', marginBottom: '24px' }}>{filtered.length} works</p>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '24px' }}>No works match these filters</p>
                <button onClick={() => { setActiveArt('All'); setActiveState('All'); setPriceFilter(null); setSearchParams({}) }} style={{ marginTop: '16px', color: '#C9A84C', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>Clear filters</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: isMobile ? '16px' : '32px' }}>
                {filtered.map(work => {
                  const artisan = getArtisan(work.artisanId)
                  return (
                    <Link key={work.id} to={`/product/${work.id}`} style={{ textDecoration: 'none' }}>
                      <div
                        style={{ background: '#fff', overflow: 'hidden', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
                        onMouseEnter={e => { if (!isMobile) { e.currentTarget.style.boxShadow = '0 8px 32px rgba(28,43,29,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; const o = e.currentTarget.querySelector('[data-hover-actions]'); if (o) o.style.opacity = '1' } }}
                        onMouseLeave={e => { if (!isMobile) { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; const o = e.currentTarget.querySelector('[data-hover-actions]'); if (o) o.style.opacity = '0' } }}
                      >
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                          <img
                            src={work.image} alt={work.title}
                            style={{ width: '100%', height: isMobile ? '200px' : '360px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                            onMouseEnter={e => { if (!isMobile) e.currentTarget.style.transform = 'scale(1.05)' }}
                            onMouseLeave={e => { if (!isMobile) e.currentTarget.style.transform = 'scale(1)' }}
                          />
                          {/* Artisan face overlay */}
                          {artisan && (
                            <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 6 }}>
                              <img src={artisan.image} alt={artisan.name} style={{ width: isMobile ? '32px' : '40px', height: isMobile ? '32px' : '40px', borderRadius: '50%', border: '2px solid #C9A84C', objectFit: 'cover' }} />
                            </div>
                          )}
                          {/* 60% badge */}
                          <span style={{ position: 'absolute', bottom: '10px', left: '10px', background: '#1C2B1D', color: '#C9A84C', fontSize: '9px', letterSpacing: '0.1em', padding: '4px 10px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, zIndex: 6 }}>
                            60% → Artisan
                          </span>
                          {work.stock <= 2 && (
                            <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#6B1F2A', color: '#F5EFE0', fontSize: '9px', padding: '3px 8px', fontFamily: 'DM Sans, sans-serif', zIndex: 6 }}>
                              Only {work.stock} left
                            </span>
                          )}
                          {/* Hover action buttons */}
                          <HoverActions isMobile={isMobile} product={work} />
                        </div>
                        <div style={{ padding: isMobile ? '12px 10px' : '16px 18px' }}>
                          <p style={{ color: '#C9A84C', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>{work.artForm}</p>
                          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '15px' : '20px', margin: '0 0 6px', lineHeight: 1.2 }}>{work.title}</h3>
                          {artisan && (
                            <p style={{ color: '#6B7280', fontSize: '12px', margin: '0 0 4px' }}>
                              <span style={{ color: '#1C2B1D', fontWeight: 600 }}>{artisan.name}</span>
                              {!isMobile && <span> · {artisan.village}, {artisan.state}</span>}
                            </p>
                          )}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '8px', marginTop: '6px' }}>
                            <p style={{ color: '#6B7280', fontSize: '11px', margin: 0 }}>{work.dimensions}</p>
                            <p style={{ color: '#C9A84C', fontWeight: 700, fontSize: isMobile ? '14px' : '16px', margin: 0, whiteSpace: 'nowrap', fontFamily: 'DM Sans, sans-serif' }}>
                              {formatPrice(work.price)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </section>
        </>
      ) : (
        /* Artisan Cards Grid */
        <section style={{ padding: isMobile ? '32px 20px' : '56px 80px', background: '#F5EFE0' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>The Makers</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '28px' : '36px', fontWeight: 600, margin: 0 }}>
              Our Artisans
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(5, 1fr)', gap: isMobile ? '16px' : '24px', maxWidth: '1100px', margin: '0 auto' }}>
            {artisans.map(a => (
              <ArtisanCard key={a.id} artisan={a} isMobile={isMobile} />
            ))}
          </div>
        </section>
      )}

      {/* Artisan Promise */}
      <section style={{ background: '#1C2B1D', padding: isMobile ? '48px 20px' : '56px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '32px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          {[
            { icon: '✦', title: '60% to Artisan', sub: 'Fair revenue share on every sale — directly to the maker' },
            { icon: '📜', title: 'Certificate of Authenticity', sub: 'Signed by the artisan and countersigned by Kalarang' },
            { icon: '🏘', title: 'Village to Your Wall', sub: 'Know exactly who made your art, where, and how' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>{item.icon}</span>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: '18px', margin: 0 }}>{item.title}</p>
              <p style={{ color: 'rgba(245,239,224,0.5)', fontSize: '12px', margin: 0, lineHeight: 1.6, maxWidth: '240px' }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
