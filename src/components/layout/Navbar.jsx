import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'

const categories = [
  {
    label: 'Studio Collection',
    path: '/studio',
    dropdown: [
      {
        title: 'By Style',
        links: [
          { label: 'Abstract', path: '/studio?style=Abstract' },
          { label: 'Geometric', path: '/studio?style=Geometric' },
          { label: 'Landscape', path: '/studio?style=Landscape' },
          { label: 'Figurative', path: '/studio?style=Figurative' },
        ],
      },
      {
        title: 'By Size',
        links: [
          { label: 'Small (under 30cm)', path: '/studio?size=small' },
          { label: 'Medium (30–50cm)', path: '/studio?size=medium' },
          { label: 'Large (50cm+)', path: '/studio?size=large' },
        ],
      },
      {
        title: 'By Price',
        links: [
          { label: 'Under ₹8,000', path: '/studio?price=under-8k' },
          { label: '₹8,000 – ₹15,000', path: '/studio?price=8k-15k' },
          { label: 'Above ₹15,000', path: '/studio?price=above-15k' },
        ],
      },
    ],
  },
  {
    label: 'Artisan Gallery',
    path: '/artisans',
    dropdown: [
      {
        title: 'By Art Form',
        links: [
          { label: 'Patachitra', path: '/artisans?art=patachitra' },
          { label: 'Madhubani', path: '/artisans?art=madhubani' },
          { label: 'Gond Art', path: '/artisans?art=gond' },
          { label: 'Warli', path: '/artisans?art=warli' },
          { label: 'Kalamkari', path: '/artisans?art=kalamkari' },
        ],
      },
      {
        title: 'By Region',
        links: [
          { label: 'Odisha', path: '/artisans?state=odisha' },
          { label: 'Bihar', path: '/artisans?state=bihar' },
          { label: 'Madhya Pradesh', path: '/artisans?state=mp' },
          { label: 'Maharashtra', path: '/artisans?state=maharashtra' },
          { label: 'Andhra Pradesh', path: '/artisans?state=ap' },
        ],
      },
      {
        title: 'By Price',
        links: [
          { label: 'Under ₹2,000', path: '/artisans?price=under-2k' },
          { label: '₹2,000 – ₹4,000', path: '/artisans?price=2k-4k' },
          { label: 'Above ₹4,000', path: '/artisans?price=above-4k' },
        ],
      },
    ],
  },
  {
    label: 'Collections',
    path: '/collections',
    dropdown: [
      {
        title: 'Curated Sets',
        links: [
          { label: 'The Festive Edit', path: '/collections?set=festive-edit' },
          { label: 'Home Gallery', path: '/collections?set=home-gallery' },
          { label: 'First Art — Under ₹5K', path: '/collections?set=first-art' },
          { label: 'The Miniatures', path: '/collections?set=the-miniatures' },
          { label: 'Studio Picks', path: '/collections?set=studio-picks' },
        ],
      },
    ],
  },
  {
    label: 'Workshops',
    path: '/workshops',
    dropdown: [
      {
        title: 'Workshop Types',
        links: [
          { label: 'Acrylic Painting', path: '/workshops?type=founder' },
          { label: 'Artisan Guest Workshop', path: '/workshops?type=artisan' },
          { label: 'Online Courses', path: '/workshops?type=online' },
        ],
      },
      {
        title: 'Quick Info',
        links: [
          { label: 'Upcoming Schedule', path: '/workshops' },
          { label: 'Gift a Workshop', path: '/workshops#gift' },
          { label: 'Past Sessions Gallery', path: '/workshops#gallery' },
        ],
      },
    ],
  },
  {
    label: 'Corporate Gifting',
    path: '/gifting',
  },
  {
    label: 'About',
    path: '/about',
    dropdown: [
      {
        title: 'Know Us',
        links: [
          { label: 'Our Story', path: '/about' },
          { label: 'The Founder', path: '/studio' },
          { label: 'Meet the Artisans', path: '/artisans?tab=artisans' },
          { label: 'Journal', path: '/journal' },
          { label: 'Press', path: '/press' },
        ],
      },
    ],
  },
]

const accountLinks = [
  { label: 'Your Orders', path: '/orders', icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="rgba(245,239,224,0.5)" strokeWidth="1.5" strokeLinejoin="round"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="rgba(245,239,224,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { label: 'Track Order', path: '/track', icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" stroke="rgba(245,239,224,0.5)" strokeWidth="1.5"/><circle cx="12" cy="10" r="3" stroke="rgba(245,239,224,0.5)" strokeWidth="1.5"/></svg> },
  { label: 'FAQs', path: '/faq', icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="rgba(245,239,224,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { label: 'Terms of Use', path: '/terms', icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="rgba(245,239,224,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="rgba(245,239,224,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { label: 'Privacy Policy', path: '/privacy', icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="rgba(245,239,224,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
]

export default function Navbar() {
  const { cartCount } = useCart()
  const { user, isLoggedIn, logout } = useAuth()
  const { wishlistCount } = useWishlist()
  const [search, setSearch] = useState('')
  const [hoveredCat, setHoveredCat] = useState(null)
  const [showAccount, setShowAccount] = useState(false)
  const [currency, setCurrency] = useState('INR')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) navigate(`/search?q=${search.trim()}`)
  }

  return (
    <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-primary border-b border-accent/20 shadow-sm">

      {/* Top Row */}
      <div className="flex items-center justify-between px-10 h-16 gap-6">

        {/* Logo */}
        <NavLink to="/" className="flex flex-col leading-none shrink-0">
          <span className="font-serif text-accent text-2xl font-semibold tracking-widest">
            KALARANG
          </span>
          <span className="text-warm/40 text-[11px] tracking-normal font-sans">
            कलारंग
          </span>
        </NavLink>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
          <div className="flex items-center border border-accent/40 rounded-full px-4 py-2 bg-primary/60 gap-3 hover:border-accent transition-colors duration-200">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for Madhubani, Patachitra, Gond art..."
              className="flex-1 text-sm text-charcoal placeholder-muted bg-transparent outline-none font-sans"
            />
            <button type="submit">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" stroke="#C9A84C" strokeWidth="1.8" />
                <path d="M21 21l-4.35-4.35" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </form>

        {/* Right Icons */}
        <div className="flex items-center gap-5 shrink-0">

          {/* Account */}
          <div
            className="relative"
            onMouseEnter={() => setShowAccount(true)}
            onMouseLeave={() => setShowAccount(false)}
          >
            <button className="flex flex-col items-center gap-0.5 group" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="7" r="4" stroke="#F5EFE0" strokeWidth="1.8" className="group-hover:stroke-accent transition-colors" />
                <path d="M4 21c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke="#F5EFE0" strokeWidth="1.8" strokeLinecap="round" className="group-hover:stroke-accent transition-colors" />
              </svg>
              <span className="text-[10px] text-warm/60 group-hover:text-accent transition-colors tracking-wide">Account</span>
            </button>

            {/* Account Dropdown */}
            {showAccount && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                paddingTop: '8px',
                zIndex: 60,
              }}>
                <div style={{
                  background: '#1C2B1D',
                  border: '1px solid rgba(201,168,76,0.2)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                  width: '260px',
                  overflow: 'hidden',
                }}>
                  {/* Header */}
                  <div style={{
                    padding: '20px 20px 16px',
                    borderBottom: '1px solid rgba(201,168,76,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}>
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="7" r="4" stroke="#C9A84C" strokeWidth="1.5" />
                      <path d="M4 21c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: 600, color: '#F5EFE0' }}>
                      {isLoggedIn ? user.name : 'User'}
                    </span>
                  </div>

                  {/* Currency */}
                  <div style={{
                    padding: '14px 20px',
                    borderBottom: '1px solid rgba(201,168,76,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="rgba(245,239,224,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{ fontSize: '14px', color: '#F5EFE0' }}>Currency</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        onClick={() => setCurrency('INR')}
                        style={{
                          padding: '3px 10px', fontSize: '12px', fontWeight: 600,
                          color: currency === 'INR' ? '#C9A84C' : 'rgba(245,239,224,0.4)',
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontFamily: 'DM Sans, sans-serif',
                        }}
                      >
                        ₹ INR
                      </button>
                      <span style={{ color: 'rgba(201,168,76,0.3)', fontSize: '14px' }}>|</span>
                      <button
                        onClick={() => setCurrency('USD')}
                        style={{
                          padding: '3px 10px', fontSize: '12px', fontWeight: 600,
                          color: currency === 'USD' ? '#C9A84C' : 'rgba(245,239,224,0.4)',
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontFamily: 'DM Sans, sans-serif',
                        }}
                      >
                        $ USD
                      </button>
                    </div>
                  </div>

                  {/* Links */}
                  {accountLinks.map(link => (
                    <Link
                      key={link.label}
                      to={link.path}
                      onClick={() => setShowAccount(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 20px',
                        borderBottom: '1px solid rgba(201,168,76,0.1)',
                        textDecoration: 'none',
                        color: 'rgba(245,239,224,0.7)',
                        fontSize: '14px',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.color = '#C9A84C' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(245,239,224,0.7)' }}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}

                  {/* Login/Signup or Logout Button */}
                  <div style={{ padding: '16px 20px' }}>
                    {isLoggedIn ? (
                      <button
                        onClick={() => { logout(); setShowAccount(false) }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          width: '100%',
                          padding: '12px',
                          background: '#6B1F2A',
                          color: '#F5EFE0',
                          borderRadius: '28px',
                          border: 'none',
                          fontSize: '13px',
                          fontWeight: 600,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          fontFamily: 'DM Sans, sans-serif',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#7d2532'}
                        onMouseLeave={e => e.currentTarget.style.background = '#6B1F2A'}
                      >
                        LOGOUT
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="#F5EFE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setShowAccount(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          width: '100%',
                          padding: '12px',
                          background: '#C9A84C',
                          color: '#1C2B1D',
                          borderRadius: '28px',
                          textDecoration: 'none',
                          fontSize: '13px',
                          fontWeight: 600,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          fontFamily: 'DM Sans, sans-serif',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#d4b55c'}
                        onMouseLeave={e => e.currentTarget.style.background = '#C9A84C'}
                      >
                        LOGIN / SIGNUP
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                          <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" stroke="#1C2B1D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <NavLink to="/wishlist" className="flex flex-col items-center gap-0.5 group relative">
            <div className="relative">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M12 21C12 21 3 14 3 8a5 5 0 019-3 5 5 0 019 3c0 6-9 13-9 13z" stroke="#F5EFE0" strokeWidth="1.8" strokeLinejoin="round" className="group-hover:stroke-accent transition-colors" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-primary text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[10px] text-warm/60 group-hover:text-accent transition-colors tracking-wide">Wishlist</span>
          </NavLink>

          {/* Cart */}
          <NavLink to="/cart" className="flex flex-col items-center gap-0.5 group relative">
            <div className="relative">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#F5EFE0" strokeWidth="1.8" className="group-hover:stroke-accent transition-colors" />
                <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="#F5EFE0" strokeWidth="1.8" strokeLinecap="round" className="group-hover:stroke-accent transition-colors" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-primary text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] text-warm/60 group-hover:text-accent transition-colors tracking-wide">Cart</span>
          </NavLink>

        </div>
      </div>

      {/* Bottom Row — Category Links with Dropdowns */}
      <div className="border-t border-accent/10 bg-primary">
        <nav className="flex items-center justify-center gap-8 px-10 h-10">
          {categories.map((cat) => (
            <div
              key={cat.path}
              className="relative h-full flex items-center"
              onMouseEnter={() => cat.dropdown && setHoveredCat(cat.path)}
              onMouseLeave={() => setHoveredCat(null)}
            >
              <NavLink
                to={cat.path}
                className={({ isActive }) =>
                  `text-xs tracking-widest uppercase font-medium whitespace-nowrap transition-colors duration-200 flex items-center gap-1 ${
                    isActive ? 'text-accent' : 'text-warm/70 hover:text-accent'
                  }`
                }
              >
                {cat.label}
                {cat.dropdown && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5 }}>
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </NavLink>

              {/* Dropdown */}
              {cat.dropdown && hoveredCat === cat.path && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingTop: '4px',
                    zIndex: 60,
                  }}
                >
                  <div
                    style={{
                      background: '#fff',
                      border: '1px solid rgba(201,168,76,0.15)',
                      boxShadow: '0 12px 40px rgba(28,43,29,0.12)',
                      padding: '24px 28px',
                      display: 'flex',
                      gap: '32px',
                      minWidth: cat.dropdown.length > 1 ? '420px' : '200px',
                    }}
                  >
                    {cat.dropdown.map((col) => (
                      <div key={col.title} style={{ minWidth: '120px' }}>
                        <p style={{
                          color: '#C9A84C',
                          fontSize: '10px',
                          letterSpacing: '0.25em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          marginBottom: '12px',
                          fontFamily: 'DM Sans, sans-serif',
                        }}>
                          {col.title}
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <Link
                                to={link.path}
                                onClick={() => setHoveredCat(null)}
                                style={{
                                  color: '#1A1A1A',
                                  fontSize: '13px',
                                  textDecoration: 'none',
                                  fontFamily: 'DM Sans, sans-serif',
                                  transition: 'color 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
                                onMouseLeave={e => e.currentTarget.style.color = '#1A1A1A'}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

    </header>
  )
}
