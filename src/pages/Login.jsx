import { useState, useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [isMobile, setIsMobile] = useState(false)
  const [tab, setTab] = useState('login')
  const [showForgot, setShowForgot] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [resetNewPassword, setResetNewPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login, signup, resetPassword, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isLoggedIn) navigate(redirectTo)
  }, [isLoggedIn, navigate, redirectTo])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)

    try {
      if (tab === 'login') {
        if (!email || !password) { setError('Please fill in all fields'); setSubmitting(false); return }
        const result = await login(email, password)
        if (result.success) {
          setSuccess('Welcome back!')
          setTimeout(() => navigate(redirectTo), 500)
        } else {
          setError(result.error)
        }
      } else {
        if (!name || !email || !password) { setError('Please fill in all fields'); setSubmitting(false); return }
        if (password.length < 6) { setError('Password must be at least 6 characters'); setSubmitting(false); return }
        const result = await signup(name, email, password)
        if (result.success) {
          setSuccess('Account created! Welcome to Kalarang.')
          setTimeout(() => navigate(redirectTo), 500)
        } else {
          setError(result.error)
        }
      }
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  const handleReset = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!resetEmail) { setError('Please enter your email'); return }
    if (!resetNewPassword) { setError('Please enter a new password'); return }
    if (resetNewPassword.length < 6) { setError('New password must be at least 6 characters'); return }
    setSubmitting(true)
    try {
      const result = await resetPassword(resetEmail, resetNewPassword)
      if (result.success) {
        setSuccess('Password changed! You can now login with your new password.')
        setResetEmail('')
        setResetNewPassword('')
        setTimeout(() => { setShowForgot(false); setSuccess('') }, 2000)
      } else {
        setError(result.error)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px', border: '1px solid rgba(201,168,76,0.3)',
    background: 'transparent', color: '#1C2B1D', fontSize: '14px',
    fontFamily: 'DM Sans, sans-serif', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div style={{ overflowX: 'hidden', paddingTop: isMobile ? '0' : '104px', background: '#F5EFE0', minHeight: '100vh' }}>
      <div style={{ maxWidth: '440px', margin: '0 auto', padding: isMobile ? '48px 20px' : '64px 20px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A84C', fontSize: '24px', fontWeight: 600, letterSpacing: '0.2em', margin: '0 0 4px' }}>KALARANG</p>
          </Link>
          <p style={{ color: '#6B7280', fontSize: '13px' }}>
            {showForgot ? 'Reset your password' : tab === 'login' ? 'Welcome back' : 'Join the Kalarang community'}
          </p>
        </div>

        {/* Forgot Password Form */}
        {showForgot ? (
          <>
            <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#1C2B1D', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'DM Sans, sans-serif' }}>Email</label>
                <input type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} placeholder="your@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#1C2B1D', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'DM Sans, sans-serif' }}>New Password</label>
                <input type="password" value={resetNewPassword} onChange={e => setResetNewPassword(e.target.value)} placeholder="Min 6 characters" style={inputStyle} />
              </div>
              {error && <p style={{ color: '#6B1F2A', fontSize: '13px', margin: 0, padding: '8px 12px', background: 'rgba(107,31,42,0.08)', border: '1px solid rgba(107,31,42,0.2)' }}>{error}</p>}
              {success && <p style={{ color: '#1C2B1D', fontSize: '13px', margin: 0, padding: '8px 12px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}>{success}</p>}

              <button type="submit" disabled={submitting} style={{
                width: '100%', padding: '16px', background: submitting ? '#2d4a2e' : '#1C2B1D', color: '#C9A84C',
                border: 'none', fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase',
                cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, marginTop: '8px',
                opacity: submitting ? 0.7 : 1,
              }}>
                {submitting ? 'Please wait...' : 'Reset Password'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px' }}>
              <button onClick={() => { setShowForgot(false); setError(''); setSuccess('') }} style={{ background: 'none', border: 'none', color: '#C9A84C', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'DM Sans, sans-serif' }}>
                ← Back to Login
              </button>
            </p>
          </>
        ) : (
          <>
            {/* Tab Toggle */}
            <div style={{ display: 'flex', marginBottom: '32px', border: '1px solid rgba(201,168,76,0.3)' }}>
              {['login', 'signup'].map(t => (
                <button key={t} onClick={() => { setTab(t); setError(''); setSuccess('') }} style={{
                  flex: 1, padding: '12px', background: tab === t ? '#1C2B1D' : 'transparent',
                  color: tab === t ? '#C9A84C' : '#6B7280', border: 'none', fontSize: '12px',
                  letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 600,
                }}>
                  {t === 'login' ? 'Login' : 'Sign Up'}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {tab === 'signup' && (
                <div>
                  <label style={{ display: 'block', color: '#1C2B1D', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'DM Sans, sans-serif' }}>Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={inputStyle} />
                </div>
              )}
              <div>
                <label style={{ display: 'block', color: '#1C2B1D', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'DM Sans, sans-serif' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#1C2B1D', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'DM Sans, sans-serif' }}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={tab === 'signup' ? 'Min 6 characters' : '••••••••'} style={inputStyle} />
              </div>

              {error && <p style={{ color: '#6B1F2A', fontSize: '13px', margin: 0, padding: '8px 12px', background: 'rgba(107,31,42,0.08)', border: '1px solid rgba(107,31,42,0.2)' }}>{error}</p>}
              {success && <p style={{ color: '#1C2B1D', fontSize: '13px', margin: 0, padding: '8px 12px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}>{success}</p>}

              <button type="submit" disabled={submitting} style={{
                width: '100%', padding: '16px', background: submitting ? '#2d4a2e' : '#1C2B1D', color: '#C9A84C',
                border: 'none', fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase',
                cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, marginTop: '8px',
                opacity: submitting ? 0.7 : 1,
              }}>
                {submitting ? 'Please wait...' : tab === 'login' ? 'Login' : 'Create Account'}
              </button>
            </form>

            {/* Forgot Password Link — only on login tab */}
            {tab === 'login' && (
              <p style={{ textAlign: 'center', marginTop: '16px' }}>
                <button onClick={() => { setShowForgot(true); setError(''); setSuccess('') }} style={{ background: 'none', border: 'none', color: '#C9A84C', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'DM Sans, sans-serif' }}>
                  Forgot Password?
                </button>
              </p>
            )}
          </>
        )}

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '32px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.2)' }} />
          <span style={{ color: '#6B7280', fontSize: '11px' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.2)' }} />
        </div>

        {/* Continue as guest */}
        <Link to="/" style={{
          display: 'block', textAlign: 'center', padding: '14px',
          border: '1px solid rgba(201,168,76,0.3)', color: '#1C2B1D',
          textDecoration: 'none', fontSize: '12px', letterSpacing: '0.2em',
          textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif',
        }}>
          Continue as Guest
        </Link>

      </div>
    </div>
  )
}
