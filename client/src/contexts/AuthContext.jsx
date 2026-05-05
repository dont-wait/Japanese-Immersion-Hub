import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import authService from '../services/authService'
import axiosClient from '../services/axiosClient'
import { API_ENDPOINTS, GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from '../config/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Kiểm tra trạng thái đăng nhập khi mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const storedUser = localStorage.getItem('user')
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
      }
    }
    setLoading(false)
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } catch (err) {
      console.error('Server logout error:', err)
    } finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      setUser(null)
    }
  }, [])

  const fetchCurrentUser = useCallback(async () => {
    try {
      const { data } = await axiosClient.get(API_ENDPOINTS.USER.PROFILE)
      if (data.result) {
        const userInfo = {
          ...data.result,
          displayName: data.result.username, // Fallback
          role: data.result.roleName,
        }
        setUser(userInfo)
        localStorage.setItem('user', JSON.stringify(userInfo))
        return userInfo
      }
    } catch (err) {
      console.error('Fetch user error:', err)
      logout()
    }
  }, [logout])

  const login = useCallback(
    async (credentials) => {
      const { data } = await authService.login(credentials)
      const token = data.result?.token
      if (token) {
        localStorage.setItem('accessToken', token)
        // After login, fetch the full user profile
        try {
          const payload = JSON.parse(atob(token.split('.')[1]))
          const initialUser = {
            username: payload.sub,
            role: payload.scope || 'LEARNER',
          }
          setUser(initialUser)
          localStorage.setItem('user', JSON.stringify(initialUser))

          // Try to get full info from /users/@me
          await fetchCurrentUser()
        } catch (err) {
          console.error('Initial user setup error:', err)
        }
      }
      return data
    },
    [fetchCurrentUser]
  )

  const register = useCallback(async (userData) => {
    const { data } = await authService.register(userData)
    return data
  }, [])

  const loginAsGuest = useCallback(() => {
    const guestUser = {
      id: 'guest',
      username: 'guest_warrior',
      displayName: 'Khách Tham Quan',
      role: 'LEARNER',
      totalXp: 0,
      isGuest: true,
    }
    localStorage.setItem('accessToken', 'guest-token')
    localStorage.setItem('user', JSON.stringify(guestUser))
    setUser(guestUser)
  }, [])

  // Đăng nhập bằng Google OAuth2: gửi authorization code lên backend
  const loginWithGoogle = useCallback(async (code) => {
    const { data } = await authService.googleLogin(code)
    const token = data.result?.token || data.token
    if (token) {
      localStorage.setItem('accessToken', token)
      // Decode JWT payload to extract user info
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const googleUser = {
          username: payload.sub,
          role: payload.scope || 'LEARNER',
        }
        localStorage.setItem('user', JSON.stringify(googleUser))
        setUser(googleUser)

        // Fetch full profile info
        await fetchCurrentUser()
      } catch (err) {
        console.error('Google login post-process error:', err)
      }
    }
    return data
  }, [])

  // Tạo URL redirect đến Google OAuth2 consent screen
  const getGoogleAuthUrl = useCallback(() => {
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    })
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  }, [])

  const updateUser = useCallback((updatedData) => {
    setUser((prev) => {
      const newUser = { ...prev, ...updatedData }
      localStorage.setItem('user', JSON.stringify(newUser))
      return newUser
    })
  }, [])

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isCreator: user?.role === 'CREATOR' || user?.role === 'ADMIN',
    login,
    register,
    loginAsGuest,
    loginWithGoogle,
    getGoogleAuthUrl,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
