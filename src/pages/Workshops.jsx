import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const workshops = [
  {
    id: 'acrylic',
    type: 'Acrylic Painting',
    tag: 'Founder Teaches',
    description: 'Learn acrylic painting techniques from the Kalarang founder — layering, palette knife work, colour mixing, and composition. No prior experience needed. All materials provided.',
    duration: '3 hours',
    price: 2500,
    seats: 8,
    seatsLeft: 4,
    dates: ['2026-04-05', '2026-04-19', '2026-05-03'],
    location: 'Kalarang Studio, Bhubaneswar',
    image: 'https://placehold.co/600x400/C9A84C/1C2B1D?text=Acrylic+Workshop',
    includes: ['All materials (canvas, paints, brushes)', 'Take your painting home', 'Tea & snacks', 'Certificate of completion'],
  },
  {
    id: 'patachitra',
    type: 'Patachitra with Mamata',
    tag: 'Artisan Guest',
    description: 'A rare opportunity to learn Patachitra from master artisan Mamata Mahapatra of Raghurajpur. Learn natural pigment preparation, traditional brush techniques, and the sacred iconography of Odisha\'s most celebrated art form.',
    duration: '4 hours',
    price: 3500,
    seats: 6,
    seatsLeft: 2,
    dates: ['2026-04-12'],
    location: 'Kalarang Studio, Bhubaneswar',
    image: 'https://placehold.co/600x400/1C2B1D/C9A84C?text=Patachitra+Workshop',
    includes: ['Natural pigments & handmade brush', 'Cloth canvas prepared traditionally', 'Take your painting home', 'Lunch & chai', 'Certificate signed by Mamata'],
  },
  {
    id: 'gond',
    type: 'Gond Art with Raju',
    tag: 'Artisan Guest',
    description: 'Explore the world of Gond tribal art with Raju Gond. Learn the signature dot-and-dash fill patterns, understand the cosmology behind the motifs, and create your own Gond-inspired artwork on canvas.',
    duration: '3.5 hours',
    price: 3000,
    seats: 8,
    seatsLeft: 5,
    dates: ['2026-04-26', '2026-05-10'],
    location: 'Kalarang Studio, Bhubaneswar',
    image: 'https://placehold.co/600x400/6B1F2A/F5EFE0?text=Gond+Workshop',
    includes: ['Canvas & acrylic paints', 'Take your artwork home', 'Tea & snacks', 'Certificate signed by Raju'],
  },
  {
    id: 'online-madhubani',
    type: 'Madhubani Online',
    tag: 'Online Course',
    description: 'A self-paced 4-module online course on Madhubani painting, taught by Sunita Devi. Pre-recorded video lessons, downloadable practice sheets, and a live Q&A session at the end of the course.',
    duration: '4 modules · Self-paced',
    price: 1500,
    seats: null,
    seatsLeft: null,
    dates: ['Starts anytime'],
    location: 'Online (Zoom + recorded videos)',
    image: 'https://placehold.co/600x400/1C2B1D/F5EFE0?text=Online+Madhubani',
    includes: ['4 video modules (6+ hours)', 'Downloadable practice sheets', '1 live Q&A with Sunita Devi', 'Material list provided', 'Certificate on completion'],
  },
]

const pastGallery = [
  'https://placehold.co/300x200/1C2B1D/C9A84C?text=Past+1',
  'https://placehold.co/300x200/6B1F2A/F5EFE0?text=Past+2',
  'https://placehold.co/300x200/C9A84C/1C2B1D?text=Past+3',
  'https://placehold.co/300x200/1C2B1D/F5EFE0?text=Past+4',
]

const testimonials = [
  { name: 'Aditi R.', text: 'The Patachitra workshop was magical. Mamata ji\'s patience and skill made me feel like I was in Raghurajpur. I\'ll treasure the painting I made.', workshop: 'Patachitra' },
  { name: 'Karthik S.', text: 'Never thought I could paint. The acrylic workshop was relaxed, fun, and I actually made something I\'m proud to hang at home.', workshop: 'Acrylic' },
  { name: 'Meera P.', text: 'The online Madhubani course was so well structured. Sunita Devi\'s videos are clear and calming. My daughter and I did it together.', workshop: 'Madhubani Online' },
]

const waUrl = 'https://wa.me/919999999999'

const typeParamMap = { founder: 'Founder Teaches', artisan: 'Artisan Guest', online: 'Online Course' }

export default function Workshops() {
  const [isMobile, setIsMobile] = useState(false)
  const [searchParams] = useSearchParams()
  const paramType = searchParams.get('type')
  const [activeFilter, setActiveFilter] = useState(typeParamMap[paramType] || 'All')

  useEffect(() => {
    setActiveFilter(typeParamMap[paramType] || 'All')
  }, [paramType])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const filters = ['All', 'Founder Teaches', 'Artisan Guest', 'Online Course']
  const filtered = activeFilter === 'All' ? workshops : workshops.filter(w => w.tag === activeFilter)

  const chipStyle = (active) => ({
    padding: '6px 16px', borderRadius: '20px',
    border: `1px solid ${active ? '#1C2B1D' : 'rgba(28,43,29,0.2)'}`,
    background: active ? '#1C2B1D' : 'transparent',
    color: active ? '#C9A84C' : '#6B7280',
    fontSize: '11px', letterSpacing: '0.1em', cursor: 'pointer',
    whiteSpace: 'nowrap', fontFamily: 'DM Sans, sans-serif',
  })

  const formatDate = (d) => {
    if (d === 'Starts anytime') return d
    const date = new Date(d)
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '0' : '104px', background: '#F5EFE0', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1C2B1D 60%, #2d4a2e)', padding: isMobile ? '48px 20px' : '56px 80px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>Learn</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '36px' : '56px', fontWeight: 600, margin: '0 0 16px', lineHeight: 1.1 }}>
          Workshops
        </h1>
        <p style={{ color: 'rgba(245,239,224,0.6)', fontSize: '14px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8 }}>
          Paint with the founder. Learn from master artisans. Take home art you made with your own hands.
        </p>
      </section>

      {/* Filters */}
      <section style={{ padding: isMobile ? '16px 20px' : '18px 80px', background: '#F5EFE0', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={chipStyle(activeFilter === f)}>{f}</button>
          ))}
        </div>
      </section>

      {/* Workshop Cards */}
      <section style={{ padding: isMobile ? '32px 20px' : '56px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '24px' : '40px', maxWidth: '1000px', margin: '0 auto' }}>
          {filtered.map(ws => (
            <div key={ws.id} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', background: '#fff', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.1)' }}>
              {/* Image */}
              <div style={{ flexShrink: 0, width: isMobile ? '100%' : '360px' }}>
                <img src={ws.image} alt={ws.type} style={{ width: '100%', height: isMobile ? '200px' : '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              {/* Details */}
              <div style={{ flex: 1, padding: isMobile ? '20px' : '28px 32px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ background: ws.tag === 'Artisan Guest' ? '#6B1F2A' : ws.tag === 'Online Course' ? '#C9A84C' : '#1C2B1D', color: ws.tag === 'Online Course' ? '#1C2B1D' : '#F5EFE0', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 10px', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
                    {ws.tag}
                  </span>
                  <span style={{ color: '#6B7280', fontSize: '11px' }}>{ws.duration}</span>
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '22px' : '26px', fontWeight: 600, margin: '0 0 10px', lineHeight: 1.2 }}>
                  {ws.type}
                </h3>
                <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.7, margin: '0 0 16px', flex: 1 }}>
                  {ws.description}
                </p>

                {/* Dates */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {ws.dates.map(d => (
                    <span key={d} style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', padding: '4px 12px', fontSize: '11px', color: '#1C2B1D', fontFamily: 'DM Sans, sans-serif' }}>
                      {formatDate(d)}
                    </span>
                  ))}
                </div>

                {/* Includes */}
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ color: '#C9A84C', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>Includes</p>
                  <ul style={{ padding: '0 0 0 16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {ws.includes.map(item => (
                      <li key={item} style={{ color: '#6B7280', fontSize: '12px' }}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Price + Seats + CTA */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '14px', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ color: '#C9A84C', fontWeight: 700, fontSize: '20px', margin: 0, fontFamily: 'DM Sans, sans-serif' }}>
                      ₹{ws.price.toLocaleString('en-IN')}
                      <span style={{ color: '#6B7280', fontSize: '12px', fontWeight: 400 }}> / person</span>
                    </p>
                    {ws.seatsLeft !== null && (
                      <p style={{ color: ws.seatsLeft <= 3 ? '#6B1F2A' : '#6B7280', fontSize: '11px', margin: '2px 0 0', fontWeight: ws.seatsLeft <= 3 ? 600 : 400 }}>
                        {ws.seatsLeft} of {ws.seats} seats left
                      </p>
                    )}
                  </div>
                  <a href={waUrl} target="_blank" rel="noreferrer" style={{ background: '#1C2B1D', color: '#C9A84C', padding: '12px 28px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap' }}>
                    Book Seat
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: '#1C2B1D', padding: isMobile ? '48px 20px' : '56px 80px' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px', textAlign: 'center' }}>What People Say</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '26px' : '32px', fontWeight: 600, marginBottom: '40px', textAlign: 'center' }}>
          From Our Workshops
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
          {testimonials.map(t => (
            <div key={t.name} style={{ border: '1px solid rgba(201,168,76,0.2)', padding: '24px' }}>
              <p style={{ color: 'rgba(245,239,224,0.7)', fontSize: '13px', lineHeight: 1.7, margin: '0 0 16px', fontStyle: 'italic' }}>
                "{t.text}"
              </p>
              <p style={{ color: '#F5EFE0', fontSize: '13px', fontWeight: 600, margin: '0 0 2px' }}>{t.name}</p>
              <p style={{ color: '#C9A84C', fontSize: '10px', letterSpacing: '0.1em', margin: 0 }}>{t.workshop} Workshop</p>
            </div>
          ))}
        </div>
      </section>

      {/* Past Sessions Gallery */}
      <section id="gallery" style={{ padding: isMobile ? '40px 20px' : '56px 80px', background: '#F5EFE0' }}>
        <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px', textAlign: 'center' }}>Past Sessions</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '26px' : '32px', fontWeight: 600, marginBottom: '32px', textAlign: 'center' }}>
          Gallery
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '12px', maxWidth: '900px', margin: '0 auto' }}>
          {pastGallery.map((img, i) => (
            <img key={i} src={img} alt={`Past session ${i + 1}`} style={{ width: '100%', height: isMobile ? '140px' : '180px', objectFit: 'cover', display: 'block' }} />
          ))}
        </div>
      </section>

      {/* Gift a Workshop CTA */}
      <section id="gift" style={{ background: '#1C2B1D', padding: isMobile ? '48px 20px' : '56px 80px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>Gift</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '28px' : '40px', fontWeight: 600, marginBottom: '16px' }}>
          Gift a Workshop
        </h2>
        <p style={{ color: 'rgba(245,239,224,0.5)', fontSize: '14px', maxWidth: '440px', margin: '0 auto 32px', lineHeight: 1.8 }}>
          The best gift for the person who has everything — a hands-on art experience they'll never forget.
        </p>
        <a href={waUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: '#25D366', color: '#fff', padding: '14px 32px', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
          WhatsApp to Gift
        </a>
      </section>

    </div>
  )
}
