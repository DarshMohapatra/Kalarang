import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import { useCurrency } from '../../context/CurrencyContext'

const categories = [
  { label: 'Studio Collection', path: '/studio' },
  { label: 'Artisan Gallery', path: '/artisans' },
  { label: 'Collections', path: '/collections' },
  { label: 'Workshops', path: '/workshops' },
  { label: 'Corporate Gifting', path: '/gifting' },
  { label: 'About', path: '/about' },
]

const accountLinks = [
  { label: 'Your Orders', path: '/orders' },
  { label: 'Track Order', path: '/track' },
  { label: 'Wishlist', path: '/wishlist' },
  { label: 'FAQs', path: '/faq' },
  { label: 'Terms of Use', path: '/terms' },
  { label: 'Privacy Policy', path: '/privacy' },
]

export default function MobileNav() {
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { user, isLoggedIn, logout } = useAuth()
  const { currency, setCurrency } = useCurrency()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/search?q=${search.trim()}`)
      setSearch('')
    }
  }

  const close = () => setDrawerOpen(false)

  return (
    <>
      {/* Fixed Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-primary border-b border-accent/20">
        {/* Row 1: Hamburger + Logo + Icons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: '56px' }}>
          {/* Hamburger */}
          <button onClick={() => setDrawerOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 4px' }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="#F5EFE0" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: 'none', textAlign: 'center' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A84C', fontSize: '20px', fontWeight: 600, letterSpacing: '0.2em' }}>KALARANG</span>
          </NavLink>

          {/* Right Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Wishlist */}
            <NavLink to="/wishlist" style={{ position: 'relative' }}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M12 21C12 21 3 14 3 8a5 5 0 019-3 5 5 0 019 3c0 6-9 13-9 13z" stroke="#F5EFE0" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
              {wishlistCount > 0 && (
                <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#C9A84C', color: '#1C2B1D', fontSize: '10px', fontWeight: 700, borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </NavLink>

            {/* Cart */}
            <NavLink to="/cart" style={{ position: 'relative' }}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#F5EFE0" strokeWidth="1.8" />
                <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="#F5EFE0" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#C9A84C', color: '#1C2B1D', fontSize: '10px', fontWeight: 700, borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>

        {/* Row 2: Search Bar */}
        <form onSubmit={handleSearch} style={{ padding: '0 16px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '24px', padding: '8px 14px', gap: '8px', background: 'rgba(255,255,255,0.05)' }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for Madhubani, Patachitra..."
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#F5EFE0', fontSize: '13px', fontFamily: 'DM Sans, sans-serif' }}
            />
            <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" stroke="#C9A84C" strokeWidth="1.8" />
                <path d="M21 21l-4.35-4.35" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </form>
      </header>

      {/* Overlay */}
      {drawerOpen && (
        <div
          onClick={close}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 60 }}
        />
      )}

      {/* Slide-out Drawer */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '300px',
        background: '#1C2B1D', zIndex: 70, overflowY: 'auto',
        transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
      }}>
        {/* Drawer Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
          <div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A84C', fontSize: '18px', fontWeight: 600, letterSpacing: '0.15em', margin: 0 }}>KALARANG</p>
            <p style={{ color: 'rgba(245,239,224,0.4)', fontSize: '10px', margin: '2px 0 0' }}>कलारंग</p>
          </div>
          <button onClick={close} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" stroke="#F5EFE0" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="7" r="4" stroke="#C9A84C" strokeWidth="1.5" />
                <path d="M4 21c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p style={{ color: '#F5EFE0', fontSize: '15px', fontWeight: 600, margin: 0, fontFamily: 'DM Sans, sans-serif' }}>
                {isLoggedIn ? user.name : 'Guest'}
              </p>
              {isLoggedIn && <p style={{ color: 'rgba(245,239,224,0.4)', fontSize: '11px', margin: '2px 0 0' }}>{user.email}</p>}
            </div>
          </div>
        </div>

        {/* Currency Toggle */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgba(245,239,224,0.7)', fontSize: '13px' }}>Currency</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={() => setCurrency('INR')} style={{ padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: currency === 'INR' ? '#C9A84C' : 'rgba(245,239,224,0.4)', background: currency === 'INR' ? 'rgba(201,168,76,0.12)' : 'none', border: currency === 'INR' ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent', borderRadius: '4px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
              ₹ INR
            </button>
            <button onClick={() => setCurrency('USD')} style={{ padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: currency === 'USD' ? '#C9A84C' : 'rgba(245,239,224,0.4)', background: currency === 'USD' ? 'rgba(201,168,76,0.12)' : 'none', border: currency === 'USD' ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent', borderRadius: '4px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
              $ USD
            </button>
          </div>
        </div>

        {/* Browse Section */}
        <div style={{ padding: '16px 20px 8px' }}>
          <p style={{ color: '#C9A84C', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 12px', fontFamily: 'DM Sans, sans-serif' }}>Browse</p>
          {categories.map(cat => (
            <Link
              key={cat.path}
              to={cat.path}
              onClick={close}
              style={{ display: 'block', padding: '12px 0', color: 'rgba(245,239,224,0.8)', fontSize: '15px', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.06)', fontFamily: 'DM Sans, sans-serif' }}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Account Section */}
        <div style={{ padding: '16px 20px 8px' }}>
          <p style={{ color: '#C9A84C', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 12px', fontFamily: 'DM Sans, sans-serif' }}>Account</p>
          {accountLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={close}
              style={{ display: 'block', padding: '12px 0', color: 'rgba(245,239,224,0.8)', fontSize: '15px', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.06)', fontFamily: 'DM Sans, sans-serif' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Login/Logout */}
        <div style={{ padding: '20px' }}>
          {isLoggedIn ? (
            <button
              onClick={() => { logout(); close() }}
              style={{ width: '100%', padding: '14px', background: '#6B1F2A', color: '#F5EFE0', border: 'none', borderRadius: '28px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={close}
              style={{ display: 'block', textAlign: 'center', width: '100%', padding: '14px', background: '#C9A84C', color: '#1C2B1D', borderRadius: '28px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box' }}
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
