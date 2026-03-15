import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const pages = {
  '/contact': {
    title: 'Contact Us',
    subtitle: 'Get in Touch',
    content: [
      { heading: 'WhatsApp', text: 'The fastest way to reach us. Available 10am - 7pm IST, Monday to Saturday.', cta: { label: 'WhatsApp Us', href: 'https://wa.me/919999999999' } },
      { heading: 'Email', text: 'For detailed queries, orders, or collaborations. We respond within 24 hours.', cta: { label: 'hello@kalarang.art', href: 'mailto:hello@kalarang.art' } },
      { heading: 'Studio Visit', text: 'Kalarang Studio, Bhubaneswar, Odisha. By appointment only — WhatsApp to schedule.' },
    ],
  },
  '/shipping': {
    title: 'Shipping Policy',
    subtitle: 'Delivery Information',
    content: [
      { heading: 'Domestic Shipping', text: 'We ship across India via insured courier. Standard delivery takes 5-7 business days. Express delivery (2-3 days) is available for select pin codes.' },
      { heading: 'Free Shipping', text: 'All orders above ₹5,000 qualify for free standard shipping within India.' },
      { heading: 'International Shipping', text: 'We ship worldwide. International orders are shipped via tracked, insured courier and typically arrive within 10-15 business days. Customs duties, if any, are borne by the buyer.' },
      { heading: 'Packaging', text: 'Every artwork is carefully packaged with acid-free tissue, foam corners, and a rigid outer box. Paintings are shipped flat, never rolled.' },
    ],
  },
  '/returns': {
    title: 'Returns & Cancellations',
    subtitle: 'Our Policy',
    content: [
      { heading: 'Returns', text: 'We accept returns within 7 days of delivery if the artwork is damaged during shipping or does not match the description. Please share photos via WhatsApp for a quick resolution.' },
      { heading: 'Cancellations', text: 'Orders can be cancelled within 24 hours of placement for a full refund. After 24 hours, cancellations may not be possible as the artwork may already be in transit.' },
      { heading: 'Refunds', text: 'Refunds are processed within 5-7 business days after we receive the returned artwork. The refund is issued to the original payment method.' },
      { heading: 'Note on Handmade Art', text: 'As each piece is handmade, minor variations in colour, texture, and dimensions are natural and are not grounds for return. These variations are what make each piece unique.' },
    ],
  },
  '/faq': {
    title: 'FAQs',
    subtitle: 'Common Questions',
    content: [
      { heading: 'Is the art original?', text: 'Yes. Every piece on Kalarang is an original, one-of-a-kind artwork — never a print or reproduction. Each artwork ships with a signed Certificate of Authenticity.' },
      { heading: 'What does "60% to Artisan" mean?', text: 'For every artisan work sold (Wing B), 60% of the sale price goes directly to the artisan who made it. This is significantly higher than the 10-15% that artisans typically receive through middlemen.' },
      { heading: 'Can I commission a custom piece?', text: 'Yes! Both the founder (Wing A) and our artisans (Wing B) accept commissions. WhatsApp us with your requirements — size, colour palette, art form, and budget.' },
      { heading: 'How do I care for the artwork?', text: 'Avoid direct sunlight and high humidity. Dust gently with a soft, dry cloth. Traditional art on cloth or paper should be framed behind glass for longevity.' },
      { heading: 'Do you offer framing?', text: 'We offer optional framing for select works. Contact us via WhatsApp for framing options and pricing.' },
      { heading: 'Can I visit the artisans?', text: 'We organise occasional artisan village visits. Follow us on Instagram or WhatsApp us for upcoming trips.' },
    ],
  },
  '/terms': {
    title: 'Terms of Use',
    subtitle: 'Legal',
    content: [
      { heading: 'Acceptance', text: 'By using the Kalarang website, you agree to these terms and conditions. If you do not agree, please do not use our services.' },
      { heading: 'Products', text: 'All artworks listed on Kalarang are original, handmade pieces. Colours may vary slightly from screen to screen. We make every effort to accurately represent each artwork through photography.' },
      { heading: 'Pricing', text: 'All prices are listed in Indian Rupees (₹) and include GST where applicable. Prices are subject to change without notice.' },
      { heading: 'Intellectual Property', text: 'All images, descriptions, and content on this website are the property of Kalarang or the respective artisans. Reproduction without permission is prohibited.' },
    ],
  },
  '/privacy': {
    title: 'Privacy Policy',
    subtitle: 'Your Data',
    content: [
      { heading: 'What We Collect', text: 'We collect your name, email, phone number, and shipping address when you place an order. We also collect browsing data through cookies to improve your experience.' },
      { heading: 'How We Use It', text: 'Your information is used solely to process orders, send shipping updates, and improve our services. We never sell your data to third parties.' },
      { heading: 'Data Security', text: 'All payment information is processed through secure, PCI-compliant payment gateways. We do not store your card details on our servers.' },
      { heading: 'Your Rights', text: 'You can request access to, correction of, or deletion of your personal data at any time by contacting us at hello@kalarang.art.' },
    ],
  },
  '/cookies': {
    title: 'Cookie Policy',
    subtitle: 'Cookies',
    content: [
      { heading: 'What Are Cookies', text: 'Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and improve your browsing experience.' },
      { heading: 'How We Use Them', text: 'We use essential cookies for site functionality (cart, login) and analytics cookies to understand how visitors use our site.' },
      { heading: 'Managing Cookies', text: 'You can disable cookies in your browser settings, but some site features may not work correctly without them.' },
    ],
  },
  '/ethics': {
    title: 'Artisan Code of Ethics',
    subtitle: 'Our Commitment',
    content: [
      { heading: 'Fair Compensation', text: '60% of every artisan sale goes directly to the artisan. We believe the maker should earn more than the middleman — always.' },
      { heading: 'No Exploitation', text: 'We never ask artisans to work for free, provide samples without payment, or accept prices below their stated rates.' },
      { heading: 'Credit & Attribution', text: 'Every artisan is named and credited. Their story, village, and art form are prominently displayed alongside their work.' },
      { heading: 'Community First', text: 'We visit every artisan personally, build long-term relationships, and support their families and communities beyond individual transactions.' },
    ],
  },
  '/journal': {
    title: 'Journal',
    subtitle: 'Stories & Insights',
    content: [
      { heading: 'The Art of Patachitra', text: 'A deep dive into Odisha\'s ancient Patachitra tradition — from Raghurajpur village to your wall. How natural pigments, mouse-hair brushes, and 12 generations of knowledge create art that has survived centuries.' },
      { heading: 'Why 60% Matters', text: 'Most artisans in India earn 10-15% of the retail price of their work. We built Kalarang to change that. Here\'s the math behind our 60% model and what it means for real families.' },
      { heading: 'A Visit to Madhubani', text: 'Sunita Devi\'s grandmother painted on mud walls. Sunita now sells to collectors worldwide. A photo essay from the villages where Madhubani art is born.' },
    ],
  },
  '/press': {
    title: 'Press',
    subtitle: 'In the Media',
    content: [
      { heading: 'Media Kit', text: 'For press enquiries, interviews, or high-resolution images, please contact us at press@kalarang.art. We\'re happy to share artisan stories, studio visit access, and founder interviews.' },
      { heading: 'Featured In', text: 'Kalarang has been featured in publications covering Indian art, design, and social enterprise. We\'re proud to bring artisan stories to a wider audience.' },
    ],
  },
  '/new': {
    title: 'New Arrivals',
    subtitle: 'Fresh Art',
    content: [
      { heading: 'Coming Soon', text: 'We\'re constantly adding new works from our artisans and the studio. Follow us on Instagram or sign up for our newsletter to be the first to see new arrivals.' },
    ],
  },
}

export default function InfoPage() {
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const page = pages[location.pathname] || { title: 'Page Not Found', subtitle: '', content: [{ heading: '', text: 'This page doesn\'t exist yet.' }] }

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '100px' : '104px', background: '#F5EFE0', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{ background: '#1C2B1D', padding: isMobile ? '40px 20px' : '48px 80px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '8px' }}>{page.subtitle}</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5EFE0', fontSize: isMobile ? '32px' : '48px', fontWeight: 600, margin: 0 }}>{page.title}</h1>
      </section>

      {/* Content */}
      <section style={{ padding: isMobile ? '32px 20px' : '56px 80px', maxWidth: '800px', margin: '0 auto' }}>
        {page.content.map((section, i) => (
          <div key={i} style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: i < page.content.length - 1 ? '1px solid rgba(201,168,76,0.12)' : 'none' }}>
            {section.heading && (
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '20px' : '24px', fontWeight: 600, marginBottom: '12px' }}>{section.heading}</h2>
            )}
            <p style={{ color: '#1A1A1A', fontSize: '14px', lineHeight: 1.8, margin: 0 }}>{section.text}</p>
            {section.cta && (
              <a href={section.cta.href} target={section.cta.href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer" style={{
                display: 'inline-block', marginTop: '16px', background: '#1C2B1D', color: '#C9A84C',
                padding: '12px 24px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                textDecoration: 'none', fontFamily: 'DM Sans, sans-serif',
              }}>
                {section.cta.label}
              </a>
            )}
          </div>
        ))}

        {/* Back link */}
        <Link to="/" style={{ color: '#C9A84C', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none', textTransform: 'uppercase' }}>← Back to Home</Link>
      </section>
    </div>
  )
}
