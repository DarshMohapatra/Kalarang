import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'

export default function HoverActions({ isMobile, product }) {
  const navigate = useNavigate()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [copied, setCopied] = useState(false)

  const inWishlist = product ? isInWishlist(product.id) : false

  const stop = (e, fn) => {
    e.preventDefault()
    e.stopPropagation()
    if (fn) fn()
  }

  const handleQuickView = () => {
    if (product) navigate(`/product/${product.id}`)
  }

  const handleWishlist = () => {
    if (!product) return
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({ id: product.id, title: product.title, price: product.price, image: product.image, artisan: product.artisan || product.artForm })
    }
  }

  const handleShare = async () => {
    if (!product) return
    const url = `${window.location.origin}/product/${product.id}`
    if (navigator.share) {
      try { await navigator.share({ title: product.title, url }) } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      } catch {}
    }
  }

  const size = isMobile ? '36px' : '42px'

  const btnStyle = {
    width: size, height: size, borderRadius: '50%',
    background: 'rgba(255,255,255,0.92)', border: 'none',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  }

  return (
    <div
      data-hover-actions
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: isMobile ? '10px' : '14px',
        padding: isMobile ? '12px 0' : '20px 0',
        background: isMobile
          ? 'linear-gradient(transparent, rgba(0,0,0,0.25))'
          : 'linear-gradient(transparent, rgba(0,0,0,0.35))',
        opacity: isMobile ? 1 : 0,
        transition: 'opacity 0.3s ease',
        zIndex: 5,
      }}
    >
      {/* Quick View */}
      <button
        onClick={e => stop(e, handleQuickView)}
        onMouseEnter={e => { if (!isMobile) { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)' } }}
        onMouseLeave={e => { if (!isMobile) { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)' } }}
        style={btnStyle}
        title="Quick View"
      >
        <svg width={isMobile ? '15' : '18'} height={isMobile ? '15' : '18'} fill="none" viewBox="0 0 24 24">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#1C2B1D" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3" stroke="#1C2B1D" strokeWidth="1.8" />
        </svg>
      </button>

      {/* Wishlist */}
      <button
        onClick={e => stop(e, handleWishlist)}
        onMouseEnter={e => { if (!isMobile) { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)' } }}
        onMouseLeave={e => { if (!isMobile) { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)' } }}
        style={{ ...btnStyle, background: inWishlist ? '#6B1F2A' : 'rgba(255,255,255,0.92)' }}
        title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <svg width={isMobile ? '15' : '18'} height={isMobile ? '15' : '18'} fill={inWishlist ? '#F5EFE0' : 'none'} viewBox="0 0 24 24">
          <path d="M12 21C12 21 3 14 3 8a5 5 0 019-3 5 5 0 019 3c0 6-9 13-9 13z" stroke={inWishlist ? '#F5EFE0' : '#1C2B1D'} strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Share */}
      <button
        onClick={e => stop(e, handleShare)}
        onMouseEnter={e => { if (!isMobile) { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)' } }}
        onMouseLeave={e => { if (!isMobile) { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)' } }}
        style={{ ...btnStyle, background: copied ? '#1C2B1D' : 'rgba(255,255,255,0.92)' }}
        title="Share"
      >
        {copied ? (
          <svg width={isMobile ? '15' : '18'} height={isMobile ? '15' : '18'} fill="none" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width={isMobile ? '15' : '18'} height={isMobile ? '15' : '18'} fill="none" viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2" stroke="#1C2B1D" strokeWidth="1.8" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="#1C2B1D" strokeWidth="1.8" />
          </svg>
        )}
      </button>
    </div>
  )
}
