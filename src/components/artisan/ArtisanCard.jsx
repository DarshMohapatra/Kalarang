import { Link } from 'react-router-dom'

export default function ArtisanCard({ artisan, isMobile }) {
  return (
    <Link to={`/artisan/${artisan.id}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: '#fff',
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          border: '1px solid rgba(201,168,76,0.12)',
        }}
        onMouseEnter={e => { if (!isMobile) { e.currentTarget.style.boxShadow = '0 8px 28px rgba(28,43,29,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)' } }}
        onMouseLeave={e => { if (!isMobile) { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' } }}
      >
        {/* Portrait */}
        <div style={{ position: 'relative', background: '#1C2B1D', padding: isMobile ? '24px 16px' : '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={artisan.image}
            alt={artisan.name}
            style={{
              width: isMobile ? '72px' : '88px',
              height: isMobile ? '72px' : '88px',
              borderRadius: '50%',
              border: '3px solid #C9A84C',
              objectFit: 'cover',
            }}
          />
          <span style={{
            position: 'absolute', bottom: '12px', right: '12px',
            background: '#C9A84C', color: '#1C2B1D',
            fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em',
            textTransform: 'uppercase', padding: '3px 8px',
            fontFamily: 'DM Sans, sans-serif',
          }}>
            {artisan.artForm}
          </span>
        </div>

        {/* Info */}
        <div style={{ padding: isMobile ? '14px 12px' : '18px 20px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1C2B1D', fontSize: isMobile ? '17px' : '20px', fontWeight: 600, margin: '0 0 2px', lineHeight: 1.25 }}>
            {artisan.name}
          </h3>
          {artisan.nameDevanagari && (
            <p style={{ color: 'rgba(28,43,29,0.4)', fontSize: '12px', margin: '0 0 8px' }}>{artisan.nameDevanagari}</p>
          )}
          <p style={{ color: '#6B7280', fontSize: '12px', margin: '0 0 10px', lineHeight: 1.5 }}>
            {artisan.village}, {artisan.state}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <span style={{ background: '#1C2B1D', color: '#C9A84C', fontSize: '9px', letterSpacing: '0.1em', padding: '3px 8px', fontFamily: 'DM Sans, sans-serif' }}>
              60% → Artisan
            </span>
          </div>
          <p style={{ color: '#C9A84C', fontSize: '11px', marginTop: '12px', letterSpacing: '0.1em', fontFamily: 'DM Sans, sans-serif' }}>
            View Profile →
          </p>
        </div>
      </div>
    </Link>
  )
}
