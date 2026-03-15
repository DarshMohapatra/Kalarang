import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const artisans = [
  { id: '1', name: 'Mamata Mahapatra', artForm: 'Patachitra', image: 'https://placehold.co/80x80/1C2B1D/C9A84C?text=M' },
  { id: '2', name: 'Sunita Devi', artForm: 'Madhubani', image: 'https://placehold.co/80x80/6B1F2A/F5EFE0?text=S' },
  { id: '3', name: 'Raju Gond', artForm: 'Gond Art', image: 'https://placehold.co/80x80/C9A84C/1C2B1D?text=R' },
  { id: '4', name: 'Priya Warli', artForm: 'Warli', image: 'https://placehold.co/80x80/1C2B1D/F5EFE0?text=P' },
  { id: '5', name: 'Anand Kumar', artForm: 'Kalamkari', image: 'https://placehold.co/80x80/6B1F2A/C9A84C?text=A' },
]

export default function About() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '0' : '104px', background: '#F5EFE0', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1C2B1D 60%, #2d4a2e)', padding: isMobile ? '56px 20px' : '80px 80px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '16px' }}>About</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '36px' : '56px', fontWeight: 600, margin: '0 0 20px', lineHeight: 1.1 }}>Our Story</h1>
        <p style={{ color: 'rgba(245,239,224,0.6)', fontSize: '14px', maxWidth: '540px', margin: '0 auto', lineHeight: 1.8 }}>
          Kalarang was born from a simple belief — that Indian art deserves to be seen, celebrated, and fairly paid for.
        </p>
      </section>

      {/* The Idea */}
      <section style={{ padding: isMobile ? '40px 20px' : '64px 80px', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>The Beginning</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '26px' : '32px', fontWeight: 600, marginBottom: '20px' }}>Where It All Started</h2>
        <p style={{ color: '#1A1A1A', fontSize: '15px', lineHeight: 1.9, marginBottom: '16px' }}>
          It started with a visit to Raghurajpur, a village in Odisha where every house is a canvas. Watching artisans paint with brushes made from mouse hair, using colours ground from stones and shells — art forms perfected over centuries — it was clear that this work deserved a larger audience and a fairer price.
        </p>
        <p style={{ color: '#1A1A1A', fontSize: '15px', lineHeight: 1.9, marginBottom: '16px' }}>
          Kalarang brings together two worlds under one roof: the founder's studio of original acrylic paintings (Wing A) and a curated collective of India's finest traditional artisans (Wing B). The goal is simple — make extraordinary Indian art accessible, and ensure the people who make it are compensated fairly.
        </p>
        <blockquote style={{ borderLeft: '3px solid #C9A84C', paddingLeft: '20px', margin: '32px 0' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '20px' : '26px', fontStyle: 'italic', lineHeight: 1.4, margin: 0 }}>
            "Art should not be a luxury. It should be on every wall, in every home, telling a story."
          </p>
          <p style={{ color: '#C9A84C', fontSize: '12px', marginTop: '12px', letterSpacing: '0.15em' }}>— The Founder</p>
        </blockquote>
      </section>

      {/* Two Wings */}
      <section style={{ background: '#1C2B1D', padding: isMobile ? '48px 20px' : '64px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>Our Model</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '26px' : '36px', fontWeight: 600, margin: 0 }}>Two Wings, One Mission</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ border: '1px solid rgba(201,168,76,0.2)', padding: '32px' }}>
            <span style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em' }}>WING A</span>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: '22px', margin: '8px 0 12px' }}>The Founder Studio</h3>
            <p style={{ color: 'rgba(245,239,224,0.5)', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
              Original acrylic paintings from the studio — contemporary works with an Indian soul. Each piece comes with a Certificate of Authenticity.
            </p>
            <Link to="/studio" style={{ color: '#C9A84C', fontSize: '12px', letterSpacing: '0.2em', textDecoration: 'none' }}>Explore Studio →</Link>
          </div>
          <div style={{ border: '1px solid rgba(201,168,76,0.2)', padding: '32px' }}>
            <span style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em' }}>WING B</span>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: '22px', margin: '8px 0 12px' }}>The Artisan Gallery</h3>
            <p style={{ color: 'rgba(245,239,224,0.5)', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
              Traditional Indian art — Patachitra, Madhubani, Gond, Warli, Kalamkari. 60% of every sale goes directly to the artisan who made it.
            </p>
            <Link to="/artisans" style={{ color: '#C9A84C', fontSize: '12px', letterSpacing: '0.2em', textDecoration: 'none' }}>Meet Artisans →</Link>
          </div>
        </div>
      </section>

      {/* Meet the Artisans */}
      <section style={{ padding: isMobile ? '48px 20px' : '64px 80px', textAlign: 'center' }}>
        <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>The Makers</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '26px' : '32px', fontWeight: 600, marginBottom: '32px' }}>Meet the Artisans</h2>
        <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {artisans.map(a => (
            <Link key={a.id} to={`/artisan/${a.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <img src={a.image} alt={a.name} style={{ width: '72px', height: '72px', borderRadius: '50%', border: '2px solid rgba(201,168,76,0.4)', objectFit: 'cover' }} />
              <p style={{ color: '#1C2B1D', fontSize: '13px', fontWeight: 600, margin: 0 }}>{a.name}</p>
              <p style={{ color: '#C9A84C', fontSize: '10px', margin: 0 }}>{a.artForm}</p>
            </Link>
          ))}
        </div>
        <Link to="/artisans" style={{ display: 'inline-block', marginTop: '32px', background: '#1C2B1D', color: '#C9A84C', padding: '12px 28px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
          View All Artisan Profiles
        </Link>
      </section>

      {/* Values */}
      <section style={{ background: '#1C2B1D', padding: isMobile ? '48px 20px' : '64px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '32px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          {[
            { icon: '✦', title: '60% to Artisan', sub: 'Fair revenue share on every sale — directly to the maker' },
            { icon: '📜', title: 'Authenticity', sub: 'Every artwork ships with a signed Certificate of Authenticity' },
            { icon: '🤝', title: 'Ethical Sourcing', sub: 'We visit every artisan, build relationships, and never bargain down' },
          ].map(v => (
            <div key={v.title}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '12px' }}>{v.icon}</span>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: '18px', marginBottom: '8px' }}>{v.title}</p>
              <p style={{ color: 'rgba(245,239,224,0.5)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{v.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
