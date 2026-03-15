import { NavLink, useLocation } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

const tabs = [
  {
    label: 'Home',
    path: '/',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H5a1 1 0 01-1-1V9.75z" stroke={active ? '#C9A84C' : '#6B7280'} strokeWidth="1.8" fill={active ? '#C9A84C22' : 'none'} />
        <path d="M9 22V12h6v10" stroke={active ? '#C9A84C' : '#6B7280'} strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: 'Studio',
    path: '/studio',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke={active ? '#C9A84C' : '#6B7280'} strokeWidth="1.8" fill={active ? '#C9A84C22' : 'none'} />
        <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4" stroke={active ? '#C9A84C' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1.5" fill={active ? '#C9A84C' : '#6B7280'} />
      </svg>
    ),
  },
  {
    label: 'Artisans',
    path: '/artisans',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle cx="9" cy="7" r="4" stroke={active ? '#C9A84C' : '#6B7280'} strokeWidth="1.8" fill={active ? '#C9A84C22' : 'none'} />
        <path d="M2 21c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke={active ? '#C9A84C' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 11c1.66 0 3 1.34 3 3s-1.34 3-3 3" stroke={active ? '#C9A84C' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20 21c0-2.21-1.34-4.1-3.27-4.76" stroke={active ? '#C9A84C' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Cart',
    path: '/cart',
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={active ? '#C9A84C' : '#6B7280'} strokeWidth="1.8" fill={active ? '#C9A84C22' : 'none'} />
        <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke={active ? '#C9A84C' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Account',
    path: '/login',
    isAccount: true,
    icon: (active) => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="4" stroke={active ? '#C9A84C' : '#6B7280'} strokeWidth="1.8" fill={active ? '#C9A84C22' : 'none'} />
        <path d="M4 21c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke={active ? '#C9A84C' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function MobileNav() {
  const location = useLocation()
  const { cartCount } = useContext(CartContext)
  const { isLoggedIn } = useAuth()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-primary border-t border-accent/20 safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const path = tab.isAccount && isLoggedIn ? '/orders' : tab.path
          const label = tab.isAccount && isLoggedIn ? 'Account' : tab.label

          const isActive =
            tab.isAccount
              ? ['/login', '/orders', '/track', '/wishlist'].some(p => location.pathname.startsWith(p))
              : tab.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(tab.path)

          return (
            <NavLink
              key={tab.label}
              to={path}
              className="relative flex flex-col items-center justify-center gap-1 min-w-[48px] min-h-[48px] py-1"
            >
              {tab.label === 'Cart' && cartCount > 0 && (
                <span className="absolute top-0 right-1 bg-accent text-primary text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}

              {tab.icon(isActive)}

              <span
                className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-accent' : 'text-muted'
                }`}
              >
                {label}
              </span>

              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
