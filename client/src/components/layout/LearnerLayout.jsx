import { useState, useRef, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function LearnerLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef(null)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (path) => {
    if (path === '/learn') return location.pathname === '/learn'
    return location.pathname.startsWith(path)
  }

  const navClass = (path) => {
    const active = isActive(path)
    return `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${
      active
        ? 'bg-red-50 text-red-800 rounded-r-full font-bold'
        : 'text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800'
    }`
  }

  const topNavClass = (path) => {
    const active = isActive(path)
    return `font-bold transition-all ${
      active
        ? 'text-red-800 border-b-2 border-red-800'
        : 'text-zinc-600 hover:scale-105 hover:text-red-700'
    }`
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,700;0,800;1,700&family=Manrope:wght@400;500;700&family=Inter:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        .font-headline { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-body { font-family: 'Manrope', sans-serif; }
        .font-label { font-family: 'Inter', sans-serif; }

        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      <div className="bg-[#f9f9f9] text-[#1a1c1c] selection:bg-[#ffdad9] selection:text-[#400009] font-body min-h-screen flex flex-col">
        {/* TopAppBar */}
        <nav className="fixed top-0 w-full z-50 bg-[#f9f9f9]/80 backdrop-blur-md shadow-sm flex justify-between items-center px-6 py-3 font-headline tracking-tight">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-bold italic text-red-800">Minori</span>
            <div className="hidden md:flex items-center gap-6">
              <Link className={topNavClass('/learn')} to="/learn">
                Bảng điều khiển
              </Link>
              <Link className={topNavClass('/learn/study')} to="/learn/study">
                Bộ thẻ học
              </Link>
              <Link className={topNavClass('/learn/dictionary')} to="/learn/dictionary">
                Từ điển
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                search
              </span>
              <input
                className="bg-[#f3f3f3] text-[#1a1c1c] border-none rounded-full py-2 pl-10 pr-4 w-64 focus:ring-1 focus:ring-[#8f0020] placeholder:text-[#906f6f]/50"
                placeholder="Tìm kiếm từ điển..."
                type="text"
              />
            </div>
            <Link
              to="/creator"
              className="bg-gradient-to-br from-[#8f0020] to-[#bc002d] text-[#ffffff] px-6 py-2 rounded-xl font-bold hover:scale-105 transition-all duration-150 shadow-sm border border-[#e4bdbc]/30"
            >
              Tạo mới
            </Link>
            <div className="flex items-center gap-2 relative" ref={menuRef}>
              <button className="p-2 text-zinc-500 hover:text-[#8f0020] transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 text-zinc-500 hover:text-[#8f0020] transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined">settings</span>
              </button>
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="focus:outline-none">
                <img
                  alt="Learner Profile"
                  className="w-10 h-10 rounded-full border-2 border-[#e8e8e8] object-cover hover:border-[#8f0020] transition-all"
                  src={
                    user?.picture ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBmteWi6_38xqIdR2pWJ5bXLxhHElP3i2RCRsEbGqfBMBHN5SOT5VOq7S2AlwFNW5z7a5RPAuH9x49j_AZ2fSJIDm_nIv2Mu1_0FHMcnjbHEmKcs-9_eeJnNpNC-4vJ7IOfrYGi0xo8IkNIxuR8yVRlfSeeWRmQwySQ2c2PYJvZ2BwLe3u-spTTfRwo3ziZR81pnjhl2DdaLP1f7sSPv5MDnydApEthJCXLJZymyKU1lARIyrylxiBQ9xBAQTAbgb0G4_ba0vPWYEs'
                  }
                />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 top-14 w-64 bg-[#ffffff] rounded-2xl shadow-[0_12px_40px_rgba(26,28,28,0.12)] border border-[#eeeeee] py-3 z-50 animate-in fade-in zoom-in duration-200">
                  <div className="px-5 py-3 border-b border-[#eeeeee] mb-2">
                    <p className="font-headline font-bold text-[#1a1c1c] truncate">
                      {user?.displayName || user?.username}
                    </p>
                    <p className="text-xs text-[#635d5a] truncate">
                      {user?.email || 'Học viên Minori'}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <Link
                      to="/learn/profile"
                      className="px-5 py-2.5 flex items-center gap-3 text-sm font-medium text-[#5c403f] hover:bg-[#f3f3f3] transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span className="material-symbols-outlined text-lg">account_circle</span>
                      Hồ sơ cá nhân
                    </Link>
                    <Link
                      to="/learn/settings"
                      className="px-5 py-2.5 flex items-center gap-3 text-sm font-medium text-[#5c403f] hover:bg-[#f3f3f3] transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span className="material-symbols-outlined text-lg">settings</span>
                      Cài đặt tài khoản
                    </Link>
                    <div className="h-[1px] bg-[#eeeeee] my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="px-5 py-2.5 flex items-center gap-3 text-sm font-bold text-[#8f0020] hover:bg-red-50 transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-lg">logout</span>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* SideNavBar */}
        <aside className="w-64 fixed left-0 top-0 bg-zinc-50 flex-col h-full py-6 hidden lg:flex pt-20 border-r border-zinc-100 z-40">
          <div className="px-6 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8f0020] rounded-lg flex items-center justify-center text-white font-black text-lg">
              {user?.displayName?.[0] || user?.username?.[0] || 'M'}
            </div>
            <div>
              <p
                className="text-xl font-black text-red-800 leading-none truncate w-36"
                title={user?.displayName || user?.username || 'Minori'}
              >
                {user?.displayName || user?.username || 'Minori'}
              </p>
              <p className="text-xs text-zinc-500 font-medium">Modern Dojo</p>
            </div>
          </div>

          <nav className="flex-1 font-body font-medium flex flex-col gap-1">
            <Link className={navClass('/learn')} to="/learn">
              <span
                className="material-symbols-outlined"
                style={isActive('/learn') ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                dashboard
              </span>
              Bảng điều khiển
            </Link>
            <Link className={navClass('/learn/study')} to="/learn/study">
              <span
                className="material-symbols-outlined"
                style={isActive('/learn/study') ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                style
              </span>
              Bộ thẻ học
            </Link>
            <Link className={navClass('/learn/dictionary')} to="/learn/dictionary">
              <span
                className="material-symbols-outlined"
                style={isActive('/learn/dictionary') ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                translate
              </span>
              Từ điển
            </Link>
            <Link className={navClass('/learn/leaderboard')} to="/learn/leaderboard">
              <span
                className="material-symbols-outlined"
                style={isActive('/learn/leaderboard') ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                leaderboard
              </span>
              Bảng xếp hạng
            </Link>

            <div className="mt-12 px-6">
              <Link
                to="/learn/study"
                className="w-full bg-[#e2e2e2] text-[#1a1c1c] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                <span className="material-symbols-outlined">bolt</span>
                Ôn tập nhanh
              </Link>
            </div>
          </nav>

          <div className="px-6 flex flex-col gap-1">
            <a
              className="flex items-center gap-3 text-zinc-500 py-2 hover:text-zinc-800 transition-colors font-medium text-sm"
              href="#"
            >
              <span className="material-symbols-outlined">help</span>Trợ giúp
            </a>
            <a
              className="flex items-center gap-3 text-zinc-500 py-2 hover:text-zinc-800 transition-colors font-medium text-sm"
              href="#"
            >
              <span className="material-symbols-outlined">shield</span>Bảo mật
            </a>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="lg:ml-64 pt-24 px-6 md:px-10 pb-12 flex-1">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="lg:ml-64 bg-zinc-100 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center p-8 mt-auto font-body text-sm">
          <p className="text-zinc-500">© 2024 Minori Immersion Hub. Crafted with Zen.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a className="text-zinc-500 hover:text-[#8f0020] transition-colors" href="#">
              Điều khoản
            </a>
            <a className="text-zinc-500 hover:text-[#8f0020] transition-colors" href="#">
              Chính sách bảo mật
            </a>
            <a className="text-zinc-500 hover:text-[#8f0020] transition-colors" href="#">
              Liên hệ hỗ trợ
            </a>
          </div>
        </footer>

        {/* Bottom Nav for Mobile */}
        <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-[#f9f9f9]/90 backdrop-blur-xl border-t border-zinc-200 flex justify-around py-2 z-50 pb-safe">
          <Link
            className={`flex flex-col items-center ${isActive('/learn') ? 'text-[#8f0020]' : 'text-zinc-400'}`}
            to="/learn"
          >
            <span
              className="material-symbols-outlined"
              style={isActive('/learn') ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              dashboard
            </span>
            <span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Dashboard</span>
          </Link>
          <Link
            className={`flex flex-col items-center ${isActive('/learn/study') ? 'text-[#8f0020]' : 'text-zinc-400'}`}
            to="/learn/study"
          >
            <span
              className="material-symbols-outlined"
              style={isActive('/learn/study') ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              style
            </span>
            <span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Thẻ học</span>
          </Link>
          <Link
            className={`flex flex-col items-center ${isActive('/learn/dictionary') ? 'text-[#8f0020]' : 'text-zinc-400'}`}
            to="/learn/dictionary"
          >
            <span
              className="material-symbols-outlined"
              style={isActive('/learn/dictionary') ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              translate
            </span>
            <span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Từ điển</span>
          </Link>
          <Link
            className={`flex flex-col items-center ${isActive('/learn/leaderboard') ? 'text-[#8f0020]' : 'text-zinc-400'}`}
            to="/learn/leaderboard"
          >
            <span
              className="material-symbols-outlined"
              style={isActive('/learn/leaderboard') ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              leaderboard
            </span>
            <span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Xếp hạng</span>
          </Link>
        </nav>
      </div>
    </>
  )
}
