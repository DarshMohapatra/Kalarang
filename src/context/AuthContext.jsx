import { createContext, useState, useContext, useEffect } from 'react'
import { supabase } from '../supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(mapUser(session.user))
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(mapUser(session.user))
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const mapUser = (supaUser) => ({
    id: supaUser.id,
    name: supaUser.user_metadata?.name || supaUser.email?.split('@')[0] || 'User',
    email: supaUser.email,
    createdAt: supaUser.created_at,
  })

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { success: false, error: error.message }
    setUser(mapUser(data.user))
    return { success: true }
  }

  const signup = async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    if (error) return { success: false, error: error.message }
    if (data.user) setUser(mapUser(data.user))
    return { success: true }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const resetPassword = async (email, newPassword) => {
    const { data, error } = await supabase.rpc('reset_user_password', {
      user_email: email,
      new_password: newPassword,
    })
    if (error) return { success: false, error: error.message }
    if (data && !data.success) return { success: false, error: data.error }
    return { success: true }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, resetPassword, isLoggedIn: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
