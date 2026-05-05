import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './LandingPage.css'

export default function LandingPage() {
  const { loginAsGuest } = useAuth()
  const navigate = useNavigate()

  const handleGuestAccess = () => {
    loginAsGuest()
    navigate('/learn')
  }

  return (
    <div className="min-h-screen bg-[#1a1c1c] overflow-hidden relative flex flex-col items-center justify-center font-body text-white selection:bg-[#ffffff] selection:text-[#1a1c1c]">
      {/* 1. Dynamic Background: Starburst and Halftone */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden mix-blend-screen opacity-40">
        <div className="w-[150vw] h-[150vw] p5-starburst animate-starburst" />
      </div>

      <div className="absolute inset-0 z-0 p5-halftone opacity-30 mix-blend-overlay" />

      {/* 2. Giant Slanted Red Background element */}
      <div className="absolute top-0 left-0 w-[200vw] h-full bg-[#e2e2e2] -rotate-12 origin-top-left translate-y-1/4 p5-cut-bg shadow-[0_0_80px_rgba(0,0,0,0.9)] z-0" />
      <div className="absolute top-0 left-0 w-[200vw] h-full bg-[#8f0020] -rotate-12 origin-top-left translate-y-32 p5-cut-bg shadow-[0_-20px_0_#bc002d] z-0" />

      {/* 3. Giant Typography Background (Kanji) */}
      <div className="absolute -right-10 -bottom-20 md:-bottom-40 text-[clamp(20rem,40vw,40rem)] font-black text-[#1a1c1c] opacity-50 leading-none select-none font-headline italic -rotate-[15deg] z-0 drop-shadow-[10px_10px_0_rgba(255,255,255,0.1)]">
        没入
      </div>

      {/* Decorative floating star stamp */}
      <div className="absolute top-20 right-20 md:right-1/4 z-30 animate-star hidden sm:block">
        <div className="relative">
          <div className="absolute inset-0 bg-[#ffffff] rotate-[45deg] scale-110 p5-pop-out-red" />
          <div className="bg-[#1a1c1c] text-[#ffffff] font-headline font-black text-2xl p-4 rotate-[-10deg] relative z-10 border-4 border-[#ffffff]">
            IMMERSION
            <br />
            HUB
          </div>
        </div>
      </div>

      {/* 4. P5 UI Container (Main Content) */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 flex md:justify-start justify-center mt-[-10vh]">
        <div className="animate-p5-container bg-[#f9f9f9] text-[#1a1c1c] p-8 md:p-14 md:pl-20 border-[6px] border-[#1a1c1c] p5-pop-out relative w-full sm:w-auto">
          {/* High-contrast Date/Status Label */}
          <div className="absolute -top-6 -left-6 bg-[#1a1c1c] text-[#ffffff] px-6 py-2 border-[4px] border-[#ffffff] font-black text-3xl font-headline tracking-tighter uppercase rotate-6 shadow-[8px_8px_0_#8f0020] z-30">
            Awaken!
          </div>

          <div className="absolute -left-12 bottom-1/4 bg-[#8f0020] text-white px-2 py-8 font-black text-2xl font-headline tracking-widest uppercase -rotate-180 border-4 border-[#1a1c1c] [writing-mode:vertical-rl] z-10 p5-pop-out-white hidden md:block">
            JAPANESE
          </div>

          {/* Core Message */}
          <h1 className="text-6xl md:text-8xl lg:text-[120px] font-black font-headline italic text-[#8f0020] uppercase tracking-tighter leading-[0.85] p5-title mt-4 mb-8">
            <span className="text-[#1a1c1c] drop-shadow-[4px_4px_0_#ffffff]">Bứt Phá</span>
            <br />
            Ngôn Ngữ
          </h1>

          <p className="text-xl md:text-2xl font-black font-label text-[#1a1c1c] uppercase tracking-widest mb-12 border-l-8 border-[#8f0020] pl-6 bg-[#e8e8e8] py-3 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
            Không còn ranh giới.
            <br />
            Trở thành người bản xứ.
          </p>

          {/* Aggressive Game-style Call to Actions */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-6 md:gap-8 justify-start relative z-20">
            <Link
              to="/register"
              className="p5-button bg-[#8f0020] text-[#ffffff] px-10 py-6 text-2xl md:text-3xl font-black font-headline uppercase tracking-widest hover:bg-[#bc002d] text-center border-4 border-[#1a1c1c] shadow-[8px_8px_0px_#1a1c1c] flex items-center justify-center gap-2 group min-w-[240px]"
            >
              Đăng ký
            </Link>

            <Link
              to="/login"
              className="p5-button-inverse bg-[#ffffff] text-[#1a1c1c] px-10 py-6 text-2xl md:text-3xl font-black font-headline uppercase tracking-widest hover:bg-[#e2e2e2] text-center border-4 border-[#1a1c1c] shadow-[8px_8px_0px_#8f0020] flex items-center justify-center gap-2 group min-w-[240px]"
            >
              Đăng nhập
            </Link>

            <button
              onClick={handleGuestAccess}
              className="p5-button bg-[#1a1c1c] text-[#ffffff] px-10 py-4 text-xl font-black font-headline uppercase tracking-widest hover:bg-[#2f3131] text-center border-4 border-[#ffffff] shadow-[8px_8px_0px_#8f0020] flex items-center justify-center gap-2 group min-w-[240px]"
            >
              <span className="material-symbols-outlined text-2xl group-hover:animate-pulse">
                visibility
              </span>
              Dùng thử (Guest)
            </button>
          </div>
        </div>
      </div>

      {/* 5. P5 Footer Marquee Warning Track */}
      <div className="absolute bottom-[5vh] left-0 w-full overflow-hidden bg-[#1a1c1c] py-4 -rotate-2 z-30 border-y-8 border-[#ffffff] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex animate-marquee w-[200%]">
          <div className="whitespace-nowrap flex-shrink-0">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="text-[#ffffff] font-black font-label text-2xl md:text-4xl uppercase tracking-widest px-8"
              >
                JAPANESE <span className="text-[#8f0020]">★</span> MODERN DOJO{' '}
                <span className="text-[#8f0020]">★</span> IMMERSION HUB{' '}
                <span className="text-[#8f0020]">★</span> BREAK THE CHAINS{' '}
                <span className="text-[#8f0020]">★</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
