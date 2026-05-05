import { useTheme } from '../../hooks/useTheme'
import { useAuth } from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { Sun, Moon, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const { isDark, toggleTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-[#1A1A2E]/80 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🏯</span>
            <span className="text-xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#DB2777] bg-clip-text text-transparent">
              J-Hub
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/learn"
                  className="text-sm font-medium hover:text-[#8B5CF6] transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/learn/study"
                  className="text-sm font-medium hover:text-[#8B5CF6] transition-colors"
                >
                  Study
                </Link>
                <Link
                  to="/learn/dictionary"
                  className="text-sm font-medium hover:text-[#8B5CF6] transition-colors"
                >
                  Dictionary
                </Link>
              </>
            ) : (
              <>
                <a
                  href="#features"
                  className="text-sm font-medium hover:text-[#8B5CF6] transition-colors"
                >
                  Features
                </a>
                <a
                  href="#about"
                  className="text-sm font-medium hover:text-[#8B5CF6] transition-colors"
                >
                  About
                </a>
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/learn/profile" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#DB2777] flex items-center justify-center text-white text-xs font-bold">
                    {user?.displayName?.[0] || user?.username?.[0] || '?'}
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-[#8B5CF6] text-white hover:bg-[#7C3AED] transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1A1A2E] px-4 py-4 space-y-3 animate-fade-in-up">
          {isAuthenticated ? (
            <>
              <Link
                to="/learn"
                className="block py-2 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/learn/study"
                className="block py-2 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Study
              </Link>
              <Link
                to="/learn/dictionary"
                className="block py-2 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Dictionary
              </Link>
              <Link
                to="/learn/profile"
                className="block py-2 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 text-sm font-medium text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-2 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block py-2 text-sm font-medium text-[#8B5CF6]"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
