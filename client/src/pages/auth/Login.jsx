import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

export default function Login() {
    const { login, getGoogleAuthUrl } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleGoogleLogin = () => {
        window.location.href = getGoogleAuthUrl();
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(formData);
            navigate('/learn');
        } catch (err) {
            setError(err?.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f9f9f9] text-[#1a1c1c] font-body selection:bg-[#ffdad9] selection:text-[#400009] min-h-screen flex flex-col japanese-pattern">
                <main className="flex-grow flex items-center justify-center px-6 py-12">
                    <div className="relative w-full max-w-[480px]">

                        {/* Decorative Large Kanji Background */}
                        <div className="absolute -top-24 -left-20 text-[180px] font-black text-[#8f0020]/5 select-none pointer-events-none font-headline leading-none">
                            道
                        </div>

                        <div className="relative z-10 bg-[#ffffff] rounded-xl shadow-[0_12px_32px_rgba(26,28,28,0.06)] overflow-hidden ring-1 ring-black/5">
                            <div className="p-8 md:p-12">

                                {/* Brand Identity */}
                                <div className="mb-10 text-center md:text-left">
                                    <h1 className="text-3xl font-headline font-bold italic text-[#8f0020] tracking-tight mb-2">Minori</h1>
                                    <p className="text-[#5c403f] text-sm font-medium">Quay lại hành trình đắm mình của bạn.</p>
                                </div>

                                {/* Login Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">

                                    {error && (
                                        <div className="p-4 rounded-xl bg-[#ffdad6] text-[#93000a] text-sm font-bold border border-[#ffb3b3]">
                                            ⚠ {error}
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        {/* Email Field */}
                                        <div className="group">
                                            <label className="block text-xs font-label font-semibold text-[#5c403f] uppercase tracking-wider mb-1 px-1" htmlFor="username">
                                                Tên đăng nhập
                                            </label>
                                            <div className="relative">
                                                <input
                                                    className="w-full bg-[#f3f3f3] border-none focus:ring-2 focus:ring-[#8f0020]/20 rounded-lg px-4 py-3.5 text-[#1a1c1c] placeholder:text-[#906f6f]/50 transition-all duration-200"
                                                    id="username"
                                                    name="username"
                                                    placeholder="Tên đăng nhập của bạn"
                                                    required
                                                    type="text"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        {/* Password Field */}
                                        <div className="group">
                                            <div className="flex justify-between items-center mb-1 px-1">
                                                <label className="block text-xs font-label font-semibold text-[#5c403f] uppercase tracking-wider" htmlFor="password">
                                                    Mật khẩu
                                                </label>
                                                <Link className="text-xs font-semibold text-[#8f0020] hover:text-[#920021] transition-colors" to="/forgot-password">Quên mật khẩu?</Link>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    className="w-full bg-[#f3f3f3] border-none focus:ring-2 focus:ring-[#8f0020]/20 rounded-lg px-4 py-3.5 text-[#1a1c1c] placeholder:text-[#906f6f]/50 transition-all duration-200"
                                                    id="password"
                                                    name="password"
                                                    placeholder="••••••••"
                                                    required
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Remember Me */}
                                    <div className="flex items-center py-2">
                                        <input
                                            className="h-4 w-4 rounded border-[#e4bdbc] text-[#8f0020] focus:ring-[#8f0020]/30 bg-[#f3f3f3] transition-colors cursor-pointer"
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <label className="ml-3 block text-sm text-[#5c403f] font-medium select-none cursor-pointer" htmlFor="remember-me">
                                            Ghi nhớ đăng nhập
                                        </label>
                                    </div>

                                    {/* Primary CTA */}
                                    <button
                                        disabled={loading}
                                        className="w-full bg-gradient-to-br from-[#8f0020] to-[#bc002d] text-[#ffffff] font-headline font-bold py-4 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 tracking-wide"
                                        type="submit"
                                    >
                                        {loading ? 'Đang xử lý...' : 'Vào võ đường'}
                                    </button>
                                </form>

                                {/* Divider */}
                                <div className="relative my-10">
                                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-[#e4bdbc]/30"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase font-label font-bold tracking-widest">
                                        <span className="bg-[#ffffff] px-4 text-[#906f6f]">HOẶC TIẾP TỤC VỚI</span>
                                    </div>
                                </div>

                                {/* Social Logins */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button onClick={handleGoogleLogin} type="button" className="flex items-center justify-center gap-3 bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#1a1c1c] font-semibold py-3 px-4 rounded-lg transition-all duration-200 group cursor-pointer">
                                        <span className="w-5 h-5 flex items-center justify-center">
                                            <svg className="w-full h-full" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z" fill="#FBBC05"></path>
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
                                            </svg>
                                        </span>
                                        <span className="text-sm">Google</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-3 bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#1a1c1c] font-semibold py-3 px-4 rounded-lg transition-all duration-200 group">
                                        <span className="w-5 h-5 flex items-center justify-center">
                                            <svg className="w-full h-full" viewBox="0 0 24 24">
                                                <path d="M17.05 20.28c-.96.95-2.04 1.44-3.23 1.44-1.2 0-2.2-.44-3.03-1.32-1.03-.94-1.92-1.42-2.68-1.42-.76 0-1.74.52-2.95 1.55-1.2 1.03-2.3 1.55-3.28 1.55-.98 0-1.85-.34-2.63-1.02-.78-.68-1.17-1.53-1.17-2.55 0-1.02.4-2.06 1.2-3.12l.25-.33c1.33-1.7 2.85-2.55 4.55-2.55.9 0 1.77.3 2.62.9 1.1.77 1.95 1.15 2.53 1.15.58 0 1.4-.38 2.45-1.15.85-.6 1.72-.9 2.62-.9 1.43 0 2.65.6 3.65 1.8.1.1.2.22.3.35-2.3 1.35-3.45 3.32-3.45 5.92 0 2 1.05 3.73 3.15 5.2-.23.5-.53 1-.9 1.52zm-3.03-16.1c0 1.2-.43 2.3-1.28 3.32-.85 1.02-1.87 1.63-3.05 1.82-.1.03-.2.05-.3.05-.07 0-.13 0-.2-.02.03-2.33 1.12-4.22 3.25-5.68.07-.05.13-.08.2-.1.1-.03.22-.05.35-.05 1.2 0 2.24.88 3.13 2.66z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                        <span className="text-sm">Apple</span>
                                    </button>
                                </div>

                                {/* Sign Up Link */}
                                <div className="mt-12 text-center">
                                    <p className="text-sm text-[#5c403f] font-medium">
                                        Mới tham gia?{' '}
                                        <Link className="text-[#8f0020] font-bold hover:underline underline-offset-4 decoration-2 transition-all" to="/register">
                                            Tạo tài khoản
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Accent (Asymmetric Learning Card Preview) */}
                        <div className="hidden lg:block absolute -right-64 top-1/2 -translate-y-1/2 w-56 transform rotate-3 scale-110 pointer-events-none">
                            <div className="bg-[#ffffff] p-6 rounded-xl shadow-xl border border-[#e4bdbc]/10">
                                <div className="flex flex-col gap-1">
                                    <span className="text-3xl font-headline font-bold text-[#8f0020]">学び</span>
                                    <span className="text-xs font-label font-bold text-[#004c5c] uppercase tracking-tighter">Manabi</span>
                                    <div className="h-[1px] w-8 bg-[#e4bdbc]/30 my-2"></div>
                                    <span className="text-sm text-[#1a1c1c] font-medium italic">học tập; nghiên cứu</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>

                {/* Footer */}
                <footer className="w-full border-t border-zinc-200 bg-zinc-100 flex flex-col md:flex-row justify-between items-center p-8 mt-auto font-manrope text-sm">
                    <div className="flex gap-6 mb-4 md:mb-0">
                        <a className="text-zinc-500 hover:text-zinc-800 transition-opacity" href="#">Điều khoản dịch vụ</a>
                        <a className="text-zinc-500 hover:text-zinc-800 transition-opacity" href="#">Chính sách bảo mật</a>
                        <a className="text-zinc-500 hover:text-zinc-800 transition-opacity" href="#">© 2024 Minori Immersion Hub. Chế tác bởi Zen.</a>
                    </div>
                    <div className="text-zinc-500">© 2024 Minori Immersion Hub. Chế tác bởi Zen.</div>
                </footer>
            </div>
    );
}
