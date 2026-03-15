import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import HoverActions from '../components/product/HoverActions'
import { useCurrency } from '../context/CurrencyContext'

const collections = [
  {
    id: 'festive-edit',
    title: 'The Festive Edit',
    subtitle: 'Art for celebration',
    accent: '#6B1F2A',
    description: 'Vibrant works that bring the energy of Indian festivals into your space — Durga, Ganesha, Radha-Krishna, and the colours of Holi distilled into art.',
    products: [
      { id: '1', title: 'Goddess Durga — Patachitra', artisan: 'Mamata Mahapatra', artForm: 'Patachitra', price: 4500, image: 'https://placehold.co/400x500/1C2B1D/C9A84C?text=Patachitra' },
      { id: '4', title: 'Dancing Ganesha', artisan: 'Raju Gond', artForm: 'Gond Art', price: 2800, image: 'https://placehold.co/400x500/1C2B1D/C9A84C?text=Gond+Art' },
      { id: '6', title: 'Radha Krishna', artisan: 'Sunita Devi', artForm: 'Madhubani', price: 3500, image: 'https://placehold.co/400x500/1C2B1D/C9A84C?text=Madhubani' },
      { id: '9', title: 'Tribal Sun', artisan: 'Raju Gond', artForm: 'Gond Art', price: 2200, image: 'https://placehold.co/400x500/6B1F2A/C9A84C?text=Gond+Art' },
    ],
  },
  {
    id: 'home-gallery',
    title: 'Home Gallery',
    subtitle: 'Curated for your walls',
    accent: '#1C2B1D',
    description: 'Medium and large-format works selected for living rooms, bedrooms, and hallways. Each piece is sized to be a statement — not an afterthought.',
    products: [
      { id: '2', title: 'Forest Dreams', artisan: 'Studio Kalarang', artForm: 'Acrylic', price: 12000, image: 'https://placehold.co/400x500/C9A84C/1C2B1D?text=Acrylic' },
      { id: '10', title: 'Monsoon Geometry', artisan: 'Studio Kalarang', artForm: 'Acrylic', price: 15000, image: 'https://placehold.co/400x500/6B1F2A/F5EFE0?text=Geometric' },
      { id: '13', title: 'Night Market', artisan: 'Studio Kalarang', artForm: 'Acrylic', price: 18000, image: 'https://placehold.co/400x500/6B1F2A/C9A84C?text=Figurative' },
      { id: '16', title: 'Urban Pulse', artisan: 'Studio Kalarang', artForm: 'Acrylic', price: 14000, image: 'https://placehold.co/400x500/6B1F2A/F5EFE0?text=Urban' },
    ],
  },
  {
    id: 'first-art',
    title: 'First Art',
    subtitle: 'Start your collection under ₹5,000',
    accent: '#C9A84C',
    description: 'New to collecting? These affordable, gallery-worthy pieces are the perfect entry point — genuine traditional art and original studio work, without the intimidation.',
    products: [
      { id: '5', title: 'Village Life', artisan: 'Priya Warli', artForm: 'Warli', price: 1900, image: 'https://placehold.co/400x500/6B1F2A/C9A84C?text=Warli' },
      { id: '9', title: 'Tribal Sun', artisan: 'Raju Gond', artForm: 'Gond Art', price: 2200, image: 'https://placehold.co/400x500/6B1F2A/C9A84C?text=Gond+Art' },
      { id: '3', title: 'Tree of Life — Madhubani', artisan: 'Sunita Devi', artForm: 'Madhubani', price: 3200, image: 'https://placehold.co/400x500/6B1F2A/F5EFE0?text=Madhubani' },
      { id: '7', title: 'Golden Fish', artisan: 'Mamata Mahapatra', artForm: 'Patachitra', price: 4200, image: 'https://placehold.co/400x500/6B1F2A/C9A84C?text=Patachitra' },
    ],
  },
  {
    id: 'the-miniatures',
    title: 'The Miniatures',
    subtitle: 'Small art, big impact',
    accent: '#1C2B1D',
    description: 'Compact works under 30cm — perfect for desks, shelves, gifting, or filling that one empty spot on the wall. Proof that size has nothing to do with presence.',
    products: [
      { id: '12', title: 'Saffron Study', artisan: 'Studio Kalarang', artForm: 'Acrylic', price: 6500, image: 'https://placehold.co/400x500/C9A84C/6B1F2A?text=Saffron' },
      { id: '5', title: 'Village Life', artisan: 'Priya Warli', artForm: 'Warli', price: 1900, image: 'https://placehold.co/400x500/6B1F2A/C9A84C?text=Warli' },
      { id: '4', title: 'Dancing Ganesha', artisan: 'Raju Gond', artForm: 'Gond Art', price: 2800, image: 'https://placehold.co/400x500/1C2B1D/C9A84C?text=Gond+Art' },
      { id: '9', title: 'Tribal Sun', artisan: 'Raju Gond', artForm: 'Gond Art', price: 2200, image: 'https://placehold.co/400x500/6B1F2A/C9A84C?text=Gond+Art' },
    ],
  },
  {
    id: 'studio-picks',
    title: 'Studio Picks',
    subtitle: 'Founder\'s favourites',
    accent: '#6B1F2A',
    description: 'A personal selection by the founder — the pieces that didn\'t just meet the brief, they exceeded it. Works that stayed on the studio wall longest before being let go.',
    products: [
      { id: '14', title: 'Coastal Reverie', artisan: 'Studio Kalarang', artForm: 'Acrylic', price: 11000, image: 'https://placehold.co/400x500/1C2B1D/C9A84C?text=Coastal' },
      { id: '15', title: 'Golden Hour', artisan: 'Studio Kalarang', artForm: 'Acrylic', price: 7500, image: 'https://placehold.co/400x500/C9A84C/F5EFE0?text=Golden' },
      { id: '1', title: 'Goddess Durga — Patachitra', artisan: 'Mamata Mahapatra', artForm: 'Patachitra', price: 4500, image: 'https://placehold.co/400x500/1C2B1D/C9A84C?text=Patachitra' },
      { id: '8', title: 'Abstract India', artisan: 'Studio Kalarang', artForm: 'Acrylic', price: 9500, image: 'https://placehold.co/400x500/1C2B1D/C9A84C?text=Abstract' },
    ],
  },
]

export default function Collections() {
  const [isMobile, setIsMobile] = useState(false)
  const { formatPrice } = useCurrency()
  const [searchParams, setSearchParams] = useSearchParams()

  const activeId = searchParams.get('set') || collections[0].id
  const selected = collections.find(c => c.id === activeId) || collections[0]

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const switchCollection = (id) => {
    setSearchParams({ set: id })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '0' : '104px', background: '#F5EFE0', minHeight: '100vh' }}>

      {/* Hero — shows selected collection info */}
      <section style={{ background: 'linear-gradient(135deg, #1C2B1D 60%, #2d4a2e)', padding: isMobile ? '48px 20px' : '56px 80px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>
          {selected.subtitle}
        </p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '36px' : '56px', fontWeight: 600, margin: '0 0 16px', lineHeight: 1.1 }}>
          {selected.title}
        </h1>
        <p style={{ color: 'rgba(245,239,224,0.6)', fontSize: '14px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8 }}>
          {selected.description}
        </p>
      </section>

      {/* Collection Chips — sticky */}
      <section style={{ padding: isMobile ? '16px 20px' : '18px 80px', background: '#F5EFE0', borderBottom: '1px solid rgba(201,168,76,0.15)', position: 'sticky', top: isMobile ? '0' : '104px', zIndex: 30 }}>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none', justifyContent: isMobile ? 'flex-start' : 'center' }}>
          {collections.map(c => (
            <button
              key={c.id}
              onClick={() => switchCollection(c.id)}
              style={{
                padding: '7px 18px',
                borderRadius: '22px',
                border: `1px solid ${activeId === c.id ? '#1C2B1D' : 'rgba(28,43,29,0.2)'}`,
                background: activeId === c.id ? '#1C2B1D' : 'transparent',
                color: activeId === c.id ? '#C9A84C' : '#6B7280',
                fontSize: '11px',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
            >
              {c.title}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ padding: isMobile ? '24px 20px 40px' : '48px 80px 64px', background: '#F5EFE0' }}>
        <p style={{ color: '#6B7280', fontSize: '12px', marginBottom: '24px' }}>{selected.products.length} works</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '14px' : '28px',
        }}>
          {selected.products.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
              <div
                style={{ background: '#fff', overflow: 'hidden', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
                onMouseEnter={e => { if (!isMobile) { e.currentTarget.style.boxShadow = '0 8px 28px rgba(28,43,29,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; const o = e.currentTarget.querySelector('[data-hover-actions]'); if (o) o.style.opacity = '1' } }}
                onMouseLeave={e => { if (!isMobile) { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; const o = e.currentTarget.querySelector('[data-hover-actions]'); if (o) o.style.opacity = '0' } }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '100%', height: isMobile ? '200px' : '320px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => { if (!isMobile) e.currentTarget.style.transform = 'scale(1.05)' }}
                    onMouseLeave={e => { if (!isMobile) e.currentTarget.style.transform = 'scale(1)' }}
                  />
                  <span style={{
                    position: 'absolute', bottom: '10px', left: '10px',
                    background: 'rgba(28,43,29,0.85)', color: '#C9A84C',
                    fontSize: '9px', letterSpacing: '0.12em', padding: '4px 10px',
                    fontFamily: 'DM Sans, sans-serif', zIndex: 6,
                  }}>
                    {product.artForm}
                  </span>
                  {/* Hover action buttons */}
                  <HoverActions isMobile={isMobile} product={product} />
                </div>
                <div style={{ padding: isMobile ? '12px 10px' : '16px 14px' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '14px' : '18px', margin: '0 0 4px', lineHeight: 1.25 }}>
                    {product.title}
                  </h3>
                  <p style={{ color: '#6B7280', fontSize: '11px', margin: '0 0 8px' }}>{product.artisan}</p>
                  <p style={{ color: '#C9A84C', fontWeight: 700, fontSize: '15px', margin: 0, fontFamily: 'DM Sans, sans-serif' }}>
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: '#1C2B1D', padding: isMobile ? '48px 20px' : '56px 80px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>Can't decide?</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '28px' : '40px', fontWeight: 600, marginBottom: '16px' }}>
          Let us help you choose
        </h2>
        <p style={{ color: 'rgba(245,239,224,0.5)', fontSize: '14px', maxWidth: '440px', margin: '0 auto 32px', lineHeight: 1.8 }}>
          Tell us about your space, budget, and taste — we'll recommend the perfect piece.
        </p>
        <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" style={{
          display: 'inline-block', background: '#25D366', color: '#fff',
          padding: '14px 32px', fontSize: '12px', letterSpacing: '0.2em',
          textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif',
        }}>
          WhatsApp Us
        </a>
      </section>

    </div>
  )
}
