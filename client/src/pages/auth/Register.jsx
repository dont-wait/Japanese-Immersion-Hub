import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GoogleLogo from '../../assets/Google_2015_logo.svg.png';
import AppleLogo from '../../assets/Apple_logo_black.svg';
import './Register.css';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!agree) {
            setError('Bạn phải đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu không khớp.');
            return;
        }

        setLoading(true);
        try {
            await register({
                username: formData.fullName.replace(/\s+/g, '_').toLowerCase(),
                email: formData.email,
                password: formData.password,
                displayName: formData.fullName
            });
            navigate('/learn');
        } catch (err) {
            setError(err?.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen flex flex-col font-body">

                <header className="fixed top-0 w-full z-50 glass-effect">
                    <div className="flex justify-between items-center px-8 py-6 w-full max-w-7xl mx-auto">
                        <div className="text-2xl font-bold italic text-[#8f0020] font-headline tracking-tight">Minori</div>
                        <Link to="/login" className="text-sm font-label font-medium text-[#635d5a] hover:text-[#8f0020] transition-colors">
                            Đã có tài khoản? Đăng nhập
                        </Link>
                    </div>
                </header>

                <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-6">
                    <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
                            <div className="space-y-4">
                                <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-[#1a1c1c] leading-tight">
                                    Bắt đầu hành trình <span className="text-[#8f0020] italic">đắm mình</span>
                                </h1>
                                <p className="text-lg text-[#635d5a] font-body max-w-md leading-relaxed">
                                    Bước vào một võ đường kỹ thuật số hiện đại được thiết kế để mang lại sự rõ ràng và tập trung sâu sắc. Tham gia cộng đồng những người học tận tâm.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="p-6 rounded-xl bg-[#f3f3f3] flex items-start gap-4 transition-transform hover:scale-[1.02] duration-300">
                                    <div className="w-12 h-12 rounded-full bg-[#8f0020]/10 flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-[#8f0020]" data-icon="insights">insights</span>
                                    </div>
                                    <div>
                                        <h3 className="font-headline font-bold text-[#1a1c1c]">theo dõi tiến độ</h3>
                                        <p className="text-sm text-[#5c403f] font-body">Hình ảnh hóa hành trình của bạn với phân tích chi tiết và Vòng tròn Tiến độ.</p>
                                    </div>
                                </div>

                                <div className="p-6 rounded-xl bg-[#f3f3f3] flex items-start gap-4 transition-transform hover:scale-[1.02] duration-300">
                                    <div className="w-12 h-12 rounded-full bg-[#004c5c]/10 flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-[#004c5c]" data-icon="folder_special">folder_special</span>
                                    </div>
                                    <div>
                                        <h3 className="font-headline font-bold text-[#1a1c1c]">lưu bộ thẻ</h3>
                                        <p className="text-sm text-[#5c403f] font-body">Quản lý thư viện tài liệu học tập và các bộ từ vựng cá nhân của bạn.</p>
                                    </div>
                                </div>

                                <div className="p-6 rounded-xl bg-[#f3f3f3] flex items-start gap-4 transition-transform hover:scale-[1.02] duration-300">
                                    <div className="w-12 h-12 rounded-full bg-[#635d5a]/10 flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-[#635d5a]" data-icon="groups">groups</span>
                                    </div>
                                    <div>
                                        <h3 className="font-headline font-bold text-[#1a1c1c]">tham gia cộng đồng</h3>
                                        <p className="text-sm text-[#5c403f] font-body">Chia sẻ kiến thức, đặt câu hỏi và leo lên bảng xếp hạng toàn cầu.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 order-1 lg:order-2">
                            <div className="bg-[#ffffff] p-8 md:p-12 rounded-[24px] shadow-[0_12px_32px_rgba(26,28,28,0.04)] relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 text-[12rem] font-bold text-[#eeeeee] opacity-20 pointer-events-none select-none font-headline italic">
                                    和
                                </div>

                                <div className="relative z-10">
                                    <h2 className="font-headline text-3xl font-bold text-[#1a1c1c] mb-8">Tạo hồ sơ của bạn</h2>

                                    {error && (
                                        <div className="mb-6 p-4 rounded-xl bg-[#ffdad6] text-[#93000a] text-sm font-bold border border-[#ffb3b3]">
                                            ⚠ {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-label font-bold uppercase tracking-widest text-[#635d5a] ml-1">HỌ VÀ TÊN</label>
                                                <input
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 min-h-[48px] rounded-xl bg-[#f3f3f3] border-none focus:ring-2 focus:ring-[#8f0020] focus:bg-[#ffffff] transition-all placeholder:text-zinc-400 text-[#1a1c1c] font-body"
                                                    placeholder="Kenji Tanaka"
                                                    type="text"
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-label font-bold uppercase tracking-widest text-[#635d5a] ml-1">EMAIL</label>
                                                <input
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 min-h-[48px] rounded-xl bg-[#f3f3f3] border-none focus:ring-2 focus:ring-[#8f0020] focus:bg-[#ffffff] transition-all placeholder:text-zinc-400 text-[#1a1c1c] font-body"
                                                    placeholder="kenji@immersion.jp"
                                                    type="email"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-label font-bold uppercase tracking-widest text-[#635d5a] ml-1">MẬT KHẨU</label>
                                                <input
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 min-h-[48px] rounded-xl bg-[#f3f3f3] border-none focus:ring-2 focus:ring-[#8f0020] focus:bg-[#ffffff] transition-all text-[#1a1c1c] font-body"
                                                    placeholder="••••••••"
                                                    type="password"
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-label font-bold uppercase tracking-widest text-[#635d5a] ml-1">XÁC NHẬN MẬT KHẨU</label>
                                                <input
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 min-h-[48px] rounded-xl bg-[#f3f3f3] border-none focus:ring-2 focus:ring-[#8f0020] focus:bg-[#ffffff] transition-all text-[#1a1c1c] font-body"
                                                    placeholder="••••••••"
                                                    type="password"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 py-2">
                                            <input
                                                id="terms"
                                                type="checkbox"
                                                checked={agree}
                                                onChange={(e) => setAgree(e.target.checked)}
                                                className="w-5 h-5 rounded border-[#e4bdbc] text-[#8f0020] focus:ring-[#8f0020] transition-all cursor-pointer"
                                            />
                                            <label className="text-sm text-[#5c403f] font-body leading-tight" htmlFor="terms">
                                                Tôi đồng ý với <a className="text-[#8f0020] underline underline-offset-4 hover:text-[#920021] transition-colors" href="#">Điều khoản Dịch vụ</a> và <a className="text-[#8f0020] underline underline-offset-4 hover:text-[#920021] transition-colors" href="#">Chính sách Bảo mật</a>.
                                            </label>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                className="w-full primary-gradient text-[#ffffff] font-headline font-bold py-4 rounded-xl text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#8f0020]/20"
                                                type="submit"
                                                disabled={loading}
                                            >
                                                {loading ? 'Đang xử lý...' : 'Tham gia Minori'}
                                            </button>
                                        </div>
                                    </form>

                                    <div className="mt-8 pt-8 border-t border-[#eeeeee] flex flex-col md:flex-row items-center justify-between gap-4">
                                        <p className="text-sm text-[#635d5a] font-body">Hoặc đăng ký bằng</p>
                                        <div className="flex gap-4 w-full md:w-auto">
                                            <button type="button" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#e8e8e8] hover:bg-[#e2e2e2] transition-colors font-label font-medium text-sm text-[#1a1c1c]">
                                                <img alt="Google" className="w-[18px] object-contain" src={GoogleLogo} />
                                                Google
                                            </button>
                                            <button type="button" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#e8e8e8] hover:bg-[#e2e2e2] transition-colors font-label font-medium text-sm text-[#1a1c1c]">
                                                <img alt="Apple" className="w-[18px] object-contain" src={AppleLogo} />
                                                Apple
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="w-full border-t border-[#e4e4e7] bg-[#f4f4f5] mt-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center p-8 max-w-7xl mx-auto font-manrope text-sm">
                        <div className="text-[#71717a] mb-4 md:mb-0">
                            © 2024 Minori Immersion Hub. Được tạo ra với tinh thần Thiền.
                        </div>
                        <div className="flex gap-8">
                            <a className="text-[#71717a] hover:text-[#27272a] transition-opacity" href="#">Điều khoản Dịch vụ</a>
                            <a className="text-[#71717a] hover:text-[#27272a] transition-opacity" href="#">Chính sách Bảo mật</a>
                            <a className="text-[#71717a] hover:text-[#27272a] transition-opacity" href="#">Hỗ trợ</a>
                        </div>
                    </div>
                </footer>

                <div className="fixed top-0 right-0 -z-10 w-1/2 h-full opacity-5 pointer-events-none overflow-hidden">
                    <img
                        alt="Japanese landscape"
                        className="w-full h-full object-cover grayscale"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYe4WJZty6JZD3pGDHpYdmjRHfAlkKF49TcX5MblXrqbAXavzF4NGpJ7QOySTR5Lu5SL9GrWAPLHSnrARLMC6VDO9LsymhFkAjxYeQrPvfbAPT7vm_RC1CUXgb38cxY7Meez31Kvqfj4Kx_UCjxOLo2a-dtn2_ndA9Nv72ZrnWc5XD82Pt0JMV9hbDIRywnE64jF7SpzvJtUDK6_Mwy2ILMK6C-v393UhY7w7U0JaVJi5nREEJuQ-X_0iWLRZ_pElM6teenwUMqM8"
                    />
                </div>
            </div>
    );
}
