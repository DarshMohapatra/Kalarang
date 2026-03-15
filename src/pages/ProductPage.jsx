import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useCurrency } from '../context/CurrencyContext'

// Placeholder product data — replace with API call later
const allProducts = [
  { id: '1', title: 'Goddess Durga — Patachitra', artisan: 'Mamata Mahapatra', artisanId: '1', artForm: 'Patachitra', price: 4500, wing: 'B', village: 'Raghurajpur', state: 'Odisha', medium: 'Natural colours on cloth', dimensions: '24cm x 36cm', certified: true, revenueShare: 60, stock: 3, image: 'https://placehold.co/700x900/1C2B1D/C9A84C?text=Patachitra', artisanImage: 'https://placehold.co/80x80/1C2B1D/C9A84C?text=M', story: 'This piece depicts the ten-armed goddess Durga in the traditional Patachitra style, using natural pigments derived from stones, shells, and plants. Every line is drawn freehand using a brush made from mouse hair — a technique passed down through 12 generations of the Mahapatra family in Raghurajpur village.', makingOf: ['Natural pigments prepared from stones and conch shells', 'Base cloth treated with chalk and tamarind paste', 'Outline drawn freehand with natural brush', 'Colours filled in layers over 3 weeks', 'Final lacquer coating with resin'] },
  { id: '2', title: 'Forest Dreams', artisan: 'Studio Kalarang', artisanId: null, artForm: 'Acrylic', price: 12000, wing: 'A', village: null, state: null, medium: 'Acrylic on canvas', dimensions: '40cm x 50cm', certified: true, revenueShare: null, stock: 1, image: 'https://placehold.co/700x900/C9A84C/1C2B1D?text=Acrylic', artisanImage: null, story: 'Forest Dreams explores the tension between urban memory and forest silence. Using layered acrylic washes, the piece evokes the feeling of standing at the edge of an old-growth forest at dusk — familiar yet unknowable.', makingOf: ['Sketch and composition planning', 'Base layers with diluted acrylic washes', 'Mid-tone details built over 5 sessions', 'Final highlights and texture work', 'Varnished and signed'] },
  { id: '3', title: 'Tree of Life — Madhubani', artisan: 'Sunita Devi', artisanId: '2', artForm: 'Madhubani', price: 3200, wing: 'B', village: 'Madhubani', state: 'Bihar', medium: 'Natural pigments on handmade paper', dimensions: '30cm x 40cm', certified: true, revenueShare: 60, stock: 5, image: 'https://placehold.co/700x900/6B1F2A/F5EFE0?text=Madhubani', artisanImage: 'https://placehold.co/80x80/6B1F2A/F5EFE0?text=S', story: 'The Tree of Life is one of the most sacred motifs in Madhubani tradition, representing the connection between earth and sky, ancestors and descendants. Sunita Devi has been painting since age 8, taught by her grandmother in the Kachni style.', makingOf: ['Handmade paper sourced from local artisans', 'Natural pigments ground fresh each morning', 'Fine line work using bamboo pen', 'Filled with flat natural colour washes', 'Dried in shade for 2 weeks'] },
  { id: '4', title: 'Dancing Ganesha', artisan: 'Raju Gond', artisanId: '3', artForm: 'Gond Art', price: 2800, wing: 'B', village: 'Patangarh', state: 'Madhya Pradesh', medium: 'Acrylic on canvas', dimensions: '20cm x 24cm', certified: true, revenueShare: 60, stock: 4, image: 'https://placehold.co/700x900/1C2B1D/C9A84C?text=Gond+Art', artisanImage: 'https://placehold.co/80x80/C9A84C/1C2B1D?text=R', story: 'Gond art is one of the largest tribal art traditions in India. This dancing Ganesha piece uses the characteristic Gond style of filling forms with intricate patterns of dots and lines, each pattern carrying its own meaning in the Gond cosmology.', makingOf: ['Sketch of Ganesha form on canvas', 'Outline in black acrylic', 'Dot and line patterns filled by hand', 'Colour washes applied in layers', 'Final detailing and signing'] },
  { id: '5', title: 'Village Life', artisan: 'Priya Warli', artisanId: '4', artForm: 'Warli', price: 1900, wing: 'B', village: 'Dahanu', state: 'Maharashtra', medium: 'White pigment on mud-coated cloth', dimensions: '18cm x 24cm', certified: true, revenueShare: 60, stock: 6, image: 'https://placehold.co/700x900/6B1F2A/C9A84C?text=Warli', artisanImage: 'https://placehold.co/80x80/1C2B1D/F5EFE0?text=P', story: 'Warli painting uses basic geometric shapes — circles, triangles, squares — to depict scenes of daily village life. Traditionally painted by women on the walls of mud huts during weddings and harvest festivals, this piece celebrates the rhythm of tribal community life.', makingOf: ['Mud and cow dung base prepared on cloth', 'Rice paste mixed with water for white pigment', 'Figures drawn using stick or finger', 'Geometric fill patterns added', 'Sun-dried for 3 days'] },
  { id: '6', title: 'Radha Krishna', artisan: 'Sunita Devi', artisanId: '2', artForm: 'Madhubani', price: 3500, wing: 'B', village: 'Madhubani', state: 'Bihar', medium: 'Natural pigments on handmade paper', dimensions: '28cm x 36cm', certified: true, revenueShare: 60, stock: 2, image: 'https://placehold.co/700x900/1C2B1D/C9A84C?text=Madhubani', artisanImage: 'https://placehold.co/80x80/6B1F2A/F5EFE0?text=S', story: 'The Radha-Krishna motif is central to Madhubani tradition, representing divine love and the union of souls. Sunita paints in the Kachni style, characterised by single-line cross-hatching and fine detail work.', makingOf: ['Handmade paper treated with starch', 'Pencil sketch of composition', 'Fine line work with bamboo pen', 'Natural colour fill in flat washes', 'Border and decorative elements added last'] },
  { id: '7', title: 'Golden Fish', artisan: 'Mamata Mahapatra', artisanId: '1', artForm: 'Patachitra', price: 4200, wing: 'B', village: 'Raghurajpur', state: 'Odisha', medium: 'Natural colours on cloth', dimensions: '22cm x 30cm', certified: true, revenueShare: 60, stock: 3, image: 'https://placehold.co/700x900/6B1F2A/C9A84C?text=Patachitra', artisanImage: 'https://placehold.co/80x80/1C2B1D/C9A84C?text=M', story: 'Fish are sacred in Odisha and feature prominently in Patachitra iconography as symbols of prosperity and abundance. This piece uses the traditional Pattachitra border of creeper flowers and leaves surrounding the central fish composition.', makingOf: ['Cloth layers glued with tamarind paste', 'Chalk and tamarind base coat applied', 'Border painted first as per tradition', 'Central fish motif outlined and filled', 'Lacquer finish for preservation'] },
  { id: '8', title: 'Abstract India', artisan: 'Studio Kalarang', artisanId: null, artForm: 'Acrylic', price: 9500, wing: 'A', village: null, state: null, medium: 'Acrylic on canvas', dimensions: '36cm x 48cm', certified: true, revenueShare: null, stock: 1, image: 'https://placehold.co/700x900/1C2B1D/C9A84C?text=Acrylic', artisanImage: null, story: 'Abstract India distills the visual vocabulary of Indian textile patterns, temple geometry, and festival colour into a single contemporary composition. The piece was made over 8 sessions, each layer adding depth to the final surface.', makingOf: ['Composition sketch inspired by temple geometry', 'Base layers in earth tones', 'Textile pattern overlays in gold and red', 'Final abstract elements in deep green', 'Varnished and signed'] },
  { id: '9', title: 'Tribal Sun', artisan: 'Raju Gond', artisanId: '3', artForm: 'Gond Art', price: 2200, wing: 'B', village: 'Patangarh', state: 'Madhya Pradesh', medium: 'Acrylic on canvas', dimensions: '16cm x 16cm', certified: true, revenueShare: 60, stock: 5, image: 'https://placehold.co/700x900/6B1F2A/C9A84C?text=Gond+Art', artisanImage: 'https://placehold.co/80x80/C9A84C/1C2B1D?text=R', story: 'The sun is the primary deity in Gond cosmology. This piece depicts the Gond sun in a radial pattern of dots and dashes, each ray filled with a different pattern representing a different aspect of nature — rain, forest, animals, and sky.', makingOf: ['Circular composition sketched', 'Black outline painted freehand', 'Dot patterns filled ray by ray', 'Colour added in traditional Gond palette', 'Signed and dated'] },
  { id: '10', title: 'Monsoon Geometry', artisan: 'Studio Kalarang', artisanId: null, artForm: 'Acrylic', price: 15000, wing: 'A', village: null, state: null, medium: 'Acrylic on canvas', dimensions: '50cm x 60cm', certified: true, revenueShare: null, stock: 1, image: 'https://placehold.co/700x900/6B1F2A/F5EFE0?text=Geometric', artisanImage: null, story: 'Monsoon Geometry captures the hidden order inside a downpour — the angles of rain against tin roofs, the arcs of water running through gutters, the perfect circles of ripples in puddles. Built up in sharp geometric layers over multiple sessions.', makingOf: ['Geometric composition planned with masking tape', 'Base washes in deep blue and grey', 'Hard-edge shapes painted with palette knife', 'Rain line details added freehand', 'Varnished and signed'] },
  { id: '11', title: 'Temple Shadows', artisan: 'Studio Kalarang', artisanId: null, artForm: 'Acrylic', price: 8500, wing: 'A', village: null, state: null, medium: 'Acrylic on board', dimensions: '30cm x 40cm', certified: true, revenueShare: null, stock: 2, image: 'https://placehold.co/700x900/1C2B1D/F5EFE0?text=Landscape', artisanImage: null, story: 'Temple Shadows is a study of morning light falling across ancient sandstone — the way shadow and light carve new shapes into old architecture. Painted from memory after visiting the Sun Temple at Konark.', makingOf: ['Reference sketches from temple visit', 'Warm ochre and sienna base layers', 'Shadow patterns built with glazing technique', 'Light details added in final session', 'Signed and varnished'] },
  { id: '12', title: 'Saffron Study', artisan: 'Studio Kalarang', artisanId: null, artForm: 'Acrylic', price: 6500, wing: 'A', village: null, state: null, medium: 'Acrylic on paper', dimensions: '24cm x 32cm', certified: true, revenueShare: null, stock: 3, image: 'https://placehold.co/700x900/C9A84C/6B1F2A?text=Saffron', artisanImage: null, story: 'Saffron Study is an exercise in chromatic restraint — a single colour family pushed through every possible variation of temperature, opacity, and texture. The result is a meditation on warmth itself.', makingOf: ['Heavy watercolour paper prepared with gesso', 'Saffron and gold tones mixed from 4 pigments', 'Layered washes from transparent to opaque', 'Texture created with dry brush technique', 'Signed and dated'] },
  { id: '13', title: 'Night Market', artisan: 'Studio Kalarang', artisanId: null, artForm: 'Acrylic', price: 18000, wing: 'A', village: null, state: null, medium: 'Acrylic on canvas', dimensions: '60cm x 80cm', certified: true, revenueShare: null, stock: 1, image: 'https://placehold.co/700x900/6B1F2A/C9A84C?text=Figurative', artisanImage: null, story: 'Night Market captures the electric energy of an Indian bazaar after dark — bodies weaving through pools of light from bare bulbs, the glow of fabric stalls, the silhouettes of vendors. The largest piece in the current studio collection.', makingOf: ['Large canvas stretched and primed', 'Dark background established first', 'Light sources mapped and painted', 'Figures added as loose silhouettes', 'Final glow effects and varnish'] },
  { id: '14', title: 'Coastal Reverie', artisan: 'Studio Kalarang', artisanId: null, artForm: 'Acrylic', price: 11000, wing: 'A', village: null, state: null, medium: 'Acrylic on canvas', dimensions: '45cm x 55cm', certified: true, revenueShare: null, stock: 1, image: 'https://placehold.co/700x900/1C2B1D/C9A84C?text=Coastal', artisanImage: null, story: 'Coastal Reverie is the Odisha coastline remembered through palette knife strokes — not as it is, but as it lives in memory. The sea, the sand, the fishing boats at dawn, all reduced to texture and feeling.', makingOf: ['Composition sketched from memory', 'Palette knife used for heavy impasto base', 'Ocean tones layered wet-on-wet', 'Sand textures built with dry palette knife', 'Signed and varnished'] },
  { id: '15', title: 'Golden Hour', artisan: 'Studio Kalarang', artisanId: null, artForm: 'Acrylic', price: 7500, wing: 'A', village: null, state: null, medium: 'Acrylic on board', dimensions: '28cm x 36cm', certified: true, revenueShare: null, stock: 2, image: 'https://placehold.co/700x900/C9A84C/F5EFE0?text=Golden', artisanImage: null, story: 'Golden Hour freezes that fleeting moment when everything turns amber — the brief window before sunset when the world looks like it is made of honey and light. A small, intimate piece meant to be lived with.', makingOf: ['Prepared board with warm-toned gesso', 'Golden base layer in cadmium yellow', 'Amber and burnt sienna glazes layered', 'Highlights in pale gold', 'Varnished with satin finish'] },
  { id: '16', title: 'Urban Pulse', artisan: 'Studio Kalarang', artisanId: null, artForm: 'Acrylic', price: 14000, wing: 'A', village: null, state: null, medium: 'Acrylic on canvas', dimensions: '48cm x 64cm', certified: true, revenueShare: null, stock: 1, image: 'https://placehold.co/700x900/6B1F2A/F5EFE0?text=Urban', artisanImage: null, story: 'Urban Pulse translates the rhythm of Indian city life into paint — the honking, the construction, the chai stalls, the digital billboards, all compressed into one vibrant, restless composition.', makingOf: ['Urban photo references collected over months', 'Bold primary colour palette mixed', 'Energy lines and motion streaks painted first', 'City element details layered on top', 'Final varnish and signing'] },
  { id: '17', title: 'Harvest Dance', artisan: 'Priya Warli', artisanId: '4', artForm: 'Warli', price: 2400, wing: 'B', village: 'Dahanu', state: 'Maharashtra', medium: 'White pigment on mud-coated cloth', dimensions: '24cm x 30cm', certified: true, revenueShare: 60, stock: 4, image: 'https://placehold.co/700x900/1C2B1D/F5EFE0?text=Warli', artisanImage: 'https://placehold.co/80x80/1C2B1D/F5EFE0?text=P', story: 'Harvest Dance captures the communal joy of the rice harvest in Warli tribal culture — concentric circles of dancers moving around a central tree, each figure linked hand-to-hand, expressing the unity of the village.', makingOf: ['Mud and cow dung base prepared on handmade cloth', 'Central tree motif drawn first', 'Concentric dancer figures added outward', 'Border patterns completed last', 'Sun-dried for 3 days'] },
  { id: '18', title: 'Peacock Garden — Kalamkari', artisan: 'Anand Kumar', artisanId: '5', artForm: 'Kalamkari', price: 3800, wing: 'B', village: 'Srikalahasti', state: 'Andhra Pradesh', medium: 'Natural dyes on cotton', dimensions: '30cm x 42cm', certified: true, revenueShare: 60, stock: 3, image: 'https://placehold.co/700x900/6B1F2A/F5EFE0?text=Kalamkari', artisanImage: 'https://placehold.co/80x80/6B1F2A/C9A84C?text=A', story: 'Kalamkari literally means pen-work — each line is drawn freehand using a bamboo pen dipped in natural dye. This peacock garden scene uses 7 natural colours derived from plants, minerals, and iron rust, following a technique over 3,000 years old.', makingOf: ['Cotton cloth treated with buffalo milk and myrobalan', 'Outline drawn with bamboo kalam dipped in iron rust', 'Colours applied from natural dyes — indigo, pomegranate, madder', 'Cloth washed and sun-dried between each colour', 'Final border and detailing added'] },
  { id: '19', title: 'Jagannath Trinity', artisan: 'Mamata Mahapatra', artisanId: '1', artForm: 'Patachitra', price: 5200, wing: 'B', village: 'Raghurajpur', state: 'Odisha', medium: 'Natural colours on cloth', dimensions: '28cm x 40cm', certified: true, revenueShare: 60, stock: 2, image: 'https://placehold.co/700x900/1C2B1D/C9A84C?text=Patachitra', artisanImage: 'https://placehold.co/80x80/1C2B1D/C9A84C?text=M', story: 'The Jagannath Trinity — Lord Jagannath, Balabhadra, and Subhadra — is the most sacred subject in Odisha Patachitra. This piece follows the exact iconographic proportions prescribed in the Shilpa Shastra, using colours ground from conch shells, lampblack, and mineral stones.', makingOf: ['Patti cloth layered with tamarind paste and chalk', 'Sacred proportions drawn following Shilpa Shastra', 'Faces and ornaments outlined with mouse-hair brush', 'Colours filled in traditional sequence over 4 weeks', 'Final lacquer coating for longevity'] },
  { id: '20', title: 'Forest Spirits', artisan: 'Raju Gond', artisanId: '3', artForm: 'Gond Art', price: 3100, wing: 'B', village: 'Patangarh', state: 'Madhya Pradesh', medium: 'Acrylic on canvas', dimensions: '24cm x 30cm', certified: true, revenueShare: 60, stock: 3, image: 'https://placehold.co/700x900/C9A84C/1C2B1D?text=Gond+Art', artisanImage: 'https://placehold.co/80x80/C9A84C/1C2B1D?text=R', story: 'In Gond cosmology, every tree, river, and hill has a spirit. This piece depicts the forest as a living being — trees with eyes, roots with heartbeats, and leaves that whisper. The intricate dot-and-dash fill patterns each represent a different element of the forest ecosystem.', makingOf: ['Forest spirit forms sketched from memory', 'Black acrylic outline painted freehand', 'Internal dot-and-dash patterns filled over 2 weeks', 'Earthy colour palette applied in layers', 'Signed with thumbprint and date'] },
  { id: '21', title: 'Temple Procession — Kalamkari', artisan: 'Anand Kumar', artisanId: '5', artForm: 'Kalamkari', price: 4600, wing: 'B', village: 'Srikalahasti', state: 'Andhra Pradesh', medium: 'Natural dyes on cotton', dimensions: '36cm x 48cm', certified: true, revenueShare: 60, stock: 2, image: 'https://placehold.co/700x900/1C2B1D/F5EFE0?text=Kalamkari', artisanImage: 'https://placehold.co/80x80/6B1F2A/C9A84C?text=A', story: 'A ceremonial temple procession rendered in the Srikalahasti Kalamkari style — elephants adorned with gold cloth, musicians with drums, dancers, and devotees moving toward a gopuram. Every figure is drawn freehand using a bamboo pen, with natural dyes that have been used unchanged for over 3 millennia.', makingOf: ['Cotton pretreated with myrobalan for dye absorption', 'Full composition sketched with charcoal', 'Iron rust outline drawn with bamboo kalam', 'Seven natural dye baths applied sequentially', 'Final wash and sun-bleaching for brightness'] },
]

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart, cartItems } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { formatPrice } = useCurrency()
  const [isMobile, setIsMobile] = useState(false)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState('story')

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const product = allProducts.find(p => p.id === id)

  if (!product) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#1C2B1D' }}>Product not found</p>
      <Link to="/artisans" style={{ color: '#C9A84C', fontSize: '13px', textDecoration: 'none', letterSpacing: '0.2em', textTransform: 'uppercase' }}>← Back to Gallery</Link>
    </div>
  )

  const inCart = cartItems.find(i => i.id === product.id)

  const handleAddToCart = () => {
    addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, artisan: product.artisan })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '0' : '104px' }}>

      {/* Breadcrumb */}
      <div style={{ padding: isMobile ? '16px 20px' : '16px 64px', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
        <p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>
          <Link to="/" style={{ color: '#6B7280', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <Link to={product.wing === 'A' ? '/studio' : '/artisans'} style={{ color: '#6B7280', textDecoration: 'none' }}>
            {product.wing === 'A' ? 'Studio Collection' : 'Artisan Gallery'}
          </Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span style={{ color: '#1C2B1D' }}>{product.title}</span>
        </p>
      </div>

      {/* Main layout */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '0' : '64px', padding: isMobile ? '0' : '48px 64px', maxWidth: '1200px', margin: '0 auto' }}>

        {/* LEFT — Image */}
        <div style={{ flex: '0 0 auto', width: isMobile ? '100%' : '480px' }}>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '100%', height: isMobile ? '400px' : '600px', objectFit: 'cover', display: 'block' }}
            />
            {/* Wing badge */}
            <span style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(28,43,29,0.85)', color: '#C9A84C', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '5px 10px' }}>
              Wing {product.wing}
            </span>
            {/* 60% badge */}
            {product.wing === 'B' && (
              <span style={{ position: 'absolute', top: '16px', right: '16px', background: '#1C2B1D', color: '#C9A84C', fontSize: '10px', padding: '5px 10px' }}>
                60% → Artisan
              </span>
            )}
            {/* COA badge */}
            {product.certified && (
              <span style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(201,168,76,0.9)', color: '#1C2B1D', fontSize: '10px', fontWeight: 600, padding: '5px 10px', letterSpacing: '0.1em' }}>
                📜 Certificate of Authenticity
              </span>
            )}
          </div>

          {/* Stock indicator */}
          {product.stock <= 3 && (
            <p style={{ color: '#6B1F2A', fontSize: '12px', marginTop: '8px', fontWeight: 600 }}>
              ⚠ Only {product.stock} left
            </p>
          )}
        </div>

        {/* RIGHT — Details */}
        <div style={{ flex: 1, padding: isMobile ? '24px 20px' : '0' }}>

          {/* Art form */}
          <p style={{ color: '#6B7280', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 8px' }}>{product.artForm}</p>

          {/* Title */}
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '28px' : '40px', fontWeight: 600, lineHeight: 1.2, margin: '0 0 16px' }}>
            {product.title}
          </h1>

          {/* Price */}
          <p style={{ color: '#C9A84C', fontSize: '28px', fontWeight: 700, margin: '0 0 24px', fontFamily: 'DM Sans, sans-serif' }}>
            {formatPrice(product.price)}
          </p>

          {/* Artisan info — Wing B only */}
          {product.wing === 'B' && (
            <Link to={`/artisan/${product.artisanId}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '24px', padding: '12px', border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.04)' }}>
              <img src={product.artisanImage} alt={product.artisan} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #C9A84C', objectFit: 'cover' }} />
              <div>
                <p style={{ color: '#1C2B1D', fontSize: '14px', fontWeight: 600, margin: '0 0 2px' }}>{product.artisan}</p>
                <p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>{product.village}, {product.state}</p>
              </div>
              <span style={{ marginLeft: 'auto', color: '#C9A84C', fontSize: '12px' }}>View Profile →</span>
            </Link>
          )}

          {/* Details grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            {[
              { label: 'Medium', value: product.medium },
              { label: 'Dimensions', value: product.dimensions },
              { label: 'Art Form', value: product.artForm },
              { label: 'Revenue Share', value: product.revenueShare ? `${product.revenueShare}% to artisan` : 'Studio work' },
            ].map((d) => (
              <div key={d.label} style={{ padding: '12px', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.1)' }}>
                <p style={{ color: '#6B7280', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>{d.label}</p>
                <p style={{ color: '#1C2B1D', fontSize: '13px', fontWeight: 500, margin: 0 }}>{d.value}</p>
              </div>
            ))}
          </div>

          {/* Add to Cart + Wishlist — inline on desktop */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
              <button
                onClick={handleAddToCart}
                style={{ flex: 1, padding: '16px', background: added ? '#2d4a2e' : '#1C2B1D', color: '#C9A84C', border: 'none', fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.3s', fontFamily: 'DM Sans, sans-serif' }}
              >
                {added ? '✓ Added to Cart' : inCart ? 'Add One More' : 'Add to Cart'}
              </button>
              <button
                onClick={() => {
                  if (isInWishlist(product.id)) removeFromWishlist(product.id)
                  else addToWishlist({ id: product.id, title: product.title, price: product.price, image: product.image, artisan: product.artisan })
                }}
                style={{ width: '54px', border: '1px solid rgba(201,168,76,0.3)', background: isInWishlist(product.id) ? 'rgba(201,168,76,0.1)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <svg width="20" height="20" fill={isInWishlist(product.id) ? '#C9A84C' : 'none'} viewBox="0 0 24 24">
                  <path d="M12 21C12 21 3 14 3 8a5 5 0 019-3 5 5 0 019 3c0 6-9 13-9 13z" stroke="#C9A84C" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}

          {/* Tabs — Story / Making Of / COA */}
          <div style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', display: 'flex', gap: '0', marginBottom: '20px' }}>
            {['story', 'making', 'coa'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ padding: '10px 20px', background: 'none', border: 'none', borderBottom: activeTab === tab ? '2px solid #C9A84C' : '2px solid transparent', color: activeTab === tab ? '#1C2B1D' : '#6B7280', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: activeTab === tab ? 600 : 400 }}
              >
                {tab === 'story' ? 'The Story' : tab === 'making' ? 'Making Of' : 'COA'}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'story' && (
            <p style={{ color: '#1A1A1A', fontSize: '14px', lineHeight: 1.8, margin: 0 }}>{product.story}</p>
          )}

          {activeTab === 'making' && (
            <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {product.makingOf.map((step, i) => (
                <li key={i} style={{ color: '#1A1A1A', fontSize: '14px', lineHeight: 1.6 }}>{step}</li>
              ))}
            </ol>
          )}

          {activeTab === 'coa' && (
            <div style={{ padding: '20px', border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.04)' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: '18px', margin: '0 0 12px' }}>Certificate of Authenticity</p>
              <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
                Every artwork from Kalarang ships with a signed Certificate of Authenticity confirming the artist's name, art form, materials used, and date of creation. The certificate is personally signed by the artist and countersigned by Kalarang.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Sticky Add to Cart — mobile only */}
      {isMobile && (
        <div style={{ position: 'fixed', bottom: '64px', left: 0, right: 0, zIndex: 40, padding: '12px 20px', background: '#F5EFE0', borderTop: '1px solid rgba(201,168,76,0.2)' }}>
          <button
            onClick={handleAddToCart}
            style={{ width: '100%', padding: '16px', background: added ? '#2d4a2e' : '#1C2B1D', color: '#C9A84C', border: 'none', fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
          >
            {added ? '✓ Added to Cart' : inCart ? 'Add One More' : `Add to Cart — ${formatPrice(product.price)}`}
          </button>
        </div>
      )}

    </div>
  )
}
