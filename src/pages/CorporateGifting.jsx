import { useState, useEffect } from 'react'

const giftTiers = [
  {
    name: 'Thoughtful',
    range: '₹1,000 – ₹2,000',
    description: 'Beautifully wrapped artisan prints, miniature paintings, and handcrafted bookmarks — perfect for team events and client thank-yous.',
    items: ['Framed miniature prints', 'Hand-painted bookmarks', 'Artisan postcard sets', 'Custom branded wrapping'],
    image: 'https://placehold.co/400x300/1C2B1D/C9A84C?text=Entry+Gifts',
  },
  {
    name: 'Signature',
    range: '₹3,000 – ₹6,000',
    description: 'Original artisan works on handmade paper or canvas — Madhubani, Gond, Warli. Each piece comes with the artisan\'s story card and a certificate of authenticity.',
    items: ['Original artisan paintings', 'Artisan story card', 'Certificate of authenticity', 'Gift box with custom branding'],
    image: 'https://placehold.co/400x300/6B1F2A/F5EFE0?text=Mid+Gifts',
  },
  {
    name: 'Heirloom',
    range: '₹8,000 – ₹25,000',
    description: 'Museum-grade original paintings — Patachitra, Kalamkari, large-format Gond works. Framed, gallery-ready, and personally signed by the artisan.',
    items: ['Large-format original art', 'Museum-grade framing', 'Personal video message from artisan', 'Premium wooden gift crate'],
    image: 'https://placehold.co/400x300/C9A84C/1C2B1D?text=Premium+Gifts',
  },
]

const steps = [
  { num: '01', title: 'Tell Us Your Needs', desc: 'Share quantity, budget, occasion, and any branding requirements via WhatsApp or email.' },
  { num: '02', title: 'We Curate Options', desc: 'Our team selects art pieces matched to your budget and aesthetic — you approve the final selection.' },
  { num: '03', title: 'Delivery with Impact', desc: 'Each gift is wrapped with the artisan\'s story. You get an impact report showing artisan earnings generated.' },
]

const clients = [
  'Tech Corp', 'Design Studio', 'Finance Co', 'Media House', 'Startup Hub', 'Legal LLP',
]

const waUrl = 'https://wa.me/919999999999?text=Hi%20Kalarang%2C%20I%27m%20interested%20in%20corporate%20gifting'

export default function CorporateGifting() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '100px' : '104px', background: '#F5EFE0', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1C2B1D 60%, #2d4a2e)', padding: isMobile ? '56px 20px' : '72px 80px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '16px' }}>Corporate Gifting</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '32px' : '56px', fontWeight: 600, margin: '0 0 20px', lineHeight: 1.1 }}>
          Give India's Greatest<br />Art Gifts
        </h1>
        <p style={{ color: 'rgba(245,239,224,0.6)', fontSize: '14px', maxWidth: '540px', margin: '0 auto 36px', lineHeight: 1.8 }}>
          Meaningful, handcrafted gifts by India's master artisans. Every gift supports a real artist — and comes with their story.
        </p>
        <a href={waUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: '#25D366', color: '#fff', padding: '14px 36px', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
          Enquire on WhatsApp
        </a>
      </section>

      {/* Why Art Gifts */}
      <section style={{ padding: isMobile ? '40px 20px' : '56px 80px', textAlign: 'center' }}>
        <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>Why Art?</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '26px' : '36px', fontWeight: 600, marginBottom: '16px' }}>
          Beyond the Usual Corporate Gift
        </h2>
        <p style={{ color: '#6B7280', fontSize: '14px', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.8 }}>
          No one remembers another branded mug. An original painting by a tribal artist from Madhya Pradesh — that stays on the wall and starts conversations.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
          {[
            { label: 'Unique', detail: 'Every piece is one-of-a-kind, handmade by a named artisan' },
            { label: 'Impactful', detail: '60% of every sale goes directly to the artisan' },
            { label: 'Memorable', detail: 'Comes with the artisan\'s story — a gift that tells a story' },
          ].map(v => (
            <div key={v.label} style={{ padding: '24px', border: '1px solid rgba(201,168,76,0.15)', background: '#fff' }}>
              <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'DM Sans, sans-serif', fontWeight: 700 }}>{v.label}</p>
              <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{v.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gift Tiers */}
      <section style={{ padding: isMobile ? '40px 20px' : '56px 80px', background: '#fff', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>Gift Tiers</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '26px' : '36px', fontWeight: 600, margin: 0 }}>
            Three Collections, Every Budget
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '24px' : '32px', maxWidth: '1000px', margin: '0 auto' }}>
          {giftTiers.map(tier => (
            <div key={tier.name} style={{ border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <img src={tier.image} alt={tier.name} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '24px', fontWeight: 600, margin: 0 }}>{tier.name}</h3>
                  <span style={{ color: '#C9A84C', fontSize: '13px', fontWeight: 700, fontFamily: 'DM Sans, sans-serif' }}>{tier.range}</span>
                </div>
                <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.7, margin: '0 0 16px', flex: 1 }}>{tier.description}</p>
                <ul style={{ padding: '0 0 0 16px', margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {tier.items.map(item => (
                    <li key={item} style={{ color: '#6B7280', fontSize: '12px' }}>{item}</li>
                  ))}
                </ul>
                <a href={waUrl} target="_blank" rel="noreferrer" style={{ display: 'block', textAlign: 'center', background: '#1C2B1D', color: '#C9A84C', padding: '10px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
                  Enquire
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: isMobile ? '48px 20px' : '64px 80px', background: '#1C2B1D' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>Process</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '26px' : '36px', fontWeight: 600, margin: 0 }}>
            How It Works
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '32px' : '48px', maxWidth: '900px', margin: '0 auto' }}>
          {steps.map(s => (
            <div key={s.num} style={{ textAlign: 'center' }}>
              <p style={{ color: '#C9A84C', fontSize: '32px', fontWeight: 300, fontFamily: 'Cormorant Garamond, serif', marginBottom: '12px' }}>{s.num}</p>
              <h3 style={{ color: '#F5EFE0', fontSize: '18px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ color: 'rgba(245,239,224,0.5)', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Numbers */}
      <section style={{ padding: isMobile ? '40px 20px' : '56px 80px', textAlign: 'center' }}>
        <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>Impact</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '26px' : '36px', fontWeight: 600, marginBottom: '36px' }}>
          Gifts That Give Back
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '24px' : '64px', flexWrap: 'wrap' }}>
          {[
            { num: '60%', label: 'Goes to Artisan' },
            { num: '5+', label: 'Art Forms' },
            { num: '100+', label: 'Gifts Delivered' },
            { num: '15+', label: 'Corporate Clients' },
          ].map(s => (
            <div key={s.label} style={{ minWidth: '100px' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A84C', fontSize: isMobile ? '32px' : '44px', fontWeight: 600, margin: '0 0 4px' }}>{s.num}</p>
              <p style={{ color: '#6B7280', fontSize: '11px', letterSpacing: '0.1em', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Client Logos */}
      <section style={{ padding: isMobile ? '32px 20px' : '40px 80px', background: 'rgba(201,168,76,0.04)', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
        <p style={{ color: '#6B7280', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '24px' }}>Trusted By</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '20px' : '48px', flexWrap: 'wrap', alignItems: 'center' }}>
          {clients.map(c => (
            <div key={c} style={{ width: isMobile ? '80px' : '100px', height: '48px', background: 'rgba(28,43,29,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#6B7280', fontSize: '10px', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.05em' }}>{c}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: '#1C2B1D', padding: isMobile ? '56px 20px' : '72px 80px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '28px' : '40px', fontWeight: 600, marginBottom: '16px' }}>
          Let's Create Something Meaningful
        </h2>
        <p style={{ color: 'rgba(245,239,224,0.5)', fontSize: '14px', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.8 }}>
          Tell us your budget, quantity, and occasion. We'll handle the rest — from artisan selection to wrapped delivery.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={waUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-block', background: '#25D366', color: '#fff', padding: '14px 36px', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
            WhatsApp Us
          </a>
          <a href="mailto:hello@kalarang.in" style={{ display: 'inline-block', border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C', padding: '14px 36px', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
            Email Us
          </a>
        </div>
      </section>

    </div>
  )
}
