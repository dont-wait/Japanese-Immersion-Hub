import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './ForgotPassword.css';
export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) return;

        setError('');
        setLoading(true);
        try {
            await authService.forgotPassword(email);
            setIsSuccess(true);
        } catch (err) {
            setError(err?.response?.data?.message || 'Không thể gửi liên kết. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f9f9f9] text-[#1a1c1c] font-body selection:bg-[#bc002d] selection:text-[#ffc9c8] min-h-screen flex flex-col items-center justify-center p-6">

                {/* Main Content Container */}
                {!isSuccess && (
                    <main className="w-full max-w-xl flex flex-col items-center">

                        {/* Brand Anchor */}
                        <div className="mb-12 text-center">
                            <h1 className="font-headline text-4xl font-extrabold italic text-[#8f0020] tracking-tight mb-2">Minori</h1>
                            <p className="font-label text-sm text-[#635d5a] uppercase tracking-widest">Modern Dojo</p>
                        </div>

                        <div className="w-full bg-[#ffffff] rounded-xl editorial-shadow p-8 md:p-12 relative overflow-hidden">

                            {/* Asymmetric Design Element */}
                            <div className="absolute -top-12 -right-12 opacity-5 pointer-events-none">
                                <span className="font-headline text-[180px] font-extrabold italic leading-none select-none">道</span>
                            </div>

                            {/* Recovery Form */}
                            <div className="relative z-10">
                                <div className="mb-8">
                                    <h2 className="font-headline text-3xl font-bold tracking-tight text-[#1a1c1c] mb-3">Quên mật khẩu?</h2>
                                    <p className="text-[#635d5a] leading-relaxed">
                                        Nhập địa chỉ email được liên kết với tài khoản của bạn. Chúng tôi sẽ gửi cho bạn một liên kết an toàn để đặt lại con đường của bạn thông qua võ đường hiện đại.
                                    </p>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 rounded-xl bg-[#ffdad6] text-[#93000a] text-sm font-bold border border-[#ffb3b3]">
                                        ⚠ {error}
                                    </div>
                                )}

                                <form className="space-y-8" onSubmit={handleSubmit}>
                                    <div className="space-y-2">
                                        <label className="font-label text-sm font-medium text-[#5c403f] ml-1" htmlFor="email">
                                            Địa chỉ Email
                                        </label>
                                        <div className="relative group">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#906f6f] group-focus-within:text-[#8f0020] transition-colors">
                                                mail
                                            </span>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="nguoihoc@minori.io"
                                                className="w-full pl-12 pr-4 py-4 bg-[#f3f3f3] border-0 border-b-2 border-transparent focus:border-[#8f0020] focus:ring-0 rounded-lg font-body transition-all placeholder:text-[#906f6f]/50"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-gradient-to-r from-[#8f0020] to-[#bc002d] text-[#ffffff] font-headline font-bold text-lg rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all editorial-shadow group flex items-center justify-center gap-3 disabled:opacity-75 disabled:hover:scale-100"
                                    >
                                        {loading ? 'Đang gửi...' : 'Gửi liên kết khôi phục'}
                                        {!loading && <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>}
                                    </button>
                                </form>
                            </div>

                            {/* Focus Link Back */}
                            <div className="mt-10 pt-8 border-t border-[#e4bdbc]/15 flex justify-center">
                                <Link to="/login" className="flex items-center gap-2 font-label text-sm font-medium text-[#635d5a] hover:text-[#8f0020] transition-colors group">
                                    <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                    Quay lại Đăng nhập
                                </Link>
                            </div>
                        </div>

                        {/* Secondary Guidance */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-lg">
                            <div className="p-6 bg-[#004c5c]/5 rounded-xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-[#004c5c]">shield_lock</span>
                                    <h3 className="font-headline font-bold text-[#1a1c1c]">Truy cập An toàn</h3>
                                </div>
                                <p className="text-sm text-[#635d5a] leading-relaxed">Liên kết đặt lại sẽ hết hạn sau 24 giờ để đảm bảo tiến trình của bạn luôn được bảo vệ.</p>
                            </div>
                            <div className="p-6 bg-[#635d5a]/5 rounded-xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-[#635d5a]">help</span>
                                    <h3 className="font-headline font-bold text-[#1a1c1c]">Cần hỗ trợ?</h3>
                                </div>
                                <p className="text-sm text-[#635d5a] leading-relaxed">Không thể truy cập email? Hãy liên hệ với sensei hỗ trợ của chúng tôi để được giúp đỡ.</p>
                            </div>
                        </div>
                    </main>
                )}

                {/* Success State Overlay */}
                {isSuccess && (
                    <div className="fixed inset-0 bg-[#f9f9f9]/95 backdrop-blur-xl z-[100] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                        <div className="relative mb-8">
                            <svg className="w-32 h-32 transform -rotate-90">
                                <circle cx="64" cy="64" r="56" fill="transparent" strokeWidth="4" stroke="currentColor" className="text-[#e8e8e8]" />
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    fill="transparent"
                                    strokeWidth="4"
                                    stroke="currentColor"
                                    style={{ strokeLinecap: 'round' }}
                                    className="text-[#8f0020] enso-stroke enso-success"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="material-symbols-outlined text-4xl text-[#8f0020]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    mark_email_read
                                </span>
                            </div>
                        </div>

                        <h2 className="font-headline text-3xl font-extrabold text-[#1a1c1c] mb-4">Con đường đã được khôi phục</h2>
                        <p className="max-w-md text-[#635d5a] leading-relaxed mb-8">
                            Một liên kết khôi phục đã được gửi đến hộp thư đến của bạn. Kiểm tra thư và làm theo hướng dẫn để tiếp tục hành trình.
                        </p>
                        <Link to="/login" className="px-8 py-3 bg-[#e2e2e2] text-[#1a1c1c] font-headline font-bold rounded-xl hover:scale-105 transition-all">
                            Quay lại Võ đường
                        </Link>
                    </div>
                )}

                {/* Footer Segment */}
                {!isSuccess && (
                    <footer className="mt-20 w-full max-w-4xl flex flex-col md:flex-row justify-between items-center p-8 border-t border-zinc-200 gap-6 opacity-60 hover:opacity-100 transition-opacity">
                        <span className="font-body text-sm text-zinc-500">© 2024 Minori Immersion Hub. Chế tác với Zen.</span>
                        <div className="flex gap-8">
                            <a className="font-body text-sm text-zinc-500 hover:text-[#8f0020] transition-colors" href="#">Điều khoản Dịch vụ</a>
                            <a className="font-body text-sm text-zinc-500 hover:text-[#8f0020] transition-colors" href="#">Chính sách Bảo mật</a>
                            <a className="font-body text-sm text-zinc-500 hover:text-[#8f0020] transition-colors" href="#">Liên hệ Hỗ trợ</a>
                        </div>
                    </footer>
                )}

            </div>
    );
}
