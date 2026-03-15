import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'

const featuredWorks = [
  { id: 1, title: 'Goddess Durga — Patachitra', artisan: 'Mamata Mahapatra', artForm: 'Patachitra', price: 4500, wing: 'B', image: 'https://placehold.co/600x700/1C2B1D/C9A84C?text=Patachitra' },
  { id: 2, title: 'Forest Dreams', artisan: 'Studio Kalarang', artForm: 'Acrylic', price: 12000, wing: 'A', image: 'https://placehold.co/600x700/C9A84C/1C2B1D?text=Acrylic' },
  { id: 3, title: 'Tree of Life — Madhubani', artisan: 'Sunita Devi', artForm: 'Madhubani', price: 3200, wing: 'B', image: 'https://placehold.co/600x700/6B1F2A/F5EFE0?text=Madhubani' },
]

const artisans = [
  { id: 1, name: 'Mamata Mahapatra', artForm: 'Patachitra', state: 'Odisha', image: 'https://placehold.co/80x80/1C2B1D/C9A84C?text=M' },
  { id: 2, name: 'Sunita Devi', artForm: 'Madhubani', state: 'Bihar', image: 'https://placehold.co/80x80/6B1F2A/F5EFE0?text=S' },
  { id: 3, name: 'Raju Gond', artForm: 'Gond Art', state: 'Madhya Pradesh', image: 'https://placehold.co/80x80/C9A84C/1C2B1D?text=R' },
  { id: 4, name: 'Priya Warli', artForm: 'Warli', state: 'Maharashtra', image: 'https://placehold.co/80x80/1C2B1D/F5EFE0?text=P' },
  { id: 5, name: 'Anand Kalamkari', artForm: 'Kalamkari', state: 'Andhra Pradesh', image: 'https://placehold.co/80x80/6B1F2A/C9A84C?text=A' },
]

const customerFavourites = [
  { id: 4, title: 'Dancing Ganesha', artForm: 'Gond Art', price: 2800, image: 'https://placehold.co/400x500/1C2B1D/C9A84C?text=Gond+Art' },
  { id: 5, title: 'Village Life', artForm: 'Warli', price: 1900, image: 'https://placehold.co/400x500/6B1F2A/C9A84C?text=Warli' },
  { id: 6, title: 'Radha Krishna', artForm: 'Madhubani', price: 3500, image: 'https://placehold.co/400x500/1C2B1D/C9A84C?text=Madhubani' },
  { id: 7, title: 'Golden Fish', artForm: 'Patachitra', price: 4200, image: 'https://placehold.co/400x500/6B1F2A/C9A84C?text=Patachitra' },
  { id: 8, title: 'Abstract India', artForm: 'Acrylic', price: 9500, image: 'https://placehold.co/400x500/1C2B1D/C9A84C?text=Acrylic' },
  { id: 9, title: 'Tribal Sun', artForm: 'Gond Art', price: 2200, image: 'https://placehold.co/400x500/6B1F2A/C9A84C?text=Gond+Art' },
]

export default function Home() {
  const carouselRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scrollCarousel = (dir) => {
    carouselRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  const px = isMobile ? '20px' : '64px'

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* 1. HERO SPLIT */}
      <section style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100vh' }}>

        <Link to="/studio" style={{ flex: 1, background: 'linear-gradient(135deg, #1C2B1D 60%, #2d4a2e)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textDecoration: 'none' }}>
          <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>Wing A</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '40px' : '64px', fontWeight: 600, lineHeight: 1.1, textAlign: 'center', marginBottom: '16px' }}>
            Founder<br />Studio
          </h1>
          <p style={{ color: 'rgba(245,239,224,0.6)', fontSize: '14px', textAlign: 'center', maxWidth: '260px', marginBottom: '28px', lineHeight: 1.6 }}>
            Original acrylic paintings — where modern technique meets Indian soul.
          </p>
          <span style={{ border: '1px solid #C9A84C', color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', padding: '10px 20px' }}>
            Explore Studio
          </span>
        </Link>

        {!isMobile && (
          <div style={{ width: '1px', background: 'rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#C9A84C', fontSize: '16px', background: '#2d4a2e', padding: '8px 4px' }}>✦</span>
          </div>
        )}

        <Link to="/artisans" style={{ flex: 1, background: 'linear-gradient(135deg, #F5EFE0 60%, #ede5cc)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textDecoration: 'none' }}>
          <p style={{ color: 'rgba(28,43,29,0.5)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>Wing B</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '40px' : '64px', fontWeight: 600, lineHeight: 1.1, textAlign: 'center', marginBottom: '16px' }}>
            Artisan<br />Gallery
          </h1>
          <p style={{ color: 'rgba(28,43,29,0.6)', fontSize: '14px', textAlign: 'center', maxWidth: '260px', marginBottom: '28px', lineHeight: 1.6 }}>
            Traditional Indian art — directly from the hands that made it.
          </p>
          <span style={{ border: '1px solid #1C2B1D', color: '#1C2B1D', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', padding: '10px 20px' }}>
            Meet the Artisans
          </span>
        </Link>

      </section>

      {/* 2. TWO WORLDS */}
      <section style={{ background: '#1C2B1D', padding: isMobile ? '48px 20px' : '80px 64px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>Our Philosophy</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '32px' : '48px', fontWeight: 600, marginBottom: '16px' }}>
          Two Worlds, One Platform
        </h2>
        <p style={{ color: 'rgba(245,239,224,0.5)', fontSize: '14px', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.8 }}>
          A founder's studio and a curated artisan collective — united by a belief that Indian art deserves to be seen, bought, and celebrated.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ border: '1px solid rgba(201,168,76,0.2)', padding: '28px', textAlign: 'left' }}>
            <span style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Wing A</span>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: '22px', margin: '8px 0 10px' }}>The Founder</h3>
            <p style={{ color: 'rgba(245,239,224,0.5)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              Original paintings from the studio — acrylics with an Indian heart. Each piece is one of a kind, with a Certificate of Authenticity.
            </p>
            <Link to="/studio" style={{ display: 'inline-block', marginTop: '20px', color: '#C9A84C', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>View Studio →</Link>
          </div>
          <div style={{ border: '1px solid rgba(201,168,76,0.2)', padding: '28px', textAlign: 'left' }}>
            <span style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Wing B</span>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: '22px', margin: '8px 0 10px' }}>The Artisans</h3>
            <p style={{ color: 'rgba(245,239,224,0.5)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              Patachitra, Madhubani, Gond, Warli — sourced ethically, with 60% of every sale going directly to the artisan who made it.
            </p>
            <Link to="/artisans" style={{ display: 'inline-block', marginTop: '20px', color: '#C9A84C', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>Meet Artisans →</Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED WORKS */}
      <section style={{ padding: isMobile ? '48px 20px' : '80px 64px', background: '#F5EFE0' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '8px' }}>Handpicked</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '28px' : '40px', fontWeight: 600 }}>Featured Works</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {featuredWorks.map((work) => (
            <Link key={work.id} to={`/product/${work.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={work.image} alt={work.title} style={{ width: '100%', height: isMobile ? '240px' : '320px', objectFit: 'cover', display: 'block' }} />
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(28,43,29,0.85)', color: '#C9A84C', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 8px' }}>Wing {work.wing}</span>
                {work.wing === 'B' && (
                  <span style={{ position: 'absolute', bottom: '12px', left: '12px', background: '#1C2B1D', color: '#C9A84C', fontSize: '10px', padding: '4px 8px' }}>60% → Artisan</span>
                )}
              </div>
              <div style={{ marginTop: '12px' }}>
                <p style={{ color: '#6B7280', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>{work.artForm}</p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '18px', margin: '4px 0' }}>{work.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ color: '#6B7280', fontSize: '13px', margin: 0 }}>{work.artisan}</p>
                  <p style={{ color: '#C9A84C', fontWeight: 600, margin: 0 }}>₹{work.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/artisans" style={{ border: '1px solid #1C2B1D', color: '#1C2B1D', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', padding: '12px 32px', textDecoration: 'none' }}>
            View All Works
          </Link>
        </div>
      </section>

      {/* 4. CUSTOMER FAVOURITES */}
      <section style={{ padding: isMobile ? '48px 0' : '80px 0', background: '#1C2B1D' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 20px' }}>
          <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '8px' }}>Most Loved</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '28px' : '40px', fontWeight: 600 }}>Customer Favourites</h2>
        </div>
        <div style={{ position: 'relative', padding: `0 ${isMobile ? '40px' : '64px'}` }}>
          <button
            onClick={() => scrollCarousel('left')}
            style={{ position: 'absolute', left: '8px', top: '40%', transform: 'translateY(-50%)', zIndex: 10, width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.4)', background: 'rgba(255,255,255,0.05)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div ref={carouselRef} style={{ display: 'flex', gap: '16px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '8px', scrollbarWidth: 'none' }}>
            {customerFavourites.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`} style={{ flexShrink: 0, width: isMobile ? '200px' : '260px', scrollSnapAlign: 'start', textDecoration: 'none' }}>
                <div style={{ overflow: 'hidden' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: isMobile ? '260px' : '340px', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <p style={{ color: 'rgba(245,239,224,0.5)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>{item.artForm}</p>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: '17px', margin: '4px 0' }}>{item.title}</h3>
                  <p style={{ color: '#C9A84C', fontWeight: 600, margin: 0, fontSize: '14px' }}>₹{item.price.toLocaleString('en-IN')}</p>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scrollCarousel('right')}
            style={{ position: 'absolute', right: '8px', top: '40%', transform: 'translateY(-50%)', zIndex: 10, width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.4)', background: 'rgba(255,255,255,0.05)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>

      {/* 5. ARTISAN STRIP */}
      <section style={{ background: '#1C2B1D', padding: isMobile ? '48px 0' : '64px 0', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px', padding: '0 20px' }}>
          <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '8px' }}>The Makers</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '26px' : '32px', fontWeight: 600 }}>Meet Our Artisans</h2>
        </div>
        <div style={{ display: 'flex', gap: isMobile ? '24px' : '40px', padding: `0 ${px}`, overflowX: 'auto', justifyContent: isMobile ? 'flex-start' : 'center', scrollbarWidth: 'none' }}>
          {artisans.map((artisan) => (
            <Link key={artisan.id} to={`/artisan/${artisan.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
              <img src={artisan.image} alt={artisan.name} style={{ width: '72px', height: '72px', borderRadius: '50%', border: '2px solid rgba(201,168,76,0.4)', objectFit: 'cover' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#F5EFE0', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap', margin: '0 0 3px' }}>{artisan.name}</p>
                <p style={{ color: '#C9A84C', fontSize: '10px', margin: '0 0 2px' }}>{artisan.artForm}</p>
                <p style={{ color: 'rgba(245,239,224,0.4)', fontSize: '10px', margin: 0 }}>{artisan.state}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. TRUST BAR */}
      <section style={{ padding: isMobile ? '40px 20px' : '56px 64px', borderTop: '1px solid rgba(201,168,76,0.1)', background: '#F5EFE0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '32px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          {[
            { icon: '🎨', title: '100% Handmade', sub: 'Every piece made by hand, never mass-produced' },
            { icon: '✦', title: '60% to Artisan', sub: 'Fair revenue, directly to the maker' },
            { icon: '📜', title: 'Certificate', sub: 'Every artwork ships with a signed COA' },
            { icon: '🚚', title: 'Insured Shipping', sub: 'Safe delivery across India & worldwide' },
          ].map((item) => (
            <div key={item.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '26px' }}>{item.icon}</span>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '16px', margin: 0 }}>{item.title}</p>
              <p style={{ color: '#6B7280', fontSize: '11px', margin: 0, lineHeight: 1.5 }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}