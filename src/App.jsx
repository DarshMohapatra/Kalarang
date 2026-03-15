import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import MobileNav from './components/layout/MobileNav'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ArtisanGallery from './pages/ArtisanGallery'
import StudioCollection from './pages/StudioCollection'
import Cart from './pages/Cart'
import Workshops from './pages/Workshops'
import ProductPage from './pages/ProductPage'
import Collections from './pages/Collections'
import ArtisanProfile from './pages/ArtisanProfile'
import CorporateGifting from './pages/CorporateGifting'
import Login from './pages/Login'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import About from './pages/About'
import InfoPage from './pages/InfoPage'
import Orders from './pages/Orders'
import TrackOrder from './pages/TrackOrder'
import Search from './pages/Search'


export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artisans" element={<ArtisanGallery />} />
            <Route path="/artisan/:id" element={<ArtisanProfile />} />
            <Route path="/studio" element={<StudioCollection />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/gifting" element={<CorporateGifting />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<InfoPage />} />
            <Route path="/shipping" element={<InfoPage />} />
            <Route path="/returns" element={<InfoPage />} />
            <Route path="/faq" element={<InfoPage />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/terms" element={<InfoPage />} />
            <Route path="/privacy" element={<InfoPage />} />
            <Route path="/cookies" element={<InfoPage />} />
            <Route path="/ethics" element={<InfoPage />} />
            <Route path="/journal" element={<InfoPage />} />
            <Route path="/press" element={<InfoPage />} />
            <Route path="/new" element={<InfoPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <MobileNav />
      </div>
    </BrowserRouter>
  )
}
