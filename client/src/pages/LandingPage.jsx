import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LandingPage() {
    const { loginAsGuest } = useAuth();
    const navigate = useNavigate();

    const handleGuestAccess = () => {
        loginAsGuest();
        navigate('/learn');
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,700;0,800;0,900;1,700;1,900&family=Manrope:wght@400;500;700;800&family=Inter:wght@400;500;700;900&display=swap');

                .font-headline { font-family: 'Plus Jakarta Sans', sans-serif; }
                .font-body { font-family: 'Manrope', sans-serif; }
                .font-label { font-family: 'Inter', sans-serif; }

                /* Persona 5 Halftone dot pattern */
                .p5-halftone {
                    background-image: radial-gradient(circle, #8f0020 2.5px, transparent 3px);
                    background-size: 16px 16px;
                }

                /* Persona 5 starburst radial rays */
                .p5-starburst {
                    background: repeating-conic-gradient(
                        from 0deg,
                        #bc002d 0deg 8deg,
                        #8f0020 8deg 16deg
                    );
                }

                /* Persona 5 slanted container */
                .p5-cut-bg {
                    clip-path: polygon(0 0, 100% 8%, 100% 100%, 0 92%);
                }
                
                /* Sharp jagged button shape typical in P5 UI */
                .p5-button {
                    clip-path: polygon(6% 0, 100% 0%, 94% 100%, 0% 100%);
                    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                
                .p5-button:hover {
                    transform: scale(1.05) rotate(-2deg);
                }

                .p5-button-inverse {
                    clip-path: polygon(0 0, 94% 0%, 100% 100%, 6% 100%);
                    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .p5-button-inverse:hover {
                    transform: scale(1.05) rotate(2deg);
                }

                /* Animations */
                @keyframes slideInSlant {
                    0% { transform: translateY(100px) rotate(8deg); opacity: 0; }
                    100% { transform: translateY(0) rotate(-3deg); opacity: 1; }
                }
                
                @keyframes pulseShadow {
                    0% { filter: drop-shadow(6px 6px 0px rgba(26,28,28,1)); transform: scale(1); }
                    50% { filter: drop-shadow(14px 14px 0px rgba(143,0,32,0.9)); transform: scale(1.02); }
                    100% { filter: drop-shadow(6px 6px 0px rgba(26,28,28,1)); transform: scale(1); }
                }

                @keyframes floatStar {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(10px, -15px) rotate(15deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }

                @keyframes slideMarquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                @keyframes spinStarburst {
                    0% { transform: rotate(0deg) scale(2); }
                    100% { transform: rotate(360deg) scale(2); }
                }
                
                .animate-p5-container {
                    animation: slideInSlant 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
                
                .p5-title {
                    animation: pulseShadow 2.5s infinite;
                }

                .animate-star {
                    animation: floatStar 4s ease-in-out infinite;
                }

                .animate-marquee {
                    animation: slideMarquee 20s linear infinite;
                }

                .animate-starburst {
                    animation: spinStarburst 90s linear infinite;
                }

                .p5-pop-out {
                    box-shadow: 16px 16px 0px #1a1c1c;
                }
                .p5-pop-out-white {
                    box-shadow: 8px 8px 0px #ffffff;
                }
                .p5-pop-out-red {
                    box-shadow: 8px 8px 0px #8f0020;
                }
            `}</style>

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
                            IMMERSION<br />HUB
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
                            Không còn ranh giới.<br />Trở thành người bản xứ.
                        </p>

                        {/* Aggressive Game-style Call to Actions */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-6 md:gap-8 justify-start relative z-20">
                            <Link to="/register" className="p5-button bg-[#8f0020] text-[#ffffff] px-10 py-6 text-2xl md:text-3xl font-black font-headline uppercase tracking-widest hover:bg-[#bc002d] text-center border-4 border-[#1a1c1c] shadow-[8px_8px_0px_#1a1c1c] flex items-center justify-center gap-2 group min-w-[240px]">
                                Đăng ký
                            </Link>

                            <Link to="/login" className="p5-button-inverse bg-[#ffffff] text-[#1a1c1c] px-10 py-6 text-2xl md:text-3xl font-black font-headline uppercase tracking-widest hover:bg-[#e2e2e2] text-center border-4 border-[#1a1c1c] shadow-[8px_8px_0px_#8f0020] flex items-center justify-center gap-2 group min-w-[240px]">
                                Đăng nhập
                            </Link>

                            <button
                                onClick={handleGuestAccess}
                                className="p5-button bg-[#1a1c1c] text-[#ffffff] px-10 py-4 text-xl font-black font-headline uppercase tracking-widest hover:bg-[#2f3131] text-center border-4 border-[#ffffff] shadow-[8px_8px_0px_#8f0020] flex items-center justify-center gap-2 group min-w-[240px]"
                            >
                                <span className="material-symbols-outlined text-2xl group-hover:animate-pulse">visibility</span>
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
                                <span key={i} className="text-[#ffffff] font-black font-label text-2xl md:text-4xl uppercase tracking-widest px-8">
                                    JAPANESE <span className="text-[#8f0020]">★</span> MODERN DOJO <span className="text-[#8f0020]">★</span> IMMERSION HUB <span className="text-[#8f0020]">★</span> BREAK THE CHAINS <span className="text-[#8f0020]">★</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
