import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import './Login.css'

export default function OAuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { loginWithGoogle } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [called, setCalled] = useState(false)

  useEffect(() => {
    const code = searchParams.get('code')
    const errorParam = searchParams.get('error')

    if (errorParam) {
      setError('Đăng nhập Google bị từ chối hoặc đã xảy ra lỗi.')
      setLoading(false)
      return
    }

    if (!code) {
      setError('Không tìm thấy mã xác thực từ Google.')
      setLoading(false)
      return
    }

    if (called) return

    // Gửi authorization code lên backend để đổi lấy JWT token
    const exchangeCode = async () => {
      setCalled(true)
      if (import.meta.env.DEV) window._hasExchanged = true

      try {
        await loginWithGoogle(code)
        navigate('/learn', { replace: true })
      } catch (err) {
        console.error('Google OAuth error:', err)
        setError(
          err?.response?.data?.message || 'Đăng nhập bằng Google thất bại. Vui lòng thử lại.'
        )
      } finally {
        setLoading(false)
      }
    }

    exchangeCode()
  }, [searchParams, loginWithGoogle, navigate, called])

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] font-body min-h-screen flex flex-col items-center justify-center japanese-pattern">
      <div className="relative w-full max-w-[420px] px-6">
        <div className="bg-[#ffffff] rounded-xl shadow-[0_12px_32px_rgba(26,28,28,0.06)] overflow-hidden ring-1 ring-black/5 p-8 md:p-12 text-center">
          {/* Brand */}
          <h1 className="text-3xl font-headline font-bold italic text-[#8f0020] tracking-tight mb-6">
            Minori
          </h1>

          {loading && !error ? (
            <div className="space-y-6">
              {/* Spinner */}
              <div className="flex justify-center">
                <div className="w-12 h-12 border-4 border-[#e4bdbc] border-t-[#8f0020] rounded-full animate-spin"></div>
              </div>
              <p className="text-[#5c403f] font-medium text-sm">Đang xác thực với Google...</p>
              <p className="text-[#906f6f] text-xs">Vui lòng đợi trong giây lát</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Error icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[#ffdad6] flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-[#93000a]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#ffdad6] text-[#93000a] text-sm font-bold border border-[#ffb3b3]">
                ⚠ {error}
              </div>
              <button
                onClick={() => navigate('/login', { replace: true })}
                className="w-full bg-gradient-to-br from-[#8f0020] to-[#bc002d] text-[#ffffff] font-headline font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 tracking-wide"
              >
                Quay lại đăng nhập
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
