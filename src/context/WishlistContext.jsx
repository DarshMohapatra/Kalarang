import { createContext, useState, useContext, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('kalarang_wishlist')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('kalarang_wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const wishlistCount = wishlistItems.length

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.find(i => i.id === product.id)) return prev
      return [...prev, product]
    })
  }

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(i => i.id !== id))
  }

  const isInWishlist = (id) => wishlistItems.some(i => i.id === id)

  const clearWishlist = () => setWishlistItems([])

  return (
    <WishlistContext.Provider value={{ wishlistItems, wishlistCount, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
