import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import HoverActions from '../components/product/HoverActions'
import { useCurrency } from '../context/CurrencyContext'

const artisans = [
  { id: '1', name: 'Mamata Mahapatra', nameDevanagari: 'ममता महापात्र', artForm: 'Patachitra', state: 'Odisha', village: 'Raghurajpur', district: 'Puri', bio: 'I learned Patachitra from my mother-in-law when I was 16. In Raghurajpur, every house paints — it is the air we breathe. My brush is made from mouse hair, my colours from stones and conch shells. I paint the gods the way my grandmother saw them — with many arms and kind eyes.', quote: 'When I paint Durga, I feel her strength in my hands.', portrait: 'https://placehold.co/800x500/1C2B1D/C9A84C?text=Patachitra+Painting', image: 'https://placehold.co/120x120/1C2B1D/C9A84C?text=M', socialLink: null },
  { id: '2', name: 'Sunita Devi', nameDevanagari: 'सुनीता देवी', artForm: 'Madhubani', state: 'Bihar', village: 'Madhubani', district: 'Madhubani', bio: 'My grandmother painted on the walls of our mud house for every wedding and festival. I started learning when I was 8 — first the borders, then the flowers, then the gods. I paint in the Kachni style, which uses fine lines and cross-hatching instead of colour fills. Each painting takes two to three weeks.', quote: 'A Madhubani painting is never empty — every space tells a story.', portrait: 'https://placehold.co/800x500/6B1F2A/F5EFE0?text=Madhubani+Painting', image: 'https://placehold.co/120x120/6B1F2A/F5EFE0?text=S', socialLink: null },
  { id: '3', name: 'Raju Gond', nameDevanagari: 'राजू गोंड', artForm: 'Gond Art', state: 'Madhya Pradesh', village: 'Patangarh', district: 'Dindori', bio: 'Gond people believe every tree, hill, and river has a spirit. My art comes from that belief. I paint the forest the way my elders described it — alive, watching, breathing. I use dots and dashes to fill every form because in Gond tradition, nothing is truly solid — everything is made of smaller things.', quote: 'My paintings are maps of a world most people cannot see.', portrait: 'https://placehold.co/800x500/C9A84C/1C2B1D?text=Gond+Painting', image: 'https://placehold.co/120x120/C9A84C/1C2B1D?text=R', socialLink: null },
  { id: '4', name: 'Priya Warli', nameDevanagari: 'प्रिया वारली', artForm: 'Warli', state: 'Maharashtra', village: 'Dahanu', district: 'Palghar', bio: 'Warli painting is the oldest art form in India — over 2,500 years old. We use only circles, triangles, and squares to paint everything: people, animals, trees, the sun. I use rice paste on mud walls, the same way my mother and her mother did. My paintings are about daily life — farming, dancing, celebrating.', quote: 'Three shapes are enough to paint the whole world.', portrait: 'https://placehold.co/800x500/1C2B1D/F5EFE0?text=Warli+Painting', image: 'https://placehold.co/120x120/1C2B1D/F5EFE0?text=P', socialLink: null },
  { id: '5', name: 'Anand Kumar', nameDevanagari: 'आनंद कुमार', artForm: 'Kalamkari', state: 'Andhra Pradesh', village: 'Srikalahasti', district: 'Tirupati', bio: 'Kalamkari means pen-work. I draw every line freehand with a bamboo pen dipped in iron rust. My colours come from pomegranate rinds, indigo leaves, and madder root — the same dyes our ancestors used 3,000 years ago. Each piece is washed and dried between every colour, so a single painting can take 17 steps over several weeks.', quote: 'I do not use a single drop of chemical colour. The earth gives me everything I need.', portrait: 'https://placehold.co/800x500/6B1F2A/C9A84C?text=Kalamkari+Painting', image: 'https://placehold.co/120x120/6B1F2A/C9A84C?text=A', socialLink: null },
]

const artisanWorks = [
  { id: '1', title: 'Goddess Durga — Patachitra', artisanId: '1', artForm: 'Patachitra', price: 4500, image: 'https://placehold.co/400x500/1C2B1D/C9A84C?text=Patachitra' },
  { id: '7', title: 'Golden Fish', artisanId: '1', artForm: 'Patachitra', price: 4200, image: 'https://placehold.co/400x500/6B1F2A/C9A84C?text=Patachitra' },
  { id: '19', title: 'Jagannath Trinity', artisanId: '1', artForm: 'Patachitra', price: 5200, image: 'https://placehold.co/400x500/1C2B1D/C9A84C?text=Patachitra' },
  { id: '3', title: 'Tree of Life — Madhubani', artisanId: '2', artForm: 'Madhubani', price: 3200, image: 'https://placehold.co/400x500/6B1F2A/F5EFE0?text=Madhubani' },
  { id: '6', title: 'Radha Krishna', artisanId: '2', artForm: 'Madhubani', price: 3500, image: 'https://placehold.co/400x500/1C2B1D/C9A84C?text=Madhubani' },
  { id: '4', title: 'Dancing Ganesha', artisanId: '3', artForm: 'Gond Art', price: 2800, image: 'https://placehold.co/400x500/1C2B1D/C9A84C?text=Gond+Art' },
  { id: '9', title: 'Tribal Sun', artisanId: '3', artForm: 'Gond Art', price: 2200, image: 'https://placehold.co/400x500/6B1F2A/C9A84C?text=Gond+Art' },
  { id: '20', title: 'Forest Spirits', artisanId: '3', artForm: 'Gond Art', price: 3100, image: 'https://placehold.co/400x500/C9A84C/1C2B1D?text=Gond+Art' },
  { id: '5', title: 'Village Life', artisanId: '4', artForm: 'Warli', price: 1900, image: 'https://placehold.co/400x500/6B1F2A/C9A84C?text=Warli' },
  { id: '17', title: 'Harvest Dance', artisanId: '4', artForm: 'Warli', price: 2400, image: 'https://placehold.co/400x500/1C2B1D/F5EFE0?text=Warli' },
  { id: '18', title: 'Peacock Garden — Kalamkari', artisanId: '5', artForm: 'Kalamkari', price: 3800, image: 'https://placehold.co/400x500/6B1F2A/F5EFE0?text=Kalamkari' },
  { id: '21', title: 'Temple Procession — Kalamkari', artisanId: '5', artForm: 'Kalamkari', price: 4600, image: 'https://placehold.co/400x500/1C2B1D/F5EFE0?text=Kalamkari' },
]

// Simple SVG India map with highlighted state
function IndiaStateHighlight({ state }) {
  const stateColors = {
    'Odisha': { x: 72, y: 58 },
    'Bihar': { x: 68, y: 42 },
    'Madhya Pradesh': { x: 48, y: 48 },
    'Maharashtra': { x: 40, y: 62 },
    'Andhra Pradesh': { x: 55, y: 72 },
  }
  const pos = stateColors[state]
  if (!pos) return null
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ maxWidth: '180px' }}>
      {/* Simplified India outline */}
      <path d="M30 15 Q35 10 45 12 Q55 8 60 15 Q68 12 72 18 Q78 20 80 28 Q82 35 78 42 Q80 48 76 55 Q78 62 72 68 Q68 75 62 78 Q55 85 50 88 Q45 90 42 85 Q38 80 35 75 Q30 70 28 65 Q22 58 25 50 Q20 42 22 35 Q25 28 28 22 Z" fill="rgba(201,168,76,0.15)" stroke="#C9A84C" strokeWidth="0.8" />
      {/* State dot */}
      <circle cx={pos.x} cy={pos.y} r="4" fill="#C9A84C" />
      <circle cx={pos.x} cy={pos.y} r="7" fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity="0.5" />
      <text x={pos.x} y={pos.y - 10} textAnchor="middle" fill="#C9A84C" fontSize="5" fontFamily="DM Sans, sans-serif">{state}</text>
    </svg>
  )
}

export default function ArtisanProfile() {
  const { id } = useParams()
  const [isMobile, setIsMobile] = useState(false)
  const { formatPrice } = useCurrency()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const artisan = artisans.find(a => a.id === id)

  if (!artisan) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', paddingTop: '104px' }}>
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#1C2B1D' }}>Artisan not found</p>
      <Link to="/artisans" style={{ color: '#C9A84C', fontSize: '13px', textDecoration: 'none', letterSpacing: '0.2em', textTransform: 'uppercase' }}>← Back to Gallery</Link>
    </div>
  )

  const works = artisanWorks.filter(w => w.artisanId === artisan.id)

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '100px' : '104px', background: '#F5EFE0', minHeight: '100vh' }}>

      {/* Hero — full-width portrait */}
      <section style={{ position: 'relative', background: '#1C2B1D' }}>
        <img
          src={artisan.portrait}
          alt={`${artisan.name} at work`}
          style={{ width: '100%', height: isMobile ? '280px' : '420px', objectFit: 'cover', display: 'block', opacity: 0.7 }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(28,43,29,0.9) 0%, rgba(28,43,29,0.3) 50%, transparent 100%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: isMobile ? '24px 20px' : '48px 80px',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? '16px' : '24px' }}>
            <img
              src={artisan.image}
              alt={artisan.name}
              style={{ width: isMobile ? '72px' : '96px', height: isMobile ? '72px' : '96px', borderRadius: '50%', border: '3px solid #C9A84C', objectFit: 'cover', flexShrink: 0 }}
            />
            <div>
              <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '4px' }}>{artisan.artForm}</p>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '28px' : '44px', fontWeight: 600, margin: '0 0 2px', lineHeight: 1.15 }}>
                {artisan.name}
              </h1>
              <p style={{ color: 'rgba(245,239,224,0.5)', fontSize: '14px', margin: 0 }}>{artisan.nameDevanagari}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div style={{ padding: isMobile ? '12px 20px' : '12px 80px', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
        <p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>
          <Link to="/" style={{ color: '#6B7280', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <Link to="/artisans" style={{ color: '#6B7280', textDecoration: 'none' }}>Artisan Gallery</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span style={{ color: '#1C2B1D' }}>{artisan.name}</span>
        </p>
      </div>

      {/* Bio + Map */}
      <section style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '32px' : '64px', padding: isMobile ? '32px 20px' : '56px 80px' }}>
        {/* Bio */}
        <div style={{ flex: 1 }}>
          <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>In Their Own Words</p>
          <p style={{ color: '#1A1A1A', fontSize: '15px', lineHeight: 1.9, margin: '0 0 24px' }}>{artisan.bio}</p>
          <blockquote style={{ borderLeft: '3px solid #C9A84C', paddingLeft: '20px', margin: '0 0 24px' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '20px' : '24px', fontStyle: 'italic', lineHeight: 1.4, margin: 0 }}>
              "{artisan.quote}"
            </p>
          </blockquote>
          {/* Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Art Form', value: artisan.artForm },
              { label: 'Village', value: artisan.village },
              { label: 'District', value: artisan.district },
              { label: 'State', value: artisan.state },
            ].map(d => (
              <div key={d.label} style={{ padding: '12px', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.1)' }}>
                <p style={{ color: '#6B7280', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>{d.label}</p>
                <p style={{ color: '#1C2B1D', fontSize: '13px', fontWeight: 500, margin: 0 }}>{d.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div style={{ flexShrink: 0, width: isMobile ? '100%' : '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <IndiaStateHighlight state={artisan.state} />
          <div style={{ background: '#1C2B1D', color: '#C9A84C', fontSize: '10px', letterSpacing: '0.15em', padding: '6px 14px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, textAlign: 'center' }}>
            60% OF EVERY SALE → {artisan.name.split(' ')[0].toUpperCase()}
          </div>
        </div>
      </section>

      {/* Their Works */}
      <section style={{ padding: isMobile ? '32px 20px 48px' : '48px 80px 64px', background: '#fff', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <div style={{ marginBottom: '32px' }}>
          <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>Their Works</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '26px' : '32px', fontWeight: 600, margin: 0 }}>
            Art by {artisan.name}
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: isMobile ? '14px' : '28px' }}>
          {works.map(work => (
            <Link key={work.id} to={`/product/${work.id}`} style={{ textDecoration: 'none' }}>
              <div
                style={{ overflow: 'hidden', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
                onMouseEnter={e => { if (!isMobile) { e.currentTarget.style.boxShadow = '0 8px 28px rgba(28,43,29,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; const o = e.currentTarget.querySelector('[data-hover-actions]'); if (o) o.style.opacity = '1' } }}
                onMouseLeave={e => { if (!isMobile) { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; const o = e.currentTarget.querySelector('[data-hover-actions]'); if (o) o.style.opacity = '0' } }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={work.image} alt={work.title}
                    style={{ width: '100%', height: isMobile ? '200px' : '320px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => { if (!isMobile) e.currentTarget.style.transform = 'scale(1.05)' }}
                    onMouseLeave={e => { if (!isMobile) e.currentTarget.style.transform = 'scale(1)' }}
                  />
                  <span style={{ position: 'absolute', bottom: '10px', left: '10px', background: '#1C2B1D', color: '#C9A84C', fontSize: '9px', letterSpacing: '0.1em', padding: '4px 10px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, zIndex: 6 }}>
                    60% → Artisan
                  </span>
                  {/* Hover action buttons */}
                  <HoverActions isMobile={isMobile} product={work} />
                </div>
                <div style={{ padding: isMobile ? '12px 8px' : '14px 12px' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '14px' : '18px', margin: '0 0 6px', lineHeight: 1.25 }}>
                    {work.title}
                  </h3>
                  <p style={{ color: '#C9A84C', fontWeight: 700, fontSize: '15px', margin: 0, fontFamily: 'DM Sans, sans-serif' }}>
                    {formatPrice(work.price)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Other Artisans */}
      <section style={{ padding: isMobile ? '40px 20px' : '56px 80px', background: '#1C2B1D' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px', textAlign: 'center' }}>Explore More</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '24px' : '32px', fontWeight: 600, marginBottom: '32px', textAlign: 'center' }}>
          Other Artisans
        </h2>
        <div style={{ display: 'flex', gap: isMobile ? '20px' : '40px', justifyContent: 'center', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {artisans.filter(a => a.id !== artisan.id).map(a => (
            <Link key={a.id} to={`/artisan/${a.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}>
              <img src={a.image} alt={a.name} style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid rgba(201,168,76,0.4)', objectFit: 'cover' }} />
              <p style={{ color: '#F5EFE0', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap', margin: '0 0 2px' }}>{a.name}</p>
              <p style={{ color: '#C9A84C', fontSize: '10px', margin: 0 }}>{a.artForm}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
