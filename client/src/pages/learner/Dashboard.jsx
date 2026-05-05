import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import srsService from '../../services/srsService'
import gameService from '../../services/gameService'
import './Dashboard.css'
export default function Dashboard() {
  const { user } = useAuth()
  const [dueCount, setDueCount] = useState(0)
  const [dailyGoal, setDailyGoal] = useState({ target: 50, current: 0 })
  const [streak, setStreak] = useState({ days: 0, isActive: false })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (user?.isGuest) {
        setDueCount(124)
        setDailyGoal({ target: 500, current: 450 })
        setStreak({ days: 14, isActive: true })
        setLoading(false)
        return
      }
      try {
        const [dueRes, goalRes, streakRes] = await Promise.all([
          srsService.getDueReviews({ limit: 1 }),
          gameService.getDailyGoal(),
          gameService.getStreak(),
        ])
        setDueCount(dueRes.data?.total || 0)
        setDailyGoal(goalRes.data || { target: 50, current: 0 })
        setStreak(streakRes.data || { days: 0, isActive: false })
      } catch {
        // Use defaults on API failure
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user?.isGuest])

  // Calculate stroke dashoffset for the enso circle based on progress (0 to 283)
  const progressRatio = Math.min((dailyGoal.current || 0) / (dailyGoal.target || 50), 1)
  const strokeDashoffset = 283 - 283 * progressRatio

  return (
    <div className="max-w-7xl mx-auto w-full animate-fade-in-up">
      {/* Header Section */}
      <header className="mb-12 relative">
        <h1 className="text-5xl font-extrabold font-headline tracking-tighter text-[#1a1c1c] mb-2">
          Chào mừng quay trở lại, {user?.displayName || user?.username || 'Kaito'}.
        </h1>
        <p className="text-zinc-500 font-medium max-w-md">
          Phiên đắm mình của bạn đã sẵn sàng.{' '}
          {loading ? 'Đang kiểm tra thẻ...' : `Bạn có ${dueCount} thẻ cần ôn tập hôm nay.`}
        </p>
        <div className="absolute -right-4 -top-8 opacity-10 pointer-events-none select-none hidden md:block">
          <span className="text-[12rem] font-bold font-headline leading-none text-[#8f0020]">
            学び
          </span>
        </div>
      </header>

      {/* Password Alert Banner */}
      {!user?.hasPassword && !user?.isGuest && (
        <div className="mb-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between group animate-fade-in-up">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
              <span className="material-symbols-outlined">key</span>
            </div>
            <div>
              <h4 className="font-bold text-amber-900 text-sm">Bảo mật tài khoản của bạn</h4>
              <p className="text-amber-800/60 text-xs font-medium">
                Bạn hiện đang đăng nhập qua Google. Hãy thiết lập mật khẩu để đăng nhập trực tiếp
                thuận tiện hơn.
              </p>
            </div>
          </div>
          <Link
            to="/learn/profile"
            className="bg-white text-amber-600 px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition-all border border-amber-100"
          >
            Thiết lập ngay
          </Link>
        </div>
      )}

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* 1. Daily Streak/XP Widget (Enso Circle) */}
        <div className="md:col-span-4 bg-[#ffffff] rounded-xl p-8 shadow-[0_12px_32px_rgba(26,28,28,0.04)] flex flex-col items-center justify-center relative overflow-hidden group border border-[#e4bdbc]/10">
          <div className="absolute top-0 right-0 p-4">
            <span className="material-symbols-outlined text-[#8f0020]/20 text-4xl group-hover:scale-110 transition-transform">
              local_fire_department
            </span>
          </div>

          <svg className="w-48 h-48 mb-4">
            <circle
              cx="96"
              cy="96"
              fill="transparent"
              r="90"
              stroke="#f3f3f3"
              strokeWidth="12"
            ></circle>
            <circle
              className="enso-progress"
              cx="96"
              cy="96"
              fill="transparent"
              r="90"
              stroke="url(#ensoGradient)"
              strokeLinecap="round"
              strokeWidth="12"
              style={{ strokeDashoffset }}
            ></circle>
            <defs>
              <linearGradient id="ensoGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#8f0020', stopOpacity: 1 }}></stop>
                <stop offset="100%" style={{ stopColor: '#bc002d', stopOpacity: 1 }}></stop>
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-extrabold text-[#1a1c1c] font-headline">
              {streak.days || 0}
            </span>
            <span className="text-xs font-bold font-label uppercase tracking-widest text-zinc-400">
              NGÀY LIÊN TIẾP
            </span>
          </div>

          <div className="text-center font-body mt-2">
            <h3 className="text-lg font-bold mb-1 text-[#1a1c1c]">
              {progressRatio >= 1 ? 'Đã đạt mục tiêu XP 🏆' : 'Tiến độ hôm nay'}
            </h3>
            <p className="text-sm text-zinc-500">
              {dailyGoal.current || 0} / {dailyGoal.target || 50} XP
            </p>
          </div>
        </div>

        {/* 2. Word of the Day (Editorial Asymmetry) */}
        <div className="md:col-span-8 bg-[#f3f3f3] rounded-xl overflow-hidden flex flex-col md:flex-row shadow-[0_12px_32px_rgba(26,28,28,0.02)]">
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
            <div className="mb-4">
              <span className="bg-[#b0ecff] text-[#001f27] px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest font-label">
                TỪ VỰNG TRONG NGÀY
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black font-headline text-[#8f0020] mb-2 tracking-tighter leading-none">
              憧れ
            </h2>
            <p className="text-sm text-zinc-500 mb-6 italic leading-relaxed font-body">
              akogare (n) - sự khao khát, mong mỏi hoặc ngưỡng mộ sâu sắc
            </p>
            <div className="space-y-4">
              <p className="text-[#1a1c1c] font-medium border-l-4 border-[#8f0020] pl-4 font-body text-sm md:text-base">
                "僕にとって、あの景色は憧れだった。"
              </p>
              <p className="text-[10px] sm:text-xs text-zinc-400 pl-4 uppercase tracking-tighter font-label">
                Source: Your Lie in April
              </p>
            </div>
          </div>
          <div
            className="w-full md:w-1/2 h-48 md:h-auto bg-cover bg-center"
            title="Soft aesthetic anime-inspired landscape with cherry blossoms and a distant mountain at twilight in pastel colors"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuByIfosYaiI-Mq7fcRzb7W8mXiPN3SEDa-UcTP_OanigDXd5qxJJFd8-2uAGcgBWaKJUelbSXPtQmBUqgu2ksJ3NR_B2c0-g58FN_5Q7YEA5iDSHJ-XF1F8ySjJn_otO6r4wolp7E2Sp-q1S4fRcKGZNc9uMjE37EflC9YhixYoLaAmiZ5x3rXedRi3N_Kv0DgVXFE9msMhFANh16IgHwpVCR-4d3bd-Ddfor9T-P4gZrt_oc96NO2srx6KQ2GAsag1LUsZM9Y5x08')",
            }}
          ></div>
        </div>

        {/* 3. Ready to Review */}
        <div className="md:col-span-12 lg:col-span-7 font-body">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-extrabold tracking-tight font-headline text-[#1a1c1c]">
              Sẵn sàng ôn tập
            </h2>
            <Link className="text-sm font-bold text-[#8f0020] hover:underline" to="/learn/study">
              Xem tất cả bộ thẻ
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/learn/study"
              className="bg-[#ffffff] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer border border-[#e4bdbc]/10"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400 group-hover:bg-[#8f0020]/10 group-hover:text-[#8f0020] transition-colors">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <span className="text-2xl font-black text-[#8f0020]">
                  {Math.floor(dueCount * 0.7) || 0}
                </span>
              </div>
              <h3 className="font-bold font-headline text-lg text-[#1a1c1c] leading-tight mb-1 group-hover:text-[#8f0020] transition-colors">
                Genki I: Từ vựng cốt lõi
              </h3>
              <p className="text-sm text-zinc-500">Ôn tập Chương 1-12</p>
            </Link>

            <Link
              to="/learn/study"
              className="bg-[#ffffff] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer border border-[#e4bdbc]/10"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400 group-hover:bg-[#004c5c]/10 group-hover:text-[#004c5c] transition-colors">
                  <span className="material-symbols-outlined">movie_edit</span>
                </div>
                <span className="text-2xl font-black text-[#004c5c]">
                  {Math.ceil(dueCount * 0.3) || 0}
                </span>
              </div>
              <h3 className="font-bold font-headline text-lg text-[#1a1c1c] leading-tight mb-1 group-hover:text-[#004c5c] transition-colors">
                Cụm từ Anime
              </h3>
              <p className="text-sm text-zinc-500">Bộ sưu tập Đời thường</p>
            </Link>
          </div>
        </div>

        {/* 4. Recent Progress Chart (Simplified Visual Representation) */}
        <div className="md:col-span-12 lg:col-span-5 bg-[#f3f3f3] rounded-xl p-8 font-body border border-zinc-100">
          <h2 className="text-xl font-extrabold font-headline tracking-tight mb-6 text-[#1a1c1c]">
            Tỷ lệ ghi nhớ
          </h2>
          <div className="h-48 flex items-end justify-between gap-1 sm:gap-2 px-1 sm:px-2">
            <div
              className="w-full bg-zinc-200 rounded-t-lg h-[60%] hover:bg-[#ffdad9] transition-colors cursor-pointer"
              title="Thứ 2: 60%"
            ></div>
            <div
              className="w-full bg-zinc-200 rounded-t-lg h-[45%] hover:bg-[#ffdad9] transition-colors cursor-pointer"
              title="Thứ 3: 45%"
            ></div>
            <div
              className="w-full bg-zinc-200 rounded-t-lg h-[75%] hover:bg-[#ffdad9] transition-colors cursor-pointer"
              title="Thứ 4: 75%"
            ></div>
            <div
              className="w-full bg-zinc-200 rounded-t-lg h-[85%] hover:bg-[#ffdad9] transition-colors cursor-pointer"
              title="Thứ 5: 85%"
            ></div>
            <div
              className="w-full bg-[#8f0020] rounded-t-lg h-[92%] cursor-pointer shadow-sm shadow-[#8f0020]/20"
              title="Thứ 6 (Hôm nay): 92%"
            ></div>
            <div
              className="w-full bg-zinc-200 rounded-t-lg h-[70%] hover:bg-[#ffdad9] transition-colors cursor-pointer"
              title="Thứ 7: 70%"
            ></div>
            <div
              className="w-full bg-zinc-200 rounded-t-lg h-[80%] hover:bg-[#ffdad9] transition-colors cursor-pointer"
              title="Chủ Nhật: 80%"
            ></div>
          </div>
          <div className="flex justify-between mt-4 px-1 sm:px-2">
            <span className="text-[10px] font-bold text-zinc-400 font-label uppercase tracking-widest w-full text-center">
              T2
            </span>
            <span className="text-[10px] font-bold text-zinc-400 font-label uppercase tracking-widest w-full text-center">
              T3
            </span>
            <span className="text-[10px] font-bold text-zinc-400 font-label uppercase tracking-widest w-full text-center">
              T4
            </span>
            <span className="text-[10px] font-bold text-zinc-400 font-label uppercase tracking-widest w-full text-center">
              T5
            </span>
            <span className="text-[10px] font-bold text-[#8f0020] font-label uppercase tracking-widest w-full text-center">
              T6
            </span>
            <span className="text-[10px] font-bold text-zinc-400 font-label uppercase tracking-widest w-full text-center">
              T7
            </span>
            <span className="text-[10px] font-bold text-zinc-400 font-label uppercase tracking-widest w-full text-center">
              CN
            </span>
          </div>
        </div>

        {/* 5. Recommended for You Section */}
        <div className="md:col-span-12 mt-4 font-body">
          <h2 className="text-2xl font-extrabold font-headline tracking-tight mb-8 text-[#1a1c1c]">
            Khám phá Cộng đồng
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Recommendation Card 1 */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl aspect-video mb-4 shadow-sm bg-zinc-100">
                <img
                  alt="Japanese street"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaSOhvyrpWZ9CNCIfvGV4otUWiuGjFI4ZqqczofzyfHLLTWvR9-1gK4TofNRNjpRUsJJ4GrefEXUOgLjtGqNqWQAFhvc2JfcAHmHuoSSoIaBaelF5zaI7BRz21zcESJQVZv_KO1BGFVlF1l2bDSz9t5KLrK_eSXgRGU_PpsV_uX9AOTjo2sruy8f209lim0g3mZCMkX-5Do2whpdxvp1-lXvnhj4OGRNGHn3CM3oFkjQD1uYUaGdPBZiIyppXcL8TrXd43z-dYiqI"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-zinc-950/80 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm font-label">
                    NEW DECK
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-lg font-headline text-[#1a1c1c] group-hover:text-[#8f0020] transition-colors leading-tight">
                JLPT N5 Ngữ pháp
              </h3>
              <p className="text-sm text-zinc-500 mb-3">Tổng hợp mới nhất chuẩn bản xứ</p>
              <div className="flex items-center gap-2">
                <img
                  alt="Creator"
                  className="w-5 h-5 rounded-full object-cover border border-zinc-200"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-1rms-p-wdWTnwTyzCxx4WWDY6KOIJku_1SXKqt95j8mtWeA9RZAQ_8j4f5OZIx2rCsey_Iv7Cy8nE7JT2q0hLQRIEN8Zm_gwmBJfZ3x1ItRwigeggI75E_r_9ddlkpyC1xzli6YHtmZUP5qmdtUIDRSvB06Vr383RT_LJzEiabfXLs2yLa0nkxEBAMax3gbIC0o6nHsYwopj66cOJcQS6JlvBes_DosjzwaXVITwT9UZxtxTPm4k_eCdg0UkC90TR30wDB4rYyI"
                />
                <span className="text-xs text-zinc-500 font-medium">Takeshi Sato</span>
              </div>
            </div>

            {/* Recommendation Card 2 */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl aspect-video mb-4 shadow-sm bg-zinc-100">
                <img
                  alt="Japanese ceremony"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLkrGelN_y7nolchVqZ6A5JKE9Y2SDo9W9ZasI9yIBmU5Xn6hm0fSDjPQ2u3qdTgLSDkikAU078gSgpcGtRklzehB3MuxyP_WXPKgCLlFRw-ri5BYAN5lV5CZor2CsXTWxLlkfBSP7J-ATTsmij8DUmJaquyfQcsL1DfkRLvlwQwcu1efqsHCtimG7v53rrRfW-aArWX2IVibHg8JIQ8AS57q-jdYrjVBpbnhQp_c1N--1i5-vDLZGL_4LqejPxWjZgrzKuSHllZE"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#8f0020]/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm font-label">
                    TRENDING
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-lg font-headline text-[#1a1c1c] group-hover:text-[#8f0020] transition-colors leading-tight">
                Văn hóa Đàm thoại
              </h3>
              <p className="text-sm text-zinc-500 mb-3">Thực tế học qua văn hóa đời thường</p>
              <div className="flex items-center gap-2">
                <img
                  alt="Creator"
                  className="w-5 h-5 rounded-full object-cover border border-zinc-200"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMF0q6WVMYmf_frPYHx_o9bPkEDnFov0mmoMbhwsvPS1B8CxUDaroB_9zbPjfLbBsLUOgeUQDXGWYDqDKTJXbx7-LX90XUcYe0nFb7YkmZtmdrFHfVyPq9cgGlGCxrJyNpU6sxUZjIM27xy8Vb1tBW3M6XhbBJsSmKzJ0duhPyuVvlI74ZzPVBcMXCB1hY0JvvsOEAZKXiKNTp7Lr4fWdqFiAM7jdGKZ-nqDna08lJNjF3etTq0GVTeqsr-bKH8v2jlOZbB6JZy_Y"
                />
                <span className="text-xs text-zinc-500 font-medium">Hana Mori</span>
              </div>
            </div>

            {/* Recommendation Card 3 */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl aspect-video mb-4 shadow-sm bg-zinc-100">
                <img
                  alt="Japanese calligraphy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuApEEZGJzEwbZqveJ8khVOVX8mQbjuBz1v-CixXPog_dRarvs9b8QDBnOsrEnx5nTM1BpPtjame0w2Vt1L_ht9Ba-fIOXornCpR-asMhqEoDw2uw7INl0dpx5nmp0Ntq_qXbIGXjK7_aKtCUlAvPTcwzFxkn2_8aFKAKfjKWma00_PX2dkxQsYRPMd1YOwGJsRj4drYcOaEBwCfScixDEDIWs4tDSgDnOFadbEm64ByUS4RrYxW2XaEz7nuMgRs2OyqeuyBpq0ogGE"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#004c5c]/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm font-label">
                    COMMUNITY
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-lg font-headline text-[#1a1c1c] group-hover:text-[#8f0020] transition-colors leading-tight">
                Advanced Onomatopoeia
              </h3>
              <p className="text-sm text-zinc-500 mb-3">Nói chuyện như người bản xứ</p>
              <div className="flex items-center gap-2">
                <img
                  alt="Creator"
                  className="w-5 h-5 rounded-full object-cover border border-zinc-200"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYVcvQ-9cpydBbX9Js3yUrfhQgMqqDhTqFyoWt1Fgju6abQrDPuT5UNifemWCac2vCzaiuJIh2yHC_SdTd4I7KQGixkVHNRG1D2OKx6OwD4WHqyEJdlEpvvS0zlIDBiOO8N9J2LtpCCt6St90e0tSaXZQkfXarXr1lITWWmy3yN5d1EYFqVickSMxj7d0umPiSez9MkXOQXQPgnWrjgnXe8X-04XIhL01VrIu6Pi2mzXT2pY6GWk1VASOaj2UIgAPRKfMKe7pLp_I"
                />
                <span className="text-xs text-zinc-500 font-medium">Alex Chen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
