import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Studio Collection', path: '/studio' },
      { label: 'Artisan Gallery', path: '/artisans' },
      { label: 'Collections', path: '/collections' },
      { label: 'Workshops', path: '/workshops' },
      { label: 'Corporate Gifting', path: '/gifting' },
      { label: 'New Arrivals', path: '/new' },
    ],
  },
  {
    title: 'Need Help',
    links: [
      { label: 'Contact Us', path: '/contact' },
      { label: 'Shipping Policy', path: '/shipping' },
      { label: 'Returns & Cancellations', path: '/returns' },
      { label: 'FAQs', path: '/faq' },
      { label: 'Track Order', path: '/track' },
    ],
  },
  {
    title: 'Our Policies',
    links: [
      { label: 'Terms of Use', path: '/terms' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'Artisan Code of Ethics', path: '/ethics' },
    ],
  },
  {
    title: 'About Kalarang',
    links: [
      { label: 'Our Story', path: '/about' },
      { label: 'The Founder', path: '/studio' },
      { label: 'Meet the Artisans', path: '/artisans?tab=artisans' },
      { label: 'Journal', path: '/journal' },
      { label: 'Press', path: '/press' },
    ],
  },
]

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/kalarang.art', icon: 'IG' },
  { label: 'Pinterest', href: 'https://pinterest.com/kalarang', icon: 'PT' },
  { label: 'WhatsApp', href: 'https://wa.me/919999999999', icon: 'WA' },
  { label: 'Email', href: 'mailto:hello@kalarang.art', icon: '✉' },
]

const payments = ['Visa', 'Mastercard', 'RuPay', 'UPI', 'PayPal']

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const pad = isMobile ? '20px' : '80px'

  return (
    <footer style={{ background: '#1C2B1D', color: '#F5EFE0', overflowX: 'hidden' }}>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: isMobile ? '32px 20px' : '48px',
        padding: isMobile ? '40px 20px 32px' : '64px 80px 48px',
        borderBottom: '1px solid rgba(201,168,76,0.15)'
      }}>
        {columns.map((col) => (
          <div key={col.title}>
            <p style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>
              {col.title}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    style={{ color: 'rgba(245,239,224,0.6)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,239,224,0.6)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        padding: `24px ${pad}`,
        gap: '20px'
      }}>

        {/* Logo + copyright */}
        <div>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A84C', fontSize: '18px', fontWeight: 600, letterSpacing: '0.2em', margin: '0 0 4px' }}>
            KALARANG
          </p>
          <p style={{ color: 'rgba(245,239,224,0.4)', fontSize: '11px', margin: 0 }}>
            {`© ${new Date().getFullYear()} Kalarang. All rights reserved. | www.kalarang.art`}
          </p>
        </div>

      {/* Socials */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      {socials.map((s) => (
       <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(245,239,224,0.6)', fontSize: '10px', fontWeight: 600, textDecoration: 'none' }}>
       {s.icon}
      </a>
       ))}
        </div>

        {/* Payment methods */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {payments.map((pm) => (
            <span
              key={pm}
              style={{ border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px', padding: '3px 8px', fontSize: '10px', color: 'rgba(245,239,224,0.5)' }}
            >
              {pm}
            </span>
          ))}
        </div>

      </div>
    </footer>
  )
}